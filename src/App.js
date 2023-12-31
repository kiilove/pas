import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Intro from "./pages/Intro";
import MainCarousel from "./components/MainCarousel";
import ItemView from "./pages/ItemView";
import InputTelService from "./pages/InputTelService";
import InputJoinService from "./pages/InputJoinService";

function App() {
  return (
    <BrowserRouter>
      <div
        className="flex w-full h-full justify-center items-start bg-gray-200"
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          fontFamily: "Noto Sans KR",
        }}
      >
        <Routes>
          <Route path="/" element={<Main children={<Intro />} />} />
          <Route path="/test" element={<MainCarousel />} />
          <Route path="/itemview" element={<ItemView />} />
          <Route path="/telservice" element={<InputTelService />} />
          <Route path="/joinservice" element={<InputJoinService />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
