// components/Loader.tsx
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center py-20">
      <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
      <span className="ml-2 text-gray-500 text-sm">Loading...</span>
    </div>
  );
}
