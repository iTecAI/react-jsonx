import { entries, get, isArray, isObject, isString } from "lodash";
import {
    FunctionType,
    ValueKitType,
    ValueRoot,
    isValueKitItem
} from "../types";
import { ValueKitItemDirective } from "../types/valueItems";

const EXCLUDE: string[] = ["type", "subtype", "children", "child"];

export function resolve(
    spec: any,
    data: any,
    exclude?: string[] | null
): [any, string[]] {
    const resolved = { ...spec };
    const dependencies: string[] = [];
    for (const [k, v] of entries<ValueRoot>(spec)) {
        if (
            (EXCLUDE.includes(k) || (exclude ?? []).includes(k)) &&
            exclude !== null
        ) {
            continue;
        }
        if (isArray(v)) {
            resolved[k] = v.map((i) => resolve(i, data, exclude));
            continue;
        }
        if (isValueKitItem(v)) {
            resolved[k] = parseValue(v, data, dependencies);
            continue;
        }
        if (isObject(v)) {
            resolved[k] = resolve(v, data, exclude);
            continue;
        }
    }
    return [resolved, dependencies];
}

export function parseValue(
    item: ValueRoot,
    data: any,
    dependenciesSet: string[]
): any {
    if (isValueKitItem(item)) {
        if (isArray(item)) {
            return item.map((v) => parseValue(v, data, dependenciesSet));
        }

        let directive: ValueKitType;
        let args: any = {};
        if (isString(item)) {
            switch (item.split("$")[1].split(":")[0] as ValueKitItemDirective) {
                case "data":
                    directive = "data";
                    args.path = item.split(":")[1] ?? null;
                    args.default = item.split(":")[2] ?? null;
                    break;
                default:
                    return item;
            }
        } else {
            directive = item.subtype;
            args = { ...item };
        }

        switch (directive) {
            case "data":
                if (args.path) {
                    const path = parseValue(args.path, data, dependenciesSet);
                    if (path) {
                        dependenciesSet.push(args.path);
                        return get(data, path, args.default ?? path);
                    } else {
                        return data;
                    }
                } else {
                    return data;
                }
            case "text":
                let toSub: string = parseValue(
                    args.text,
                    data,
                    dependenciesSet
                );
                for (const entry of entries<ValueRoot>(args.substitutions)) {
                    toSub = toSub.replace(
                        new RegExp(`\{\{${entry[0]}\}\}`, "g"),
                        parseValue(entry[1], data, dependenciesSet)
                    );
                }
                return toSub;
            case "function":
                const parsed = parseFunction(args.function);
                return parsed(data);
        }
    } else {
        return item;
    }
}

export function parseFunction(func: FunctionType): (data: any) => any {
    const executor = Function("opts", `return (${func.code})(opts)`);
    return (data: any) => {
        const [resolvedArgs] = resolve(func.opts, data, null);
        return executor(resolvedArgs);
    };
}
