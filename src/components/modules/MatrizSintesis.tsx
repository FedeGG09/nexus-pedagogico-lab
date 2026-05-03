import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexusStore } from "@/store/useNexusStore";
import { authors, synthesisMatrix, getAuthorById } from "@/data/authors";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function MatrizSintesis() {
  const { matrizAuthor1, matrizAuthor2, setMatrizAuthor1, setMatrizAuthor2, setActiveModule } = useNexusStore();
  const [dragOverSlot, setDragOverSlot] = useState<1 | 2 | null>(null);

  const resultKey = matrizAuthor1 && matrizAuthor2 ? `${matrizAuthor1}-${matrizAuthor2}` : null;
  const result = resultKey ? synthesisMatrix[resultKey] : null;

  const handleDragStart = (e: React.DragEvent, authorId: string) => {
    e.dataTransfer.setData("authorId", authorId);
  };

  const handleDrop = (e: React.DragEvent, slot: 1 | 2) => {
    e.preventDefault();
    const authorId = e.dataTransfer.getData("authorId");
    if (slot === 1) setMatrizAuthor1(authorId);
    else setMatrizAuthor2(authorId);
    setDragOverSlot(null);
  };

  const handleDragOver = (e: React.DragEvent, slot: 1 | 2) => {
    e.preventDefault();
    setDragOverSlot(slot);
  };

  const renderSlot = (slot: 1 | 2, authorId: string | null) => {
    const author = authorId ? getAuthorById(authorId) : null;
    const isOver = dragOverSlot === slot;

    return (
      <div
        onDrop={(e) => handleDrop(e, slot)}
        onDragOver={(e) => handleDragOver(e, slot)}
        onDragLeave={() => setDragOverSlot(null)}
        className={`w-48 h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${
          isOver ? "border-primary bg-accent scale-105" : author ? "border-primary/50 bg-accent/50" : "border-border"
        }`}
      >
        {author ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
            <img src={author.portrait} alt={author.name} className="w-16 h-16 rounded-lg object-cover mx-auto" width={64} height={64} />
            <p className="font-display font-semibold text-sm text-foreground mt-2">{author.name}</p>
            <button onClick={() => slot === 1 ? setMatrizAuthor1(null) : setMatrizAuthor2(null)} className="text-[10px] text-muted-foreground hover:text-destructive mt-1">
              Quitar
            </button>
          </motion.div>
        ) : (
          <p className="text-xs text-muted-foreground text-center px-4">
            Arrastra un autor aquí
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <button onClick={() => setActiveModule("dashboard")} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver al Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground">Matriz de Síntesis</h1>
        <p className="text-sm text-muted-foreground mt-1">Cruza dos corrientes pedagógicas arrastrando autores a los espacios.</p>
      </motion.div>

      {/* Author chips */}
      <div className="flex flex-wrap gap-2">
        {authors.map((a) => (
          <div
            key={a.id}
            draggable
            onDragStart={(e) => handleDragStart(e, a.id)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card cursor-grab active:cursor-grabbing hover:border-primary/30 transition-colors"
          >
            <img src={a.portrait} alt={a.name} className="w-6 h-6 rounded-full object-cover" width={24} height={24} />
            <span className="text-xs font-medium text-foreground">{a.name}</span>
          </div>
        ))}
      </div>

      {/* Synthesis area */}
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {renderSlot(1, matrizAuthor1)}
        <div className="flex flex-col items-center gap-1">
          <ArrowRight className="w-6 h-6 text-primary" />
          <span className="text-[10px] text-muted-foreground">Fusión</span>
          <ArrowLeft className="w-6 h-6 text-primary" />
        </div>
        {renderSlot(2, matrizAuthor2)}
      </div>

      {/* Result */}
      <AnimatePresence>
        {matrizAuthor1 && matrizAuthor2 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-surface rounded-xl p-6 border-primary/20"
          >
            {result ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-bold text-foreground">{result.title}</h3>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{result.description}</p>
                <div className="mt-4 p-3 rounded-lg bg-accent/50">
                  <p className="text-xs font-semibold text-foreground mb-1">💡 Aplicación práctica:</p>
                  <p className="text-xs text-muted-foreground">{result.application}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  Esta combinación aún no tiene una síntesis predefinida. 
                  Intenta con otras combinaciones como <strong>Freire + Montessori</strong> o <strong>Dewey + Vygotsky</strong>.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
