import { useContext, useEffect, useState } from "react";
import { DataContext, FormContext } from "..";
import { entries, isEqual, get } from "lodash";
import { ValueRoot } from "../types/valueItems";
import { parseValue } from "./parseValue";

const EXCLUDE: string[] = ["type", "subtype"];

function resolve(spec: any, data: any): [any, string[]] {
    const resolved = { ...spec };
    const dependencies: string[] = [];
    for (const [k, v] of entries<ValueRoot>(spec)) {
        if (!EXCLUDE.includes(k)) {
            resolved[k] = parseValue(v, data, dependencies);
        }
    }
    return [resolved, dependencies];
}

export function useValueResolution(spec: any): any {
    const [data] = useContext(DataContext);
    const [res, deps] = resolve(spec, data);
    const [resolved, setResolved] = useState<any>(res);
    const [dependencies, setDependencies] = useState<string[]>(deps);

    useEffect(() => {
        const [newResolved, newDependencies] = resolve(spec, data);
        for (const item of newDependencies) {
            if (!isEqual(get(newResolved, item), get(resolved, item))) {
                setResolved(newResolved);
                break;
            }
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
    const [value, setValue] = useState<T | null>(get(data, path) ?? null);

    if (path === undefined) {
        return [undefined, (value: T) => {}];
    } else {
        return [
            value,
            (newValue) => {
                updateForm(path, newValue);
                setValue(newValue);
            }
        ];
    }
}
