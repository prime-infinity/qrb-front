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
//import Wrapper from "./components/index/Wrapper";


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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
