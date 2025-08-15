const JobDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return <div>JobDetailPage: {slug}</div>;
};

export default JobDetailPage;