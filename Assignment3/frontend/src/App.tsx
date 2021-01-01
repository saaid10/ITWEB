import React, { useEffect } from 'react';
import './style/style.css';
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Game from './components/pages/Game'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/layout/Header'
import PrivateRoute from './components/auth/private-route';
import { HighscoreDisplay } from "./components/highscore-display";
import { AddNewHighScoreOperation } from './state/highscore/operations';
import { highScore } from './state/highscore/types';
import { AppId } from './constants';

function App() {
  let HOST = window.location.origin.replace(/^http/, 'ws')

  const connect = () => {
    const ws = new WebSocket(process.env.REACT_APP_BACKEND_WS_URL || HOST);
    let interval = setInterval(function(){ws.send("ping")}, 50e3);
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      console.log(message)

      const highscore: highScore = message as highScore;
      if (highscore)
        AddNewHighScoreOperation(highscore);
    }

    ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      connect();
    }
  }
  useEffect(() => {
    connect();
  });

  return (
    <div className="App" id={AppId} tabIndex={-1}>
      <BrowserRouter>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Game} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/highscore" component={HighscoreDisplay} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
