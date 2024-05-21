import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchForm } from "../components/SearchBar";

//for search by cuisine or restaurant name
export type SearchState = {
  searchQuery: string;
};

export default function SearchPage() {
  const { city } = useParams();
  //For searching by cuisine name or restaurant
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });

  //Search onSubmit handler
  const setSearchQuery = (searchFormData: SearchForm) => {
    //Store the search query data
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  //Searchbox reset handler
  const resetSearch = () => {
    setSearchQuery((previousState) => ({
      ...previousState,
      setSearhState: "",
    }));
  };

  const { results, isLoading } = useSearchRestaurants(searchState,city);

  if (isLoading) {
    <span>Loading....</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 py-10">
      <div id="cuisines-list">insert cuisines here</div>
      <div id="main-content" className="flex flex-col ">
        {/* Searchbar component  */}
        <SearchBar
          placeHolder="Search by cuisines or restaurant"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        {/* Searchinfo component  */}
        <SearchResultInfo total={results?.pagination.total} city={city} />
        {results &&
          results.data.map((restaurant) => (
            <SearchResultCard restaurant={restaurant} />
          ))}
      </div>
    </div>
  );
}
