import React from 'react';
import { useNavigate} from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';



// Adds Auth0 for user authentication
const Auth0ProviderWithHistory = ({ children }) => {
  // const domain =   process.env.REACT_APP_AUTH0_DOMAIN;
  // const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const domain="dev-q1it8d7tpmvooks0.us.auth0.com"
  const clientId="YbAMdp7aPkEBqxLGvLshcxaJfNCChJwX"


  const navigate = useNavigate(); 

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;

