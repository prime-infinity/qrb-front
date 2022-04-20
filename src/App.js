import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./views/Index";
import Header from "./components/Header";
import About from "./views/About";
import Menu from "./views/Menu";
import AddMenuItem from "./views/AddMenuItem";
import ViewMenuItem from "./views/ViewMenuItem";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/add-item" element={<AddMenuItem />} />
        <Route path="/view-item" element={<ViewMenuItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
