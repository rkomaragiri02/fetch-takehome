import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { useStore } from "@/store";
import { Separator } from "./ui/separator";

type SortDirection = "breed:asc" | "breed:desc";

interface DogSortOptionsProps {
  onSortChange?: (direction: SortDirection) => void;
}

const DogSortOptions = ({ onSortChange = () => {} }: DogSortOptionsProps) => {
  const sort = useStore((state) => state.sort);
  const setSort = useStore((state) => state.setSort);

  const handleSortChange = (direction: SortDirection) => {
    setSort(direction);
    onSortChange(direction);
  };

  return (
    <div className="px-8 py-8">
      <DropdownMenu>
        <div className="sticky top-8">
          <h2 className="text-lg font-semibold">Sort by Breed</h2>
          <Separator className="my-4" />
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[180px] justify-between">
              {sort === "breed:asc" ? (
                <>
                  <ArrowUpAZ className="mr-2 h-4 w-4" />
                  Ascending
                </>
              ) : (
                <>
                  <ArrowDownAZ className="mr-2 h-4 w-4" />
                  Descending
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem
              onClick={() => handleSortChange("breed:asc")}
              className="cursor-pointer p-1"
            >
              <ArrowUpAZ className="mr-2 h-4 w-4" />
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortChange("breed:desc")}
              className="cursor-pointer"
            >
              <ArrowDownAZ className="mr-2 h-4 w-4" />
              Descending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default DogSortOptions;
