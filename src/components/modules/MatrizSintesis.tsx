import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexusStore } from "@/store/useNexusStore";
import { authors, categories, getSynthesis, getAuthorById, getCategoryColor } from "@/data/authors";
import { ArrowLeft, Sparkles, X, GripVertical, Zap, Lightbulb, BookOpen } from "lucide-react";

export default function MatrizSintesis() {
  const { matrizAuthor1, matrizAuthor2, setMatrizAuthor1, setMatrizAuthor2, setActiveModule } = useNexusStore();
  const [dragOverSlot, setDragOverSlot] = useState<1 | 2 | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const result = matrizAuthor1 && matrizAuthor2 ? getSynthesis(matrizAuthor1, matrizAuthor2) : null;

  const handleDragStart = (e: React.DragEvent, authorId: string) => {
    e.dataTransfer.setData("authorId", authorId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, slot: 1 | 2) => {
    e.preventDefault();
    const authorId = e.dataTransfer.getData("authorId");
    if (authorId) {
      if (slot === 1) setMatrizAuthor1(authorId);
      else setMatrizAuthor2(authorId);
    }
    setDragOverSlot(null);
  };

  const handleDragOver = (e: React.DragEvent, slot: 1 | 2) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverSlot(slot);
  };

  const handleTapAuthor = (authorId: string) => {
    if (!matrizAuthor1) setMatrizAuthor1(authorId);
    else if (!matrizAuthor2 && authorId !== matrizAuthor1) setMatrizAuthor2(authorId);
    else if (authorId !== matrizAuthor2) {
      setMatrizAuthor1(authorId);
      setMatrizAuthor2(null);
    }
  };

  const filteredAuthors = filterCategory
    ? authors.filter(a => a.category === filterCategory)
    : authors;

  const renderSlot = (slot: 1 | 2, authorId: string | null) => {
    const author = authorId ? getAuthorById(authorId) : null;
    const isOver = dragOverSlot === slot;
    const catColor = author ? getCategoryColor(author.category) : "";

    return (
      <div
        onDrop={(e) => handleDrop(e, slot)}
        onDragOver={(e) => handleDragOver(e, slot)}
        onDragLeave={() => setDragOverSlot(null)}
        className={`relative w-52 h-56 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
          isOver
            ? "border-primary bg-accent scale-105 shadow-lg"
            : author
            ? `border-${catColor}/50 bg-gradient-to-br from-${catColor}/5 to-${catColor}/10`
            : "border-border bg-card/50 hover:border-muted-foreground/30"
        }`}
      >
        <span className="absolute top-2 left-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          {slot === 1 ? "Corriente A" : "Corriente B"}
        </span>
        {author ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center pt-4">
            <div className={`w-20 h-20 rounded-xl overflow-hidden mx-auto ring-2 ring-${catColor}/30`}>
              <img src={author.portrait} alt={author.name} className="w-full h-full object-cover" width={80} height={80} />
            </div>
            <p className="font-display font-semibold text-sm text-foreground mt-2">{author.name}</p>
            <p className="text-[10px] text-muted-foreground">{author.years}</p>
            <div className="flex flex-wrap justify-center gap-1 mt-1.5 px-2">
              {author.keyConceptsShort.slice(0, 2).map((c, i) => (
                <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded-full bg-${catColor}/10 text-${catColor}`}>{c}</span>
              ))}
            </div>
            <button
              onClick={() => slot === 1 ? setMatrizAuthor1(null) : setMatrizAuthor2(null)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-xl border-2 border-dashed border-muted-foreground/20 mx-auto flex items-center justify-center mb-2">
              <GripVertical className="w-5 h-5 text-muted-foreground/30" />
            </div>
            <p className="text-xs text-muted-foreground px-4">
              Arrastra o toca un autor
            </p>
          </div>
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
        <p className="text-sm text-muted-foreground mt-1">Cruza dos corrientes pedagógicas arrastrando o tocando autores.</p>
      </motion.div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            !filterCategory ? "border-primary bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-primary/30"
          }`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(filterCategory === cat.id ? null : cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              filterCategory === cat.id ? "border-primary bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Author chips */}
      <div className="flex flex-wrap gap-2">
        {filteredAuthors.map((a) => {
          const isSelected = matrizAuthor1 === a.id || matrizAuthor2 === a.id;
          const catColor = getCategoryColor(a.category);
          return (
            <div
              key={a.id}
              draggable
              onDragStart={(e) => handleDragStart(e, a.id)}
              onClick={() => handleTapAuthor(a.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-grab active:cursor-grabbing transition-all select-none ${
                isSelected
                  ? `border-${catColor} bg-${catColor}/10 ring-1 ring-${catColor}/30`
                  : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
              }`}
            >
              <img src={a.portrait} alt={a.name} className="w-7 h-7 rounded-full object-cover" width={28} height={28} />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground leading-tight">{a.name}</span>
                <span className="text-[9px] text-muted-foreground leading-tight">{a.years}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Synthesis area */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap py-4">
        {renderSlot(1, matrizAuthor1)}
        <motion.div
          animate={{
            scale: matrizAuthor1 && matrizAuthor2 ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.6, repeat: matrizAuthor1 && matrizAuthor2 ? 0 : undefined }}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            matrizAuthor1 && matrizAuthor2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}>
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">Fusión</span>
        </motion.div>
        {renderSlot(2, matrizAuthor2)}
      </div>

      {/* Result */}
      <AnimatePresence>
        {matrizAuthor1 && matrizAuthor2 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-surface rounded-2xl p-6 border border-primary/20 space-y-4"
          >
            {result ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg leading-tight">{result.title}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {getAuthorById(matrizAuthor1)?.name} ({getAuthorById(matrizAuthor1)?.category}) × {getAuthorById(matrizAuthor2)?.name} ({getAuthorById(matrizAuthor2)?.category})
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{result.description}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-accent/50 border border-accent">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      <p className="text-xs font-semibold text-foreground">Aplicación Práctica</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{result.application}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-accent/50 border border-accent">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <p className="text-xs font-semibold text-foreground">Conceptos Clave</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {[...(getAuthorById(matrizAuthor1)?.keyConceptsShort || []).slice(0, 2), ...(getAuthorById(matrizAuthor2)?.keyConceptsShort || []).slice(0, 2)].map((c, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">No se puede combinar el mismo autor consigo mismo.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
