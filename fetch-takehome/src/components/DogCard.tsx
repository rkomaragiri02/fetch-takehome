import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dog } from "@/types/dog";

interface DogCardProps {
  dog: Dog;
}

export function DogCard({ dog }: DogCardProps) {
  return (
    <Card className="w-60 overflow-hidden">
      <div className="relative h-60 w-60 overflow-hidden">
        <img
          src={dog.img || "/placeholder.svg"}
          alt={`Photo of ${dog.name}`}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{dog.name}</span>
          <span className="text-base font-normal text-muted-foreground">
            {dog.age} years old
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">{dog.breed}</p>
        </div>
      </CardContent>
    </Card>
  );
}
