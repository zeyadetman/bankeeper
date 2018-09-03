import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Day from './components/Day/Day';
import registerServiceWorker from './registerServiceWorker';
import Home from './components/Home/Home';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
