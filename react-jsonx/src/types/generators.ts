import { GeneratorKitItem } from "./kits";
import { ValueRoot } from "./valueItems";
import { ChildType } from ".";

export interface IteratorGenerator extends GeneratorKitItem {
    subtype: "iterator";
    iterator: ValueRoot;
    renderer: ChildType;
}

export type GeneratorItems = IteratorGenerator;
