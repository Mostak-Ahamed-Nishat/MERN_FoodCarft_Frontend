import { BallTriangle } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="flex justify-center items-center text-center h-screen">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="orange"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
