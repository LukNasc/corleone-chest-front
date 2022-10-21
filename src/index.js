import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Home, Log } from "./pages"

import theme from "./theme"
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainTemplate from './templates/MainTemplate';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  { path: "/", element: <Log /> },
  { path: "/dashboard", element: <Home /> }
])

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MainTemplate>
        <RouterProvider router={router} />
      </MainTemplate>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
