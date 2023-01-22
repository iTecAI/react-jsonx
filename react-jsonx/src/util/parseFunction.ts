import { FunctionType } from "../types";
import { resolve } from "./hooks";

export function parseFunction(func: FunctionType): (data: any) => any {
    const executor = Function("opts", `return (${func.code})(opts)`);
    return (data: any) => {
        const [resolvedArgs] = resolve(func.opts, data, null);
        return executor(resolvedArgs);
    };
}
