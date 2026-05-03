import { motion } from "framer-motion";
import { Eye, EyeOff, Accessibility, Brain, Sparkles } from "lucide-react";
import { useNexusStore, type DUAProfile } from "@/store/useNexusStore";

const duaOptions: { id: DUAProfile; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: "tdah",
    label: "TDAH",
    description: "Simplifica lenguaje, reduce ruido visual",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: "visual",
    label: "Discapacidad Visual",
    description: "Alto contraste, fuentes grandes",
    icon: <Eye className="w-4 h-4" />,
  },
  {
    id: "altas-capacidades",
    label: "Altas Capacidades",
    description: "Niveles de investigación profunda",
    icon: <Sparkles className="w-4 h-4" />,
  },
];

export default function DUASidebar() {
  const { duaProfiles, toggleDUA } = useNexusStore();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 flex-shrink-0 bg-card border-r border-border p-4 flex flex-col gap-4 overflow-y-auto"
    >
      <div className="flex items-center gap-2 mb-2">
        <Accessibility className="w-5 h-5 text-primary" />
        <h2 className="font-display font-semibold text-sm text-foreground">
          Módulo D.U.A.
        </h2>
      </div>
      <p className="text-xs text-muted-foreground">
        Activa perfiles de aula para adaptar la interfaz a necesidades específicas.
      </p>

      <div className="flex flex-col gap-3 mt-2">
        {duaOptions.map((opt) => {
          const active = duaProfiles.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggleDUA(opt.id)}
              className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                active
                  ? "border-primary bg-accent"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div
                className={`mt-0.5 ${active ? "text-primary" : "text-muted-foreground"}`}
              >
                {opt.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    {opt.label}
                  </span>
                  <div
                    className={`w-8 h-4 rounded-full transition-colors flex items-center ${
                      active ? "bg-primary justify-end" : "bg-muted justify-start"
                    }`}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-primary-foreground mx-0.5 shadow-sm" />
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{opt.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-4 border-t border-border">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          El Diseño Universal para el Aprendizaje (DUA) adapta la experiencia de aprendizaje para
          que todos los estudiantes puedan acceder al contenido.
        </p>
      </div>
    </motion.aside>
  );
}
