import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { Chest, Log } from "./pages"

import theme from "./theme"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom';
import MainTemplate from './templates/MainTemplate';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  { path: "/", element: <Log /> },
  { path: "/chest", element: <Chest /> }
])

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<MainTemplate children={<Log />} />} />
          <Route path="/chest" element={<MainTemplate children={<Chest />} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
