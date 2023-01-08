import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducer/authReducer';
import modunReducer from './reducer/modunReducer';
import homeReducer from './reducer/homeReducer';
import lessonReducer from './reducer/lessonReducer';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    auth: authReducer,
    modun: modunReducer,
    home: homeReducer,
    lesson: lessonReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
