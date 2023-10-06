import * as React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './src/App';
import { persistStore } from 'redux-persist';
import store from './src/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './src/static/css/global.css';
import './src/static/css/ui.css';
import './src/static/css/layout.less';

// localStorage.clear()

const persistor = persistStore(store);

const container = document.getElementById('root')
const root = createRoot(container!)

if (container.hasChildNodes()) {
    const hydrate = hydrateRoot(container, <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>)
    hydrate.render(<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>)
} else {
    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}