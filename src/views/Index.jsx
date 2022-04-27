import Wrapper from "../components/index/Wrapper";
import LoadingScreen from "../ui/LoadingScreen";
import NetworkErr from "../ui/NetworkErr";

import { useSelector } from "react-redux";

function Index() {
  const rest = useSelector((state) => state.rest.rest);

  return rest === null ? (
    <LoadingScreen />
  ) : rest === "Network Error" ? (
    <NetworkErr />
  ) : (
    <Wrapper />
  );
}

export default Index;
