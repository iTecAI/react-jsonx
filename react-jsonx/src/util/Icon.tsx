import { useContext } from "react";
import { IconContext } from "../types/contexts";
import React from "react";

export function Icon(props: {
    name: string;
    className?: string;
    size?: number;
    [key: string]: any;
}): JSX.Element {
    const icons = useContext(IconContext);
    if (Object.keys(icons).includes(props.name)) {
        const IconElement = icons[props.name];
        return <IconElement {...props} />;
    } else {
        console.warn(`Unknown icon: ${props.name}`);
        return <span>ERROR: Icon {props.name} not found.</span>;
    }
}
