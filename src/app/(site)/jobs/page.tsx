import { Button } from "@/components/ui/button";
import Link from "next/link";

const JobsPage = () => {
  return (
  <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold">Jobs Page</h1>
    <div className="flex flex-col gap-2 p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-bold">Job 1</h2>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
      <Button asChild>
        <Link href="/jobs/1">View Job</Link>
      </Button>
    </div>
    <div className="flex flex-col gap-2 p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-bold">Job 2</h2>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
      <Button asChild>
        <Link href="/jobs/2">View Job</Link>
      </Button>
    </div>
  </div>
  );
};

export default JobsPage;