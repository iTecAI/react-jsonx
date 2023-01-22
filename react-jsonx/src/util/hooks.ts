import { useContext, useEffect, useState } from "react";
import { DataContext, FormContext } from "../types/contexts";
import { isEqual, get } from "lodash";
import { resolve } from "./parsers";

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
