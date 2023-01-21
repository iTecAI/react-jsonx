import * as React from "react";
import { CoreKit } from "./kits/core/core";
import { CoreKitRenderer } from "./renderers/blueprintjs/core";
import { useState, useEffect } from "react";
import { isArray, isEqual, set } from "lodash";
import { RendererContext, DataContext, FormContext } from "./types/contexts";
import { useContext } from "react";
import { isGenerator, isRenderer } from "./types/kits";
import { useFormField, useValueResolution } from "./util/hooks";
import { ChildType } from "./types";

function DefaultError(props: { text: string }): JSX.Element {
    return <div className="jsonx error">Error: {props.text}</div>;
}

function RenderItem<T extends { [key: string]: any }>(props: {
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
                    children={
                        Object.keys(props.spec).includes("children") ? (
                            <RenderGeneral spec={props.spec.children} />
                        ) : undefined
                    }
                    {...generatedProps}
                />
            );
        } else {
            return (
                <ToRender
                    {...generatedProps}
                    children={
                        Object.keys(props.spec).includes("children") ? (
                            <RenderGeneral spec={props.spec.children} />
                        ) : undefined
                    }
                />
            );
        }
    } else if (Object.keys(renderers).includes("error")) {
        const ToRender: (props: { text: string }) => JSX.Element =
            renderers.error;
        return <ToRender text={`Unknown subtype ${props.spec.subtype}`} />;
    } else {
        return <DefaultError text={`Unknown subtype ${props.spec.subtype}`} />;
    }
}

function RenderGeneral<T extends { [key: string]: any }>(props: {
    spec: ChildType;
}): JSX.Element {
    const processedGeneratorData = useValueResolution(
        isGenerator(props.spec) ? props.spec : {},
        ["renderer"]
    );

    if (isRenderer(props.spec)) {
        return <RenderItem<T> spec={props.spec as any} />;
    } else if (isArray(props.spec)) {
        return (
            <>
                {props.spec.map((v, i) => (
                    <RenderItem spec={v} key={i} />
                ))}
            </>
        );
    } else {
        let results: any[];
        const renderer = props.spec.renderer;
        switch (props.spec.subtype) {
            case "iterator":
                results = processedGeneratorData.iterator;
                break;
            default:
                results = [];
        }

        return (
            <>
                {results.map((v) => (
                    <DataContext.Provider value={v}>
                        <RenderGeneral<any> spec={renderer} />
                    </DataContext.Provider>
                ))}
            </>
        );
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
                    <RenderGeneral<Kit> spec={spec as any} />
                </RendererContext.Provider>
            </FormContext.Provider>
        </DataContext.Provider>
    );
}
