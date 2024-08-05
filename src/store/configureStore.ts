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
import { rootSaga } from './rootSaga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'],
};

const persistedReducer = injectedReducers => {
  return persistReducer(persistConfig, createReducer(injectedReducers));
};

function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer: injectedReducers => persistedReducer(injectedReducers),
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: persistedReducer({}),
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

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}

export const { store, persistor } = configureAppStore();
