import MovieList from './Component/MovieList';
import './App.css';
import React, { useState } from 'react'
import Navbar from './Component/Navbar';

function App() {
  const [favSection, changeFavSection] = useState([]);
  return (
    <>
      <div className="movie-app">
        <Navbar favSection={favSection} />
        <MovieList changeFavSection={changeFavSection} />
      </div>
    </>
  );
}

export default App;
