/* eslint-disable no-underscore-dangle */
import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootSaga from '../sagas';
import { createRootReducer } from '../state';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['nav'],
};

const history = createBrowserHistory();
const rootReducer = createRootReducer(history);
const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const composeSetup =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const enhancer = composeSetup(applyMiddleware(sagaMiddleware, routerMiddleware(history)));

const store = {
    ...createStore(pReducer, enhancer),
    sagas: Object.keys(rootSaga).map(sagaName => sagaMiddleware.run(rootSaga[sagaName])),
};

const persistor = persistStore(store);

export { persistor, store, history };
