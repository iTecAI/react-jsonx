import React, { useState } from "react";
import { ReactJSONX } from "react-jsonx";
import * as MdIcons from "react-icons/md";

function App() {
    const [data, setData] = useState<{ data: string }>({
        data: "I Am Test Data",
    });
    return <div className="App"></div>;
}

export default App;
