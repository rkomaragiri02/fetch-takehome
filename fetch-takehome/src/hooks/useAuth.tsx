import { useMutation } from "@tanstack/react-query";
import useAuthHTTPClient from "./useAuthHTTPClient";
import { LoginCredentials } from "@/types/loginCredentials";

interface useAuthParams {
  onAuth?: () => void;
}

const useAuth = ({ onAuth = () => {} }: useAuthParams) => {
  const authClient = useAuthHTTPClient();

  const { mutate: authenticate } = useMutation({
    mutationKey: ["userAuthCookie"],
    mutationFn: (creds: LoginCredentials) =>
      authClient.post("/auth/login", creds).then((res) => {
        if (res.status === 200) {
          onAuth();
        }
      }),
  });

  return { authenticate };
};

export default useAuth;
