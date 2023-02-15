import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import RootReducer from './Reducers/RootReducer';

const persistedReducer = persistReducer({
    key: 'root',
    storage
  },
  RootReducer()
);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));

const persistor = persistStore(store);

export { store, persistor };
