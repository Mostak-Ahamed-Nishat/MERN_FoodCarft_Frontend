import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

type Props = {};

export default function CheckoutButton({}: Props) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button className="flex flex-1 bg-orange-500" onClick={onLogin}>
        Login to check out
      </Button>
    );
  }

  if (isAuthLoading) {
    return (
      <div className="flex justify-center align-middle items-center">
        <Loader />
      </div>
    );
  }

  return <Button className="flex flex-1 bg-orange-500">Check out</Button>;
}
