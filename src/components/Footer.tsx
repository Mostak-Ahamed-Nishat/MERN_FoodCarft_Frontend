import footerLogo from "../../public/icon-b.png";

export default function Footer() {
  return (
    <div className=" bg-orange-500 py-2 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span>
          <img src={footerLogo} alt="Food craft footer logo" className="h-10" />
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
}
