import { DogFilters } from "@/components/DogFilters";
import DogProfiles from "@/components/DogProfiles";
import DogSortOptions from "@/components/DogSortOptions";
import { SidebarProvider } from "@/components/ui/sidebar";
import useDogBreeds from "@/hooks/useDogBreeds";
import useDogs from "@/hooks/useDogs";
import { useState } from "react";

const HomePage = () => {
  const dogBreedQuery = useDogBreeds();

  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const dogQuery = useDogs({
    filters: {
      breeds: selectedBreed === "" ? [] : [selectedBreed],
      sort: "breed:asc",
    },
  });

  const breeds = dogBreedQuery.isSuccess ? dogBreedQuery.data : [];
  const filteredDogs = dogQuery?.data;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen justify-between">
        <DogFilters
          breeds={breeds}
          selectedBreed={selectedBreed}
          onBreedSelect={setSelectedBreed}
        />
        {dogQuery.isPending ? (
          <span>Loading</span>
        ) : dogQuery.isError ? (
          <span>Error Fetching Dogs</span>
        ) : (
          <DogProfiles total={1000} dogs={filteredDogs} />
        )}
        <DogSortOptions />
      </div>
    </SidebarProvider>
  );
};

export default HomePage;
