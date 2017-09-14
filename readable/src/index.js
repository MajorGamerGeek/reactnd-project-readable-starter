import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import Store from './store/';

import './index.css';

ReactDOM.render(
	<Provider store={Store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();