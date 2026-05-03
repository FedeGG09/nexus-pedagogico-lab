import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexusStore } from "@/store/useNexusStore";
import { authors, getAuthorById } from "@/data/authors";
import { ArrowLeft, FlaskConical, Play, Rocket, Target, Flag } from "lucide-react";

const curriculumExamples = [
  "Enseñar fracciones en 4° grado",
  "Introducir la fotosíntesis en Biología",
  "Trabajar la Revolución Francesa en Historia",
  "Enseñar lectoescritura en 1° grado",
  "Introducir ecuaciones lineales en Álgebra",
];

export default function SimuladorTransposicion() {
  const { simuladorAuthorId, setSimuladorAuthorId, simuladorContent, setSimuladorContent, setActiveModule, duaProfiles } = useNexusStore();
  const [generated, setGenerated] = useState(false);
  const author = simuladorAuthorId ? getAuthorById(simuladorAuthorId) : null;
  const isTdah = duaProfiles.includes("tdah");

  const handleGenerate = () => {
    if (author && simuladorContent.trim()) {
      setGenerated(true);
    }
  };

  const phases = author
    ? [
        { icon: <Rocket className="w-5 h-5" />, label: "Inicio (Motivación)", content: author.transpositionPhases.inicio, color: "text-cat-escuela-nueva" },
        { icon: <Target className="w-5 h-5" />, label: "Desarrollo (Aplicación)", content: author.transpositionPhases.desarrollo, color: "text-primary" },
        { icon: <Flag className="w-5 h-5" />, label: "Cierre (Síntesis)", content: author.transpositionPhases.cierre, color: "text-cat-contemporaneos" },
      ]
    : [];

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <button onClick={() => setActiveModule("dashboard")} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver al Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <FlaskConical className="w-6 h-6 text-primary" />
          Simulador de Transposición
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {isTdah 
            ? "Elige un autor y un tema. Genera una secuencia didáctica." 
            : "Genera secuencias didácticas seleccionando un contenido curricular y la filosofía de un autor."
          }
        </p>
      </motion.div>

      {/* Config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">Autor / Filosofía</label>
          <select
            value={simuladorAuthorId || ""}
            onChange={(e) => { setSimuladorAuthorId(e.target.value || null); setGenerated(false); }}
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
          >
            <option value="">Seleccionar autor...</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>{a.name} — {a.keyConceptsShort[0]}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">Contenido curricular</label>
          <input
            type="text"
            value={simuladorContent}
            onChange={(e) => { setSimuladorContent(e.target.value); setGenerated(false); }}
            placeholder="Ej: Enseñar fracciones en 4° grado"
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground focus:ring-2 focus:ring-ring outline-none"
          />
          <div className="flex flex-wrap gap-1.5 mt-1">
            {curriculumExamples.map((ex) => (
              <button
                key={ex}
                onClick={() => { setSimuladorContent(ex); setGenerated(false); }}
                className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground hover:bg-accent transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!author || !simuladorContent.trim()}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium disabled:opacity-30 hover:opacity-90 transition-opacity"
      >
        <Play className="w-4 h-4" />
        Generar Secuencia Didáctica
      </button>

      {/* Output */}
      <AnimatePresence>
        {generated && author && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="glass-surface rounded-lg p-4">
              <h3 className="font-display font-semibold text-sm text-foreground mb-1">
                Secuencia para: "{simuladorContent}"
              </h3>
              <p className="text-xs text-muted-foreground">
                Según la filosofía de <strong>{author.name}</strong> — {author.methodology}
              </p>
            </div>

            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="glass-surface rounded-lg p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={phase.color}>{phase.icon}</span>
                  <h4 className="font-display font-semibold text-sm text-foreground">{phase.label}</h4>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{phase.content}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
