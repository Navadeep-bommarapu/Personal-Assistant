import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Entry from "./pages/Entry";
import Home from "./pages/Home";
import Canvass from "./components/Canvass";
import state from "./store";
import { useSnapshot } from "valtio";

function App() {
  const snap = useSnapshot(state)
  return (
    <Router>
        <main className="relative w-full h-screen">
        <div className="relative z-1 pointer-events-auto">
          <Routes>
              <Route path="/" element={<Entry/>} />
              <Route path="/login" element={<Entry />} />
              <Route path="/register" element={<Entry />} />
              <Route path="/home" element={<Home />} />
          </Routes>
          </div>
          <div className="canvas">
            <Canvass />
          </div>
        </main>
    </Router>
  )
}

export default App
