import React from "react";

function renderGroup(props: { children: React.ReactNode }) {
    return <div className="jsonx core group">{props.children}</div>;
}

function renderRawText(props: { text: any }) {
    return <span className="jsonx core rawText">{props.text}</span>;
}

function renderRawInput(props: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) {
    return (
        <input
            placeholder={props.placeholder ?? undefined}
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
        />
    );
}

export const CoreKitRenderer = {
    group: renderGroup,
    rawText: renderRawText,
    rawInput: renderRawInput
};
