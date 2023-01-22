import { ValueRoot } from "./valueItems";

export type FunctionType = {
    code: string;
    opts: { [key: string]: ValueRoot };
};
