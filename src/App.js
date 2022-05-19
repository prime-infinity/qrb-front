
import LoadingScreen from "./ui/LoadingScreen"
import NetworkErr from "./ui/NetworkErr"
import Header from "./components/Header"
import { Outlet,useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initIndexRest } from "./redux/slices/restSlice";
import { getAuth } from "./redux/slices/authSlice";


function App() {
  let {resturant} = useParams()
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const rest = useSelector((state) => state.rest.rest);
  const restInited = useSelector((state) => state.rest.restInited);
  const authState = useSelector((state) => state.auth.auth);

  useEffect(()=>{
    dispatch(getAuth());
  },[dispatch])

  useEffect(()=>{
    console.log("app is mounted")
    //console.log(resturant);
    //first,if resturant in header,
    //get resturant, and redirect url
    //there, else, if no resturant in header,
    //get qrb,then redirect there,
    //also, if no resturant, and isrest owner,
    //redirect to rest owner,else just to qrb

      if(!restInited){

        if(resturant){
          //resturant in url,
          //get from database and set
    
          console.log("is in header",resturant);
    
        }else{
          console.log("is not in header");
    
          if(!authState){
            //get base resturant,
            //and redirect url there
            console.log("is not authstate");
            if(rest === null){
              dispatch(initIndexRest())
            }
            
            if(rest !== "Network Error" && rest !== null){
              navigate(`/${rest?.name}`)
              console.log("rest is ",rest);
            }
            
    
          }if(authState){
            if(authState.isRestOwner){}
            if(!authState.isRestOwner){}
          }
    
        }

      }


  },[resturant,restInited,authState,dispatch,rest,navigate])
  
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
