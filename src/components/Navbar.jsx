import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <nav className={styles.navbar}>
      <Link to="/">Accueil</Link>
      <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
    </nav>
  );
};

export default Navbar;
