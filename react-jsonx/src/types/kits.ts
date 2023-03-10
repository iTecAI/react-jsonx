import { ValueRoot } from "./valueItems";

export type KitItemType = "renderer" | "generator" | "value";

export interface KitItem {
    type: KitItemType;
    subtype: string;
}

export type Kit = {
    [key: string]: KitItem;
};

export interface RendererKitItemForm extends KitItem {
    type: "renderer";
    fieldSet: ValueRoot;
    [key: string]: any;
}

export interface RendererKitItemNoForm extends KitItem {
    type: "renderer";
    [key: string]: any;
}

export type RendererKitItem = RendererKitItemNoForm | RendererKitItemForm;

export interface GeneratorKitItem extends KitItem {
    type: "generator";
}

export function isRenderer(o: any): o is RendererKitItem {
    return o.type === "renderer";
}

export function isGenerator(o: any): o is GeneratorKitItem {
    return o.type === "generator";
}
