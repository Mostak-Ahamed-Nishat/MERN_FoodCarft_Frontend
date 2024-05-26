import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetUser } from "@/api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

export default function CheckoutButton({
  onCheckout,
  disabled,
  isLoading,
}: Props) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetUser();
  
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  //If the user not loggedin redirect to auth page
  if (!isAuthenticated) {
    return (
      <Button className="flex flex-1 bg-orange-500" onClick={onLogin}>
        Login to check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return (
      <div className="flex justify-center align-middle items-center">
        <Loader />
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
}
