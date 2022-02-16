import { useEffect, useState } from "react";
import ListProps from "./ListProps";
import { AnimateSharedLayout } from "framer-motion";
import { PlaylistState } from "../../../services/PlaylistService/PlaylistServiceInterfaces";
import { GetPlaylist } from "../../../services/PlaylistService/PlaylistService";
import SongItem from "./SongItem/SongItem";
import PlaylistHeader from "./PlaylistHeader/PlaylistHeader";
import { RequestModal } from "../../../components/Modals/RequestModal";
import { RemoveRequestModal } from "../../Modals/RemoveRequestModal";
import { MarkInDriveModal } from "../../Modals/MarkInDriveModal";
import { PromoteRequestModal } from "../../Modals/PromoteRequestModal";
import { RequestOptions, _defaultRequestOptions } from "../../../components/Modals/RequestOptions";

import { IsNullOrWhiteSpace } from "../../../services/StringHelperService";

import "./List.scss";
import UserPlaylistInfo from "../../../models/UserPlaylistInfo";
import {
    SubmitEditRequest,
    SubmitMarkInDriveRequest,
    SubmitRemoveRequest,
    SubmitPromoteRequest
} from "../../../services/PlaylistService/PlaylistService";
import { Equals } from "../../../services/StringComparisonService/StringComparisonService";

function List(props: ListProps) {
    const [playlist, updatePlaylist] = useState<PlaylistState>({} as PlaylistState);
    const [playlistState, setPlaylistState] = useState<string>("Closed");

    const [showEditRequestModal, setShowEditRequestModal] = useState(false);
    const [editRequestOptions, setEditRequestOptions] = useState<RequestOptions>(_defaultRequestOptions);

    const [showRemoveRequestModal, setShowRemoveRequestModal] = useState(false);
    const [removeRequestOptions, setRemoveRequestOptions] = useState<RequestOptions>(_defaultRequestOptions);

    const [showMarkInDriveModal, setShowMarkInDriveModal] = useState(false);
    const [markInDriveRequestOptions, setMarkInDriveRequestOptions] = useState<RequestOptions>(_defaultRequestOptions);

    const [showPromoteRequestModal, setShowPromoteRequestModal] = useState(false);
    const [promoteRequestOptions, setPromoteRequestOptions] = useState<RequestOptions>(_defaultRequestOptions);

    useEffect(() => {
        // Get initial Playlist State
        GetPlaylist().then((data) => {
            updatePlaylist({ ...data } as PlaylistState);
        });
    }, []);

    useEffect(() => {
        if (props.hubConnection !== undefined) {
            props.hubConnection.on("UpdateClients", (currentSong, regularQueue, vipQueue) => {
                var playlistState = {
                    currentSong: currentSong,
                    regularQueue: regularQueue,
                    vipQueue: vipQueue
                } as PlaylistState;

                updatePlaylist(playlistState);
            });

            props.hubConnection.on("PlaylistState", (newState) => {
                console.log(newState);
                var castNewState = newState as string;
                setPlaylistState(castNewState);
                props.UserPlaylistInfo.playlistState = newState as string;
            });

            props.hubConnection.on("Heartbeat", () => {
                console.log("conn alive");
            });
        }
    }, [props.hubConnection]);

    useEffect(() => {
        setPlaylistState(props.UserPlaylistInfo.playlistState);
    }, [props.UserPlaylistInfo.playlistState]);

    const closeAndResetEditModal = function () {
        setEditRequestOptions(_defaultRequestOptions);
        setShowEditRequestModal(false);
    };

    const handleSendEditRequest = function () {
        SubmitEditRequest(editRequestOptions).then((result) => {
            console.log(result);
            console.log(Equals(result, "success"));
            if (Equals(result, "success")) {
                closeAndResetEditModal();
            } else {
                console.log("hit else block");
                setEditRequestOptions({
                    ...editRequestOptions,
                    errorMessage: result
                } as RequestOptions);
            }
        });
    };

    const onEditClick = function (request: RequestOptions) {
        setEditRequestOptions(request);
        setShowEditRequestModal(true);
    };

    const closeAndResetRemoveModal = function () {
        setRemoveRequestOptions(_defaultRequestOptions);
        setShowRemoveRequestModal(false);
    };

    const handleSendRemoveRequest = function () {
        SubmitRemoveRequest(removeRequestOptions).then((result) => {
            console.log(result);
            if (Equals(result, "success")) {
                closeAndResetRemoveModal();
            } else {
                setRemoveRequestOptions({
                    ...removeRequestOptions,
                    errorMessage: result
                } as RequestOptions);
            }
        });
    };

    const onRemoveClick = function (request: RequestOptions) {
        setRemoveRequestOptions(request);
        setShowRemoveRequestModal(true);
    };

    const closeAndResetMarkInDriveModal = function () {
        setMarkInDriveRequestOptions(_defaultRequestOptions);
        setShowMarkInDriveModal(false);
    };

    const handleSendMarkInDriveRequest = function () {
        SubmitMarkInDriveRequest(markInDriveRequestOptions).then((result) => {
            console.log(result);
            if (Equals(result, "success")) {
                closeAndResetMarkInDriveModal();
            } else {
                setMarkInDriveRequestOptions({
                    ...markInDriveRequestOptions,
                    errorMessage: result
                } as RequestOptions);
            }
        });
    };

    const onMarkInDriveClick = function (request: RequestOptions) {
        setMarkInDriveRequestOptions(request);
        setShowMarkInDriveModal(true);
    };

    const closeAndResetPromoteRequestModal = function () {
        setPromoteRequestOptions(_defaultRequestOptions);
        setShowPromoteRequestModal(false);
    };

    const handleSendPromoteRequestModal = function () {
        SubmitPromoteRequest(promoteRequestOptions).then((result) => {
            console.log(result);
            if (Equals(result, "success")) {
                closeAndResetPromoteRequestModal();
            } else {
                setPromoteRequestOptions({
                    ...promoteRequestOptions,
                    errorMessage: result
                } as RequestOptions);
            }
        });
    };

    const onPromoteRequestClick = function (request: RequestOptions) {
        setPromoteRequestOptions(request);
        setShowPromoteRequestModal(true);
    };

    var vipRequestRender =
        playlist.vipQueue !== undefined
            ? playlist.vipQueue.map((r) => (
                  <SongItem
                      songRequest={r}
                      {...props}
                      isCurrent={false}
                      isRegular={false}
                      isVip={true}
                      onEdit={onEditClick}
                      onRemove={onRemoveClick}
                      onMarkInDrive={onMarkInDriveClick}
                      onPromote={onPromoteRequestClick}
                  />
              ))
            : [];

    var regularRequestRender =
        playlist.regularQueue !== undefined
            ? playlist.regularQueue.map((r) => (
                  <SongItem
                      songRequest={r}
                      {...props}
                      isCurrent={false}
                      isRegular={true}
                      isVip={false}
                      onEdit={onEditClick}
                      onRemove={onRemoveClick}
                      onMarkInDrive={onMarkInDriveClick}
                      onPromote={onPromoteRequestClick}
                  />
              ))
            : [];

    return (
        <div>
            <div id="modal-container">
                <RequestModal
                    show={showEditRequestModal}
                    changeShow={closeAndResetEditModal}
                    requestOptions={editRequestOptions}
                    updateRequestOptions={setEditRequestOptions}
                    isAddRequest={false}
                    sendRequest={handleSendEditRequest}
                />
                <RemoveRequestModal
                    show={showRemoveRequestModal}
                    changeShow={closeAndResetRemoveModal}
                    requestOptions={removeRequestOptions}
                    sendRequest={handleSendRemoveRequest}
                />
                <MarkInDriveModal
                    show={showMarkInDriveModal}
                    changeShow={closeAndResetMarkInDriveModal}
                    requestOptions={markInDriveRequestOptions}
                    sendRequest={handleSendMarkInDriveRequest}
                />
                <PromoteRequestModal
                    show={showPromoteRequestModal}
                    changeShow={closeAndResetPromoteRequestModal}
                    requestOptions={promoteRequestOptions}
                    updateRequestOptions={setPromoteRequestOptions}
                    sendRequest={handleSendPromoteRequestModal}
                />
            </div>
            <AnimateSharedLayout>
                <div className="current">
                    <PlaylistHeader
                        HeaderText={`Current Song (Playlist is ${(IsNullOrWhiteSpace(playlistState)
                            ? ""
                            : playlistState
                        ).toUpperCase()})`}
                    />
                    <div className="song-container">
                        <SongItem
                            songRequest={playlist.currentSong}
                            {...props}
                            isCurrent={true}
                            isRegular={false}
                            isVip={false}
                            onEdit={onEditClick}
                            onRemove={onRemoveClick}
                            onMarkInDrive={onMarkInDriveClick}
                        />
                    </div>
                </div>

                <div className="row lists-container">
                    <div className="col-6 vip-container">
                        <PlaylistHeader HeaderText="VIP Song Requests" />
                        <div className="queue-container">{vipRequestRender}</div>
                    </div>
                    <div className="col-6 regular-container">
                        <PlaylistHeader HeaderText="Song Requests" />
                        <div className="queue-container">{regularRequestRender}</div>
                    </div>
                </div>
            </AnimateSharedLayout>
        </div>
    );
}

List.defaultProps = {
    username: "",
    isModerator: false,
    UserPlaylistInfo: {} as UserPlaylistInfo
} as ListProps;

export default List;
