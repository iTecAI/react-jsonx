import { useContext, useEffect, useState } from "react";
import { DataContext, FormContext } from "../types/contexts";
import { entries, isEqual, get, isArray, isObject } from "lodash";
import { ValueRoot, isValueKitItem } from "../types/valueItems";
import { parseValue } from "./parseValue";

const EXCLUDE: string[] = ["type", "subtype", "children", "child"];

function resolve(spec: any, data: any, exclude?: string[]): [any, string[]] {
    const resolved = { ...spec };
    const dependencies: string[] = [];
    for (const [k, v] of entries<ValueRoot>(spec)) {
        if (EXCLUDE.includes(k) || (exclude ?? []).includes(k)) {
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

export function useValueResolution(spec: any, exclude?: string[]): any {
    const [data] = useContext(DataContext) ?? [{}];
    const [res, deps] = resolve(spec, data);
    const [resolved, setResolved] = useState<any>(res);
    const [dependencies, setDependencies] = useState<string[]>(deps);

    useEffect(() => {
        const [newResolved, newDependencies] = resolve(spec, data, exclude);
        if (!isEqual(resolved, newResolved)) {
            setResolved(newResolved);
        }
        if (!isEqual(dependencies, newDependencies)) {
            setDependencies(newDependencies);
        }
    }, [data, spec]);
    return resolved;
}

export function useFormField<T>(
    path?: string
): [T | null, (value: T | null) => void] {
    const data = useContext(DataContext);
    const updateForm = useContext(FormContext);
    const [value, setValue] = useState<T | null>(get(data, path ?? "") ?? null);

    if (path === undefined) {
        return [null, (value: T | null) => {}];
    } else {
        return [
            value,
            (newValue) => {
                (updateForm ?? ((path: string, value: any) => {}))(
                    path,
                    newValue
                );
                setValue(newValue);
            }
        ];
    }
}
