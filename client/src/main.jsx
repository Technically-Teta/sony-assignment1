import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Auth0ProviderWithHistory>
  <App />
  </Auth0ProviderWithHistory>
   
  </React.StrictMode>,
)
