import "./ActionIcon.scss";

function ActionIcon(props: ActionIconProps) {
    var styling = {
        color: props.Colour,
        fontSize: props.Size
    };

    return <i className={props.Icon} style={styling} aria-label={props.AltText} onClick={props.onClick} />;
}

ActionIcon.defaultProps = {
    Icon: "",
    Colour: "",
    Size: "",
    AltText: "",
    onClick: () => {}
} as ActionIconProps;

export interface ActionIconProps {
    Icon: string;
    Colour: string;
    Size: string;
    AltText: string;
    onClick: () => void;
}

export default ActionIcon;
