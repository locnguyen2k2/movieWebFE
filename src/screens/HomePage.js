import React from "react";
import ListMovie from "../components/movies/ListMovie";
import MovieModel from "../services/MovieModel";
import { useState, useEffect } from "react";
import axios from "axios";
import FoodModel from '../services/FoodModel'

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [trending, setTrending] = useState([]);
    const [newest, setNewest] = useState([]);
    const [foods, setFoods] = useState([])
    useEffect(() => {
        MovieModel.getListMovies().then((res) => {
            setMovies(res.data.data);
        })
        MovieModel.getTrenddings().then((res) => {
            setTrending(res.data.data);
        })
        MovieModel.getNewest().then((res) => {
            setNewest(res.data.data);
        })
        FoodModel.getListFood().then((res) => setFoods(res.data))
    }, [])
    return (
        <>
            {
                foods ?
                    foods.map((item, index) => {
                        return (
                            <div key={index}>
                                {
                                    item[4]
                                }
                            </div>
                        )
                    })
                    : ""
            }
            <div className="movies">
                <ListMovie title="Trending" limit={5} data={trending} />
                <ListMovie title="Newest" limit={5} data={newest} />
                <ListMovie title="All" limit={5} data={movies} />
            </div>
        </>
    )
}

export default HomePage;