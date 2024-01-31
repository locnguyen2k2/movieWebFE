import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

function ListMovie(props) {
    const movie = props.limit != undefined ? props.data.slice(0, props.limit) : props.data;
    return (
        <div className="trendding" id="movies" target="movies">
            <h3 className="text-white title d-flex p-2 m-1 justify-content-center position-relative">
                {props.title}
                <Link
                    to={
                        props.title === 'All' ? '/movies/all' :
                            props.title === 'Trending' ? '/movies/trendding' :
                                props.title === 'Newest' ? '/movies/new' : ''
                    }
                    className="position-absolute end-0 text-secondary fs-5">
                    More ...
                </Link>
            </h3>
            <div className="cards position-relative row row-cols-2 row-cols-md-4 row-cols-xl-5">
                {
                    movie ?
                        movie.map((movie, index) => {
                            return (
                                <MovieCard
                                    key={index + 1}
                                    id={movie.id}
                                    title={movie.title}
                                    description={movie.description}
                                    name={movie.name}
                                    image={movie.image}
                                />
                            )
                        })
                        : <h1>Not Found</h1>
                }
            </div>
        </div>
    )
}

export default ListMovie;