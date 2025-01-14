const handleSearch = debounce((query) => {
    fetchMovies(`/search/movie&query=${query}`).then((data) => setMovies(data.results));
  }, 500);
  