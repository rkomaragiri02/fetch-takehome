import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

interface DogFiltersProps {
  breeds: string[];
  selectedBreed: string | null;
  onBreedSelect: (breed: string) => void;
}

export function DogFilters({
  breeds,
  selectedBreed,
  onBreedSelect,
}: DogFiltersProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-4 py-4">
        <h2 className="text-lg font-semibold">Filters</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Breed</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-1">
              <Button
                variant="ghost"
                onClick={() => onBreedSelect("")}
                className={cn(
                  "w-full justify-start",
                  !selectedBreed && "bg-muted",
                )}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    !selectedBreed ? "opacity-100" : "opacity-0",
                  )}
                />
                All Breeds
              </Button>
              {breeds.map((breed) => (
                <Button
                  key={breed}
                  variant="ghost"
                  onClick={() => onBreedSelect(breed)}
                  className={cn(
                    "w-full justify-start",
                    selectedBreed === breed && "bg-muted",
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedBreed === breed ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {breed}
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
