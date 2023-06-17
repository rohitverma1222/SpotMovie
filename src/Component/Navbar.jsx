import React, { useState, useEffect } from 'react'


export default function Navbar({ favSection }) {

    const [fav, setFav] = useState(favSection);
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
    },[favSection])
    return (
        <>
            <div className="navbar">
                <div className="home">
                    <button><i className="fa-solid fa-house"></i> Home</button>
                    <button><i className="fa-solid fa-magnifying-glass"></i> Search</button>
                </div>
                <div className="wrapper">
                    <div className="library">
                        <div className="lib">
                            <div id='your'>
                                <i className="fa-solid fa-bars"></i> Your Favourite
                            </div>
                        </div>
                        {
                            fav.map((movieObj) => (

                                <div className="movie-details">
                                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt="" />
                                    <div className="title">
                                        <p className='title-head'>{movieObj.title}</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
