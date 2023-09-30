import {
    ResolveIconColour,
    ResolveIconSize,
    ResolveIconType,
} from "../../services/IconHelperService";
import { IconColour, IconSize, IconType } from "../../types/IconTypes";
import "./ActionIcon.scss";

function ActionIcon(props: ActionIconProps) {
    var iconClass = ResolveIconType(props.Icon);

    var styling = {
        color: ResolveIconColour(props.Colour),
        fontSize: ResolveIconSize(props.Size),
    };

    return (
        <i
            className={iconClass}
            style={styling}
            aria-label={props.AltText}
            title={props.AltText}
            onClick={props.onClick}
        />
    );
}

ActionIcon.defaultProps = {
    Icon: null,
    Colour: null,
    Size: null,
    AltText: "",
    onClick: () => {},
} as ActionIconProps;

export interface ActionIconProps {
    Icon: IconType;
    Colour: IconColour;
    Size: IconSize;
    AltText: string;
    onClick: () => void;
}

export default ActionIcon;
