import { useNavigate } from "react-router";
import { Button } from "./ui/button";

const FindMatchButton = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky bottom-8 flex justify-end px-6">
      <Button
        size="lg"
        variant="destructive"
        onClick={() => navigate("/favourites")}
        className="text-md"
      >
        Find your new best friend!
      </Button>
    </div>
  );
};

export default FindMatchButton;
