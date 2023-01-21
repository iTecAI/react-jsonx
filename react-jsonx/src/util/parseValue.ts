import { isArray, isString } from "lodash";
import {
    ValueKitItemDirective,
    ValueKitType,
    ValueRoot,
    isValueKitItem
} from "../types/valueItems";
import lodash from "lodash";

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
                        return lodash.get(data, path, args.default ?? path);
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
                for (const entry of lodash.entries<ValueRoot>(
                    args.substitutions
                )) {
                    toSub = toSub.replace(
                        new RegExp(`\{\{${entry[0]}\}\}`, "g"),
                        parseValue(entry[1], data, dependenciesSet)
                    );
                }
                return toSub;
        }
    } else {
        return item;
    }
}
