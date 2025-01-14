import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import styles from '../styles/Wishlist.module.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className={styles.wishlist}>
      <h2>Ma Wishlist</h2>
      {wishlist.length === 0 && <p>Aucun film dans la wishlist.</p>}
      <ul>
        {wishlist.map((movie) => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <div>
              <h3>{movie.title}</h3>
              <button onClick={() => removeFromWishlist(movie.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
