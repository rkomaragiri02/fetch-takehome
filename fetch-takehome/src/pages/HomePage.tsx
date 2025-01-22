import { DogFilters } from "@/components/DogFilters";
import DogProfiles from "@/components/DogProfiles";
import DogSortOptions from "@/components/DogSortOptions";
import FindMatchButton from "@/components/FindMatchButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import useDogBreeds from "@/hooks/useDogBreeds";
import useDogs from "@/hooks/useDogs";
import { useStore } from "@/store";

const ITEMS_PER_PAGE = 25;

const HomePage = () => {
  const dogBreedQuery = useDogBreeds();

  const selectedBreed = useStore((state) => state.selectedBreed);
  const currentPage = useStore((state) => state.currentPage);
  const sort = useStore((state) => state.sort);
  const favouritesList = useStore((state) => state.favourites);

  const { query: dogQuery, total } = useDogs({
    filters: {
      breeds: selectedBreed === "" ? [] : [selectedBreed],
      sort: sort,
    },
    from: (currentPage - 1) * ITEMS_PER_PAGE,
  });

  const breeds = dogBreedQuery.isSuccess ? dogBreedQuery.data : [];
  const filteredDogs = dogQuery?.data;

  return (
    <>
      <SidebarProvider>
        <div className="relative flex min-h-screen w-screen justify-between">
          <DogFilters breeds={breeds} />
          {dogQuery.isPending ? (
            <span>Loading</span>
          ) : dogQuery.isError ? (
            <span>Error Fetching Dogs</span>
          ) : (
            <DogProfiles total={total} dogs={filteredDogs} />
          )}
          <DogSortOptions />
        </div>
      </SidebarProvider>
      {favouritesList.length > 0 && <FindMatchButton />}
    </>
  );
};

export default HomePage;
