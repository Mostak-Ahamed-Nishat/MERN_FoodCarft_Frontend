import HeroImage from "./../assets/hero.jpg";

export default function Hero() {
  return (
    <div className="relative">
      <img
        src={HeroImage}
        alt="Food Craft Hero image"
        className="w-full max-h-[700px] object-cover bg-blend-multiply"
      />
      <div className="absolute inset-0 bg-gray-800 opacity-60 rounded-md"></div>
      <div className="container absolute inset-0 flex flex-col justify-center gap-2 sm:gap-5 text-center mb-16">
        <p className=" text-white ">WIDE OPTIONS OF CHOICE</p>
        <h2 className=" text-orange-500 text-2xl sm:text-5xl font-bold">
          ENJOY YOUR <span className="">FOOD AT FOOD CRAFT</span>
        </h2>
        <p className=" text-white">
          Together creeping heaven upon third dominion be upon won't darkness
          rule land behold it created good saw after she'd Our set living. Signs
          midst dominion creeper morning.
        </p>
      </div>
    </div>
  );
}
