import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/MovieList.module.css';

const DEFAULT_MOVIE_IMAGE = 'https://placehold.co/200x300?text=No+Image';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchMovies = async () => {
      const endpoint =
        debouncedSearch.trim() === ''
          ? `https://api.themoviedb.org/3/movie/${category}?api_key=37292c5783484ec5c8d48b805a885e38&page=${page}`
          : `https://api.themoviedb.org/3/search/movie?api_key=37292c5783484ec5c8d48b805a885e38&query=${debouncedSearch}&page=${page}`;
      const res = await axios.get(endpoint);
      setMovies(res.data.results || []);
    };
    fetchMovies();
  }, [category, page, debouncedSearch]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setSearch('');
  };
  const handleSearch = () => setPage(1);

  return (
    <div className={styles.movieList}>
      <div className={styles.filters}>
        <button
          onClick={() => handleCategoryChange('popular')}
          className={category === 'popular' ? styles.active : ''}
        >
          Populaires
        </button>
        <button
          onClick={() => handleCategoryChange('now_playing')}
          className={category === 'now_playing' ? styles.active : ''}
        >
          En cours
        </button>
        <button
          onClick={() => handleCategoryChange('top_rated')}
          className={category === 'top_rated' ? styles.active : ''}
        >
          Mieux notés
        </button>
        <button
          onClick={() => handleCategoryChange('upcoming')}
          className={category === 'upcoming' ? styles.active : ''}
        >
          À venir
        </button>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Rechercher un film"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.movies}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movie}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : DEFAULT_MOVIE_IMAGE
              }
              alt={movie.title || 'Aucune image disponible'}
            />
            <div className={styles.titleContainer}>
              <h3 className={styles.movieTitle} data-title={movie.title}>
                {movie.title}
              </h3>
            </div>
            <p>Note : {movie.vote_average || 'N/A'}</p>
            <Link to={`/movie/${movie.id}`}>Voir les détails</Link>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Précédent
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Suivant</button>
      </div>
    </div>
  );
};

export default MovieList;
