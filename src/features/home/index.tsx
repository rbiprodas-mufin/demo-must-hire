import { Container } from "~/components/container";
import JobList from "./job-list";

const HomeScreen = async () => {
  return (
    <div className="">
      <section className="py-12">
        <Container>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-blue-950 mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover opportunities that match your skills and aspirations
            </p>
          </div>
        </Container>
      </section>
      <section className="mb-5">
        <Container>
          <JobList />
        </Container>
      </section>
    </div>
  );
};

export default HomeScreen;
