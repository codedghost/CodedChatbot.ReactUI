import {Alert, Modal} from 'react-bootstrap';
import UserPlaylistInfo from '../../../models/UserPlaylistInfo';
import { IsNullOrWhiteSpace } from '../../../services/StringHelperService';
import { SubmitAddRequest } from '../../../services/UIApiService/UIApiService';
import { useEffect, useState } from 'react';

import {RequestModal, RequestOptions, _defaultRequestOptions} from '../../Modals/RequestModal';

import PlaylistHeaderProps from './PlaylistHeaderProps';
import { Button } from 'react-bootstrap';
import { Equals } from '../../../services/StringComparisonService/StringComparisonService';

function PlaylistHeader(props: PlaylistHeaderProps) {
    const [totalVips, updateTotalVips] = useState<number>(0);
    const [totalBytes, updateTotalBytes] = useState<string>("0");

    const [showAddRequestModal, setShowAddRequestModal] = useState(false);
    const [requestOptions, setRequestOptions] = useState<RequestOptions>(_defaultRequestOptions);

    useEffect(() => {
        if(props.hubConnection !== undefined) {
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
    }

    const loggedOutContent = (
        <div>
            <Alert.Link href={props.LoginUrl}>Login</Alert.Link> with Twitch to access playlist features!
        </div>
    );

    const loggedInContent = (
        <div className="d-flex justify-content-between align-items-center">
            <div>Welcome {props.username}! {props.isModerator ? "You are a moderator, gg!" : ""} You have {totalVips} VIP tokens and {totalBytes} Bytes!</div>
            <div><Button variant="success" onClick={() => {setShowAddRequestModal(true)}}>Request a song</Button></div>
        </div>
    )

    const handleSendRequest = function() {
        console.log(requestOptions);
        SubmitAddRequest(requestOptions).then((result) => {
            console.log(result);
            console.log(Equals(result, "success"));
            if (Equals(result, "success"))
            {
                closeAndResetModal();
            } else {
                console.log("hit else block");
                setRequestOptions(
                    {
                        ...requestOptions,
                        errorMessage: result
                    } as RequestOptions);
            }
        });
    }
    
    console.log("username:" + props.username);
    return (
        <>
            <RequestModal 
                show={showAddRequestModal} 
                changeShow={closeAndResetModal} 
                isAddRequest={true} 
                requestOptions={requestOptions} 
                updateRequestOptions={setRequestOptions} 
                sendRequest={handleSendRequest} />
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