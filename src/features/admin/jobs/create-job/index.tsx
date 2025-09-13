import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { AdminHeading } from "~/features/admin/_components/heading";
import { CreateJobForm } from "./create-job-form";


export default function CreateJob() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <AdminHeading
          title="Create New Job" 
          description="Fill in the details to create a new job posting" 
        />
        <Button 
          variant="secondary" 
          size="sm"
          asChild
        >
          <Link href="/admin/jobs">
            <ArrowLeftIcon /> Back to Jobs
          </Link>
        </Button>
      </div>
      <CreateJobForm />
    </div>
  );
}
