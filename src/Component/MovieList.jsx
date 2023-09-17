import React, { useEffect } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
export default function MovieList({
  favSection,
  changeFavSection,
  setOpenSearchBar,
  openSearchBar,
}) {
  const [movies, setMovies] = useState([]);

  const [currPage, setCurrpage] = useState(1);

  const [hover, setHover] = useState("");

  const [fav, setFav] = useState([]);

  const greet = () => {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const wish = greet();

  const [msgandSnackbar, setmsgandSnackbar] = React.useState({
    Message: "",
    isOpen: false,
  });
  const vertical = "bottom";
  const horizontal = "center";

  const [ShowSearch, setShowSearch] = useState(false);

  const handleClick = (msg) => {
    console.log(msg);
    setmsgandSnackbar({
      Message: `${msg}` + " Favourites",
      isOpen: true,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setmsgandSnackbar({
      Message: "",
      isOpen: false,
    });
  };

  let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "SciFic",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  useEffect(() => {
    let temp = favSection.map((movie) => movie.id);
    setFav([...temp]);
    setShowSearch(openSearchBar);
  }, [favSection, setOpenSearchBar]);
  useEffect(() => {
    (async () => {
      let mainPageUrl =
        openSearchBar === true
          ? `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${currPage}`
          : `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=5540e483a20e0b20354dabc2d66a31c9&page=${currPage}`;
      const res = await axios.get(mainPageUrl);

      const data = res.data;
      setMovies([...data.results]);
      let datas = JSON.parse(localStorage.getItem("movies-app") || "[]");
      let oldData = [];
      datas.forEach((movieObj) => {
        oldData.push(movieObj);
      });
      let temp = oldData.map((movie) => movie.id);
      setFav([...temp]);
      // changeFavSection([...oldData])
    })();

    return () => {};
  }, [currPage]);

  const handleAddFav = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    if (fav.includes(movie.id)) {
      oldData = oldData.filter((m) => m.id !== movie.id);
    } else oldData.push(movie);

    localStorage.setItem("movies-app", JSON.stringify(oldData));
    let temp = oldData.map((movie) => movie.id);
    setFav([...temp]);
    changeFavSection([...oldData]);

    // console.log(movie.id);
  };
  const handleIncreasePage = () => {
    setCurrpage(currPage + 1);
  };
  const handleDecreasePage = () => {
    if (currPage > 1) setCurrpage(currPage - 1);
  };

  const [inProp, setInProp] = useState(false);

  const [OpenSearchBox, SetOpenSearchBox] = useState(true);

  const [loaded, setLoaded] = useState(false);

  const nodeRef = useRef(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModel = () => setOpen(false);
  const [popUpData, setPopUpData] = useState({});
  const handlePopup = (movieObj) => {
    handleOpen();
    setPopUpData(movieObj);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundImage: `url("https://image.tmdb.org/t/p/original${popUpData.backdrop_path}")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",
    backgroundSize: "130% 100%",
  };

  const loadingScreen = () => {
    const numberOfElements = 8;
    const elements = Array.from({ length: numberOfElements }, (_, index) => (
      <div className="dummy-movie-card">
        <div className="trending-image skeleton">
          <img alt="" />
        </div>
        <div className="skeleton skeleton-text">
          <p className="movie-name"></p>
        </div>
        <div className="movie-desc">
          <p className="skeleton skeleton-text"></p>
          <p className="skeleton skeleton-text"></p>
          <p className="skeleton skeleton-text"></p>
        </div>
      </div>
    ));
    return <>{elements}</>;
  };
  const handleLoadImage = () => {
    setLoaded(true);
  };
  // console.log(typeof openSearchBar);
  const [searchText, setsearchText] = useState("");

  const handlesearchText = (e) => {
    setsearchText(e.target.value);
  };
  React.useEffect(() => {
    if(openSearchBar===false && searchText.length!=0)
    {
      const getData = setTimeout(() => {
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=5540e483a20e0b20354dabc2d66a31c9&page=${currPage}`
          )
          .then((response) => {
            const data = response.data;
            setMovies([...data.results]);
          });
      }, );
  
      return () => clearTimeout(getData);
    }
  }, [searchText]);
  return (
    <>
      <div className="movies">
        <div className="movie-navbar">
          <div className="greet">
            {openSearchBar ? (
              <>{wish}</>
            ) : (
              <>
              <div className="search-box">
                <input
                  name="search"
                  onChange={(e) => handlesearchText(e)}
                  value={searchText}
                ></input>
                <i class="fas fa-search"></i>
              </div>
              </>
            )}
          </div>
          <div className="profile">R</div>
        </div>
        <div className="subheading">
          Trending
          <div className="pagination">
            <button onClick={() => handleDecreasePage()}>
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button onClick={() => handleIncreasePage()}>
              <i class="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
        <div className="trending">
          {loaded === false ? <>{loadingScreen()}</> : ""}

          {movies.map((movieObj) => (
            <CSSTransition
              in={inProp}
              timeout={400}
              classNames="my-node"
              nodeRef={nodeRef}
              onMouseEnter={() => {
                setHover(movieObj.id);
                setInProp(true);
              }}
              onMouseLeave={() => {
                setHover("");
                setInProp(false);
              }}
            >
              <div
                className="movie-card"
                key={movieObj.id}
                // onMouseEnter={() => setHoverImg(true)} onMouseLeave={() => setHoverImg(false)}
              >
                <div className="trending-image skeleton">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`}
                    alt=""
                    onLoad={() => {
                      handleLoadImage();
                    }}
                    onClick={() => handlePopup(movieObj)}
                  />
                </div>
                {inProp && hover === movieObj.id && (
                  <div
                    className="fav "
                    ref={nodeRef}
                    onClick={() => handleAddFav(movieObj)}
                  >
                    {fav.includes(movieObj.id) ? (
                      <i
                        className="fa-solid fa-heart fa-xl"
                        onClick={() => handleClick("Removed from")}
                      ></i>
                    ) : (
                      <i
                        className="fa-regular fa-heart fa-xl"
                        onClick={() => handleClick("Added in")}
                      ></i>
                    )}
                  </div>
                )}
                <p className="movie-name" onClick={handleOpen}>
                  {movieObj.title}
                </p>
                <div onClick={handleOpen} className="movie-desc">
                  {movieObj.genre_ids.map((id) => (
                    <p>{genreids[id]}</p>
                  ))}
                </div>
              </div>
            </CSSTransition>
          ))}
        </div>
        <div className="footer">
          <div className="pagination">
            <button onClick={() => handleDecreasePage()}>Prev</button>
            <button onClick={() => handleIncreasePage()}>Next</button>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleCloseModel}>
        <Box sx={style} className="pop-up">
          <i
            id="close"
            className="fa fa-times fa-xl"
            onClick={handleCloseModel}
          ></i>
          <div className="covering-up">
            <div className="img-section">
              <img
                src={`https://image.tmdb.org/t/p/original${popUpData.poster_path}`}
                alt=""
              />
            </div>
            <div className="all-details">
              <p className="movie-title">
                {popUpData.title}
                <div className="fav " onClick={() => handleAddFav(popUpData)}>
                  {fav.includes(popUpData.id) ? (
                    <i
                      className="fa-solid fa-heart fa-xl"
                      onClick={() => handleClick("Removed from")}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-heart fa-xl"
                      onClick={() => handleClick("Added in")}
                    ></i>
                  )}
                </div>
              </p>
              <div className="sub-title">
                <p>{popUpData.release_date} </p>
                <div onClick={handleOpen} className="movie-desc">
                  {Object.keys(popUpData).length > 0 &&
                    popUpData.genre_ids.map((id) => <p> {genreids[id]}</p>)}
                </div>
              </div>
              <div className="overview">
                <h4>Overview</h4>
                <p className="over-view">{popUpData.overview}</p>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        className="snackbar"
        open={msgandSnackbar.isOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message={msgandSnackbar.Message}
      />
    </>
  );
}
