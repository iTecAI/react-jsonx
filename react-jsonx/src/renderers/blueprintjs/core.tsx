import { ChildType } from "../../types";
import React from "react";

function renderGroup(props: { children: React.ReactNode }) {
    return <div className="jsonx group">{props.children}</div>;
}

export const CoreKitRenderer = {
    group: renderGroup
};
