import React, { useEffect } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
export default function MovieList({ favSection, changeFavSection }) {
  const [movies, setMovies] = useState([]);

  const [currPage, setCurrpage] = useState(1);

  const [hover, setHover] = useState("");

  const [fav, setFav] = useState([]);

  const [wish, setwish] = useState("");

  const [msgandSnackbar, setmsgandSnackbar] = React.useState({
    Message: "",
    isOpen: false,
  });
  const vertical = "bottom";
  const horizontal = "center";

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
  }, [favSection]);
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${currPage}`
      );
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
      setwish("Good Morning");
    } else if (hour < 17) {
      setwish("Good Afternoon");
    } else {
      setwish("Good Evening");
    }

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
  const handleLoadImage=()=>{
    setLoaded(true)
  }
  return (
    <>
      <div className="movies">
        <div className="movie-navbar">
          <div className="greet">
            {wish}
            {/* {
            <input></input>
          } */}
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
          {loaded == false ? <>{loadingScreen()}</>:""}

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
                        onLoad={() => {handleLoadImage()}}
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
              <p className="movie-title">{popUpData.title} </p>
              <div className="sub-title">
                <p>{popUpData.release_date} </p>
                <div onClick={handleOpen} className="movie-desc">
                  {Object.keys(popUpData).length > 0 &&
                    popUpData.genre_ids.map((id) => <p> {genreids[id]}</p>)}
                </div>
              </div>
              <div className="score">
                <div className="user-score">
                  <div class="single-chart">
                    <svg viewBox="0 0 36 36" class="circular-chart blue">
                      <path
                        class="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        class="circle"
                        stroke-dasharray={`${popUpData.vote_average * 10},100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="20" y="20.35" class="percentage">
                        {popUpData.vote_average * 10}%
                      </text>
                    </svg>
                  </div>
                  <div
                    className="fav-in-popup "
                    ref={nodeRef}
                    onClick={() => handleAddFav(popUpData)}
                  >
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
