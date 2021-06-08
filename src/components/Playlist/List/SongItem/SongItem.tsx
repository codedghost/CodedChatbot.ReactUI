import { SongRequest } from '../../../../services/PlaylistService/PlaylistServiceInterfaces';

import { Equals } from '../../../../services/StringComparisonService/StringComparisonService';

import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300
  };

function SongItem(props: SongItemProps) {
    var isUsersRequest = Equals(props.songRequest?.requester, props.username);

    return (props?.songRequest?.songId ?? 0) > 0 ?
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
                            <p>IsEditable: {(props.isCurrent ? props.isModerator : isUsersRequest || props.isModerator) ? "true" : "false"}</p>
                            <p>IsRemovable: {(props.isCurrent ? props.isModerator : isUsersRequest || props.isModerator) ? "true" : "false"}</p>
                            <p>CanMarkInDrive: {props.isModerator ? "true" : "false"}</p>
                            <p>IsPromotable: {(!props.isCurrent && props.isRegular && (props.isModerator || (isUsersRequest && props.vips > 0))) ? "true" : "false"}</p>
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
        requester: ""
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