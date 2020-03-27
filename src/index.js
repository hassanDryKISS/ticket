import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/css/CoreCss'
import { Provider } from 'react-redux'
import store from './redux/store'


ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <App />
        </React.Fragment>
    </Provider>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();
