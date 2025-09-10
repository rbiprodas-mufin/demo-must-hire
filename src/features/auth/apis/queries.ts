import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import { IForgotPasswordInput, IResetPasswordInput, ISignupResponse, IVerifyEmailInput } from "./dto";
import { TInviteHrEmail, TSignup } from "./schemas";

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body: TSignup) => {
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

// HR
export const useInviteHrEmailMutation = () => {
  return useMutation({
    mutationKey: ["invite-hr-email"],
    mutationFn: async (params: TInviteHrEmail) => {
      const { data } = await apiClient.post("/auth/send-email-hr-invitation", {}, { params });
      return data;
    },
  });
};
