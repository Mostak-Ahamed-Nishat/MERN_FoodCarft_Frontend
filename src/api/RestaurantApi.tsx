import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";
import { toast } from "sonner";
const APP_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?: string) => {
  const searchRestaurantRequest =
    async (): Promise<RestaurantSearchResponse> => {
      const response = await fetch(
        `${APP_BASE_URL}/api/restaurant/search/${city}`
      );

      if (!response.ok) {
        throw new Error("Failed to search restaurant");
      }
      return response.json();
    };

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery(["searchRestaurantData"], searchRestaurantRequest, {
    enabled: !!city,
  });

  if (isError) {
    toast.error("Failed to search restaurant");
  }

  return { results, isLoading };
};
