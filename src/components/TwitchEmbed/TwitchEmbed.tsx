import Config from '../../services/Config/Config';

import { useEffect } from 'react';
import TwitchEmbedProps from './TwitchEmbedProps';

function TwitchEmbed(props: TwitchEmbedProps) {
    const embedUrl = "https://embed.twitch.tv/embed/v1.js";
    
    useEffect(() => {

        const script = document.createElement('script');
        script.setAttribute('src', embedUrl);

        script.addEventListener('load', () => {
            new (window as any).Twitch.Embed(props.targetId, {
                ...props,
                muted: true,
                allowfullscreen: true,
                theme: "dark"
            });
        });

        document.body.appendChild(script);
    }, [props])

    return (
        <div id={props.targetId}>
        </div>
    )
}

TwitchEmbed.defaultProps = {
    targetId: 'twitch-embed',
    width: '940',
    height: '480',
    channel: Config.ChannelName
} as TwitchEmbedProps

export default TwitchEmbed;