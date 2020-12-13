import React, {useEffect} from 'react';
import {DualNBack} from './components/dual-n-back';
import "./App.scss";

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

    return (
        <div className="App">
            <DualNBack/>
        </div>
    );
}

export default App;
