import React, { useEffect } from 'react'
import "./Spotify.scss"

import { FaArrowsRotate } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa6";
import setIcon from "../../assets/test.png"

export const Spotify = () => {

    useEffect(() => {
    }, []);

    const refreshSpotify = () => {
        console.log("Refreshing Spotify data...");
    }

    return (
        <div className="spotify-parent">
            <div className="top">
                <h5>LAST PLAYED SONG</h5>
                <div className="link-refresh">
                    <button onClick={refreshSpotify}><FaArrowsRotate />Refresh</button>
                </div>
            </div>
            <div className="spotify-content">
                <div className="left">
                    <img src={setIcon} alt="none" className='song-cover'/>
                    <div className="song-info">
                        <p>SHALLOW </p>
                        <p>Magnolia Park</p>
                        
                    </div>
                </div>
                <div className="right">
                    <p className='played'>Listening now</p>
                    <FaSpotify />
                </div>
            </div>
        </div>
    )
}
