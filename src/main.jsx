import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';    
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from './redux/store';

import { RouterProvider } from 'react-router';
import router from './routes/Routes'; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>               
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
