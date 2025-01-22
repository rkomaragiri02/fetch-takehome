import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  selectedBreed: string;
  currentPage: number;
  favourites: string[];
  sort: "breed:asc" | "breed:desc";
}

interface Actions {
  setCurrentPage: (page: Store["currentPage"]) => void;
  setSelectedBreed: (breed: Store["selectedBreed"]) => void;
  setSort: (sortType: Store["sort"]) => void;
  toggleFavourite: (dogID: string) => void;
}

export const useStore = create<Store & Actions>()(
  persist(
    (set) => ({
      selectedBreed: "",
      currentPage: 1,
      sort: "breed:asc",
      favourites: [],
      setCurrentPage: (page) => set(() => ({ currentPage: page })),
      setSelectedBreed: (breed) => set(() => ({ selectedBreed: breed })),
      setSort: (sortType) => set(() => ({ sort: sortType })),
      toggleFavourite: (dogID) =>
        set((state) =>
          state.favourites.includes(dogID)
            ? {
                favourites: state.favourites.filter(
                  (favDogID) => dogID !== favDogID,
                ),
              }
            : { favourites: [...state.favourites, dogID] },
        ),
    }),
    { name: "dog store" },
  ),
);
