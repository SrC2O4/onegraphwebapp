import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';
import { initialization} from './actions/material';
import {getAll} from './actions/material';


initialization();
getAll(); //该函数放置于MaterialTable会导致API被多次重复请求，放置于此又略显不妥，故标记




ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if(process.env.REACT_APP_SW !== 'true' || process.env.NODE_ENV !== 'production')
    serviceWorker.unregister();
else
    serviceWorker.register();