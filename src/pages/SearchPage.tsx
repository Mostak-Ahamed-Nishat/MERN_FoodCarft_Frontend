import { useParams } from "react-router-dom";

export default function SearchPage() {
  const { city } = useParams();

  return (
    <div>
      <p>Your are looking Restaurant for {city}</p>
    </div>
  );
}
