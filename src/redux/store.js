// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; 
// import authReducer from './slices/authSlice';
// import userRoleReducer from './slices/userRoleSlice';
// import passwordResetReducer from './slices/passwordResetSlice'; 
// import { baseApi } from './api/baseApi';
// import { setupListeners } from '@reduxjs/toolkit/query';

// // Redux Persist configuration
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth', 'userRole'],  
// };

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedUserRoleReducer = persistReducer(persistConfig, userRoleReducer);

// export const store = configureStore({
//   reducer: {
//     auth: persistedAuthReducer,
//     userRole: persistedUserRoleReducer,
//     [baseApi.reducerPath]: baseApi.reducer,
//     passwordReset: passwordResetReducer,  
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(baseApi.middleware),
// });

// setupListeners(store.dispatch)
// export const persistor = persistStore(store);


import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import userRoleReducer from './slices/userRoleSlice';
import passwordResetReducer from './slices/passwordResetSlice';
import { baseApi } from './api/baseApi';
import { setupListeners } from '@reduxjs/toolkit/query';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'userRole'],
  blacklist: [baseApi.reducerPath]
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedUserRoleReducer = persistReducer(persistConfig, userRoleReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    userRole: persistedUserRoleReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    passwordReset: passwordResetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(baseApi.middleware),
  // Set devTools to true for development
  devTools: true,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);