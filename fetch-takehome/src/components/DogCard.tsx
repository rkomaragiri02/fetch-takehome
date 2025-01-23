import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dog } from "@/types/dog";
import { useStore } from "@/store";
import { Heart, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface DogCardProps {
  dog: Dog;
  className?: string;
}

export function DogCard({ dog, className = "" }: DogCardProps) {
  const toggleFavourite = useStore((state) => state.toggleFavourite);
  const favourites = useStore((state) => state.favourites);
  const isFavourited = favourites.includes(dog.id);

  return (
    <div className={`w-full max-w-sm ${className}`}>
      <Card>
        <div className="relative aspect-square w-full">
          <img
            src={dog.img || "/placeholder.svg?height=400&width=400"}
            alt={`Photo of ${dog.name}`}
            className="h-full w-full overflow-hidden rounded-t-lg object-cover"
          />
          <Button
            variant="secondary"
            size="icon"
            className={`absolute right-4 top-4 rounded-full ${
              isFavourited
                ? "bg-red-500 text-primary-foreground hover:bg-red-400/90"
                : "bg-background/60 backdrop-blur-sm hover:bg-background/80"
            }`}
            onClick={() => toggleFavourite(dog.id)}
            aria-label={
              isFavourited
                ? `Remove ${name} from favorites`
                : `Add ${name} to favorites`
            }
          >
            <Heart
              className={`h-5 w-5 ${isFavourited ? "fill-current" : ""}`}
            />
          </Button>
        </div>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <div>
            <h3 className="font-semibold leading-none tracking-tight">
              {dog.name}
            </h3>
            <p className="text-sm text-muted-foreground">{dog.breed}</p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{dog.age} years old</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {dog.zip_code}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
