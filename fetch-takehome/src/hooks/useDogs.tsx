import { useQuery } from "@tanstack/react-query";
import useAuthHTTPClient from "./useAuthHTTPClient";
import { DogList } from "@/types/dogList";
import { Dog } from "@/types/dog";

const useDogs = () => {
  const authClient = useAuthHTTPClient();

  const { data } = useQuery<DogList>({
    queryKey: ["dogIDs"],
    queryFn: () => authClient.get("dogs/search").then((res) => res.data),
  });

  const dogIDs = data?.resultIds;

  const query = useQuery<Dog[]>({
    queryKey: ["dogs", dogIDs],
    queryFn: () => authClient.post("dogs", dogIDs).then((res) => res.data),
    enabled: !!dogIDs,
  });

  return query;
};

export default useDogs;
