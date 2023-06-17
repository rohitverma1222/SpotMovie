import React, { useEffect } from 'react'
import axios from 'axios'
import { CSSTransition } from 'react-transition-group';
import { useState, useRef } from 'react'
export default function MovieList({ changeFavSection }) {

  const [movies, setMovies] = useState([]);

  const [currPage, setCurrpage] = useState(1);

  const [hover, setHover] = useState('');

  const [fav, setFav] = useState([]);

  const [wish, setwish] = useState('');


  let genreids = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'SciFic', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${currPage}`)
      const data = res.data;
      setMovies([...data.results])
      let datas = JSON.parse(localStorage.getItem("movies-app") || "[]")
      let oldData = []
      datas.forEach((movieObj) => {
        oldData.push(movieObj);
      })
      let temp = oldData.map((movie) => movie.id);
      setFav([...temp])
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

    return () => { };
  }, [currPage])


  const handleAddFav = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
    if (fav.includes(movie.id)) {
      oldData = oldData.filter((m) => m.id !== movie.id)
    }
    else
      oldData.push(movie)

    localStorage.setItem("movies-app", JSON.stringify(oldData));
    let temp = oldData.map((movie) => movie.id);
    setFav([...temp])
    changeFavSection([...oldData])

    // console.log(movie.id);
  }
  const handleIncreasePage = () => {
    setCurrpage(currPage + 1)
  }
  const handleDecreasePage = () => {
    if (currPage > 1)
      setCurrpage(currPage - 1)
  }

  const [inProp, setInProp] = useState(false);

  const nodeRef = useRef(null);

  return (
    <>
      <div className="movies">
        <div className="movie-navbar">
          <div className="greet">{wish}</div>
          <div className="profile">R</div>
        </div>
        <div className="subheading">Trending
          <div className="pagination">
            <button onClick={() => handleDecreasePage()}><i class="fa-solid fa-angle-left"></i></button>
            <button onClick={() => handleIncreasePage()}><i class="fa-solid fa-angle-right"></i></button>
          </div>
        </div>
        <div className="trending">
          {
            movies.map((movieObj) => (
              <CSSTransition
                in={inProp}
                classNames="my-node"
                nodeRef={nodeRef}
                onMouseEnter={() => {setHover(movieObj.id);setInProp(true)}} onMouseLeave={() => {setHover('');setInProp(false)}}
              >
                <div className="movie-card" key={movieObj.id}
                  // onMouseEnter={() => setHoverImg(true)} onMouseLeave={() => setHoverImg(false)}
                >
                  <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt="" />
                  {
                    inProp &&  hover === movieObj.id &&
                    <div className="fav" ref={nodeRef} onClick={()=>handleAddFav(movieObj)}>
                      {
                        fav.includes(movieObj.id) ?
                          <i className="fa-solid fa-heart fa-xl" 
                          // onClick={() => handleAddFav(movieObj)}
                          ></i> :
                          <i className="fa-regular fa-heart fa-xl" 
                          // onClick={() => handleAddFav(movieObj)}
                          ></i>
                      }
                    </div>
                  }
                  <p className='movie-name'>{movieObj.title}</p>
                  <div className='movie-desc'>
                    {
                      movieObj.genre_ids.map((id) => (
                        <p>{genreids[id]}</p>
                      ))
                    }</div>
                </div>
              </CSSTransition>
                ))
          }
        </div>
        <div className="footer">
          <div className="pagination">
            <button onClick={() => handleDecreasePage()}>Prev</button>
            <button onClick={() => handleIncreasePage()}>Next</button>
          </div>
        </div>
      </div>
    </>
  )
}
