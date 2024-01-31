import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import {
    Account,
    HomePage,
    Movie,
    About,
    DefaultLayout,
    AdminLayout,
    User,
    Actor,
    Director,
    Category
} from "./screens";
const routes = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: '/',
                element: <DefaultLayout />,
                children: [
                    {
                        path: '/',
                        element: <HomePage />
                    },
                    {
                        path: 'about',
                        element: <About />
                    },
                    // Movie
                    {
                        path: 'movies',
                        element: <Movie.Movies />
                    },
                    {
                        path: 'movies/:category',
                        element: <Movie.Movies />
                    },
                    {
                        path: 'movie/:id',
                        element: <Movie.DetailMovie />
                    },
                    // Account
                    {
                        path: 'login',
                        element: <Account.Login />
                    },
                    {
                        path: 'logout',
                        element: <Account.Logout />
                    },
                    {
                        path: 'profile',
                        element: <Account.Profile />
                    },
                    {
                        path: 'register',
                        element: <Account.Register />
                    },
                    // Admin 
                    {
                        path: 'admin',
                        element: <AdminLayout />,
                        children: [
                            {
                                path: 'users',
                                element: <User.ListUser />
                            },
                            {
                                path: 'movies',
                                element: <Movie.TableMovie filter={'all'} />,
                            },
                            {
                                path: 'movies/edit/:id',
                                element: <Movie.EditMovie />,
                            },
                            { path: 'movies/:id', element: <Movie.DetailMovie /> },
                            {
                                path: 'movies/add',
                                element: <Movie.AddMovie />
                            },
                            {
                                path: 'actors',
                                element: <Actor.TableActor />
                            },
                            {
                                path: 'actors/edit/:id',
                                element: <Actor.EditActor />
                            },
                            {
                                path: 'actors/:id',
                                element: <Actor.DetailActor />
                            },
                            {
                                path: 'actors/add',
                                element: <Actor.AddActor />
                            },
                            {
                                path: 'actors/add/:option',
                                element: <Actor.AddActor />
                            },
                            {
                                path: 'directors',
                                element: <Director.TableDirector />
                            },
                            {
                                path: 'directors/add',
                                element: <Director.AddDirector />
                            },
                            {
                                path: 'directors/add/:option',
                                element: <Director.AddDirector />
                            },
                            {
                                path: 'directors/edit/:id',
                                element: <Director.EditDirector />
                            },
                            {
                                path: 'directors/:id',
                                element: <Director.DetailDirector />
                            },
                            {
                                path: 'categories',
                                element: <Category.TableCategory />
                            },
                            {
                                path: 'categories/add',
                                element: <Category.AddCategory />
                            },
                            {
                                path: 'categories/edit/:id',
                                element: <Category.EditCategory />
                            },

                        ]
                    }
                ]
            },
        ]
    },
    {
        path: '*',
        element: <h1>Not Found</h1>
    }
]);

export default routes;