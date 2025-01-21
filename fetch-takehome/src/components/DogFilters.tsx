import { Check, ChevronDown } from "lucide-react";
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
import { useAppStore } from "@/store";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface DogFiltersProps {
  breeds: string[];
}

export function DogFilters({ breeds }: DogFiltersProps) {
  const selectedBreed = useAppStore((state) => state.selectedBreed);
  const onBreedSelect = useAppStore((state) => state.setSelectedBreed);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-4 py-4">
        <h2 className="text-lg font-semibold">Filters</h2>
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Breed{" "}
                <span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </span>
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
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
                      onClick={() => {
                        onBreedSelect(breed);
                        setCurrentPage(1);
                      }}
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
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
}
