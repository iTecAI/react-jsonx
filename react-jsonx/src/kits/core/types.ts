import { RendererKitItemForm, RendererKitItemNoForm } from "../../types/kits";
import { ChildType, ValueRoot } from "../../types";

interface GroupItem extends RendererKitItemNoForm {
    subtype: "group";
    children: ChildType;
}

interface RawTextItem extends RendererKitItemNoForm {
    subtype: "rawText";
    content: ValueRoot;
}

interface RawInputItem extends RendererKitItemForm {
    subtype: "rawInput";
    placeholder?: ValueRoot;
}

export interface CoreKit {
    group: GroupItem;
    rawText: RawTextItem;
    rawInput: RawInputItem;
}

export type CoreKitRenderers = CoreKit[keyof CoreKit];
