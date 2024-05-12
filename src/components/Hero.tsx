import HeroImage from "./../assets/hero.jpg";

export default function Hero() {
  return (
    <div className="relative">
      <img
        src={HeroImage}
        alt="Food Craft Hero image"
        className="w-full max-h-[700px] object-cover bg-blend-multiply"
      />
      <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
    </div>
  );
}
