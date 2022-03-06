import { Alert, Row } from "react-bootstrap";
import UserPlaylistInfo from "../../../models/UserPlaylistInfo";
import { IsNullOrWhiteSpace } from "../../../services/StringHelperService";
import {
    SubmitAddRequest,
    SubmitChangePlaylistStateRequest,
    SubmitEmptyPlaylist
} from "../../../services/PlaylistService/PlaylistService";
import { useEffect, useState } from "react";

import { RequestModal } from "../../Modals/RequestModal";
import { RequestOptions, _defaultRequestOptions } from "../../../components/Modals/RequestOptions";
import { ChangePlaylistStateModal } from "../../Modals/ChangePlaylistStateModal";
import { SendEmptyPlaylistModal } from "../../Modals/SendEmptyPlaylistModal";

import PlaylistHeaderProps from "./PlaylistHeaderProps";
import { Button } from "react-bootstrap";
import { Equals } from "../../../services/StringComparisonService/StringComparisonService";

function PlaylistHeader(props: PlaylistHeaderProps) {
    const [totalVips, updateTotalVips] = useState<number>(0);
    const [totalBytes, updateTotalBytes] = useState<string>("0");

    const [showAddRequestModal, setShowAddRequestModal] = useState<boolean>(false);
    const [requestOptions, setRequestOptions] = useState<RequestOptions>(_defaultRequestOptions);

    const [showChangePlaylistStateModal, setShowChangePlaylistStateModal] = useState<boolean>(false);
    const [changePlaylistStateModalErrorMessage, setChangePlaylistStateErrorMessage] = useState<string>("");

    const [showEmptyPlaylistModal, setShowEmptyPlaylistModal] = useState<boolean>(false);
    const [sendEmptyPlaylistModalErrorMessage, setSendEmptyPlaylistModalErrorMessage] = useState<string>("");

    useEffect(() => {
        if (props.hubConnection !== undefined) {
            props.hubConnection.on("UpdateVips", (vipTotal) => {
                updateTotalVips(vipTotal);
            });
            props.hubConnection.on("UpdateBytes", (byteTotal) => {
                updateTotalBytes(byteTotal);
            });
        }
    }, [props.hubConnection]);

    useEffect(() => {
        updateTotalVips(props.UserPlaylistInfo.vips);
    }, [props.UserPlaylistInfo.vips]);

    useEffect(() => {
        updateTotalBytes(props.UserPlaylistInfo.bytes);
    }, [props.UserPlaylistInfo.bytes]);

    var closeAndResetModal = function () {
        setRequestOptions(_defaultRequestOptions);
        setShowAddRequestModal(false);
    };

    var closeChangePlaylistStateModal = function () {
        setShowChangePlaylistStateModal(false);
        setChangePlaylistStateErrorMessage("");
    };

    var closeSendEmptyPlaylistModal = function () {
        setShowEmptyPlaylistModal(false);
        setSendEmptyPlaylistModalErrorMessage("");
    };

    const loggedOutContent = (
        <div>
            <Alert.Link href={props.LoginUrl}>Login</Alert.Link> with Twitch to access playlist features!
        </div>
    );

    const moderatorButtons = props.isModerator ? (
        <>
            <div className="d-flex gap-1">
                <div>
                    <Button
                        variant="success"
                        onClick={() => {
                            setShowChangePlaylistStateModal(true);
                        }}
                    >
                        Change Playlist State
                    </Button>
                </div>
                <div>
                    <Button
                        variant="success"
                        onClick={() => {
                            setShowEmptyPlaylistModal(true);
                        }}
                    >
                        Empty Playlist
                    </Button>
                </div>
            </div>
        </>
    ) : (
        <></>
    );

    const loggedInContent = (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    Welcome {props.username}! {props.isModerator ? "You are a moderator, gg!" : ""} You have {totalVips}{" "}
                    VIP tokens and {totalBytes} Bytes!
                </div>
                <div>
                    <Button
                        variant="success"
                        onClick={() => {
                            setShowAddRequestModal(true);
                        }}
                    >
                        Request a song
                    </Button>
                </div>
            </div>
            {moderatorButtons}
        </>
    );

    const handleSendRequest = function () {
        console.log(requestOptions);
        SubmitAddRequest(requestOptions).then((result) => {
            console.log(result);
            console.log(Equals(result, "success"));
            if (Equals(result, "success")) {
                closeAndResetModal();
            } else {
                console.log("hit else block");
                setRequestOptions({
                    ...requestOptions,
                    errorMessage: result
                } as RequestOptions);
            }
        });
    };

    const handleSendChangePlaylistState = function (state: string) {
        SubmitChangePlaylistStateRequest(state).then((result: string) => {
            console.log(result);

            if (Equals(result, "success")) {
                closeChangePlaylistStateModal();
            } else {
                setChangePlaylistStateErrorMessage(result);
            }
        });

        console.log(`Will send change playlist state with ${state}`);
        closeChangePlaylistStateModal();
    };

    const handleSendEmptyPlaylist = function () {
        SubmitEmptyPlaylist().then((result: string) => {
            console.log(result);

            if (Equals(result, "success")) {
                closeSendEmptyPlaylistModal();
            } else {
                setSendEmptyPlaylistModalErrorMessage(result);
            }
        });
    };

    return (
        <>
            <RequestModal
                show={showAddRequestModal}
                changeShow={closeAndResetModal}
                isAddRequest={true}
                requestOptions={requestOptions}
                updateRequestOptions={setRequestOptions}
                sendRequest={handleSendRequest}
            />
            <ChangePlaylistStateModal
                show={showChangePlaylistStateModal}
                changeShow={closeChangePlaylistStateModal}
                updatePlaylistState={handleSendChangePlaylistState}
                currentState={props.UserPlaylistInfo.playlistState}
                errorMessage={changePlaylistStateModalErrorMessage}
            />
            <SendEmptyPlaylistModal
                show={showEmptyPlaylistModal}
                changeShow={closeSendEmptyPlaylistModal}
                sendEmpty={handleSendEmptyPlaylist}
                errorMessage={sendEmptyPlaylistModalErrorMessage}
            />

            <Alert key="playlist-header" variant="dark">
                {IsNullOrWhiteSpace(props?.username) === true ? loggedOutContent : loggedInContent}
            </Alert>
        </>
    );
}

PlaylistHeader.defaultProps = {
    username: "",
    LoginUrl: "#",
    UserPlaylistInfo: {
        vips: 0,
        bytes: "0"
    } as UserPlaylistInfo
} as PlaylistHeaderProps;

export default PlaylistHeader;
