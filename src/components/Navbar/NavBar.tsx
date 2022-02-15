import { Image, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Config from "../../services/Config/Config";
import { CheckApiAvailability, GetAuthBaseModel } from "../../services/UIApiService/UIApiService";
import TwitchAuthBaseModel from "../../models/TwitchAuthBaseModel";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NavBarProps from "./NavBarProps";

import "./NavBar.scss";

import FacebookLogo from "../../vectors/facebook.svg";
import InstagramLogo from "../../vectors/instagram.svg";
import TwitchLogo from "../../vectors/twitch.svg";
import TwitterLogo from "../../vectors/twitter.svg";
import YoutubeLogo from "../../vectors/youtube.svg";

function NavBar(props: NavBarProps) {
    const [showStreamDropdown, setStreamDropdown] = useState<boolean>(false);
    const [showSoftwareDropdown, setSoftwareDropdown] = useState<boolean>(false);
    const [showModerationDropdown, setModerationDropdown] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

    var loggedIn = props.AuthBaseModel?.username === undefined || props.AuthBaseModel?.username === null;

    useEffect(() => {
        GetAuthBaseModel().then((authBaseModel) => {
            props.SetAuthModelCallback(authBaseModel);
        });
    }, []);

    useEffect(() => {
        CheckApiAvailability().then((isAvailable) => {
            if (isAvailable)
                props.SetLoginUrlCallback(
                    `${Config.Api.UI}${
                        loggedIn
                            ? `Login?redirectUrl=${location.pathname}`
                            : `Login/Logout?redirectUrl=${location.pathname}`
                    }`
                );
            else props.SetLoginUrlCallback("#");
        });
    }, [props, location.pathname]);

    var test = "";

    var moderatorNavItem = props.AuthBaseModel.isModerator ? (
        <NavDropdown
            title="Moderation"
            id="moderation-dropdown"
            show={showModerationDropdown}
            onMouseEnter={() => setModerationDropdown(true)}
            onMouseLeave={() => setModerationDropdown(false)}
            onClick={() => navigate("/moderation/search")}
        >
            <NavDropdown.Item href="/moderation/search" className="navbar-header">
                Search
            </NavDropdown.Item>
            <NavDropdown.Item href="/moderation/transfer-user">Transfer User</NavDropdown.Item>
        </NavDropdown>
    ) : (
        <></>
    );

    return (
        <div>
            <Navbar variant="dark" className="login-bar">
                <Container fluid>
                    <Navbar.Collapse id="login-and-socials" className="justify-content-end">
                        <Nav>
                            <Nav.Link href={props.LoginUrl} className="login-link">
                                {loggedIn ? "Login" : `Logout ${props.AuthBaseModel.username}`}
                            </Nav.Link>
                            <Nav.Link href="/twitch">
                                <Image src={TwitchLogo} width="25" height="25" alt="CodedGhost's Twitch" />
                            </Nav.Link>
                            <Nav.Link href="/youtube">
                                <Image src={YoutubeLogo} width="25" height="25" alt="CodedGhost's Youtube" />
                            </Nav.Link>
                            <Nav.Link href="/twitter">
                                <Image src={TwitterLogo} width="25" height="25" alt="CodedGhost's Twitter" />
                            </Nav.Link>
                            <Nav.Link href="/insta">
                                <Image src={InstagramLogo} width="25" height="25" alt="CodedGhost's Instagram" />
                            </Nav.Link>
                            <Nav.Link href="/facebook">
                                <Image src={FacebookLogo} width="25" height="25" alt="CodedGhost's Facebook" />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Navbar expand="md" variant="dark" className="main-navbar">
                <Container fluid>
                    <Navbar.Brand></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="main-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown
                                title="Stream"
                                id="stream-dropdown"
                                show={showStreamDropdown}
                                onMouseEnter={() => setStreamDropdown(true)}
                                onMouseLeave={() => setStreamDropdown(false)}
                                onClick={() => navigate("/stream/info")}
                            >
                                <NavDropdown.Item href="/stream/info" className="navbar-header">
                                    Info
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/stream/playlist">Playlist</NavDropdown.Item>
                                <NavDropdown.Item href="/stream/library">Library</NavDropdown.Item>
                                <NavDropdown.Item href="/stream/practice-song-request">
                                    Practice Song Request
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/stream/synonym-request">Synonym Request</NavDropdown.Item>
                            </NavDropdown>
                            {moderatorNavItem}
                            <NavDropdown
                                title="Software"
                                id="software-dropdown"
                                show={showSoftwareDropdown}
                                onMouseEnter={() => setSoftwareDropdown(true)}
                                onMouseLeave={() => setSoftwareDropdown(false)}
                                onClick={() => navigate("/software/development")}
                            >
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
                </Container>
            </Navbar>
        </div>
    );
}

NavBar.defaultProps = {
    AuthBaseModel: {} as TwitchAuthBaseModel,
    LoginUrl: "#",
    SetLoginUrlCallback: (url) => {},
    SetAuthModelCallback: (authBaseModel) => {}
} as NavBarProps;

export default NavBar;
