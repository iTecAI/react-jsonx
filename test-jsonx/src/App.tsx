import React from "react";
import { ReactJSONX } from "react-jsonx";

import * as test1 from "./tests/basic-render.jsonx.json";

function App() {
    return (
        <div className="App">
            <ReactJSONX spec={test1} />
        </div>
    );
}

export default App;
