function ActionIcon(props: ActionIconProps) {
    var styling = {
        color: props.Colour,
        fontSize: props.Size
    };

    return (
        <i className={props.Icon} style={styling} aria-label={props.AltText} />
    );
}

ActionIcon.defaultProps = {
    Icon: "",
    Colour: "",
    Size: "",
    AltText: ""
} as ActionIconProps

export interface ActionIconProps {
    Icon: string,
    Colour: string,
    Size: string,
    AltText: string
}

export default ActionIcon;