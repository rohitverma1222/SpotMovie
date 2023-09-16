import React, { useState, useEffect } from "react";

export default function Navbar({ favSection, changeFavSection }) {
  const [fav, setFav] = useState(favSection);

  const [hover, SetHover] = useState("");
  useEffect(() => {
    (async () => {
      let datas = JSON.parse(localStorage.getItem("movies-app") || "[]");
      let oldData = [];
      datas.forEach((movieObj) => {
        oldData.push(movieObj);
      });
      setFav([...oldData]);
    })();
    return () => {};
  }, []);
  useEffect(() => {
    (async () => {
      let datas = JSON.parse(localStorage.getItem("movies-app") || "[]");
      let oldData = [];
      datas.forEach((movieObj) => {
        oldData.push(movieObj);
      });
      setFav([...oldData]);
    })();
    return () => {};
  }, [favSection]);

  const handleAddFav = (movie) => {
    setTimeout(() => {
      let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
      oldData = oldData.filter((m) => m.id !== movie.id);
      localStorage.setItem("movies-app", JSON.stringify(oldData));
      setFav([...oldData]);
      changeFavSection([...oldData]);
      SetAnimate(false);
    }, 1000);
  };

  const [isShowHamburger, SetShowHamburger] = useState(false);

  const handleHamburger = () => {
    SetShowHamburger(!isShowHamburger);
  };

  const [loaded, setLoaded] = useState(false);

  const hideNavbar = {
    width: "7%",
  };
  const [animate, SetAnimate] = useState(false);

  const loadingScreen = () => {
    const numberOfElements = 8;
    const elements = Array.from({ length: numberOfElements }, (_, index) => (
      <div className="dummy-movie-details">
        <div className="fav-image skeleton">
          <img alt="" />
        </div>
        <div className="title skeleton skeleton-text">
          <p className="title-head"></p>
        </div>
      </div>
    ));
    return <>{elements}</>;
  };

  return (
    <>
      <div className={isShowHamburger ? "navbar navbar-hide" : "navbar"}>
        <div className="home">
          <button>
            <i class="fa-solid fa-house"></i> <span>Home</span>
          </button>
          <button>
            <i className="fa-solid fa-magnifying-glass"></i> <span>Search</span>
          </button>
        </div>
        <div className="wrapper">
          <div className="library">
            <div className="lib">
              <div id="your">
                <i className="fa-solid fa-bars" onClick={handleHamburger}></i>{" "}
                <span>Favourites</span>
              </div>
            </div>
            {!loaded && loadingScreen()}
            {fav.map((movieObj) => (
              <div
                className="movie-details"
                onMouseEnter={() => {
                  SetHover(movieObj.id);
                }}
                onMouseLeave={() => {
                  SetHover("");
                  SetAnimate(false);
                }}
              >
                <img
                  className="skeleton"
                  src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                  alt=""
                  onLoad={() => setLoaded(true)}
                />
                <div className="title">
                  <p className="title-head">{movieObj.title}</p>
                </div>
                {hover === movieObj.id && (
                  <div
                    className={animate ? "nav-fav active" : "nav-fav"}
                    onClick={() => {
                      handleAddFav(movieObj);
                      SetAnimate(true);
                    }}
                  >
                    {animate ? (
                      <i className="fa-regular fa-heart fa-xl"></i>
                    ) : (
                      <i className="fa-solid fa-heart fa-xl"></i>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
