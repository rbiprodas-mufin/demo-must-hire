import JobDetails from "~/features/jobs/details";

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

const JobDetailsPage = async ({ params }: JobDetailsPageProps) => {
  const { id } = await params;
  return <JobDetails jobId={id} />;
};

export default JobDetailsPage;
