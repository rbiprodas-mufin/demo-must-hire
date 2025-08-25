import { redirect } from "next/navigation";
import OnboardingScreen from "~/features/onboarding";
import { authSession } from "~/lib/auth";

const OnboardingPage = async () => {
  const session = await authSession();
  if (!session) {
    redirect("/");
  }
  if (session.user.onboardingCompleted) {
    redirect("/user/dashboard");
  }

  return <OnboardingScreen />;
};

export default OnboardingPage;
