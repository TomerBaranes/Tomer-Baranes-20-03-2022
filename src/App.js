import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Favorites from "./components/Favorites";

import "./App.css";

function App() {
  const mode = useSelector((state) => state.mode.value);

  return (
    <div className={`app ${mode}`}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
