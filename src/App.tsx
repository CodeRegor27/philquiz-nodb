import { Routes, Route } from "react-router-dom";
import Categories from "../pages/Categories";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/quiz/:category" element={<Quiz />} />
    </Routes>
  );
}

export default App;
