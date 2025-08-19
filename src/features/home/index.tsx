import Container from "~/components/container";
import JobList from "./JobList";
import apiClient from "~/utils/axios";

const HomeScreen = async () => {
  const response = await apiClient.get("/jobs/get-jobs")
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["jobs"],
  //   queryFn: () => axios.get("https://musttranslator-prd-api.mustbreak.ai/feedbacks"),
  // });

  return (
    <div className="">
      <section className="py-12">
        <Container>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover opportunities that match your skills and aspirations
            </p>
          </div>
        </Container>
      </section>
      <section className="">
        <Container>
          <JobList jobs={response.data.data || []} />
        </Container>
      </section>
    </div>
  );
};

export default HomeScreen;
