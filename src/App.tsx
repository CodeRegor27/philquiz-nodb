import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Categories from "../pages/Categories";
import Home from "../pages/Home";
import Quiz from "../pages/Quiz";

function QRRedirectFix() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category) {
      // redirect old QR → correct route
      navigate(`/quiz/${category}`, { replace: true });
    }
  }, []);

  return null;
}

function App() {
  return (
    <>
      {/* ✅ THIS FIXES YOUR QR CODE ISSUE */}
      <QRRedirectFix />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/quiz/:category" element={<Quiz />} />
      </Routes>
    </>
  );
}

export default App;
