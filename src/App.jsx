import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import Wishlist from './pages/Wishlist';
import WishlistProvider from './context/WishlistContext';
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <WishlistProvider>
    <Router>{/* Routes */}</Router>
  </WishlistProvider>
    </Routes>
  </Router>
);

export default App;
