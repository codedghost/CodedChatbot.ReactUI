import { Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import Config from "../../services/Config/Config";
import {GetUsername} from '../../services/UIApiService/UIApiService';

import {useEffect, useState} from 'react';
import {Redirect, useLocation} from 'react-router-dom';

import './NavBar.scss';

import FacebookLogo from '../../vectors/facebook.svg';
import InstagramLogo from '../../vectors/instagram.svg';
import TwitchLogo from '../../vectors/twitch.svg';
import TwitterLogo from '../../vectors/twitter.svg';
import YoutubeLogo from '../../vectors/youtube.svg';

function NavBar() {
    const [showStreamDropdown, setStreamDropdown] = useState<boolean>(false);
    const [showSoftwareDropdown, setSoftwareDropdown] = useState<boolean>(false);
    const [redirectToStreamInfo, setRedirectToStreamInfo] = useState<boolean>(false);
    const [redirectToSoftwareInfo, setRedirectToSoftwareInfo] = useState<boolean>(false);

    const streamInfoRedirect = redirectToStreamInfo ? (<Redirect to="/stream/info" />) : (<div></div>);
    const softwareInfoRedirect = redirectToSoftwareInfo ? (<Redirect to="/software/development" />) : (<div></div>);

    const [username, setUsername] = useState<string>("");

    const location = useLocation();

    useEffect(() => {
        GetUsername()
            .then((username) => {
                setUsername(username);
            });
    }, [])

    return (
        <div>
            {streamInfoRedirect}
            {softwareInfoRedirect}
            <Navbar variant="dark" className="login-bar">
                <Navbar.Collapse id="login-and-socials" className="justify-content-end">
                        <Nav>
                            <Nav.Link href={`${Config.Api.UI}${username === "" ? `Login?redirectUrl=${location.pathname}` : `Login/Logout?redirectUrl=${location.pathname}`}`}
                                style={{marginRight: username === "" ? "20.8rem" : "8rem", color: "white", fontSize: "24px"}}>
                                        {username === "" ? "Login" : `Logout ${username}`}
                                    </Nav.Link>
                            <Nav.Link href="/twitch">
                                <Image 
                                    src={TwitchLogo}
                                    width="25"
                                    height="25"
                                    alt="CodedGhost's Twitch" />
                            </Nav.Link>
                            <Nav.Link href="/youtube">
                                <Image
                                    src={YoutubeLogo}
                                    width="25"
                                    height="25"
                                    alt="CodedGhost's Youtube" />
                            </Nav.Link>
                            <Nav.Link href="/twitter">
                                <Image 
                                    src={TwitterLogo}
                                    width="25"
                                    height="25"
                                    alt="CodedGhost's Twitter" />
                            </Nav.Link>
                            <Nav.Link href="/insta">
                                <Image 
                                    src={InstagramLogo}
                                    width="25"
                                    height="25"
                                    alt="CodedGhost's Instagram"/>
                            </Nav.Link>
                            <Nav.Link href="/facebook">
                                <Image 
                                    src={FacebookLogo}
                                    width="25"
                                    height="25"
                                    alt="CodedGhost's Facebook" />
                            </Nav.Link>
                        </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Navbar variant="dark" className="main-navbar">
                <Navbar.Collapse id="main-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown 
                                title="Stream" 
                                id="stream-dropdown"
                                show={showStreamDropdown}
                                onMouseEnter={() => setStreamDropdown(true)}
                                onMouseLeave={() => setStreamDropdown(false)}
                                onClick={() => setRedirectToStreamInfo(true)}>
                                    <NavDropdown.Item href="/stream/info" className="navbar-header">Info</NavDropdown.Item>
                                    <NavDropdown.Item href="/stream/playlist">Playlist</NavDropdown.Item>
                                    <NavDropdown.Item href="/stream/library">Library</NavDropdown.Item>
                                    <NavDropdown.Item href="/stream/practice-song-request">Practice Song Request</NavDropdown.Item>
                                    <NavDropdown.Item href="/stream/synonym-request">Synonym Request</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown 
                                title="Software" 
                                id="software-dropdown"
                                show={showSoftwareDropdown}
                                onMouseEnter={() => setSoftwareDropdown(true)}
                                onMouseLeave={() => setSoftwareDropdown(false)}
                                onClick={() => setRedirectToSoftwareInfo(true)}>
                                    <NavDropdown.Item href="/software/development">Development</NavDropdown.Item>
                                    <NavDropdown.Item href="/software/current-month">Current Month</NavDropdown.Item>
                                    <NavDropdown.Item href="/software/raise-a-bug">Raise a Bug</NavDropdown.Item>
                                    <NavDropdown.Item href="/software/backlog">Backlog</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/merch">Merch</Nav.Link>
                            <Nav.Link href="/news">News</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav> 
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;