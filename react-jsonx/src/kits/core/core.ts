import { RendererKitItemNoForm } from "../../types/kits";
import { ChildType, ValueRoot } from "../../types";

interface GroupItem extends RendererKitItemNoForm {
    subtype: "group";
    children: ChildType;
}

interface RawTextItem extends RendererKitItemNoForm {
    subtype: "rawText";
    content: ValueRoot;
}

export interface CoreKit {
    group: GroupItem;
    rawText: RawTextItem;
}

export type CoreKitRenderers = CoreKit[keyof CoreKit];
