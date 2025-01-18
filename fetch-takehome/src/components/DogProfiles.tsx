import React from "react";

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
import useDogs from "@/hooks/useDogs";

const ITEMS_PER_PAGE = 6;

const DogProfiles = () => {
  const { data, isSuccess } = useDogs();

  const dogs = isSuccess ? data : [];

  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(dogs.length / ITEMS_PER_PAGE);

  // Calculate the current page's dogs
  const currentDogs = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return dogs.slice(start, end);
  }, [currentPage]);

  // Generate page numbers to display
  const getPageNumbers = React.useCallback(() => {
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

  return (
    <div className="container mx-auto space-y-8 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Our Dogs</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
