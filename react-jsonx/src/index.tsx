import * as React from "react";
import { CoreKit } from "./kits/core/core";
import { CoreKitRenderer } from "./renderers/blueprintjs/core";
import { useState, useEffect } from "react";
import { isEqual } from "lodash";

export type ReactJSONXProps<T, D = any> = {
    renderers?: { [item in keyof T]: () => void } & { [key: string]: any }; // Mapping of renderer names to render functions, with overflow. Defaults to blueprint renderer
    spec: T[keyof T]; // Renderer specification
    data?: D; // Input data
    onChange?: (data: any) => void; // Function to call when data changes
};

export function ReactJSONX<Kit = CoreKit, Data = any>(
    props: ReactJSONXProps<Kit, Data>
): JSX.Element {
    const renderers = props.renderers ?? CoreKitRenderer;
    const spec: Kit[keyof Kit] = props.spec;
    const [data, setData] = useState<Data | {}>(props.data ?? {});

    useEffect(() => {
        if (!isEqual(data, props.data ?? {})) {
            setData(props.data ?? {});
        }
    }, [props.data]);

    useEffect(() => {
        if (!isEqual(data, props.data ?? {})) {
            (props.onChange ?? (() => {}))(data);
        }
    }, [data, props.onChange]);

    return <></>;
}
