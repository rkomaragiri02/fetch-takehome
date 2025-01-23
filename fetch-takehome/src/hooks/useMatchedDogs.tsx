import { useQuery } from "@tanstack/react-query";
import useAuthHTTPClient from "./useAuthHTTPClient";
import { Dog } from "@/types/dog";

interface useMatchedDogProps {
  favouriteList: string[];
}

interface MatchRes {
  match: string;
}

const useMatchedDogs = ({ favouriteList }: useMatchedDogProps) => {
  const authClient = useAuthHTTPClient();

  const { data } = useQuery<MatchRes>({
    queryKey: ["matchedDogs"],
    queryFn: () =>
      authClient.post("/dogs/match", favouriteList).then((res) => res.data),
  });

  const matchID = data?.match;

  const query = useQuery<Dog[]>({
    queryKey: ["dogs", matchID],
    queryFn: () =>
      authClient.post("dogs", [matchID]).then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      }),
    enabled: !!matchID,
  });

  return query;
};

export default useMatchedDogs;
