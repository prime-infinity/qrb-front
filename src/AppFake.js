import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth,setHasIntited } from "./redux/slices/authSlice";
import ProtectedRouteRestOwner from "./helpers/ProtectedRouteRestOwner";

import Index from "./views/Index";
import Header from "./components/Header";
import About from "./views/About";
import Menu from "./views/Menu";
import AddMenuItem from "./views/AddMenuItem";
import ViewMenuItem from "./views/ViewMenuItem";
import EditResturantDetails from "./views/EditResturantDetails";
import EditResturantProfile from "./views/EditResturantProfile";
import Login from "./views/Login";
import CreateResturant from "./views/CreateResturant";
import CreateResturantName from "./components/createresturant/CreateResturantName";
import CreateResturantLoc from "./components/createresturant/CreateResturantLoc";
import CreateResturantYear from "./components/createresturant/CreateResturantYear";
import CreateResturantDesc from "./components/createresturant/CreateResturantDesc";
import CreateResturantWel from "./components/createresturant/CreateResturantWel";
import { useNavigate } from "react-router-dom";
import { getRestOfOwner } from "./helpers/web"
import { getBaseRest,setRest } from "./redux/slices/restSlice";

function App() {
  //const authState = useSelector((state) => state.auth.auth);
  //let navigate = useNavigate();
  //const rest = useSelector((state) => state.rest.rest);
  // eslint-disable-next-line
  //const hasInited = useSelector((state) => state.auth.hasInited);
  //const dispatch = useDispatch();

  /*useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);*/

  /*useEffect(()=>{
    if(hasInited){
      //at this very point
      //it is certain that
      //auth status has been resolved
       //console.log("has inited");
      if(!authState){
        setTimeout(() => {
          dispatch(getBaseRest());
        }, 500);
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
  },[hasInited,authState,dispatch,navigate])*/

  return (
      <>
      {/*<Header />*/}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:resturant" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/add-item" element={<AddMenuItem />} />
        <Route path="/view-item" element={<ViewMenuItem />} />
        <Route
          path="/edit-resturant-details"
          element={<EditResturantDetails />}
        />
        <Route path="/edit-rest-profile" element={<EditResturantProfile />} />

        <Route
          path="/create-resturant"
          element={
            <ProtectedRouteRestOwner auth={authState}>
              {" "}
              <CreateResturant />
            </ProtectedRouteRestOwner>
          }
        >
          <Route index element={<CreateResturant />} />
          <Route path="name" element={<CreateResturantName />} />
          <Route path="location" element={<CreateResturantLoc />} />
          <Route path="year" element={<CreateResturantYear />} />
          <Route path="description" element={<CreateResturantDesc />} />
          <Route path="welcome" element={<CreateResturantWel />} />
          <Route
            path="*"
            element={<p className="mt-5 pt-5">There's nothing here: 404!</p>}
          />
        </Route>
      </Routes>
      </>
  );
}

export default App;
