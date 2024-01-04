import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/css/style.css';
import './assets/style/scss/style.scss';
import App from './App';
import reportWebVitals from './a supprimer/reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
