import React, { useState, useEffect } from 'react';
import '../styles/row.css';
import axios from '../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/w500";

function Row({ title, fetchURL, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        //run only once when the row loads and don't run again,also run whenever fetchURL changes
        async function fetchData() {
            const request = await axios.get(fetchURL);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            //   https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log(urlParams)
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="row">
            <h1>{title}</h1>
            <div
                className="row-posters"
            >
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                        onClick={() => handleClick(movie)}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;