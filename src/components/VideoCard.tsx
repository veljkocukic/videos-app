import { useState } from "react";
import { Loader } from "./Loader";

export const VideoCard = ({ link, label, preview }: IVideoCard) => {
    const [isHovered, setIsHovered] = useState(false);
    const [canPlay, setCanPlay] = useState(false);

    const renderImage = () => {
        if (isHovered && canPlay) {
            return null;
        }
        return <img loading="lazy" alt="preview" src={preview} className="thumbnail" />
    }

    // Initialy I made just a simple condition where it is either image
    // or video, but I changed that so that video is getting ready in the
    // background while the image is displayed. This way the video is ready
    // and the delay is minimal. I also saw this approach on pexels videos.

    // Another thing that could have been done here is to initialte video
    // loading only when user is intereacting with the video card and not
    // right from the begginning. This way we would save some bandwidth but
    // for this small app I decided to go with the first approach.

    return (
        <div
            className="video-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && !canPlay && <Loader image />}
            {renderImage()}
            <video
                playsInline
                loop
                muted
                autoPlay
                src={link}
                className="video"
                onCanPlay={() => setCanPlay(true)}
            />
            <p>{label}</p>
        </div>
    );
};

interface IVideoCard {
    link: string;
    label: string;
    preview: string;
}