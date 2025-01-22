import { FC, useCallback } from "react";

import { DogCard } from "@/components/DogCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dog } from "@/types/dog";
import { useStore } from "@/store";

const ITEMS_PER_PAGE = 25;

interface DogProfilesProps {
  dogs: Dog[] | undefined;
  total: number;
}

const DogProfiles: FC<DogProfilesProps> = ({ dogs, total }) => {
  // const [currentPage, setCurrentPage] = React.useState(1);
  const currentPage = useStore((state) => state.currentPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const selectedBreed = useStore((state) => state.selectedBreed);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Calculate the current page's dogs
  const currentDogs = dogs ? dogs : [];

  // Generate page numbers to display
  const getPageNumbers = useCallback(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push("ellipsis");
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the list when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 'container mx-auto space-y-8 px-8 py-8'
  // text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl

  return (
    <div className="container px-8 py-8">
      <h1 className="mb-8 px-9 text-3xl font-bold tracking-tighter sm:items-center sm:text-4xl md:text-5xl">
        {selectedBreed === "" ? "All Breeds" : selectedBreed}
      </h1>

      {/* grid gap-6 md:grid-cols-2 lg:grid-cols-3 */}

      <div className="flex flex-wrap justify-center gap-6 pb-4">
        {currentDogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {getPageNumbers().map((pageNumber, index) => (
            <PaginationItem key={index}>
              {pageNumber === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNumber as number);
                  }}
                  isActive={currentPage === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DogProfiles;
