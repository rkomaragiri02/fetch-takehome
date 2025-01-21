import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

type SortDirection = "asc" | "desc";

interface DogSortOptionsProps {
  onSortChange?: (direction: SortDirection) => void;
}

const DogSortOptions = ({ onSortChange = () => {} }: DogSortOptionsProps) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSortChange = (direction: SortDirection) => {
    setSortDirection(direction);
    onSortChange(direction);
  };

  return (
    <div className="px-8 py-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[180px] justify-between">
            {sortDirection === "asc" ? (
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
            onClick={() => handleSortChange("asc")}
            className="cursor-pointer"
          >
            <ArrowUpAZ className="mr-2 h-4 w-4" />
            Ascending
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSortChange("desc")}
            className="cursor-pointer"
          >
            <ArrowDownAZ className="mr-2 h-4 w-4" />
            Descending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DogSortOptions;
