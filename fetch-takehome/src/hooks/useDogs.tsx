import { useQuery } from "@tanstack/react-query";
import useAuthHTTPClient from "./useAuthHTTPClient";
import { DogList } from "@/types/dogList";
import { Dog } from "@/types/dog";

interface useDogsProps {
  filters?: Filter;
  from: number;
}

interface Filter {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  sort?: string;
}

const useDogs = ({ filters, from }: useDogsProps) => {
  const authClient = useAuthHTTPClient();

  const { data, isSuccess } = useQuery<DogList>({
    queryKey: ["dogIDs", filters, from],
    queryFn: () =>
      authClient
        .get(`dogs/search`, {
          params: { ...filters, from },
        })
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          }
        }),
  });

  const dogIDs = data?.resultIds;
  const total = isSuccess ? data?.total : 0;

  const query = useQuery<Dog[]>({
    queryKey: ["dogs", dogIDs],
    queryFn: () =>
      authClient.post("dogs", dogIDs).then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      }),
    enabled: !!dogIDs,
  });

  return { query, total };
};

export default useDogs;
