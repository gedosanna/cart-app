import React from 'react'
import ReactDOM from 'react-dom'
import './style/main.scss';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './redux/store';

const store = configureStore();

const Root = () =>
    <Provider store={store}>
        <App />
    </Provider>

ReactDOM.render(
  <Root />,
  document.getElementById('app')
)