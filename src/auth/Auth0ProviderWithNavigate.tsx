import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function Auth0ProviderWithNavigate({ children }: Props) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const navigate = useNavigate();

  if (!domain || !clientId || !redirectUri || !audience) {
    throw Error("Unable to initialize auth0. something missing");
  }

  // appState: store some data that we might need later.EX: current url that user on before we redirect to the login

  const onTheTimeThatRedirecting = (appState?: AppState) => {
    //if user successfully created through Auth0 then create user into our DB using auth0 data; user.sub=auth0Id
    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onTheTimeThatRedirecting}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithNavigate;
