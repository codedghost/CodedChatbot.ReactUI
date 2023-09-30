import { SongRequest } from "../../../../services/PlaylistService/PlaylistServiceInterfaces";

import { Equals } from "../../../../services/StringComparisonService/StringComparisonService";
import { RequestOptions } from "../../../Modals/RequestOptions";

import ActionIcon from "../../../ActionIcon/ActionIcon";

import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300,
};

function SongItem(props: SongItemProps) {
    if (props.songRequest === undefined || props.songRequest === null) {
        return <></>;
    }

    var isUsersRequest = Equals(
        props.songRequest?.requester,
        props.username
    ) as boolean;

    var composeEditRequestOptions = function () {
        props.onEdit({
            songRequestId: props.songRequest.songId,
            songName: props.songRequest.songTitle,
            artistName: props.songRequest.songArtist,
            instrument: props.songRequest.instrument,
            useVipToken: false,
            useSuperVipToken: false,
            isCurrent: props.isCurrent,
            errorMessage: "",
        } as RequestOptions);
    };

    var composeRemoveRequestOptions = function () {
        props.onRemove({
            songRequestId: props.songRequest.songId,
            songName: props.songRequest.songTitle,
            artistName: props.songRequest.songArtist,
            instrument: props.songRequest.instrument,
            useVipToken: props.songRequest.isVip,
            useSuperVipToken: props.songRequest.isSuperVip,
            isCurrent: props.isCurrent,
            errorMessage: "",
        } as RequestOptions);
    };

    var composeMarkInDriveRequestOptions = function () {
        props.onMarkInDrive({
            songRequestId: props.songRequest.songId,
            songName: props.songRequest.songTitle,
            artistName: props.songRequest.songArtist,
            instrument: props.songRequest.instrument,
            useVipToken: props.songRequest.isVip,
            useSuperVipToken: props.songRequest.isSuperVip,
            isCurrent: props.isCurrent,
            errorMessage: "",
        } as RequestOptions);
    };

    var composePromoteRequestOptions = function () {
        props.onPromote({
            songRequestId: props.songRequest.songId,
            songName: props.songRequest.songTitle,
            artistName: props.songRequest.songArtist,
            instrument: props.songRequest.instrument,
            useVipToken: props.songRequest.isVip,
            useSuperVipToken: props.songRequest.isSuperVip,
            isCurrent: props.isCurrent,
            errorMessage: "",
        } as RequestOptions);
    };

    console.log(
        `isUsers: ${isUsersRequest}, songRequester: ${props.songRequest?.requester}, loggedInUser: ${props.username}`
    );
    var editButton = (
        props.isCurrent
            ? props.isModerator
            : isUsersRequest || props.isModerator
    ) ? (
        <ActionIcon
            Icon={"Edit"}
            Colour={"Yellow"}
            Size={"Medium"}
            AltText={`Edit ${props.songRequest.songTitle}`}
            onClick={composeEditRequestOptions}
        />
    ) : (
        <></>
    );

    var deleteButton = (
        props.isCurrent
            ? props.isModerator
            : isUsersRequest || props.isModerator
    ) ? (
        <ActionIcon
            Icon={"Remove"}
            Colour={"Red"}
            Size={"Medium"}
            AltText={`Remove ${props.songRequest.songTitle}`}
            onClick={composeRemoveRequestOptions}
        />
    ) : (
        <></>
    );

    var markInDriveButton = props.isModerator ? (
        props.songRequest.isInDrive ? (
            <ActionIcon
                Icon={"InDrive"}
                Colour={"Green"}
                Size={"Medium"}
                AltText={`${props.songRequest.songTitle} is already "in the drive"`}
            />
        ) : (
            <ActionIcon
                Icon={"NotInDrive"}
                Colour={"Red"}
                Size={"Medium"}
                AltText={`Mark ${props.songRequest.songTitle} as "in the drive"`}
                onClick={composeMarkInDriveRequestOptions}
            />
        )
    ) : (
        <></>
    );

    var promotableButton =
        !props.isCurrent &&
        (props.isRegular || props.isVip) &&
        (props.isModerator ||
            (isUsersRequest && props.isRegular && props.vips > 0) ||
            (isUsersRequest && props.isVip && props.vips > 50)) ? (
            <ActionIcon
                Icon={"Promote"}
                Colour={"Yellow"}
                Size={"Medium"}
                AltText={`Promote ${props.songRequest.songTitle} to VIP queue`}
                onClick={composePromoteRequestOptions}
            />
        ) : (
            <></>
        );

    var userNotInChat = props.songRequest.isInChat ? (
        <></>
    ) : (
        <ActionIcon
            Icon={"LeftChat"}
            Colour={"Red"}
            Size={"Medium"}
            AltText={`User ${props.songRequest.requester} has left chat`}
        />
    );

    return props.songRequest.songId > 0 ? (
        <motion.div
            key={props.songRequest.songId}
            layout
            transition={spring}
            layoutId={props.songRequest.songId.toString()}
            className="animated-song-item"
        >
            <div className="col-12 song-container">
                <Card body bg="secondary" text="light">
                    <div className="d-flex justify-content-between">
                        <div>
                            <span className="song-line-item">
                                <b>Song: </b>
                                <p>{props.songRequest.songTitle}</p>
                            </span>
                            <span className="song-line-item">
                                <b>Artist: </b>
                                <p>{props.songRequest.songArtist}</p>
                            </span>
                            <span className="song-line-item">
                                <b>Instrument: </b>
                                <p>{props.songRequest.instrument}</p>
                            </span>
                            <span className="song-line-item">
                                <b>Requested By: </b>
                                <p>{props.songRequest.requester}</p>
                            </span>
                        </div>
                        <span className="d-flex flex-column">
                            {editButton}
                            {deleteButton}
                            {markInDriveButton}
                            {promotableButton}
                            {userNotInChat}
                        </span>
                    </div>
                </Card>
            </div>
        </motion.div>
    ) : (
        <></>
    );
}

SongItem.defaultProps = {
    songRequest: {
        songId: 0,
        songTitle: "",
        songArtist: "",
        instrument: "",
        requester: "",
        isInDrive: false,
        isInChat: false,
    } as SongRequest,
    isModerator: false,
    username: "",
    vips: 0,
    isCurrent: false,
    isRegular: false,
    onEdit: (request) => {},
    onRemove: (request) => {},
    onMarkInDrive: (request) => {},
    onPromote: (request) => {},
} as SongItemProps;

export interface SongItemProps {
    songRequest: SongRequest;
    username: string;
    isModerator: boolean;
    vips: number;
    isCurrent: boolean;
    isRegular: boolean;
    isVip: boolean;
    onEdit: (request: RequestOptions) => void;
    onRemove: (request: RequestOptions) => void;
    onMarkInDrive: (request: RequestOptions) => void;
    onPromote: (request: RequestOptions) => void;
}

export default SongItem;
