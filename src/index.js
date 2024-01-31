import React from 'react';
import routes from './router';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes}>
      <BrowserRouter>
      </BrowserRouter>
    </RouterProvider>
  </React.StrictMode>
);


reportWebVitals();
