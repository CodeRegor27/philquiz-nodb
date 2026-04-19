import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { categories } from "../data/philQuizCategories";
import { questions } from "../data/philQuizQuestions";
import CategoryCard from "../components/categoryCard";
import type { CategoryKey, QuestionType } from "../types/quiz";

function Categories() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  // 🎯 Load random question
  useEffect(() => {
    if (!category) return;

    const key = category as CategoryKey;
    const list = questions[key];

    if (!list || list.length === 0) {
      navigate("/");
      return;
    }

    const random = list[Math.floor(Math.random() * list.length)];

    setQuestion(random);
    setSelectedChoice("");
    setIsSubmitted(false);
    setShowPopup(false);
  }, [category]);

  // =========================
  // SUBMIT ANSWER
  // =========================
  const handleSubmit = () => {
    if (!question) return;

    const correct = selectedChoice === question.answer;

    setIsCorrectAnswer(correct);
    setIsSubmitted(true);
    setShowPopup(true);

    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  // =========================
  // QUIZ VIEW
  // =========================
  if (category && question) {
    return (
      <div className="min-h-screen bg-purple-900 text-white flex items-center justify-center p-6 relative">
        <div className="bg-white text-black p-6 rounded-xl w-[400px]">
          <h2 className="font-display mb-4">{question.question}</h2>

          <div className="space-y-3">
            {question.choices.map((choice, i) => {
              const isCorrect = choice === question.answer;
              const isSelected = choice === selectedChoice;

              let bgColor = "bg-gray-200";

              if (isSubmitted) {
                if (isCorrect) bgColor = "bg-green-400";
                else if (isSelected) bgColor = "bg-red-400";
              } else if (isSelected) {
                bgColor = "bg-purple-300";
              }

              return (
                <button
                  key={i}
                  onClick={() => !isSubmitted && setSelectedChoice(choice)}
                  className={`font-display w-full p-3 rounded ${bgColor}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedChoice || isSubmitted}
            className="mt-5 w-full bg-purple-600 text-white p-3 rounded disabled:opacity-50"
          >
            Submit
          </button>
        </div>

        {showPopup && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="w-[320px] h-[220px] bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center px-6 text-center">
              <div className="text-5xl mb-4">
                {isCorrectAnswer ? "✅" : "❌"}
              </div>

              <h2 className="text-2xl font-bold mb-2 font-display">
                {isCorrectAnswer ? "Correct!" : "Wrong!"}
              </h2>

              <p className="text-gray-500 text-sm">
                {isCorrectAnswer
                  ? "Tumpak!"
                  : `Tamang Sagot: ${question.answer}`}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================
  // CATEGORY VIEW
  // =========================
  return (
    <div className="min-h-screen bg-purple-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-10">PhilQuiz</h1>

      <div className="grid grid-cols-2 gap-5">
        {categories.map((cat) => (
          <div key={cat.key} onClick={() => navigate(`/?category=${cat.key}`)}>
            <CategoryCard name={cat.name} icon={cat.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
