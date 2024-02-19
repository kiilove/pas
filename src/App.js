import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Intro from "./pages/Intro";
import MainCarousel from "./components/MainCarousel";
import ItemView from "./pages/ItemView";
import InputTelService from "./pages/InputTelService";
import InputJoinService from "./pages/InputJoinService";
import IntroV2 from "./pages/IntroV2";
import ItemList from "./pages/ItemList";
import SangjoInfo from "./pages/SangjoInfo";

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
          <Route path="/" element={<Main children={<IntroV2 />} />} />
          <Route path="/:sellerToken" element={<Main children={<Intro />} />} />
          <Route path="/test" element={<SangjoInfo />} />
          <Route path="/itemview" element={<ItemView />} />
          <Route path="/telservice" element={<InputTelService />} />
          <Route path="/joinservice" element={<InputJoinService />} />
          <Route path="/itemlist" element={<ItemList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
