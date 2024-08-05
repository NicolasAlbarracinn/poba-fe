import { createInjectorsEnhancer } from 'redux-injectors';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import { createReducer } from './rootReducer';

// Define the persist config for the auth reducer
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'],
};

// Create a persisted reducer
const persistedReducer = injectedReducers => {
  return persistReducer(persistConfig, createReducer(injectedReducers));
};

function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer: injectedReducers => persistedReducer(injectedReducers),
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: persistedReducer({}), // Initially pass an empty object
    middleware: defaultMiddleware =>
      defaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  const persistor = persistStore(store);

  //sagaMiddleware.run(rootSaga); In case i need some saga to run on the start

  return { store, persistor };
}

export const { store, persistor } = configureAppStore();
