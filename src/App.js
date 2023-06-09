import MovieList from './Component/MovieList';
import './App.scss';
import React, { useState } from 'react'
import Navbar from './Component/Navbar';

function App() {
  const [favSection, changeFavSection] = useState([]);
  // console.log(favSection);
  return (
    <>
      <div className="movie-app">
        <Navbar favSection={favSection} changeFavSection={changeFavSection}/>
        <MovieList favSection={favSection} changeFavSection={changeFavSection} />
      </div>
    </>
  );
}

export default App;
