import React from "react";
import "./styles.scss";
import { isNumber } from "lodash";

function RenderGroup(props: { children: React.ReactNode | React.ReactNode[] }) {
    return <div className="jsonx blueprint group">{props.children}</div>;
}

function RenderText(props: {
    text: string;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "default" | "code";
    style?: ("monospace" | "muted" | "disabled" | "overflow-ellipsis")[];
    size?: number | "small" | "large";
}) {
    const classes = (props.style ?? []).map((s) => {
        console.log(s);
        return s === "monospace" ? "bp4-monospace-text" : `bp4-text-${s}`;
    });
    if (props.size === "large" || props.size === "small") {
        classes.push(`bp4-text-${props.size}`);
    }
    classes.push("jsonx blueprint text");
    const style = isNumber(props.size)
        ? { fontSize: `${props.size}px` }
        : undefined;

    switch (props.variant ?? "default") {
        case "code":
            return (
                <pre className={classes.join(" ")} style={style}>
                    {props.text}
                </pre>
            );
        case "h1":
            return (
                <h1 className={classes.join(" ")} style={style}>
                    {props.text}
                </h1>
            );
        case "h2":
            return (
                <h2 className={classes.join(" ")} style={style}>
                    {props.text}
                </h2>
            );
        case "h3":
            return (
                <h3 className={classes.join(" ")} style={style}>
                    {props.text}
                </h3>
            );
        case "h4":
            return (
                <h4 className={classes.join(" ")} style={style}>
                    {props.text}
                </h4>
            );
        case "h5":
            return (
                <h5 className={classes.join(" ")} style={style}>
                    {props.text}
                </h5>
            );
        case "h6":
            return (
                <h6 className={classes.join(" ")} style={style}>
                    {props.text}
                </h6>
            );
        default:
            return (
                <div className={classes.join(" ")} style={style}>
                    {props.text}
                </div>
            );
    }
}

export const BlueprintKitRenderer = {
    group: RenderGroup,
    text: RenderText
};
