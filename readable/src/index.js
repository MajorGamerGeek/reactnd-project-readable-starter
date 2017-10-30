import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import Store from './store/';

import './index.css';

ReactDOM.render(
	<Provider store={Store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();