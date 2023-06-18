import React, { useState, useEffect } from 'react'


export default function Navbar({ favSection, changeFavSection }) {

    const [fav, setFav] = useState(favSection);

    const [hover, SetHover] = useState('');
    useEffect(() => {
        (async () => {
            let datas = JSON.parse(localStorage.getItem("movies-app") || "[]")
            let oldData = []
            datas.forEach((movieObj) => {
                oldData.push(movieObj);
            })
            setFav([...oldData])
        })();
        return () => { };
    }, [])
    useEffect(() => {
        (async () => {
            let datas = JSON.parse(localStorage.getItem("movies-app") || "[]")
            let oldData = []
            datas.forEach((movieObj) => {
                oldData.push(movieObj);
            })
            setFav([...oldData])
        })();
        return () => { };
    }, [favSection])

    const handleAddFav = (movie) => {
        setTimeout(() => {

            let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
            oldData = oldData.filter((m) => m.id !== movie.id)
            localStorage.setItem("movies-app", JSON.stringify(oldData));
            setFav([...oldData])
            changeFavSection([...oldData])
            SetAnimate(false)
        }, 1000)
    }
    const [animate, SetAnimate] = useState(false)
    return (
        <>
            <div className="navbar">
                <div className="home">
                    <button><i class="fa-solid fa-house"></i> <span>Home</span></button>
                    <button><i className="fa-solid fa-magnifying-glass"></i> <span>Search</span></button>
                </div>
                <div className="wrapper">
                    <div className="library">
                        <div className="lib">
                            <div id='your'>
                                <i className="fa-solid fa-bars"></i> <span>Favourites</span>
                            </div>
                        </div>
                        {
                            fav.map((movieObj) => (

                                <div className="movie-details" onMouseEnter={() => { SetHover(movieObj.id) }} onMouseLeave={() => { SetHover(''); SetAnimate(false) }}>
                                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt="" />
                                    <div className="title">
                                        <p className='title-head'>{movieObj.title}</p>
                                    </div>
                                    {
                                        hover === movieObj.id &&
                                        <div
                                            className={animate ? "nav-fav active" : "nav-fav"}
                                            onClick={() => { handleAddFav(movieObj); SetAnimate(true) }}
                                        >
                                            {
                                                animate ?
                                                <i className="fa-regular fa-heart fa-xl"></i> :

                                                    <i className="fa-solid fa-heart fa-xl" ></i>
                                            }
                                        </div>
                                    }
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
