import {Image} from "react-bootstrap";

function ActionIcon(props: ActionIconProps) {
    return (
        <Image
            src={props.Icon}
            height="18"
            width="18"
            alt={props.AltText} />
    );
}

ActionIcon.defaultProps = {
    Icon: "",
    AltText: ""
} as ActionIconProps

export interface ActionIconProps {
    Icon: string,
    AltText: string
}

export default ActionIcon;