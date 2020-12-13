 
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './style/style.css';
import "./App.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
        
import Game from './components/pages/Game'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/layout/Header'

import { AppContext } from './context/context'
import PrivateRoute from './components/auth/private-route';  
  
import {DualNBack} from './components/dual-n-back';


function App() {

    const ws = new WebSocket('ws://localhost:4000');

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

  /*
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
  */
  
    return (
        <div className="App">
            <DualNBack/>
        </div>
    );

}

export default App;
