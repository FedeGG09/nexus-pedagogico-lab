import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexusStore } from "@/store/useNexusStore";
import { getAuthorById } from "@/data/authors";
import { Eye, BookOpen, HelpCircle, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

export default function PrismaAutores() {
  const { selectedAuthorId, selectedLens, setSelectedLens, setActiveModule, setQuizScore, duaProfiles } = useNexusStore();
  const author = selectedAuthorId ? getAuthorById(selectedAuthorId) : null;
  const [slideIndex, setSlideIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const isAltasCapacidades = duaProfiles.includes("altas-capacidades");

  if (!author) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Selecciona un autor desde el Dashboard para explorar.
      </div>
    );
  }

  const lenses = [
    { id: "visual" as const, label: "Flash-PPT", icon: <Eye className="w-4 h-4" />, color: "text-primary" },
    { id: "narrativa" as const, label: "Storytelling", icon: <BookOpen className="w-4 h-4" />, color: "text-cat-escuela-nueva" },
    { id: "evaluativa" as const, label: "Quiz Master", icon: <HelpCircle className="w-4 h-4" />, color: "text-cat-giro-psicologico" },
  ];

  const handleQuizAnswer = (optionIdx: number) => {
    if (quizSubmitted) return;
    const newAnswers = [...quizAnswers];
    newAnswers[quizIndex] = optionIdx;
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    const score = author.quizQuestions.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0);
    setQuizScore(author.id, score);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <button
        onClick={() => setActiveModule("dashboard")}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Volver al Dashboard
      </button>

      {/* Author header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
        <img src={author.portrait} alt={author.name} className="w-16 h-16 rounded-lg object-cover" width={64} height={64} />
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{author.name}</h1>
          <p className="text-sm text-muted-foreground">{author.years} · {author.description}</p>
        </div>
      </motion.div>

      {/* Key concepts */}
      {isAltasCapacidades && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface rounded-lg p-4">
          <h3 className="font-display font-semibold text-sm text-foreground mb-2">🔬 Investigación Profunda</h3>
          <ul className="space-y-1.5">
            {author.keyConcepts.map((c, i) => (
              <li key={i} className="text-xs text-muted-foreground flex gap-2">
                <span className="text-primary mt-0.5">•</span>{c}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-3 italic">Metodología: {author.methodology}</p>
        </motion.div>
      )}

      {/* Lens selector */}
      <div className="flex gap-2">
        {lenses.map((lens) => (
          <button
            key={lens.id}
            onClick={() => {
              setSelectedLens(lens.id);
              setSlideIndex(0);
              setQuizIndex(0);
              setQuizAnswers([]);
              setQuizSubmitted(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
              selectedLens === lens.id
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border hover:border-primary/30 text-muted-foreground"
            }`}
          >
            {lens.icon}
            {lens.label}
          </button>
        ))}
      </div>

      {/* Lens content */}
      <AnimatePresence mode="wait">
        {selectedLens === "visual" && (
          <motion.div key="visual" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-surface rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-foreground">
                {author.slides[slideIndex].title}
              </h2>
              <span className="text-xs text-muted-foreground">{slideIndex + 1}/{author.slides.length}</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{author.slides[slideIndex].content}</p>
            <div className="flex items-center justify-between mt-6">
              <button
                disabled={slideIndex === 0}
                onClick={() => setSlideIndex((i) => i - 1)}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1">
                {author.slides.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === slideIndex ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>
              <button
                disabled={slideIndex === author.slides.length - 1}
                onClick={() => setSlideIndex((i) => i + 1)}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {selectedLens === "narrativa" && (
          <motion.div key="narrativa" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-surface rounded-lg p-6">
            <h2 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cat-escuela-nueva" />
              Historia de {author.name}
            </h2>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{author.storytelling}</p>
          </motion.div>
        )}

        {selectedLens === "evaluativa" && (
          <motion.div key="evaluativa" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-surface rounded-lg p-6 space-y-4">
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cat-giro-psicologico" />
              Quiz: {author.name}
            </h2>
            {!quizSubmitted ? (
              <>
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    {quizIndex + 1}. {author.quizQuestions[quizIndex].question}
                  </p>
                  <div className="space-y-2">
                    {author.quizQuestions[quizIndex].options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => handleQuizAnswer(oi)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${
                          quizAnswers[quizIndex] === oi
                            ? "border-primary bg-accent text-accent-foreground"
                            : "border-border hover:border-primary/30 text-foreground"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    disabled={quizIndex === 0}
                    onClick={() => setQuizIndex((i) => i - 1)}
                    className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    ← Anterior
                  </button>
                  {quizIndex < author.quizQuestions.length - 1 ? (
                    <button
                      disabled={quizAnswers[quizIndex] == null}
                      onClick={() => setQuizIndex((i) => i + 1)}
                      className="text-xs text-primary font-medium disabled:opacity-30"
                    >
                      Siguiente →
                    </button>
                  ) : (
                    <button
                      disabled={quizAnswers.length < author.quizQuestions.length || quizAnswers.includes(null)}
                      onClick={submitQuiz}
                      className="px-4 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg disabled:opacity-30"
                    >
                      Enviar respuestas
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-3">
                {author.quizQuestions.map((q, qi) => (
                  <div key={qi} className={`p-3 rounded-lg border ${quizAnswers[qi] === q.correct ? "border-cat-escuela-nueva/50 bg-cat-escuela-nueva/5" : "border-destructive/50 bg-destructive/5"}`}>
                    <p className="text-xs font-medium text-foreground">{q.question}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tu respuesta: {q.options[quizAnswers[qi]!]} {quizAnswers[qi] === q.correct ? "✓" : `✗ (Correcta: ${q.options[q.correct]})`}
                    </p>
                  </div>
                ))}
                <p className="text-sm font-semibold text-foreground">
                  Resultado: {author.quizQuestions.reduce((a, q, i) => a + (quizAnswers[i] === q.correct ? 1 : 0), 0)}/{author.quizQuestions.length}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
