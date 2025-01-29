import { useState } from "react";

export const VideoCard = ({ link, label, preview }: IVideoCard) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="video-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!isHovered ? (
                <img loading="lazy" alt="preview" src={preview} className="thumbnail" />
            ) : (
                <video
                    playsInline
                    loop
                    muted
                    autoPlay
                    src={link}
                    className="video"
                />
            )}
            <p>{label}</p>
        </div>
    );
};

interface IVideoCard {
    link: string;
    label: string;
    preview: string;
}