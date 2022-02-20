import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

import Config from "../../services/Config/Config";
import { IsStreamerOnline } from "../../services/UIApiService/UIApiService";

function Home() {
    const [isStreamerOnline, setStreamerIsOnline] = useState<boolean>(false);

    useEffect(() => {
        IsStreamerOnline(Config.ChannelName).then((result) => {
            setStreamerIsOnline(result);
        });
    }, []);

    return (
        <>
            <Row>
                <Col xs="6">
                    <Card bg="dark" text="white">
                        <Card.Header>{isStreamerOnline ? "Live on Twitch" : "Live soon on Twitch"}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {isStreamerOnline
                                    ? "Live Right Now!"
                                    : "Live once a week, Wednesday, 18:30 UK Time (GMT)"}
                            </Card.Text>
                            <Card.Link href={`https://twitch.tv/${Config.ChannelName}`}>
                                Check out {Config.ChannelName}'s channel on Twitch
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs="6">
                    <div
                        style={{
                            backgroundImage: "url(/images/codedghost-background.png)",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            height: "90vh"
                        }}
                    ></div>
                </Col>
            </Row>
        </>
    );
}

export default Home;
