import React from 'react';
import App from './app';
import {store} from './store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
// @ts-ignore
import {createRoot} from 'react-dom/client';
import {httpInjectStore} from "./instants/axiosClient";

httpInjectStore(store);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

serviceWorker.unregister();
