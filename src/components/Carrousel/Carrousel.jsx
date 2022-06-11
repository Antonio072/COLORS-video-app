import React from 'react';
import './Carrousel.css';
import { useColor } from 'color-thief-react'


export function Carrousel(props) {
    // Get last video ID from youtube.com/c/COLORSxstudios
    const lastVideoId = 'vCwKgEFSsyI';
    const videoId = lastVideoId;
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    
    // Get thumbnail from videoID
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    // Get dominant color with color thief
    const { data,loading, error } = useColor(thumbnailUrl, 'rgbString', { crossOrigin: false, quality: 1 });

    let images = {
        '1': thumbnailUrl,
        '2': 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    }

    console.log(data    )
    return (
        <div className='carrousel'>
            <div className='carrousel carrousel-container'>
                <div className='carrousel carrousel-container carrousel-item'>
                    {data}
                    <img src={images['1']} alt='carrousel' />
                </div>
            </div>
        </div>
    );
}