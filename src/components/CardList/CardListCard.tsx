import { ActionIconProps } from "../ActionIcon/ActionIcon";

export default interface CardListCard {
    key: any;
    headerContent: JSX.Element;
    mainContent: JSX.Element;
    actionIcons: ActionIconProps[];
}
