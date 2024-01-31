import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieModel from "../../services/MovieModel";
import ListMovie from "../../components/movies/ListMovie";

function Movies() {
    let { category } = useParams();
    const [title, setTitle] = useState('All');
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        switch (category) {
            case "all":
                MovieModel.getListMovies().then((res) => {
                    setMovies(res.data.data);
                    setTitle('All')
                })
                break;
            case 'trendding':
                MovieModel.getTrenddings().then((res) => {
                    setMovies(res.data.data);
                    setTitle('Trenddings')
                })
                break;
            case 'new':
                MovieModel.getNewest().then((res) => {
                    setMovies(res.data.data);
                    setTitle('News')
                })
                break;
            default:
                MovieModel.getListMovies().then((res) => {
                    setMovies(res.data.data);
                    setTitle('All')
                })
                break;
        }
    }, [category])
    return (
        <ListMovie title={title} data={movies} />
    )
}

export default Movies;