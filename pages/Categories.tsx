import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { categories } from "../data/philQuizCategories";
import { questions } from "../data/philQuizQuestions";
import CategoryCard from "../components/categoryCard";
import type { CategoryKey, QuestionType } from "../types/quiz";

function Categories() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("category");

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 🎯 Load random question when category changes
  useEffect(() => {
    if (!category) return;

    const key = category as CategoryKey;
    const list = questions[key];

    if (!list || list.length === 0) {
      navigate("/categories");
      return;
    }

    const random = list[Math.floor(Math.random() * list.length)];

    setQuestion(random);
    setSelectedChoice("");
    setIsSubmitted(false);
    setShowModal(false);
  }, [category]);

  // =========================
  // CATEGORY VIEW
  // =========================
  if (!category) {
    return (
      <div className="min-h-screen bg-purple-900 text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-10">PhilQuiz</h1>

        <div className="grid grid-cols-2 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.key}
              onClick={() => navigate(`/categories?category=${cat.key}`)}
            >
              <CategoryCard name={cat.name} icon={cat.icon} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================
  // SUBMIT ANSWER
  // =========================
  const handleSubmit = () => {
    if (!question || !selectedChoice) return;

    const correct = selectedChoice === question.answer;

    setIsCorrect(correct);
    setIsSubmitted(true);
    setShowModal(true);

    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  // =========================
  // QUIZ VIEW
  // =========================
  if (question) {
    return (
      <div className="min-h-screen bg-purple-900 text-white flex items-center justify-center p-6 relative">
        <div className="bg-white text-black p-6 rounded-xl w-[400px]">
          <h2 className="font-bold mb-4">{question.question}</h2>

          <div className="space-y-3">
            {question.choices.map((choice, i) => {
              let bgColor = "bg-gray-200";

              if (isSubmitted) {
                if (choice === question.answer) {
                  bgColor = "bg-green-400";
                } else if (choice === selectedChoice) {
                  bgColor = "bg-red-400";
                }
              } else if (choice === selectedChoice) {
                bgColor = "bg-purple-300";
              }

              return (
                <button
                  key={i}
                  onClick={() => {
                    if (!isSubmitted) {
                      setSelectedChoice(choice);
                    }
                  }}
                  className={`w-full p-3 rounded ${bgColor}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={!selectedChoice || isSubmitted}
            className="mt-5 w-full bg-purple-600 text-white p-3 rounded disabled:opacity-50"
          >
            Submit
          </button>
        </div>

        {/* =========================
            MODAL
        ========================= */}
        {showModal && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="w-[320px] h-[220px] bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center px-6 text-center">
              <div className="text-5xl mb-4">{isCorrect ? "✔️" : "❌"}</div>

              <h2 className="text-2xl font-bold mb-2">
                {isCorrect ? "Tumpak!" : "Mali!"}
              </h2>

              <p className="text-gray-600 text-sm">
                {isCorrect
                  ? "Tama ang sagot!"
                  : `Tamang Sagot: ${question.answer}`}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default Categories;
