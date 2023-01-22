import { ChildType } from "../../types";
import React from "react";

function renderGroup(props: { children: React.ReactNode }) {
    return <div className="jsonx core group">{props.children}</div>;
}

function renderRawText(props: { text: any }) {
    return <span className="jsonx core rawText">{props.text}</span>;
}

export const CoreKitRenderer = {
    group: renderGroup,
    rawText: renderRawText
};
