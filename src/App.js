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
import Login from "./views/Login";
import CreateResturant from "./views/CreateResturant";
import CreateResturantName from "./components/createresturant/CreateResturantName";
import CreateResturantLoc from "./components/createresturant/CreateResturantLoc";
import CreateResturantYear from "./components/createresturant/CreateResturantYear";
import CreateResturantDesc from "./components/createresturant/CreateResturantDesc";
import CreateResturantWel from "./components/createresturant/CreateResturantWel";

function App() {
  const authState = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState === null) {
      dispatch(getAuth());
    }
  }, [dispatch, authState]);

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
