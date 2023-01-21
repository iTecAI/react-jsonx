import { RendererKitItemNoForm } from "../../types/kits";
import { ChildType } from "../../types";

interface GroupItem extends RendererKitItemNoForm {
    subtype: "group";
    children: ChildType;
}

export interface CoreKit {
    group: GroupItem;
}

export type CoreKitRenderers = CoreKit[keyof CoreKit];
