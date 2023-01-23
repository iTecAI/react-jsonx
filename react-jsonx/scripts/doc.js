import * as TJS from "typescript-json-schema";
import { writeFile } from "fs";
import { resolve } from "path";

const tsconfig = "./tsconfig.json";

const configs = [
    {
        path: "./src/kits/core/types.ts",
        output: "./schema/CoreKit.schema.json",
        type: "CoreKitRenderers"
    },
    {
        path: "./src/kits/blueprintjs/types.ts",
        output: "./schema/BlueprintKit.schema.json",
        type: "BlueprintRenderers"
    }
];

const program = TJS.getProgramFromFiles(configs.map((c) => resolve(c.path)));
const generator = TJS.buildGenerator(program);

for (const c of configs) {
    const schema = TJS.generateSchema(program, c.type, {}, [], generator);
    const schemaString = JSON.stringify(schema, null, 4);
    writeFile(c.output, schemaString, { encoding: "utf8" }, (err) => {
        if (err) throw err;
    });
}
