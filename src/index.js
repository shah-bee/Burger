import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import { Provider } from 'react-redux';

const reducer = combineReducers({ burgerBuilderReducer });

const burgerStore = createStore(burgerBuilderReducer);

const app = (<BrowserRouter>
    <Provider store={burgerStore}>
        <App></App>
    </Provider>
</BrowserRouter>);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
