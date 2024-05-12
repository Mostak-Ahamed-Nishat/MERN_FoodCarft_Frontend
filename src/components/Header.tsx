import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

export default function Header() {
  return (
    <div className="border-b-2 border-b-orange-500 py-2 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="Food Craft logo" sizes="" className="h-16" />
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
}
