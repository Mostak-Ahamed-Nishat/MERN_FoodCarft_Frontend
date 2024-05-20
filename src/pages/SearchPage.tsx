import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  const { city } = useParams();

  const { results, isLoading } = useSearchRestaurants(city);

  return (
    <div>
      {results?.data.map((restaurant) => (
        <h1>{restaurant.restaurantName}</h1>
      ))}
    </div>
  );
}
