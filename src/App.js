import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import MovieCard from "./MovieCard";
import searchIcon from './search.svg'
// import MovieCard from "./MovieCard";



const API_URL = 'http://www.omdbapi.com?apikey=9ec742b2';


// const movie1 = {
//     "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
//     "Year": "2016",
//     "imdbID": "tt18689424",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BN2I4OTllM2MtMWVhNC00MjkzLWJlMDUtN2FhMGQ2ZGVjMjllXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg"
// };





const App = () => {
    // Create a useState to get movies
    const [movies, setMovies] = useState([])
    // create useState for the searched item
    const [searchTerm, setSearchTerm] = useState('')
    // Get API for movies
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    // use UseEffect to load a Specific Search term when page loads
    useEffect(() => {
        searchMovies('avengers')
    }, []);

    

    return (
        // Application Body
        <div className="app">
            <h1>MovieLand</h1>
            {/* search Section */}
            <div className="search">
                <input 
                placeholder="Search for Movies and Tv shows"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {/* Set a conditional statement to ensure there are movies from the api */}
            {movies?.length > 0 
                ? (
                    <div className="container">
                        {
                            movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ) )
                        }
                    </div>
                ) : (
                    <>
                        <div className="empty">
                            <h3>Can't Find Movie</h3>
                        </div>
                    </>
                )
            }
        </div>
        );
}

export default App;

// API key 9ec742b2