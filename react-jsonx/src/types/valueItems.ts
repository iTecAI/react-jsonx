import { isArray, isString } from "lodash";
import { FunctionType } from "./function";

export type ValueKitItemDirective = "data";
export const ValueKitItemDirectiveList = ["data"];
export type ValueKitType = ValueKitItemDirective | "text" | "function";
export type Literal = string | number | boolean | Literal[] | null;
export type ValueRoot = Literal | ValueKitItem;

export interface DataValueItem {
    type: "value";
    subtype: "data";
    path: ValueKitItem;
    default?: ValueRoot;
}

export interface TextValueItem {
    type: "value";
    subtype: "text";
    text: ValueRoot;
    substitutions: { [key: string]: ValueRoot };
}

export interface FunctionValueItem {
    type: "value";
    subtype: "function";
    function: FunctionType;
}

export type ValueKitItem =
    | DataValueItem
    | TextValueItem
    | FunctionValueItem
    | `${ValueKitItemDirective}:${string}`
    | ValueRoot[];

export function isValueKitItem(obj: any): obj is ValueKitItem {
    if (isArray(obj)) {
        return true;
    }

    if (obj.type === "value") {
        return true;
    }

    if (isString(obj)) {
        if (
            ValueKitItemDirectiveList.includes(
                (obj.split("$")[1] ?? "").split(":")[0]
            )
        ) {
            return true;
        }
    }

    return false;
}
