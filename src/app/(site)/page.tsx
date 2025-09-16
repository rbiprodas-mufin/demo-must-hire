import { authConfig } from "~/config/auth-config";
import { siteConfig } from "~/config/site";
import HomeScreen from "~/features/home";

const Home = () => {
  console.log("Env In Landing (Server Component):", siteConfig, authConfig);

  return <HomeScreen />;
};

export default Home;
