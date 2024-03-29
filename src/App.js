import LoadingScreen from "./ui/LoadingScreen";
import NetworkErr from "./ui/NetworkErr";
import Header from "./components/Header";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  initIndexRest,
  initUrlRest,
  setRest,
  setRestInited,
} from "./redux/slices/restSlice";
import { getAuth, setAuth } from "./redux/slices/authSlice";
import { getRestOfOwner } from "./helpers/web";
import { removeFromLocal } from "./helpers/storage";
import { useSwipeable } from "react-swipeable";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function App() {
  let { resturant } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const rest = useSelector((state) => state.rest.rest);
  const restInited = useSelector((state) => state.rest.restInited);
  const authState = useSelector((state) => state.auth.auth);
  const authConfam = useSelector((state) => state.auth.authConfam);
  const isScrolGsap = useSelector((state) => state.menu.isScrolGsap);
  const [openMen, setOpenMen] = useState(false);

  useEffect(() => {
    if (!isScrolGsap) {
    }
  }, [isScrolGsap]);

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
      console.log("index rest is ", rest);
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
                  .then((response) => {
                    console.log(response);
                    if (response === "Network Error") {
                      //there is a network error,i.e, no internet
                      dispatch(setRest(response));
                    } else {
                      if (response.status === 400 || response.status === 401) {
                        console.log("auth expired");
                        //auth error,incase of expired auth keys,
                        //flush localStorage of keys and setAuth = null
                        removeFromLocal();
                        dispatch(setAuth(null));
                      } else {
                        console.log("users resturant is", response);
                        dispatch(setRest(response));
                        navigate(`/${response.url}`);
                        dispatch(setRestInited(true));
                      }
                    }
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

  const newHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === "Left") {
        setOpenMen(true);
      }
    },
    delta: 10,
    swipeDuration: Infinity,
  });

  const closeMen = () => {
    setOpenMen(false);
  };
  return rest === null ? (
    <LoadingScreen />
  ) : rest === "Network Error" ? (
    <NetworkErr />
  ) : (
    <div
      style={{
        height: "100vh",
        position: "fixed",
        width: "100%",
        top: "0",
        bottom: "0",
      }}
      id="app"
    >
      <Header closeMen={closeMen} openMen={openMen} />
      <div
        {...newHandlers}
        className="left-scroll"
        style={{
          position: "fixed",
          backgroundColor: "red",
          right: "0%",
          height: "100vh",
          bottom: "0",
          width: "15%",
          zIndex: 1,
          opacity: "0",
        }}
      >
        s
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
