import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Spotify.scss"

import { FaArrowsRotate } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa6";
import setIcon from "../../assets/test.png"

export const Spotify = () => {

    const API_KEY = import.meta.env.VITE_SPOTIFY_URI;
    const SECRET = import.meta.env.VITE_SPOTIFY_API_SECRET;

    const [track, setTrack] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

    const fetchSpotifyData = async () => {
        try {
            const res = await axios.get(API_KEY, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Spotify-Secret': SECRET
                }
            });

            if (res.data.track) {
                setTrack(res.data.track);
                setIsCurrentlyPlaying(res.data.currently_playing || false);
                setError(null);
            } else if (res.data.message) {
                setTrack(null);
                setError(res.data.message);
            }
        } catch (err) {
            setTrack(null);
            if (err.response?.status === 503) {
                setError("The Spotify API is currently unavailable. Please try again later.");
            } else if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to get Spotify data. Don't worry, Dom will fix it soon!");
            }
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchSpotifyData();
    }, []);

    const refreshSpotify = async () => {
        setIsRefreshing(true);
        setError(null);
        await fetchSpotifyData();
    };

    const formatArtists = (artists) => {
        if (!artists || artists.length === 0) return 'Unknown Artist';
        return artists.join(', ');
    };

    const getStatusText = () => {
        if (isCurrentlyPlaying) {
            return 'Listening';
        } else if (track) {
            return 'Last played';
        } else {
            return 'No recent activity';
        }
    };

    return (
        <div className="spotify-parent">
            {/* sub header */}
            <div className="top">
                <h5>{isCurrentlyPlaying ? '🎧 NOW LISTENING' : '🎧 LAST LISTENED SONG'}</h5>
                <div className="link-refresh">
                    <button onClick={refreshSpotify} disabled={isRefreshing} className={isRefreshing ? 'refreshing' : ''}>
                        <FaArrowsRotate className={isRefreshing ? 'spinning' : ''} />
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {/* spotify card */}
            <div className="spotify-content">
                {/* left section*/}
                <div className="left">
                    <img src={track?.image || setIcon} alt="Album cover" className='song-cover' onError={(e) => { e.target.src = setIcon; }} />
                    <div className="song-info">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : track ? (
                            <>
                                <p><strong>{track.name}</strong></p>
                                <p>{formatArtists(track.artists)} - <em>{track.album}</em></p>
                            </>
                        ) : (
                            <div className="error-state">
                                <p>{error}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* right section*/}
                <div className="right">
                    {error ? 
                        <p className={"not-played"}><span className="marquee-text">Limited</span></p> 
                        :
                        <>
                            {isCurrentlyPlaying ?
                                <p className={"played"}><span className="marquee-text">{getStatusText()} {getStatusText()} {getStatusText()}</span></p>
                                :
                                <p className={"not-played"}><span className="marquee-text">{getStatusText()}</span></p>
                            }
                        </>
                    }
                    <FaSpotify />
                </div>
            </div>
        </div>
    )
}