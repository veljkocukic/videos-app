import { useState } from "react";
import { Loader } from "./Loader";

export const VideoCard = ({ link, label, preview }: IVideoCard) => {
    const [isHovered, setIsHovered] = useState(false);
    const [canPlay, setCanPlay] = useState(false);

    const renderImage = () => {
        if (isHovered) {
            if (canPlay) {
                return null;
            }
        }
        return <img loading="lazy" alt="preview" src={preview} className="thumbnail" />
    }

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