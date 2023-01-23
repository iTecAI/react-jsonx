import React, { useState } from "react";
import { ReactJSONX, BlueprintKit, BlueprintKitRenderer } from "react-jsonx";
import * as blt1 from "./tests/blueprint.blue-jsonx.json";
import * as MdIcons from "react-icons/md";

function App() {
    const [data, setData] = useState<{ data: string }>({
        data: "I Am Test Data",
    });
    return (
        <div className="App bp4-dark">
            <ReactJSONX<BlueprintKit>
                spec={blt1}
                data={data}
                onChange={(_data) => {
                    console.log(_data);
                    setData(_data);
                }}
                renderers={BlueprintKitRenderer}
                iconMap={MdIcons}
            />
        </div>
    );
}

export default App;
