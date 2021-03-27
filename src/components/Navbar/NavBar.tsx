import { Image, Navbar, Nav, NavDropdown } from "react-bootstrap";

function NavBar() {

    return (
        <div>
            <Navbar>
                <Navbar.Collapse id="login-and-socials" className="justify-content-end">
                    <Nav className="ml-auto">
                        <Nav.Link href="#">Login</Nav.Link>
                        <Nav.Link href="/insta">
                            <Image 
                                src="/images/instagram.png" 
                                width="25"
                                height="25"
                                alt="CodedGhost's Instagram"/>
                        </Nav.Link>
                        <Nav.Link href="/twitter">
                            <Image 
                                src="/images/twitter.png"
                                width="25"
                                height="25"
                                alt="CodedGhost's Twitter" />
                        </Nav.Link>
                        <Nav.Link href="/youtube">
                            <Image
                                src="/images/youtube.png"
                                width="25"
                                height="25"
                                alt="CodedGhost's Youtube" />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Navbar>
                <Navbar.Collapse id="main-nav" className="justify-content-end">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Live" id="live-dropdown">
                            <NavDropdown.Item href="/info">Info</NavDropdown.Item>
                            <NavDropdown.Item href="/playlist">Playlist</NavDropdown.Item>
                            <NavDropdown.Item href="/library">Library</NavDropdown.Item>
                            <NavDropdown.Item href="/practice-song-request">Practice Song Request</NavDropdown.Item>
                            <NavDropdown.Item href="/synonym-request">Synonym Request</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/socials">Socials</Nav.Link>
                        <Nav.Link href="/media">Media</Nav.Link>
                        <NavDropdown title="Development" id="development-dropdown">
                            <NavDropdown.Item href="/development/current-month">Current Month</NavDropdown.Item>
                            <NavDropdown.Item href="/development/raise-a-bug">Raise a Bug</NavDropdown.Item>
                            <NavDropdown.Item href="/development/backlog">Backlog</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/about">About</Nav.Link>
                        </Nav> 
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;