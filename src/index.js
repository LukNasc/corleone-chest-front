import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';


import { Chest, Log } from "./pages"
import './index.css';

import * as Firebase from './intialize-firebase';

import theme from "./theme"
import reportWebVitals from './reportWebVitals';

import MainTemplate from './templates/MainTemplate';

const root = ReactDOM.createRoot(document.getElementById('root'));

Firebase.initialize();

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
