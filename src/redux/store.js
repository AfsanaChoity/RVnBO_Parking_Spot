import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from './slices/authSlice';
import userRoleReducer from './slices/userRoleSlice';
import { authApi } from './api/authApi';
import passwordResetReducer from './slices/passwordResetSlice'; 

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'userRole'],  
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedUserRoleReducer = persistReducer(persistConfig, userRoleReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    userRole: persistedUserRoleReducer,
    [authApi.reducerPath]: authApi.reducer,
    passwordReset: passwordResetReducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export const persistor = persistStore(store);
export { store };
