import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "./redux/slices/authSlice";
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
import EditUserProfile from "./views/EditUserProfile";
import CreateResturantName from "./components/createresturant/CreateResturantName";
import CreateResturantLoc from "./components/createresturant/CreateResturantLoc";
import CreateResturantYear from "./components/createresturant/CreateResturantYear";
import CreateResturantDesc from "./components/createresturant/CreateResturantDesc";
import CreateResturantWel from "./components/createresturant/CreateResturantWel";

import { getRestOwnerRest, getRandRest } from "./redux/slices/restSlice";

function App() {
  const authState = useSelector((state) => state.auth.auth);
  const rest = useSelector((state) => state.rest.rest);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rest === null) {
      if (authState?.isRestOwner === true) {
        dispatch(getRestOwnerRest(authState.token));
      } else {
        dispatch(getRandRest());
      }
    }
  }, [dispatch, rest, authState]);

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/add-item" element={<AddMenuItem />} />
        <Route path="/view-item" element={<ViewMenuItem />} />
        <Route
          path="/edit-user-profile"
          element={
            <ProtectedRouteRestOwner auth={authState}>
              {" "}
              <EditUserProfile />
            </ProtectedRouteRestOwner>
          }
        />
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
    </BrowserRouter>
  );
}

export default App;
