import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Spotify.scss"

import { FaArrowsRotate } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa6";
import setIcon from "../../assets/test.png"

export const Spotify = () => {
    const [track, setTrack] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

    const fetchSpotifyData = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8888/spotify/currently-playing', {
                withCredentials: true,
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
                setError(`The Spotify API is currently unavailable. Please try again later.`);
            } else if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError('Failed to fetch track data');
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
            return 'Listening now';
        } else if (track) {
            return 'Last played';
        } else {
            return 'No recent activity';
        }
    };

    return (
        <div className="spotify-parent">
            <div className="top">
                <h5>{isCurrentlyPlaying ? 'NOW LISTENING' : 'LAST LISTENED SONG'}</h5>
                <div className="link-refresh">
                    <button onClick={refreshSpotify} disabled={isRefreshing} className={isRefreshing ? 'refreshing' : ''}>
                        <FaArrowsRotate className={isRefreshing ? 'spinning' : ''} />
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </div>
            <div className="spotify-content">
                <div className="left">
                    <img src={track?.image || setIcon} alt="Album cover" className='song-cover'onError={(e) => { e.target.src = setIcon; }}/>
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
                                {error?.includes('authenticate') && (
                                    <p className="auth-hint">
                                        <small>{`Owner (me) needs to log in first!`}<br/>
                                        <code>http://127.0.0.1:8888/login</code></small>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="right">
                    <p className={`played ${isCurrentlyPlaying ? 'now-playing' : ''}`}>
                        {getStatusText()}
                    </p>
                    <FaSpotify className={isCurrentlyPlaying ? 'now-playing' : ''} />
                </div>
            </div>
        </div>
    )
}