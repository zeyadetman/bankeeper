import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Day from './components/Day/Day';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(<Day />, document.getElementById('root'));
registerServiceWorker();
