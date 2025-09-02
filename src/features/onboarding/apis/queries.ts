import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICandidateResponse,
  IUpdateCandidate,
  ICandidatesResponse,
  IGetCandidatesParams,
} from "./dto";
import { TCreateCandidate } from "./schema";


export const useGetCandidatesQuery = (filters: IGetCandidatesParams = {}) => {
  return useQuery<ICandidatesResponse, Error>({
    queryKey: ["candidates", filters],
    queryFn: async () => {
      const response = await apiClient.get<ICandidatesResponse>("/candidates/", {
        params: {
          // skip: filters.skip ?? 0,
          // limit: filters.limit ?? 10,
          ...(filters.search ? { search: filters.search } : {}),
        },
      });
      return response.data;
    },
  });
};

export const useGetCandidateQuery = (candidateId: string) => {
  return useQuery<ICandidateResponse, Error>({
    queryKey: ["candidates", candidateId],
    enabled: !!candidateId,
    queryFn: async () => {
      const response = await apiClient.get<ICandidateResponse>(`/candidates/${candidateId}`);
      return response.data;
    },
  });
};

export const useCreateCandidateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-candidate"],
    mutationFn: async (body: TCreateCandidate) => {
      const newBody = {
        ...body,
        stack: body.stack?.split(",").map(item => item.trim()),
        skills: body.skills?.split(",").map(item => item.trim()),
      }
      const response = await apiClient.post<ICandidateResponse>("/candidates/", newBody);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
    onError: (error) => {
      console.error("Error creating candidate:", error);
    },
  });
};

export const useUpdateCandidateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-candidate"],
    mutationFn: async ({ id, ...patch }: IUpdateCandidate) => {
      const response = await apiClient.put<ICandidateResponse>(`/candidates/${id}`, patch);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
    onError: (error) => {
      console.error("Error updating candidate:", error);
    },
  });
};

export const useDeleteCandidateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-candidate"],
    mutationFn: async (id: string | number) => {
      const response = await apiClient.delete(`/candidates/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    },
    onError: (error) => {
      console.error("Error deleting candidate:", error);
    },
  });
};
