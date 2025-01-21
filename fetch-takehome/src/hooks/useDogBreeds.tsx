import { useQuery } from "@tanstack/react-query";
import useAuthHTTPClient from "./useAuthHTTPClient";

const useDogBreeds = () => {
  const authClient = useAuthHTTPClient();

  const query = useQuery<string[]>({
    queryKey: ["dogBreed"],
    queryFn: () =>
      authClient.get("/dogs/breeds").then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      }),
  });

  return query;
};

export default useDogBreeds;
