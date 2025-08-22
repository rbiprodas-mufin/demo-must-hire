import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import { ISignupInput, ISignupResponse, IVerifyEmailInput } from "./dto";

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body: ISignupInput) => {
      const { data } = await apiClient.post<ISignupResponse>("/auth/register", body);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      console.log("Signup successful:", data);
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    },
  });
};

// TODO
export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationKey: ["verify-email"],
    mutationFn: async (body: IVerifyEmailInput) => {
      const { data } = await apiClient.post("/auth/verify-email", body);
      console.log("Verify email successful:", data);
      return data;
    },
  });
};  