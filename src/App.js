
import LoadingScreen from "./ui/LoadingScreen"
import NetworkErr from "./ui/NetworkErr"
import Header from "./components/Header"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";


function App() {
  const rest = useSelector((state) => state.rest.rest);

  useEffect(()=>{
    console.log("app is mounted")
  },[])
  
  return rest === null ? (
    <LoadingScreen />
  ) : rest === "Network Error" ? (
    <NetworkErr />
  ) : (
    <>
      <Header />
      
      <Outlet />
    </>
  );
}

export default App;
