import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Intro from "./pages/Intro";
import MainCarousel from "./components/MainCarousel";

function App() {
  return (
    <BrowserRouter>
      <div
        className="flex w-full h-full justify-center items-start bg-gray-200"
        style={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <Routes>
          <Route path="/" element={<Main children={<Intro />} />} />
          <Route path="/test" element={<MainCarousel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
