import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./views/Index";
import About from "./components/index/About";
import Menu from "./components/index/Menu";
import Wrapper from "./components/index/Wrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path=":resturant" element={<Index />}>
            <Route index element={<Wrapper />} />
            <Route path="about" element={<About />} />
            <Route path="menu" element={<Menu />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <p className="to-center text-center">There's nothing here</p>
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
