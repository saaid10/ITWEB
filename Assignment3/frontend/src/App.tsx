import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Game from './components/pages/Game'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/layout/Header'

import { AppContext } from './context/context'


function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Game} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
