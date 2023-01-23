import { ValueRoot } from "../../../dist/types";
import { ChildType } from "../../types";
import { RendererKitItemNoForm } from "../../types/kits";

type BlueprintChild = ChildType<BlueprintKit[keyof BlueprintKit]>;

interface BlueprintGroup extends RendererKitItemNoForm {
    subtype: "group";
    children: BlueprintChild;
}

interface BlueprintText extends RendererKitItemNoForm {
    subtype: "text";
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "default" | "code";
    style?: ("monospace" | "muted" | "disabled" | "overflow-ellipsis")[];
    size?: number | "small" | "large";
    text: ValueRoot;
}

export type BlueprintKit = {
    group: BlueprintGroup;
    text: BlueprintText;
};

// Used for autodoc
export type BlueprintRenderers = BlueprintKit[keyof BlueprintKit];
