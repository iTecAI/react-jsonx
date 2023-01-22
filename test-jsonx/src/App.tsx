import React, { useState } from "react";
import { ReactJSONX } from "react-jsonx";

import * as test1 from "./tests/basic-render.jsonx.json";
import * as test2 from "./tests/input-render.jsonx.json";

function App() {
    const [data, setData] = useState<{ input: string }>({ input: "" });
    return (
        <div className="App">
            <ReactJSONX
                spec={test2}
                data={data}
                onChange={(_data) => {
                    console.log(_data);
                    setData(_data);
                }}
            />
        </div>
    );
}

export default App;
