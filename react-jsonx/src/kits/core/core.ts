import { GeneratorKitItem, RendererKitItem } from "../../types/kits";

interface GroupItem extends RendererKitItem {
    subtype: "group";
    children: (RendererKitItem | GeneratorKitItem)[] | GeneratorKitItem;
}

export interface CoreKit {
    group: GroupItem;
}
