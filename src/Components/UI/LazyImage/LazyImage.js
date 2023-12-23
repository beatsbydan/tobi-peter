import React, { useState, useEffect } from 'react';
import logo from '../../../Assets/logo.png'
import './LazyImage.css'

const LazyImage = ({ src, alt, type }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setLoaded(true);

        return () => {
        img.onload = null;
        };
    }, [src]);

    return (
        <>
            {type === "image" ? 
            <img
                className='comingSoon'
                src={loaded ? src : logo}
                alt={alt}
            />:
            <div className='slide' style={{backgroundImage : loaded ? `url(${src})` : `url(${logo})`}}/>
            }
        </>
    );
};

export default LazyImage;
