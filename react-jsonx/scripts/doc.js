import { createGenerator } from "ts-json-schema-generator";
import { writeFile } from "fs";

const tsconfig = "./tsconfig.json";

const configs = [
    {
        path: "./src/kits/core/core.ts",
        output: "./schema/CoreKit.schema.json",
        type: "CoreKitRenderers" // Or <type-name> if you want to generate schema for that one type only
    }
];

for (const c of configs) {
    const schema = createGenerator({
        path: c.path,
        tsconfig,
        type: c.type
    }).createSchema(c.type);
    const schemaString = JSON.stringify(schema, null, 4);
    writeFile(c.output, schemaString, { encoding: "utf8" }, (err) => {
        if (err) throw err;
    });
}
