import { DataContext, FormContext, RendererContext } from "./contexts";
import { GeneratorItems } from "./generators";
import { RendererKitItem, isGenerator, isRenderer } from "./kits";
import { ValueRoot, ValueKitType, isValueKitItem } from "./valueItems";
import { FunctionType } from "./function";

export type ChildType<T = RendererKitItem> =
    | (T | GeneratorItems)[]
    | T
    | GeneratorItems;

export {
    DataContext,
    FormContext,
    RendererContext,
    GeneratorItems,
    RendererKitItem,
    isGenerator,
    isRenderer,
    ValueRoot,
    ValueKitType,
    isValueKitItem,
    FunctionType
};
