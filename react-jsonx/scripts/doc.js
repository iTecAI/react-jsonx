import * as TJS from "typescript-json-schema";
import { writeFile } from "fs";
import { resolve } from "path";

const configs = [
    {
        path: "./src/kits/core/types.ts",
        output: "./schema/CoreKit.schema.json",
        type: "CoreKitRenderers"
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
