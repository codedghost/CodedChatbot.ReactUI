import { useEffect } from "react";
import TwitchEmbedProps from "./TwitchEmbedProps";

function TwitchEmbed(props: TwitchEmbedProps) {
    const embedUrl = "https://embed.twitch.tv/embed/v1.js";

    useEffect(() => {
        const script = document.createElement("script");
        script.setAttribute("src", embedUrl);

        script.addEventListener("load", () => {
            new (window as any).Twitch.Embed(props.targetId, {
                height: props.height,
                width: props.width,
                channel: props.channel,
                muted: true,
                allowfullscreen: true,
                theme: "dark"
            });
        });

        document.body.appendChild(script);
        // eslin-disable-next-line
    }, [props.targetId, props.height, props.width, props.channel]);

    return <div id={props.targetId}></div>;
}

TwitchEmbed.defaultProps = {
    targetId: "twitch-embed",
    width: "940",
    height: "480",
    channel: ""
} as TwitchEmbedProps;

export default TwitchEmbed;
