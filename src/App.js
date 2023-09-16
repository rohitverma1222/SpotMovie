import MovieList from "./Component/MovieList";
import "./App.scss";
import React, { useState } from "react";
import Navbar from "./Component/Navbar";

function App() {
  const [favSection, changeFavSection] = useState([]);
  const [openSearchBar, setOpenSearchBar] = useState(true);
  // console.log(favSection);
  return (
    <>
      <div className="movie-app">
        <Navbar
          favSection={favSection}
          changeFavSection={changeFavSection}
          openSearchBar={openSearchBar}
          setOpenSearchBar={setOpenSearchBar}
        />
        <MovieList
          favSection={favSection}
          changeFavSection={changeFavSection}
          openSearchBar={openSearchBar}
          setOpenSearchBar={setOpenSearchBar}
        />
      </div>
    </>
  );
}

export default App;
