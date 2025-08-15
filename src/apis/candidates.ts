import axiosInstance from "~/lib/axios";
import { CandidateProfile } from "~/types/user";
import { useMutation } from "@tanstack/react-query";

export const useCreateCandidate = () => {
  return useMutation({
    mutationFn: async (payload: CandidateProfile) =>
      (await axiosInstance.post("/candidates", payload)).data,
  });
};
