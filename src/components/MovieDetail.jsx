import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { WishlistContext } from '../context/WishlistContext';
import styles from '../styles/MovieDetail.module.css';

const DEFAULT_ACTOR_IMAGE = 'https://placehold.co/150x150?text=No+Image';
const DEFAULT_MOVIE_IMAGE = 'https://placehold.co/200x300?text=No+Image';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const { addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    // Assurez-vous que la page soit en haut au chargement
    window.scrollTo(0, 0);

    const fetchMovieDetails = async () => {
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=37292c5783484ec5c8d48b805a885e38`
        );
        setMovie(movieRes.data);

        const actorsRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=37292c5783484ec5c8d48b805a885e38`
        );
        setActors(actorsRes.data.cast.slice(0, 10));

        const similarRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=37292c5783484ec5c8d48b805a885e38`
        );
        setSimilarMovies(similarRes.data.results || []);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Chargement...</p>;

  return (
    <div className={styles.movieDetail}>
      <div className={styles.imageContainer}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : DEFAULT_MOVIE_IMAGE
          }
          alt={movie.title}
          className={styles.poster}
        />
      </div>

      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Date de sortie : {movie.release_date}</p>
      <p>Note moyenne : {movie.vote_average}</p>
      <button onClick={() => addToWishlist(movie)}>Ajouter à la Wishlist</button>

      <h3>Acteurs principaux :</h3>
      <ul className={styles.actorsList}>
        {actors.map((actor) => (
          <li key={actor.id} className={styles.actorItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : DEFAULT_ACTOR_IMAGE
              }
              alt={actor.name}
              className={styles.actorImage}
            />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
      <h3>Films similaires :</h3>
      <div className={styles.similarMovies}>
        {similarMovies.map((similarMovie) => (
          <div key={similarMovie.id} className={styles.similarMovie}>
            <img
              src={
                similarMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`
                  : DEFAULT_MOVIE_IMAGE
              }
              alt={similarMovie.title}
              className={styles.similarPoster}
            />
            <div className={styles.titleContainer}>
              <h4 className={styles.scrollableTitle}>
                {similarMovie.title}
              </h4>
            </div>
            <Link to={`/movie/${similarMovie.id}`} className={styles.detailsLink}>
              Voir les détails
            </Link>
            <button onClick={() => addToWishlist(similarMovie)}>
              Ajouter à la Wishlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
