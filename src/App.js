import LoadingScreen from "./ui/LoadingScreen";
import NetworkErr from "./ui/NetworkErr";
import Header from "./components/Header";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  initIndexRest,
  initUrlRest,
  setRest,
  setRestInited,
} from "./redux/slices/restSlice";
import { getAuth } from "./redux/slices/authSlice";
import { getRestOfOwner } from "./helpers/web";

function App() {
  let { resturant } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const rest = useSelector((state) => state.rest.rest);
  const restInited = useSelector((state) => state.rest.restInited);
  const authState = useSelector((state) => state.auth.auth);
  const authConfam = useSelector((state) => state.auth.authConfam);

  const getUrlRest = () => {
    if (rest === null) {
      dispatch(initUrlRest(resturant));
    }
    if (rest !== "Network Error" && rest !== null) {
      navigate(`/${rest?.url}`);
      dispatch(setRestInited(true));
      console.log("rest is ", rest);
    }
  };

  const getIndexRest = () => {
    if (rest === null) {
      dispatch(initIndexRest());
    }

    if (rest !== "Network Error" && rest !== null) {
      navigate(`/${rest?.url}`);
      dispatch(setRestInited(true));
      console.log("rest is ", rest);
    }
  };

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  useEffect(() => {
    console.log("app is mounted");
    //console.log(resturant);
    //first,if resturant in header,
    //get resturant, and redirect url
    //there, else, if no resturant in header,
    //get qrb,then redirect there,
    //also, if no resturant, and isrest owner,
    //redirect to rest owner,else just to qrb

    if (!restInited) {
      if (resturant) {
        //resturant in url,
        //get from database and set

        console.log("is in header", resturant);

        getUrlRest();
      } else {
        console.log("is not in header");

        if (authConfam === true) {
          if (!authState) {
            //get base resturant,
            //and redirect url there
            console.log("is not authstate");
            getIndexRest();
          }
          if (authState) {
            console.log("is in authstate");
            if (authState.isRestOwner) {
              console.log("is a rest owner");
              //thisuserhasaresturnat,
              //get it for him
              if (rest === null) {
                getRestOfOwner(authState.token)
                  .then((ree) => {
                    console.log("users resturant is", ree);
                    dispatch(setRest(ree));
                    navigate(`/${ree.url}`);
                    dispatch(setRestInited(true));
                  })
                  .catch((eer) => {
                    console.log(eer);
                  });
              }
            }
            if (!authState.isRestOwner) {
              console.log("is an auth, but not a rest owner");
              //thisdoesnothavres
              //get the index for him
              getIndexRest();
            }
          }
        }
      }
    }

    // eslint-disable-next-line
  }, [resturant, restInited, authState, dispatch, rest, authConfam]);

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
