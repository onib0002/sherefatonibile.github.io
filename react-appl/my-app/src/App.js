import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Speakhabla from "./components/Speakhabla/Speakhabla";
import Info from "./components/Info/Info";

function App() {
  return (
    <div className="App">
      <>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/info" exact element={<Info />} />
          <Route path="/speakhabla" element={<Speakhabla />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
