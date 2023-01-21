import {
    GeneratorKitItem,
    RendererKitItem,
    RendererKitItemNoForm
} from "../../types/kits";

interface GroupItem extends RendererKitItemNoForm {
    subtype: "group";
    children: (RendererKitItem | GeneratorKitItem)[] | GeneratorKitItem;
}

export interface CoreKit {
    group: GroupItem;
}

export type CoreKitRenderers = CoreKit[keyof CoreKit];
