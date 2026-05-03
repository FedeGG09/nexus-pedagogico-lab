import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexusStore } from "@/store/useNexusStore";
import { authors, categories, getAuthorById, getCategoryColor, type CategoryId } from "@/data/authors";
import { ArrowLeft, Network } from "lucide-react";

interface NodePosition {
  x: number;
  y: number;
  id: string;
}

const categoryPositions: Record<CategoryId, { cx: number; cy: number }> = {
  fundadores: { cx: 400, cy: 100 },
  "escuela-nueva": { cx: 200, cy: 280 },
  "giro-psicologico": { cx: 600, cy: 280 },
  "pedagogia-critica": { cx: 200, cy: 460 },
  contemporaneos: { cx: 600, cy: 460 },
};

const categoryHslColors: Record<CategoryId, string> = {
  fundadores: "hsl(230, 65%, 52%)",
  "escuela-nueva": "hsl(152, 55%, 42%)",
  "giro-psicologico": "hsl(25, 90%, 55%)",
  "pedagogia-critica": "hsl(350, 70%, 52%)",
  contemporaneos: "hsl(270, 55%, 52%)",
};

export default function GenogramaInteractivo() {
  const { setActiveModule, addConsultedAuthor, setSelectedAuthorId, setActiveModule: setMod } = useNexusStore();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes: NodePosition[] = useMemo(() => {
    const result: NodePosition[] = [];
    const catGroups: Record<string, typeof authors> = {};
    authors.forEach((a) => {
      if (!catGroups[a.category]) catGroups[a.category] = [];
      catGroups[a.category].push(a);
    });

    Object.entries(catGroups).forEach(([catId, catAuthors]) => {
      const pos = categoryPositions[catId as CategoryId];
      const spread = 70;
      catAuthors.forEach((a, i) => {
        const angle = (2 * Math.PI * i) / catAuthors.length - Math.PI / 2;
        const r = catAuthors.length === 1 ? 0 : spread;
        result.push({
          id: a.id,
          x: pos.cx + r * Math.cos(angle),
          y: pos.cy + r * Math.sin(angle),
        });
      });
    });

    return result;
  }, []);

  const getNodePos = (id: string) => nodes.find((n) => n.id === id);
  const hoveredAuthor = hoveredNode ? getAuthorById(hoveredNode) : null;
  const selectedAuthor = selectedNode ? getAuthorById(selectedNode) : null;

  const connections = useMemo(() => {
    const conns: { from: string; to: string }[] = [];
    const seen = new Set<string>();
    authors.forEach((a) => {
      a.connections.forEach((c) => {
        const key = [a.id, c].sort().join("-");
        if (!seen.has(key) && getNodePos(c)) {
          seen.add(key);
          conns.push({ from: a.id, to: c });
        }
      });
    });
    return conns;
  }, [nodes]);

  const activeConnections = hoveredNode
    ? connections.filter((c) => c.from === hoveredNode || c.to === hoveredNode)
    : [];

  const handleNodeClick = (authorId: string) => {
    setSelectedNode(selectedNode === authorId ? null : authorId);
    addConsultedAuthor(authorId);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      <button onClick={() => setActiveModule("dashboard")} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Volver al Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <Network className="w-6 h-6 text-primary" />
          Genograma Interactivo
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          La historia de la pedagogía como red neuronal. Toca un nodo para ver conexiones.
        </p>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryHslColors[cat.id] }} />
            <span className="text-muted-foreground">{cat.icon} {cat.name}</span>
          </div>
        ))}
      </div>

      {/* SVG Network */}
      <div className="glass-surface rounded-xl overflow-hidden">
        <svg viewBox="0 0 800 560" className="w-full h-auto" style={{ minHeight: 400 }}>
          {/* Background connections */}
          {connections.map((conn) => {
            const from = getNodePos(conn.from);
            const to = getNodePos(conn.to);
            if (!from || !to) return null;
            const isActive = activeConnections.some(
              (ac) => (ac.from === conn.from && ac.to === conn.to) || (ac.from === conn.to && ac.to === conn.from)
            );
            return (
              <line
                key={`${conn.from}-${conn.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? "hsl(230, 65%, 52%)" : "hsl(220, 15%, 85%)"}
                strokeWidth={isActive ? 2.5 : 1}
                strokeOpacity={isActive ? 1 : 0.4}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const author = getAuthorById(node.id);
            if (!author) return null;
            const color = categoryHslColors[author.category];
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;
            const isConnected = activeConnections.some((c) => c.from === node.id || c.to === node.id);
            const dim = hoveredNode && !isHovered && !isConnected;

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node.id)}
                className="cursor-pointer"
                style={{ opacity: dim ? 0.3 : 1, transition: "opacity 0.3s" }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered || isSelected ? 28 : 22}
                  fill={color}
                  fillOpacity={0.15}
                  stroke={color}
                  strokeWidth={isSelected ? 3 : isHovered ? 2 : 1.5}
                  className="transition-all duration-200"
                />
                <clipPath id={`clip-${node.id}`}>
                  <circle cx={node.x} cy={node.y} r={isHovered || isSelected ? 24 : 18} />
                </clipPath>
                <image
                  href={author.portrait}
                  x={node.x - (isHovered || isSelected ? 24 : 18)}
                  y={node.y - (isHovered || isSelected ? 24 : 18)}
                  width={(isHovered || isSelected ? 24 : 18) * 2}
                  height={(isHovered || isSelected ? 24 : 18) * 2}
                  clipPath={`url(#clip-${node.id})`}
                  className="transition-all duration-200"
                />
                <text
                  x={node.x}
                  y={node.y + (isHovered || isSelected ? 38 : 32)}
                  textAnchor="middle"
                  className="text-[10px] fill-current text-foreground font-medium"
                  style={{ fontSize: 10 }}
                >
                  {author.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected author detail */}
      <AnimatePresence>
        {selectedAuthor && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="glass-surface rounded-lg p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={selectedAuthor.portrait} alt={selectedAuthor.name} className="w-12 h-12 rounded-lg object-cover" width={48} height={48} />
              <div>
                <h3 className="font-display font-bold text-foreground">{selectedAuthor.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedAuthor.years}</p>
              </div>
            </div>
            <p className="text-sm text-foreground mb-2">{selectedAuthor.description}</p>
            <p className="text-xs text-muted-foreground">
              <strong>Conexiones:</strong> {selectedAuthor.connections.map((c) => getAuthorById(c)?.name).filter(Boolean).join(", ")}
            </p>
            <button
              onClick={() => {
                setSelectedAuthorId(selectedAuthor.id);
                setActiveModule("prisma");
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Explorar con Prisma →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
