
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './style/style.css';
import "./App.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Game from './components/pages/Game'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/layout/Header'

import { AppContext } from './context/context'
import PrivateRoute from './components/auth/private-route';

function App() {
  let HOST = window.location.origin.replace(/^http/, 'ws')
  const ws = new WebSocket(process.env.REACT_APP_BACKEND_WS_URL || HOST);

  useEffect(() => {
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      console.log(message)
    }

    ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss

    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Game} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
