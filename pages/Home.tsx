import { motion } from "framer-motion";

export default function Home() {
  const text = "PhilQuiz";

  return (
    <div className="min-h-screen bg-purple-900 text-white flex items-center justify-center">
      <h1 className="flex text-6xl font-bold font-display">
        {text.split("").map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, -20, 0],
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
            className="inline-block drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
          >
            {letter}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}
