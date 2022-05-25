import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter,Routes, Route  } from "react-router-dom";
import Index from "./views/Index";
import Login from "./views/Login";
import About from "./views/About";
import Menu from "./views/Menu";
import Wrapper from "./components/index/Wrapper";
import AddMenuItem from "./views/AddMenuItem";
import EditResturantDetails from "./views/EditResturantDetails";
import EditResturantProfile from "./views/EditResturantProfile";
import CreateResturant from "./views/CreateResturant";
import CreateResturantName from "./components/createresturant/CreateResturantName";
import CreateResturantLoc from "./components/createresturant/CreateResturantLoc";
import CreateResturantYear from "./components/createresturant/CreateResturantYear";
import CreateResturantDesc from "./components/createresturant/CreateResturantDesc";
import CreateResturantWel from "./components/createresturant/CreateResturantWel";
//import ProtectedRouteRestOwner from "./helpers/ProtectedRouteRestOwner";
//import { useSelector } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>

        <Route  path="/" element={<App />}>

          <Route path=":resturant" element={<Index />} >

            <Route index element={<Wrapper />} />
            <Route path="about" element={<About />} />
            <Route path="menu" element={<Menu />} />

          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/add-item" element={<AddMenuItem />} />
          <Route
            path="/edit-resturant-details"
            element={<EditResturantDetails />}
          />

          <Route path="/edit-rest-profile" element={<EditResturantProfile />} />

          <Route
          path="/create-resturant"
          element={
            //<ProtectedRouteRestOwner auth={authState}>
              //{" "}
              <CreateResturant />
            //</ProtectedRouteRestOwner>
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
            element={<p className="to-center text-center">There's nothing here: 404!</p>}
          />
        </Route>

        </Route>
        <Route
            path="*"
            element={<p className="to-center text-center">There's nothing here: 404!</p>}
          />
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

//We add these 3 lines here
if (window.Cypress) {
  window.store = store;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
