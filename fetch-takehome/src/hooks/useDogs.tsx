import { useQuery } from "@tanstack/react-query";
import useAuthHTTPClient from "./useAuthHTTPClient";
import { DogList } from "@/types/dogList";
import { Dog } from "@/types/dog";
import { useNavigate } from "react-router";

interface useDogsProps {
  filters?: Filter;
}

interface Filter {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  sort?: string;
}

const useDogs = ({ filters }: useDogsProps) => {
  const authClient = useAuthHTTPClient();
  const navigate = useNavigate();

  const { data } = useQuery<DogList>({
    queryKey: ["dogIDs", filters],
    queryFn: () =>
      authClient
        .get(`dogs/search`, {
          params: filters,
        })
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          }
        }),
  });

  const dogIDs = data?.resultIds;

  const query = useQuery<Dog[]>({
    queryKey: ["dogs", dogIDs],
    queryFn: () =>
      authClient.post("dogs", dogIDs).then((res) => {
        if (res.status === 401) {
          navigate("/");
        } else if (res.status === 200) {
          return res.data;
        }
      }),
    enabled: !!dogIDs,
  });

  return query;
};

export default useDogs;
