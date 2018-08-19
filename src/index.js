import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Default from './components/Default/Default';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Default />, document.getElementById('root'));
registerServiceWorker();
