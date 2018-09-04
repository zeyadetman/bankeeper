import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import Home from './components/Home/Home';
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
    <BrowserRouter><Home /></BrowserRouter>, 
    document.getElementById('root'));
registerServiceWorker();
