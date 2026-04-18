import { useNavigate } from "react-router-dom";
import { categories } from "../data/philQuizCategories.tsx";
import type { CategoryKey } from "../types/quiz.ts";
import CategoryCard from "../components/categoryCard.tsx";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-purple-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="font-display text-3xl font-bold mb-10">PhilQuiz</h1>

      <div className="flex items-center w-full max-w-md mb-10">
        <div className="flex-1 h-px bg-white/40"></div>
        <span className="font-display px-4 text-sm text-white/70">
          Choose a Category
        </span>
        <div className="flex-1 h-px bg-white/40"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => navigate(`/quiz/${cat.key as CategoryKey}`)}
          >
            <CategoryCard name={cat.name} icon={cat.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
