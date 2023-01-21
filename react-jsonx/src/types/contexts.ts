import { createContext } from "react";

export const DataContext = createContext<[any, (data: any) => void] | null>(
    null
);

export const FormContext =
    createContext<(path: string, value: any) => void | null>(null);

export const RendererContext = createContext<{
    [key: string]: (props: any) => JSX.Element;
}>({});
