import React from "react";
import { ReactJSONX } from "react-jsonx";

function App() {
    return (
        <div className="App">
            <ReactJSONX
                spec={{ type: "renderer", subtype: "group", children: [] }}
            />
        </div>
    );
}

export default App;
