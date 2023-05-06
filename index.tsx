import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import { persistStore } from 'redux-persist';
import store from './src/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '@fortawesome/fontawesome-free/css/all.min.css';

const persistor = persistStore(store);

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)