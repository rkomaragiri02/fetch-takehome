import useMatchedDogs from "@/hooks/useMatchedDogs";
import { useStore } from "@/store";
import Error from "./ErrorPage";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DogCard } from "@/components/DogCard";
import { Dog } from "@/types/dog";
import { useNavigate } from "react-router";
import Loader from "@/components/Loader";

const MatchPage = () => {
  const favouriteList = useStore((state) => state.favourites);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useMatchedDogs({
    favouriteList: favouriteList,
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [isMatched, setIsMatched] = useState(false);

  const handleFlip = () => {
    if (!isMatched) {
      setIsFlipped(true);

      if (!isFlipped) {
        setTimeout(() => {
          setIsMatched(true);
        }, 1000);
      }
    }
  };

  if (isError) return;
  <Error
    message="Could not fetch match"
    reset={() => window.location.reload()}
  />;

  if (isLoading) return <Loader />;

  const matchedDog: Dog = data
    ? data[0]
    : { age: 0, breed: "", id: "", img: "", name: "", zip_code: "" };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 p-4">
      <button
        className="p-2 text-muted-foreground"
        onClick={() => navigate("/home")}
      >
        &larr; Return to browsing
      </button>
      <h1 className="pb-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Your match
      </h1>
      <p className="pb-6 text-muted-foreground">
        It's time! Tap or click the card to find your new best friend
      </p>
      <div
        className={`relative h-96 w-64 cursor-pointer [perspective:1000px] ${isMatched ? "opacity-60" : ""} `}
        onClick={handleFlip}
      >
        <div
          className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""} `}
        >
          {/* Front of card */}
          <Card className="absolute flex h-full w-60 flex-col items-center overflow-hidden [backface-visibility:hidden]">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-zinc-100">
              <img
                width="256"
                alt="Paw-print"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Paw-print.svg/256px-Paw-print.svg.png?20110605041351"
              />
            </div>
          </Card>

          {/* Back of card */}

          <DogCard
            dog={matchedDog}
            className="[backface-visibility:hidden] [transform:rotateY(180deg)]"
          />
        </div>

        {/* Match indicator */}
        {isMatched && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-white/80 px-4 py-2 text-xl font-bold text-green-500">
              Matched!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchPage;
