import { ValueRoot } from "./valueItems";

export type KitItemType = "renderer" | "generator" | "value";

export interface KitItem {
    type: KitItemType;
    subtype: string;
}

export type Kit = {
    [key: string]: KitItem;
};

export interface RendererKitItem extends KitItem {
    type: "renderer";
    field?: boolean;
    fieldSet?: ValueRoot;
}

export interface GeneratorKitItem extends KitItem {
    type: "generator";
}

export function isRenderer(o: any): o is RendererKitItem {
    return o.type === "renderer";
}

export function isGenerator(o: any): o is GeneratorKitItem {
    return o.type === "generator";
}
