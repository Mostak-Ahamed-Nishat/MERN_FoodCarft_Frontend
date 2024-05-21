import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchBar from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SearchForm } from "../components/SearchBar";
import PaginationSelector from "@/components/PaginationSelector";
import CuisineFilter from "@/components/CuisineFilter";
import SortOptionDropdown from "@/components/SortOptionDropdown";

//for search by cuisine or restaurant name
export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

export default function SearchPage() {
  const { city } = useParams();

  //For searching by cuisine name or restaurant
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpended, setIsExpended] = useState<boolean>(false);

  //Selected cuisines list
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  //Search onSubmit handler
  const setSearchQuery = (searchFormData: SearchForm) => {
    //Store the search query data
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  //Searchbox reset handler
  const resetSearch = () => {
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: "",
      page: 1,
    }));
  };

  //Pagination handler
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  //Get the result from API
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  if (isLoading) {
    <span>Loading....</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 py-10">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          onExpandedClick={() => {
            setIsExpended((prevState) => !prevState);
          }}
          isExpanded={isExpended}
        />
      </div>
      <div id="main-content" className="flex flex-col ">
        {/* SearchBar component  */}
        <SearchBar
          placeHolder="Search by cuisines or restaurant"
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
        />
        {/* SearchInfo component  */}
        <div className="flex justify-between flex-col gap-3 lg:flex-row py-4">
          <SearchResultInfo total={results?.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results &&
          results.data.map((restaurant) => (
            <SearchResultCard restaurant={restaurant} />
          ))}
        <PaginationSelector
          page={results?.pagination?.page}
          pages={results?.pagination?.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
