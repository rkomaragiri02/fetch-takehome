import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  initialState?: boolean;
  label?: string;
  onToggle?: (isFavorited: boolean) => void;
}

const FavoriteButton = ({
  initialState = false,
  onToggle,
}: FavoriteButtonProps) => {
  const [isFavorited, setIsFavorited] = useState(initialState);

  const handleClick = () => {
    const newState = !isFavorited;
    setIsFavorited(newState);
    onToggle?.(newState);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className="hover:bg-transparent"
    >
      <Heart
        className={cn(
          "h-6 w-6 transition-colors",
          isFavorited
            ? "fill-red-500 stroke-red-500"
            : "stroke-gray-500 hover:stroke-red-500",
        )}
        aria-label="Heart Icon"
      ></Heart>
    </Button>
  );
};

export default FavoriteButton;
