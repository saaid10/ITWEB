import ReactDOM from 'react-dom';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import {DualNBack} from "../components/dual-n-back";


it('sums numbers', () => {
    expect(1+2).toEqual(3);
    expect(2+2).toEqual(4);
});


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DualNBack />, div);
    ReactDOM.unmountComponentAtNode(div);
});
export {};
