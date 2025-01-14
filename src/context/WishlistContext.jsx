import { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  });

  const addToWishlist = (movie) => {
    const updatedList = [...wishlist, movie];
    setWishlist(updatedList);
    localStorage.setItem('wishlist', JSON.stringify(updatedList));
  };

  const removeFromWishlist = (id) => {
    const updatedList = wishlist.filter((movie) => movie.id !== id);
    setWishlist(updatedList);
    localStorage.setItem('wishlist', JSON.stringify(updatedList));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
