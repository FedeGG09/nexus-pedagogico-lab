import { motion } from "framer-motion";
import { categories, getAuthorsByCategory } from "@/data/authors";
import AuthorCard from "@/components/AuthorCard";
import { useNexusStore } from "@/store/useNexusStore";
import { Brain, Layers, FlaskConical, Network, LayoutDashboard } from "lucide-react";

const moduleButtons = [
  { id: "prisma" as const, label: "Prisma de Autores", icon: <Layers className="w-4 h-4" />, desc: "Transforma teorías en recursos" },
  { id: "matriz" as const, label: "Matriz de Síntesis", icon: <Brain className="w-4 h-4" />, desc: "Cruza corrientes pedagógicas" },
  { id: "simulador" as const, label: "Simulador", icon: <FlaskConical className="w-4 h-4" />, desc: "Secuencias didácticas" },
  { id: "genograma" as const, label: "Genograma", icon: <Network className="w-4 h-4" />, desc: "Red de influencias" },
];

export default function Dashboard() {
  const { setActiveModule, consultedAuthors } = useNexusStore();

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-foreground">
          Nexus Pedagógico
        </h1>
        <p className="text-muted-foreground mt-1 text-sm max-w-2xl">
          Diálogo pedagógico con las grandes mentes que transformaron la educación. 
          Cada autor es un agente especializado. Hazle preguntas, pide ideas y construye conocimiento.
        </p>
      </motion.div>

      {/* Module Quick Access */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {moduleButtons.map((mod, i) => (
          <motion.button
            key={mod.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setActiveModule(mod.id)}
            className="glass-surface rounded-lg p-4 text-left hover:shadow-card-hover transition-all group"
          >
            <div className="text-primary group-hover:scale-110 transition-transform">{mod.icon}</div>
            <h3 className="font-display font-semibold text-sm text-foreground mt-2">{mod.label}</h3>
            <p className="text-[10px] text-muted-foreground mt-0.5">{mod.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* Progress */}
      <div className="glass-surface rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-foreground">Progreso de exploración</span>
          <span className="text-xs text-muted-foreground">{consultedAuthors.length}/15 autores</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(consultedAuthors.length / 15) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Authors by Category */}
      {categories.map((cat, ci) => {
        const catAuthors = getAuthorsByCategory(cat.id);
        return (
          <motion.section
            key={cat.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: ci * 0.08 }}
          >
            <h2 className="font-display font-semibold text-sm mb-3 flex items-center gap-2">
              <span>{cat.icon}</span>
              <span className={`uppercase tracking-wider text-cat-${cat.id.replace("giro-", "giro-")}`}>
                {cat.name}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {catAuthors.map((author) => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </div>
          </motion.section>
        );
      })}

      {/* How to interact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-surface rounded-lg p-5 max-w-md"
      >
        <h3 className="font-display font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
          <span>✨</span> ¿Cómo interactuar?
        </h3>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li>🔍 Haz preguntas a cualquier autor.</li>
          <li>💡 Pide ejemplos, estrategias o reflexiones.</li>
          <li>🔄 Compara perspectivas y construye nuevas ideas.</li>
        </ul>
        <p className="text-xs text-primary font-medium mt-3">La conversación transforma.</p>
      </motion.div>
    </div>
  );
}
