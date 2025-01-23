import { DogCard } from "@/components/DogCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useDogsByID from "@/hooks/useDogsByID";
import { useStore } from "@/store";
import { useNavigate } from "react-router";

const FavouritesPage = () => {
  const favouritesList = useStore((state) => state.favourites);
  const { data, isSuccess, isLoading } = useDogsByID({
    dogIDs: favouritesList,
  });
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <button
        className="p-2 text-muted-foreground"
        onClick={() => navigate("/home")}
      >
        &larr; Return to browsing
      </button>
      <div className="w-full max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Your Favorite Dogs
          </h1>
          <p className="text-muted-foreground">
            Swipe through your selection of beloved furry friends
          </p>
        </div>

        <Carousel
          opts={{
            align: "center",
          }}
          className="mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg"
        >
          {favouritesList.length === 0 ? (
            <p className="rounded-md border border-gray-300 bg-gray-100 p-3 text-center text-muted-foreground">
              It seems you don't have any dogs saved in your favourites list.
              <br /> That's okay, we're sure you'll find one you love soon
              enough ^-^
            </p>
          ) : (
            <>
              <CarouselContent>
                {isLoading && <span>Loading</span>}
                {isSuccess &&
                  data.map((dog) => (
                    <CarouselItem key={dog.id}>
                      <div className="flex justify-center p-1">
                        <DogCard dog={dog} />
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </>
          )}
        </Carousel>

        <p className="text-center text-sm text-muted-foreground">
          Swipe or use arrow buttons to navigate • {isSuccess && data.length}{" "}
          favorites
        </p>
      </div>
      <div className="p-5">
        <Button
          size="lg"
          variant="destructive"
          onClick={() => navigate("match")}
        >
          Find a match
        </Button>
      </div>
    </div>
  );
};

export default FavouritesPage;
