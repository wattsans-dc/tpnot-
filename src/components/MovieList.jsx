import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/MovieList.module.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=37292c5783484ec5c8d48b805a885e38`);
      setMovies(res.data.results);
    };
    fetchMovies();
  }, [category]);

  const handleSearch = async () => {
    if (search.trim() !== '') {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=37292c5783484ec5c8d48b805a885e38&query=${search}`);
      setMovies(res.data.results);
    }
  };

  return (
    <div className={styles.movieList}>
      <div className={styles.filters}>
        <button onClick={() => setCategory('popular')}>Populaires</button>
        <button onClick={() => setCategory('now_playing')}>En cours</button>
        <button onClick={() => setCategory('top_rated')}>Mieux notés</button>
        <button onClick={() => setCategory('upcoming')}>À venir</button>
        <input
          type="text"
          placeholder="Rechercher un film"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      <div className={styles.movies}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movie}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>Note : {movie.vote_average}</p>
            <Link to={`/movie/${movie.id}`}>Voir les détails</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
