import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './style/style.css';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Game from './components/pages/Game'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/layout/Header'

import { AppContext } from './context/context'
import PrivateRoute from './components/auth/private-route';

function App() {



  return (
    <BrowserRouter>
          <Header />
          <Switch>
            <PrivateRoute exact path="/" component={Game} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
    </BrowserRouter>
  );
}

export default App;
