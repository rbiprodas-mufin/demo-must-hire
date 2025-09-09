import { Loader2 } from "lucide-react";

interface LoaderProps {
  mode?: "default" | "icon" | "icon-label";
}

export const Loader = ({ mode = "default" }: LoaderProps) => {
  return (
    <div className="flex justify-center items-center py-20">
      {mode === "icon" && <Loader2 className="h-6 w-6 animate-spin text-gray-500" />}
      {mode === "icon-label" && (
        <>
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500 text-sm">Loading...</span>
        </>
      )}
      {mode === "default" && <span className="ml-2 text-gray-500 text-sm">Loading...</span>}
    </div>
  );
}
