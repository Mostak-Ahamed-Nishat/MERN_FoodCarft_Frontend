import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";

export default function MobileNavLinks() {
  const { logout } = useAuth0();
  return (
    <div className="flex flex-col">
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500 py-4"
      >
        User Profile
      </Link>
      <Separator />
      <Link
        className="flex bg-white items-center font-bold hover:text-orange-500 py-4"
        to="/order-status"
      >
        Order Status
      </Link>
      <Separator />
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-orange-500 py-4"
      >
        Manage Restaurant
      </Link>

      <Button
        className="flex items-center px-3 font-bold hover:bg-gray-500"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </div>
  );
}
