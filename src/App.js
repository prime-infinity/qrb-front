import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./views/Index";
import Header from "./components/Header";
import About from "./views/About";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
