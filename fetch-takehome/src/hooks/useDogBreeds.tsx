import { useQuery } from "@tanstack/react-query";
import useAuthHTTPClient from "./useAuthHTTPClient";

const useDogBreeds = () => {
  const authClient = useAuthHTTPClient();

  const query = useQuery<string[]>({
    queryKey: ["dogBreed"],
    queryFn: () => authClient.get("/dogs/breeds"),
  });

  return query;
};

export default useDogBreeds;
