import JobDetails from "~/features/jobs/details";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

const JobDetailPage = async ({ params }: JobDetailPageProps) => {
  const { id } = await params;

  return <JobDetails jobId={id} />;
};

export default JobDetailPage;