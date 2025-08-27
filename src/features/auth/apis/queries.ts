import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import { IForgotPasswordInput, IResetPasswordInput, ISignupInput, ISignupResponse, IVerifyEmailInput } from "./dto";

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

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationKey: ["verify-email"],
    mutationFn: async (body: IVerifyEmailInput) => {
      const { data } = await apiClient.post("/auth/verify-email", body);
      return data;
    },
  });
};  

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: async (params: IForgotPasswordInput) => {
      const { data } = await apiClient.post("/auth/forgot-password", {}, { params });
      return data;
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (params: IResetPasswordInput) => {
      const { data } = await apiClient.post("/auth/reset-password", {}, { params });
      return data;
    },
  });
};