import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Chest, Log, LandingPage, Auth, NotFound, Dashboard } from "./pages"
import './index.css';

import theme from "./theme"
import reportWebVitals from './reportWebVitals';

import SidebarTemplate from './templates/SidebarTemplate';
import EmptyTemplate from './templates/EmptyTemplate'
import LoginTemplate from './templates/LoginTemplate';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter  >
        <Routes >
          <Route path='/' element={<EmptyTemplate children={<LandingPage />} />} />
          <Route path="/auth" element={<LoginTemplate children={<Auth />} />} />
          <Route path="/logs" element={<SidebarTemplate titlePage="Histórico de Logs" logoPage="history" children={<Log />} />} />
          <Route path="/chest" element={<SidebarTemplate titlePage="Items do Baú" logoPage="view_in_ar" children={<Chest />} />} />
          <Route path="/dashboard" element={<SidebarTemplate titlePage="Dashboard" logoPage="dashboard" children={<Dashboard />} />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
