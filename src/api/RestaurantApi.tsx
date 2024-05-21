import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";
import { toast } from "sonner";
const APP_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const searchRestaurantRequest =
    async (): Promise<RestaurantSearchResponse> => {
      const params = new URLSearchParams();

      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedCuisines", searchState.selectedCuisines.join(","));
      params.set("sortOption", searchState.sortOption);

      const response = await fetch(
        `${APP_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("No Restaurant found!");
      }
      return response.json();
    };

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery(["searchRestaurantData", searchState], searchRestaurantRequest, {
    enabled: !!city,
  });

  if (isError) {
    toast.error("No Restaurant found!");
  }

  return { results, isLoading };
};
