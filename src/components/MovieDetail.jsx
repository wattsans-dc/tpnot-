import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { WishlistContext } from '../context/WishlistContext';
import styles from '../styles/MovieDetail.module.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const { addToWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`);
      setMovie(res.data);
    };
    const fetchActors = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=YOUR_API_KEY`);
      setActors(res.data.cast.slice(0, 10));
    };
    fetchMovie();
    fetchActors();
  }, [id]);

  if (!movie) return <p>Chargement...</p>;

  return (
    <div className={styles.movieDetail}>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Date de sortie : {movie.release_date}</p>
      <p>Note moyenne : {movie.vote_average}</p>
      <button onClick={() => addToWishlist(movie)}>Ajouter à la Wishlist</button>
      <h3>Acteurs principaux :</h3>
      <ul>
        {actors.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetail;
