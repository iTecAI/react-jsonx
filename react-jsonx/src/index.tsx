import * as React from "react";
import { CoreKit } from "./kits/core/core";
import { CoreKitRenderer } from "./renderers/blueprintjs/core";
import { useState, useEffect } from "react";
import { isEqual, set } from "lodash";
import { RendererContext, DataContext, FormContext } from "./types/contexts";
import { useContext } from "react";
import { RendererKitItem } from "./types/kits";
import { useFormField, useValueResolution } from "./util/hooks";

function DefaultError(props: { text: string }): JSX.Element {
    return <div className="jsonx error">Error: {props.text}</div>;
}

function RenderItem<T extends { [key: string]: RendererKitItem }>(props: {
    spec: T[keyof T];
}): JSX.Element {
    const renderers = useContext(RendererContext);
    const generatedProps = useValueResolution(props.spec);
    const [formValue, setFormValue] = useFormField(generatedProps.fieldSet);
    if (Object.keys(renderers).includes(props.spec.subtype)) {
        const ToRender: (props: { text: string }) => JSX.Element =
            renderers[props.spec.subtype];
        if ((props.spec as any).field) {
            return (
                <ToRender
                    value={formValue}
                    onChange={setFormValue}
                    {...generatedProps}
                />
            );
        } else {
            return <ToRender {...generatedProps} />;
        }
    } else if (Object.keys(renderers).includes("error")) {
        const ToRender: (props: { text: string }) => JSX.Element =
            renderers.error;
        return <ToRender text={`Unknown subtype ${props.spec.subtype}`} />;
    } else {
        return <DefaultError text={`Unknown subtype ${props.spec.subtype}`} />;
    }
}

export type ReactJSONXProps<T, D = any> = {
    renderers?: { [item in keyof T]: (props: any) => JSX.Element } & {
        [key: string]: any;
    }; // Mapping of renderer names to render functions, with overflow. Defaults to blueprint renderer
    spec: T[keyof T]; // Renderer specification
    data?: D; // Input data
    onChange?: (data: any) => void; // Function to call when data changes
};

export function ReactJSONX<Kit extends {} = CoreKit, Data = any>(
    props: ReactJSONXProps<Kit, Data>
): JSX.Element {
    const renderers: { [key: string]: (props: any) => JSX.Element } =
        props.renderers ?? CoreKitRenderer;
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

    return (
        <DataContext.Provider value={[data, setData]}>
            <FormContext.Provider
                value={(path, value) => {
                    const newData = { ...data };
                    set(newData, path, value);
                    if (!isEqual(newData, data)) {
                        setData(newData);
                    }
                }}
            >
                <RendererContext.Provider value={renderers}>
                    <RenderItem<Kit> spec={spec} />
                </RendererContext.Provider>
            </FormContext.Provider>
        </DataContext.Provider>
    );
}
