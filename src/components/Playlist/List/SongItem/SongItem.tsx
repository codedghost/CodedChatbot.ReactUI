import { SongRequest } from '../../../../services/PlaylistService/PlaylistServiceInterfaces';

import { Equals } from '../../../../services/StringComparisonService/StringComparisonService';

import ActionIcon from './ActionIcon';

import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

import EditIcon from '../../../../pngs/PlaylistEdit.png';
import RemoveIcon from '../../../../pngs/axe-18.png';
import InDriveIcon from '../../../../pngs/RequestInDrive.png';
import AddToDriveIcon from '../../../../pngs/RequestSetInDrive.png';
import PromoteIcon from '../../../../pngs/up-arrow.png';

const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300
  };

function SongItem(props: SongItemProps) {
    if (props.songRequest === undefined) {
        return (<></>);
    }
    var isUsersRequest = Equals(props.songRequest?.requester, props.username);

    var editButton = (props.isCurrent ? props.isModerator : isUsersRequest || props.isModerator) ? (
        <ActionIcon Icon={EditIcon} AltText={`Edit ${props.songRequest.songTitle}`} />
    ) : (<></>);

    var deleteButton = (props.isCurrent ? props.isModerator : isUsersRequest || props.isModerator) ? (
        <ActionIcon Icon={RemoveIcon} AltText={`Remove ${props.songRequest.songTitle}`} />
    ) : (<></>);

    var markInDriveButton = props.songRequest.isInDrive ? 
        (<ActionIcon Icon={InDriveIcon} AltText={`${props.songRequest.songTitle} is already "in the drive"`} />) :
        props.isModerator ? 
            (<ActionIcon Icon={AddToDriveIcon} AltText={`Mark ${props.songRequest.songTitle} as "in the drive"`} />) : 
            (<></>);

    var promotableButton = (!props.isCurrent && props.isRegular && (props.isModerator || (isUsersRequest && props.vips > 0))) ?
        (<ActionIcon Icon={PromoteIcon} AltText={`Promote ${props.songRequest.songTitle} to VIP queue`} />) :
        (<></>)

    return props.songRequest.songId > 0 ?
        (
            <motion.div 
                key={props.songRequest.songId} 
                layout 
                transition={spring}
                layoutId={props.songRequest.songId.toString()}
                className="animated-song-item"
                >
                <div className="col-12 song-container">
                    <Card
                        body
                        bg="secondary"
                        text="light"
                        >
                        <div className="song-request">
                            <span className="song-line-item"><b>Song: </b><p>{props.songRequest.songTitle}</p></span>
                            <span className="song-line-item"><b>Artist: </b><p>{props.songRequest.songArtist}</p></span>
                            <span className="song-line-item"><b>Instrument: </b><p>{props.songRequest.instrument}</p></span>
                            <span className="song-line-item"><b>Requested By: </b><p>{props.songRequest.requester}</p></span>
                        </div>
                        <span className="song-actions">
                            {editButton}
                            {deleteButton}
                            {markInDriveButton}
                            {promotableButton}
                        </span>
                    </Card>
                </div>
            </motion.div>)
        : (<></>)
}

SongItem.defaultProps = {
    songRequest: {
        songId: 0,
        songTitle: "",
        songArtist: "",
        instrument: "",
        requester: "",
        isInDrive: false
    } as SongRequest,
    isModerator: false,
    username: "",
    vips: 0,
    isCurrent: false,
    isRegular: false
} as SongItemProps

export interface SongItemProps {
    songRequest: SongRequest,
    username: string,
    isModerator: boolean,
    vips: number,
    isCurrent: boolean,
    isRegular: boolean
}

export default SongItem;