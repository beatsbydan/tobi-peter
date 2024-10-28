import React from 'react';
import './VideoPlayer.css'

const VideoPlayer= ({ url }) => {
    
    return (
        <iframe
            className='videoElement'
            width="100%"
            height="100%"
            src={`${url}`}
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen
        >
        </iframe>
    );
};

export default VideoPlayer;

