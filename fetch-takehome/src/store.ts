import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppStore {
  selectedBreed: string;
  currentPage: number;
  favourites: string[];
  sort: "breed:asc" | "breed:desc";
}

interface Actions {
  setCurrentPage: (page: AppStore["currentPage"]) => void;
  setSelectedBreed: (breed: AppStore["selectedBreed"]) => void;
  setSort: (sortType: AppStore["sort"]) => void;
  appendFavourites: (dogID: string) => void;
}

export const useAppStore = create<AppStore & Actions>()(
  persist(
    (set) => ({
      selectedBreed: "",
      currentPage: 1,
      sort: "breed:asc",
      favourites: [],
      setCurrentPage: (page) => set(() => ({ currentPage: page })),
      setSelectedBreed: (breed) => set(() => ({ selectedBreed: breed })),
      setSort: (sortType) => set(() => ({ sort: sortType })),
      appendFavourites: (dogID) =>
        set((state) => ({ favourites: [...state.favourites, dogID] })),
    }),
    { name: "dog store" },
  ),
);
