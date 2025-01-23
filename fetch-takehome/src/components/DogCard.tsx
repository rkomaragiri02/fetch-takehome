import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dog } from "@/types/dog";
import FavoriteButton from "./FavoriteButton";
import { useStore } from "@/store";

interface DogCardProps {
  dog: Dog;
  className?: string;
}

export function DogCard({ dog, className = "" }: DogCardProps) {
  const toggleFavourite = useStore((state) => state.toggleFavourite);
  const favourites = useStore((state) => state.favourites);

  return (
    <Card
      className={`flex w-60 flex-col items-center overflow-hidden ${className}`}
    >
      <div className="relative h-60 w-60 overflow-hidden">
        <img
          src={dog.img || "/placeholder.svg"}
          alt={`Photo of ${dog.name}`}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-6">
          <h3>{dog.name}</h3>
          <span className="text-base font-normal text-muted-foreground">
            {dog.age} years old
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <p className="font-medium">{dog.breed}</p>
        <div className="flex items-center">
          <FavoriteButton
            onToggle={() => toggleFavourite(dog.id)}
            initialState={favourites.includes(dog.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
