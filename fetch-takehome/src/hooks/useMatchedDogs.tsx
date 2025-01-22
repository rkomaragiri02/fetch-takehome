import { useQuery } from "@tanstack/react-query";
import useAuthHTTPClient from "./useAuthHTTPClient";

interface useMatchedDogProps {
  favouriteList: string[];
}

const useMatchedDogs = ({ favouriteList }: useMatchedDogProps) => {
  const authClient = useAuthHTTPClient();

  const query = useQuery({
    queryKey: ["matchedDogs"],
    queryFn: () =>
      authClient.post("/dogs/match", favouriteList).then((res) => res.data),
  });

  return query;
};

export default useMatchedDogs;
