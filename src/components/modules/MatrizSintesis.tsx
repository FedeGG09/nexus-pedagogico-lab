import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexusStore } from "@/store/useNexusStore";
import { authors, categories, getSynthesis, getAuthorById, getCategoryColor, type Author } from "@/data/authors";
import {
  ArrowLeft, Sparkles, X, GripVertical, Zap, Lightbulb, BookOpen,
  Shuffle, RotateCcw, Quote, Globe, Target, Layers, ArrowRight, Calendar, MapPin
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function MatrizSintesis() {
  const { matrizAuthor1, matrizAuthor2, setMatrizAuthor1, setMatrizAuthor2, setActiveModule } = useNexusStore();
  const [dragOverSlot, setDragOverSlot] = useState<1 | 2 | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const result = matrizAuthor1 && matrizAuthor2 ? getSynthesis(matrizAuthor1, matrizAuthor2) : null;
  const author1 = matrizAuthor1 ? getAuthorById(matrizAuthor1) : null;
  const author2 = matrizAuthor2 ? getAuthorById(matrizAuthor2) : null;

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

  const handleRandomize = () => {
    const shuffled = [...authors].sort(() => Math.random() - 0.5);
    setMatrizAuthor1(shuffled[0].id);
    setMatrizAuthor2(shuffled[1].id);
  };

  const handleReset = () => {
    setMatrizAuthor1(null);
    setMatrizAuthor2(null);
  };

  const handleSwap = () => {
    const temp = matrizAuthor1;
    setMatrizAuthor1(matrizAuthor2);
    setMatrizAuthor2(temp);
  };

  const filteredAuthors = filterCategory
    ? authors.filter(a => a.category === filterCategory)
    : authors;

  const renderAuthorDetail = (author: Author, position: "left" | "right") => (
    <motion.div
      variants={itemVariants}
      className="flex flex-col gap-1.5"
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-3 h-3 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">{author.paisOrigen}</span>
      </div>
      <p className="text-[11px] text-foreground/80 leading-relaxed line-clamp-3">
        {author.enfoqueResumido}
      </p>
      {author.citas[0] && (
        <div className="flex items-start gap-1.5 mt-1 p-2 rounded-lg bg-muted/30">
          <Quote className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-[10px] text-muted-foreground italic leading-snug line-clamp-2">
            "{author.citas[0]}"
          </p>
        </div>
      )}
    </motion.div>
  );

  const renderSlot = (slot: 1 | 2, authorId: string | null) => {
    const author = authorId ? getAuthorById(authorId) : null;
    const isOver = dragOverSlot === slot;
    const catColor = author ? getCategoryColor(author.category) : "";
    const category = author ? categories.find(c => c.id === author.category) : null;

    return (
      <motion.div
        layout
        onDrop={(e) => handleDrop(e, slot)}
        onDragOver={(e) => handleDragOver(e, slot)}
        onDragLeave={() => setDragOverSlot(null)}
        className={`relative w-56 rounded-2xl border-2 border-dashed flex flex-col items-center gap-2 transition-all duration-300 ${
          isOver
            ? "border-primary bg-accent scale-105 shadow-lg"
            : author
            ? `border-${catColor}/50 bg-gradient-to-br from-${catColor}/5 to-${catColor}/10`
            : "border-border bg-card/50 hover:border-muted-foreground/30"
        } ${author ? "p-4 pb-3" : "h-56 justify-center p-4"}`}
      >
        <span className="absolute top-2 left-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          {slot === 1 ? "Corriente A" : "Corriente B"}
        </span>
        {author ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center w-full pt-3">
            <div className={`w-20 h-20 rounded-xl overflow-hidden mx-auto ring-2 ring-${catColor}/30 shadow-lg`}>
              <img src={author.portrait} alt={author.name} className="w-full h-full object-cover" width={80} height={80} />
            </div>
            <p className="font-display font-bold text-sm text-foreground mt-2">{author.name}</p>
            <p className="text-[10px] text-muted-foreground">{author.years}</p>
            {category && (
              <span className={`inline-block mt-1 text-[9px] px-2 py-0.5 rounded-full bg-${catColor}/15 text-${catColor} font-medium`}>
                {category.icon} {category.name}
              </span>
            )}
            <div className="flex flex-wrap justify-center gap-1 mt-2 px-1">
              {author.keyConceptsShort.slice(0, 3).map((c, i) => (
                <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded-full bg-${catColor}/10 text-${catColor}`}>{c}</span>
              ))}
            </div>
            {renderAuthorDetail(author, slot === 1 ? "left" : "right")}
            <button
              onClick={() => slot === 1 ? setMatrizAuthor1(null) : setMatrizAuthor2(null)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          <div className="text-center">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 rounded-xl border-2 border-dashed border-muted-foreground/20 mx-auto flex items-center justify-center mb-2"
            >
              <GripVertical className="w-5 h-5 text-muted-foreground/30" />
            </motion.div>
            <p className="text-xs text-muted-foreground px-4">Arrastra o toca un autor</p>
          </div>
        )}
      </motion.div>
    );
  };

  const renderComparisonTable = () => {
    if (!author1 || !author2) return null;
    const rows = [
      { label: "Enfoque", a: author1.enfoqueResumido, b: author2.enfoqueResumido },
      { label: "Metodología", a: author1.methodology, b: author2.methodology },
      { label: "Contexto Histórico", a: author1.contextoHistorico, b: author2.contextoHistorico },
      { label: "Aportes Actuales", a: author1.aportesActuales, b: author2.aportesActuales },
    ];
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="overflow-x-auto">
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 text-muted-foreground font-medium border-b border-border w-28">Dimensión</th>
              <th className="text-left p-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <img src={author1.portrait} alt={author1.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="font-semibold text-foreground">{author1.name}</span>
                </div>
              </th>
              <th className="text-left p-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <img src={author2.portrait} alt={author2.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="font-semibold text-foreground">{author2.name}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr key={row.label} variants={itemVariants} className="border-b border-border/50">
                <td className="p-2 font-medium text-primary align-top">{row.label}</td>
                <td className="p-2 text-foreground/80 leading-relaxed">{row.a}</td>
                <td className="p-2 text-foreground/80 leading-relaxed">{row.b}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    );
  };

  const renderSharedConcepts = () => {
    if (!author1 || !author2) return null;
    const concepts1 = new Set(author1.keyConceptsShort.map(c => c.toLowerCase()));
    const concepts2 = new Set(author2.keyConceptsShort.map(c => c.toLowerCase()));
    const all1 = author1.keyConceptsShort;
    const all2 = author2.keyConceptsShort;

    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid sm:grid-cols-3 gap-3">
        <motion.div variants={itemVariants} className="p-3 rounded-xl bg-accent/40 border border-accent">
          <p className="text-[10px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <img src={author1.portrait} alt="" className="w-4 h-4 rounded-full" /> Conceptos de {author1.name}
          </p>
          <div className="flex flex-wrap gap-1">
            {all1.map((c, i) => (
              <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{c}</span>
            ))}
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center">
          <Layers className="w-5 h-5 text-primary mb-1" />
          <p className="text-[10px] font-semibold text-primary text-center">Zona de Convergencia</p>
          <p className="text-[9px] text-muted-foreground text-center mt-1">
            {author1.connections.includes(author2.id) || author2.connections.includes(author1.id)
              ? "✅ Conexión directa reconocida"
              : "🔄 Conexión indirecta por corrientes"}
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="p-3 rounded-xl bg-accent/40 border border-accent">
          <p className="text-[10px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <img src={author2.portrait} alt="" className="w-4 h-4 rounded-full" /> Conceptos de {author2.name}
          </p>
          <div className="flex flex-wrap gap-1">
            {all2.map((c, i) => (
              <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{c}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const renderTranspositionBridge = () => {
    if (!author1 || !author2) return null;
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-1">
          <Target className="w-4 h-4 text-primary" />
          <p className="text-xs font-bold text-foreground">Puente de Transposición Didáctica</p>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-3">
          {(["inicio", "desarrollo", "cierre"] as const).map((phase, i) => (
            <motion.div
              key={phase}
              variants={itemVariants}
              className="p-3 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i === 0 ? "bg-green-500/15 text-green-500" : i === 1 ? "bg-blue-500/15 text-blue-500" : "bg-purple-500/15 text-purple-500"
                }`}>
                  {i + 1}
                </div>
                <span className="text-[11px] font-semibold text-foreground capitalize">{phase}</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-muted/30">
                  <p className="text-[9px] font-medium text-muted-foreground mb-0.5">{author1.name}:</p>
                  <p className="text-[10px] text-foreground/80 leading-snug">{author1.transpositionPhases[phase]}</p>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-3 h-3 text-primary" />
                </div>
                <div className="p-2 rounded-lg bg-muted/30">
                  <p className="text-[9px] font-medium text-muted-foreground mb-0.5">{author2.name}:</p>
                  <p className="text-[10px] text-foreground/80 leading-snug">{author2.transpositionPhases[phase]}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderObrasComparadas = () => {
    if (!author1 || !author2) return null;
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid sm:grid-cols-2 gap-3">
        {[author1, author2].map((a) => (
          <motion.div key={a.id} variants={itemVariants} className="p-3 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <p className="text-[11px] font-bold text-foreground">Obras de {a.name}</p>
            </div>
            <ul className="space-y-1">
              {a.obras.slice(0, 4).map((obra, i) => (
                <li key={i} className="text-[10px] text-foreground/80 flex items-start gap-1.5">
                  <span className="text-primary mt-0.5">•</span> {obra}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => setActiveModule("dashboard")} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al Dashboard
        </button>
        <div className="flex gap-2">
          <button onClick={handleRandomize} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
            <Shuffle className="w-3.5 h-3.5" /> Aleatorio
          </button>
          {(matrizAuthor1 || matrizAuthor2) && (
            <button onClick={handleReset} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-destructive/30 transition-all">
              <RotateCcw className="w-3.5 h-3.5" /> Limpiar
            </button>
          )}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground">Matriz de Síntesis</h1>
        <p className="text-sm text-muted-foreground mt-1">Cruza dos corrientes pedagógicas para descubrir conexiones, convergencias y aplicaciones prácticas.</p>
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
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-wrap gap-2">
        {filteredAuthors.map((a) => {
          const isSelected = matrizAuthor1 === a.id || matrizAuthor2 === a.id;
          const catColor = getCategoryColor(a.category);
          return (
            <div
              key={a.id}
              draggable
              onDragStart={(e) => handleDragStart(e, a.id)}
              onClick={() => handleTapAuthor(a.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-grab active:cursor-grabbing transition-all select-none hover:scale-[1.03] active:scale-[0.97] ${
                isSelected
                  ? `border-${catColor} bg-${catColor}/10 ring-1 ring-${catColor}/30 shadow-md`
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
      </motion.div>

      {/* Synthesis area */}
      <div className="flex items-start justify-center gap-4 sm:gap-8 flex-wrap py-4">
        {renderSlot(1, matrizAuthor1)}
        <div className="flex flex-col items-center gap-2 pt-16">
          <motion.div
            animate={{
              scale: matrizAuthor1 && matrizAuthor2 ? [1, 1.2, 1] : 1,
              rotate: matrizAuthor1 && matrizAuthor2 ? [0, 180, 360] : 0,
            }}
            transition={{ duration: 0.8, repeat: matrizAuthor1 && matrizAuthor2 ? 0 : undefined }}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-lg ${
              matrizAuthor1 && matrizAuthor2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <Zap className="w-6 h-6" />
          </motion.div>
          <span className="text-[10px] font-semibold text-muted-foreground">Fusión</span>
          {matrizAuthor1 && matrizAuthor2 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleSwap}
              className="text-[9px] text-primary hover:underline flex items-center gap-1"
            >
              <Shuffle className="w-3 h-3" /> Intercambiar
            </motion.button>
          )}
        </div>
        {renderSlot(2, matrizAuthor2)}
      </div>

      {/* Result */}
      <AnimatePresence>
        {matrizAuthor1 && matrizAuthor2 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {/* Main synthesis card */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-6 border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-accent/30 space-y-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center"
                  >
                    <Sparkles className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg leading-tight">{result.title}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {author1?.name} ({categories.find(c => c.id === author1?.category)?.icon} {categories.find(c => c.id === author1?.category)?.name}) × {author2?.name} ({categories.find(c => c.id === author2?.category)?.icon} {categories.find(c => c.id === author2?.category)?.name})
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{result.description}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-xl bg-accent/50 border border-accent"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      <p className="text-xs font-semibold text-foreground">Aplicación Práctica</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{result.application}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-xl bg-accent/50 border border-accent"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <p className="text-xs font-semibold text-foreground">Vigencia en el Siglo XXI</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      La fusión entre {author1?.name} y {author2?.name} permite abordar los desafíos educativos contemporáneos
                      combinando {author1?.keyConceptsShort[0]} con {author2?.keyConceptsShort[0]} en contextos tecnológicos y multiculturales.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Shared concepts */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" /> Mapa Conceptual Comparado
              </h4>
              {renderSharedConcepts()}
            </div>

            {/* Comparison table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> Tabla Comparativa
              </h4>
              <div className="rounded-xl border border-border overflow-hidden bg-card">
                {renderComparisonTable()}
              </div>
            </div>

            {/* Transposition bridge */}
            {renderTranspositionBridge()}

            {/* Obras comparadas */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> Obras Principales
              </h4>
              {renderObrasComparadas()}
            </div>

            {/* Citas cruzadas */}
            {author1 && author2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid sm:grid-cols-2 gap-3"
              >
                {[author1, author2].map((a) => (
                  <div key={a.id} className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20">
                    <div className="flex items-center gap-2 mb-3">
                      <img src={a.portrait} alt={a.name} className="w-6 h-6 rounded-full object-cover" />
                      <p className="text-[11px] font-bold text-foreground">Citas de {a.name}</p>
                    </div>
                    <div className="space-y-2">
                      {a.citas.slice(0, 3).map((cita, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Quote className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-[10px] text-foreground/80 italic leading-snug">"{cita}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
