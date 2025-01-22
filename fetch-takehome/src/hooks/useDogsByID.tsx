import { Dog } from "@/types/dog";
import { useQuery } from "@tanstack/react-query";
import useAuthHTTPClient from "./useAuthHTTPClient";

const useDogsByID = ({ dogIDs }: { dogIDs: string[] }) => {
  const authClient = useAuthHTTPClient();

  const query = useQuery<Dog[]>({
    queryKey: ["dogs", dogIDs],
    queryFn: () =>
      authClient.post("dogs", dogIDs).then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      }),
  });

  return query;
};

export default useDogsByID;
