import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Clock, Eye, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getStatusColor = (status: string) => {
  switch (status) {
    case "review":
      return "bg-yellow-100 text-yellow-800";
    case "interview":
      return "bg-blue-100 text-blue-800";
    case "offer":
      return "bg-purple-100 text-purple-800";
    case "hired":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

import type { LucideIcon } from "lucide-react";

export type StatusType =
  | "review"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export const getStatusIcon = (status: StatusType): LucideIcon => {
  const statusIcons: Record<StatusType, LucideIcon> = {
    review: Clock,
    interview: Eye,
    offer: AlertCircle,
    hired: CheckCircle,
    rejected: XCircle,
  };

  return statusIcons[status] || Clock;
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
