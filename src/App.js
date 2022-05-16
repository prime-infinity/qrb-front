
import { Outlet } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getAuth,setHasIntited } from "./redux/slices/authSlice";


import Header from "./components/Header";
import LoadingScreen from "./ui/LoadingScreen";
import NetworkErr from "./ui/NetworkErr";
import { useEffect } from "react";
import { getBaseRest,setRest } from "./redux/slices/restSlice";
import { useNavigate } from "react-router-dom";
import { getRestOfOwner } from "./helpers/web"


function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const rest = useSelector((state) => state.rest.rest);
  const hasInited = useSelector((state) => state.auth.hasInited);
  const authState = useSelector((state) => state.auth.auth);


  useEffect(()=>{
    dispatch(getAuth());
    dispatch(getBaseRest());
  },[dispatch])

  useEffect(()=>{
    if(hasInited){
      //at this very point
      //it is certain that
      //auth status has been resolved
       //console.log("has inited");
      if(!authState){
       
        dispatch(setHasIntited(false))
        navigate(`/${rest?.name}`)

        console.log("no auth 1")
      }
      if(authState){
        if(authState.isRestOwner){

          //get the infomation about the resturant
          //of the owner, and redirect there
          getRestOfOwner(authState.token).then((res)=>{
            //console.log(res)
            dispatch(setRest(res))
            //lock back this useeffect
            dispatch(setHasIntited(false))
            navigate(`/${res.name}`)
          }).catch((err)=>{
            console.log(err)
          })

        }if(!authState.isRestOwner){
          //here, redirect to resturant
          //creation
          console.log("is not rest owner 2");
          navigate("/create-resturant/name")
        }
      }
     
    }
  },[hasInited,rest,authState,dispatch,navigate])

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
