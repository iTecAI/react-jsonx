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
}

export interface GeneratorKitItem extends KitItem {
    type: "generator";
}

export interface ValueKitItem extends KitItem {
    type: "value";
}

export function isRenderer(o: any): o is RendererKitItem {
    return o.type === "renderer";
}

export function isGenerator(o: any): o is GeneratorKitItem {
    return o.type === "generator";
}

export function isValue(o: any): o is ValueKitItem {
    return o.type === "value";
}
