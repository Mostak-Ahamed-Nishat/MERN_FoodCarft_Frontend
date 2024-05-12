import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 z-20 relative py-10">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col g-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600 ">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="Landing image for food craft app" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the Food Craft App for the faster ordering and personalized
            recommendation
          </span>
          <img src={appDownloadImage} alt="Food craft app download image" />
        </div>
      </div>
    </div>
  );
}
