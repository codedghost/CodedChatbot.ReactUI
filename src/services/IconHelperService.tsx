import { IconColour, IconSize, IconType } from "../types/IconTypes";

export function ResolveIconType(type: IconType): string {
    switch (type) {
        case "Edit":
            return "bi bi-pencil-fill";
        case "NotInDrive":
            return "bi bi-cloud-plus-fill";
        case "InDrive":
            return "bi bi-cloud-check-fill";
        case "Remove":
            return "bi bi-trash-fill";
        case "Promote":
            return "bi bi-capslock-fill";
        case "LeftChat":
            return "bi bi-door-open-fill";
        case "ChatDots":
            return "bi bi-chat-dots-fill";
        case "Tick":
            return "bi bi-check-circle-fill";
        default:
            return "";
    }
}

export function ResolveIconColour(colour: IconColour): string {
    switch (colour) {
        case "Green":
            return "green";
        case "Red":
            return "#df2525";
        case "Yellow":
            return "yellow";
        case "White":
            return "white";
        default:
            return "";
    }
}

export function ResolveIconSize(size: IconSize): string {
    switch (size) {
        case "Small":
            return "1rem";
        case "Medium":
            return "1.5rem";
        case "Large":
            return "2rem";
        default:
            return "";
    }
}
