import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import styles from '../styles/Wishlist.module.css';

const DEFAULT_MOVIE_IMAGE = 'https://placehold.co/200x300?text=No+Image';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className={styles.wishlist}>
      <h2>Ma Wishlist</h2>
      {wishlist.length === 0 && <p>Aucun film dans la wishlist.</p>}
      <div className={styles.movies}>
        {wishlist.map((movie) => (
          <div key={movie.id} className={styles.movie}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : DEFAULT_MOVIE_IMAGE
              }
              alt={movie.title || 'Aucune image disponible'}
            />
            <div className={styles.movieInfo}>
              <h3>{movie.title}</h3>
              <p>Note : {movie.vote_average || 'N/A'}</p>
              <div className={styles.actions}>
                <Link to={`/movie/${movie.id}`}>Voir les détails</Link>
                <button onClick={() => removeFromWishlist(movie.id)}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
