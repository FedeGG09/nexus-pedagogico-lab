import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Brain, Sparkles, Accessibility, ChevronLeft, ChevronRight, Shield, Info } from "lucide-react";
import { useNexusStore, type DUAProfile } from "@/store/useNexusStore";

const duaOptions: { id: DUAProfile; label: string; description: string; detail: string; icon: React.ReactNode; gradient: string; activeColor: string }[] = [
  {
    id: "tdah",
    label: "TDAH",
    description: "Simplifica lenguaje, reduce ruido visual",
    detail: "Activa indicadores de foco, limita estímulos simultáneos y proporciona estructura visual clara para mantener la atención sostenida.",
    icon: <Brain className="w-5 h-5" />,
    gradient: "from-amber-500/20 to-orange-500/20",
    activeColor: "border-amber-400 shadow-amber-400/20",
  },
  {
    id: "visual",
    label: "Discapacidad Visual",
    description: "Alto contraste, fuentes grandes",
    detail: "Aumenta el tamaño tipográfico, mejora la relación de contraste WCAG AAA y añade texto alternativo extendido a todas las imágenes.",
    icon: <Eye className="w-5 h-5" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
    activeColor: "border-blue-400 shadow-blue-400/20",
  },
  {
    id: "altas-capacidades",
    label: "Altas Capacidades",
    description: "Niveles de investigación profunda",
    detail: "Desbloquea capas de profundización académica, conexiones interdisciplinarias y desafíos cognitivos avanzados.",
    icon: <Sparkles className="w-5 h-5" />,
    gradient: "from-violet-500/20 to-purple-500/20",
    activeColor: "border-violet-400 shadow-violet-400/20",
  },
];

export default function DUASidebar() {
  const { duaProfiles, toggleDUA } = useNexusStore();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredId, setHoveredId] = useState<DUAProfile | null>(null);
  const activeCount = duaProfiles.length;

  if (collapsed) {
    return (
      <motion.aside
        initial={{ width: 64 }}
        animate={{ width: 64 }}
        className="flex-shrink-0 bg-card border-r border-border flex flex-col items-center py-4 gap-3"
      >
        <button onClick={() => setCollapsed(false)} className="p-2 rounded-lg hover:bg-accent transition-colors">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="relative">
          <Accessibility className="w-5 h-5 text-primary" />
          {activeCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center"
            >
              {activeCount}
            </motion.span>
          )}
        </div>
        <div className="w-8 h-px bg-border" />
        {duaOptions.map((opt) => {
          const active = duaProfiles.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggleDUA(opt.id)}
              className={`p-2 rounded-lg transition-all ${
                active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"
              }`}
              title={opt.label}
            >
              {opt.icon}
            </button>
          );
        })}
      </motion.aside>
    );
  }

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 flex-shrink-0 bg-card border-r border-border flex flex-col overflow-y-auto"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"
            >
              <Accessibility className="w-5 h-5 text-primary" />
            </motion.div>
            <div>
              <h2 className="font-display font-bold text-sm text-foreground">Módulo D.U.A.</h2>
              <p className="text-[10px] text-muted-foreground">Diseño Universal para el Aprendizaje</p>
            </div>
          </div>
          <button onClick={() => setCollapsed(true)} className="p-1.5 rounded-lg hover:bg-accent transition-colors">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Status bar */}
        <motion.div
          layout
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
            activeCount > 0
              ? "border-primary/30 bg-primary/5"
              : "border-border bg-muted/30"
          }`}
        >
          <Shield className={`w-4 h-4 ${activeCount > 0 ? "text-primary" : "text-muted-foreground"}`} />
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-foreground">
              {activeCount === 0
                ? "Sin perfiles activos"
                : `${activeCount} perfil${activeCount > 1 ? "es" : ""} activo${activeCount > 1 ? "s" : ""}`}
            </p>
            <div className="flex gap-0.5 mt-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= activeCount ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Profile cards */}
      <div className="flex-1 p-3 flex flex-col gap-2.5">
        {duaOptions.map((opt, idx) => {
          const active = duaProfiles.includes(opt.id);
          const hovered = hoveredId === opt.id;
          return (
            <motion.div
              key={opt.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <button
                onClick={() => toggleDUA(opt.id)}
                onMouseEnter={() => setHoveredId(opt.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`w-full text-left rounded-xl border-2 p-3.5 transition-all duration-300 ${
                  active
                    ? `${opt.activeColor} bg-gradient-to-br ${opt.gradient} shadow-lg`
                    : "border-border hover:border-primary/20 bg-card hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={active ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      active
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {opt.icon}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">{opt.label}</span>
                      <div
                        className={`w-9 h-5 rounded-full transition-all duration-300 flex items-center px-0.5 ${
                          active ? "bg-primary justify-end" : "bg-muted justify-start"
                        }`}
                      >
                        <motion.div
                          layout
                          className="w-4 h-4 rounded-full bg-primary-foreground shadow-sm"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{opt.description}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {(active || hovered) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-border/50 flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] text-muted-foreground leading-relaxed">{opt.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30">
          <Accessibility className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            El <span className="font-semibold text-foreground">D.U.A.</span> adapta la experiencia de aprendizaje para que
            todos los estudiantes puedan acceder al contenido de manera equitativa.
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
