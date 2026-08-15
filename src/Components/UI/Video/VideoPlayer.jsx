import React from 'react'

const VideoPlayer = ({ url }) => {
  return (
    <iframe
      className="videoElement rounded-[30px] shadow-[0px_2px_4px_rgba(0,0,0,0.178)]"
      width="100%"
      height="100%"
      src={`${url}`}
      title="YouTube Video Player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  )
}

export default VideoPlayer
