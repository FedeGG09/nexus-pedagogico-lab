import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNexusStore } from "@/store/useNexusStore";
import { getAuthorById, getCategoryColor, categories, type CategoryId } from "@/data/authors";
import { Eye, BookOpen, HelpCircle, ArrowLeft, ChevronLeft, ChevronRight, GraduationCap, Brain, Clock, Quote, Target, Users, Download, FileText, Loader2, MapPin, BookMarked } from "lucide-react";

// Category concept images
import fundadoresImg from "@/assets/slides/fundadores-concept.jpg";
import escuelaNuevaImg from "@/assets/slides/escuela-nueva-concept.jpg";
import giroPsicologicoImg from "@/assets/slides/giro-psicologico-concept.jpg";
import pedagogiaCriticaImg from "@/assets/slides/pedagogia-critica-concept.jpg";
import contemporaneosImg from "@/assets/slides/contemporaneos-concept.jpg";

// Slide type images
import methodologyImg from "@/assets/slides/methodology.jpg";
import transpositionImg from "@/assets/slides/transposition.jpg";
import biographyImg from "@/assets/slides/biography.jpg";
import connectionsImg from "@/assets/slides/connections.jpg";

const categoryImages: Record<CategoryId, string> = {
  fundadores: fundadoresImg,
  "escuela-nueva": escuelaNuevaImg,
  "giro-psicologico": giroPsicologicoImg,
  "pedagogia-critica": pedagogiaCriticaImg,
  contemporaneos: contemporaneosImg,
};

// DUA-aware alt text generator
function getAltText(
  baseAlt: string,
  duaProfiles: string[],
  context?: string
): string {
  let alt = baseAlt;
  if (duaProfiles.includes("visual")) {
    alt += `. Descripción detallada: ${context || "Imagen educativa relacionada con la pedagogía"}`;
  }
  if (duaProfiles.includes("tdah")) {
    alt += " [Imagen de apoyo visual]";
  }
  if (duaProfiles.includes("altas-capacidades") && context) {
    alt += `. Conexión académica: ${context}`;
  }
  return alt;
}

export default function PrismaAutores() {
  const { selectedAuthorId, selectedLens, setSelectedLens, setActiveModule, setQuizScore, duaProfiles } = useNexusStore();
  const author = selectedAuthorId ? getAuthorById(selectedAuthorId) : null;
  const [slideIndex, setSlideIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const isAltasCapacidades = duaProfiles.includes("altas-capacidades");

  if (!author) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Selecciona un autor desde el Dashboard para explorar.
      </div>
    );
  }

  const catColor = getCategoryColor(author.category);
  const category = categories.find(c => c.id === author.category);
  const catImage = categoryImages[author.category];

  // Build enriched slides for Flash-PPT with all author info
  const enrichedSlides = [
    {
      type: "cover" as const,
      title: author.name,
      subtitle: `${author.years} · ${category?.icon} ${category?.name}`,
      content: author.description,
      image: author.portrait,
    },
    {
      type: "bio" as const,
      title: "Biografía y Contexto Histórico",
      content: author.storytelling,
      icon: <Clock className="w-5 h-5" />,
      image: biographyImg,
    },
    {
      type: "contexto" as const,
      title: "Contexto Histórico y Origen",
      content: author.contextoHistorico,
      icon: <MapPin className="w-5 h-5" />,
      image: biographyImg,
    },
    {
      type: "concepts" as const,
      title: "Conceptos Clave",
      items: author.keyConcepts,
      icon: <Brain className="w-5 h-5" />,
      image: catImage,
    },
    {
      type: "methodology" as const,
      title: "Metodología",
      content: author.methodology,
      icon: <Target className="w-5 h-5" />,
      image: methodologyImg,
    },
    {
      type: "obras" as const,
      title: "Obras Principales",
      items: author.obras,
      icon: <BookMarked className="w-5 h-5" />,
      image: catImage,
    },
    {
      type: "citas" as const,
      title: "Citas Célebres",
      items: author.citas,
      icon: <Quote className="w-5 h-5" />,
      image: catImage,
    },
    ...author.slides.map(s => ({
      type: "content" as const,
      title: s.title,
      content: s.content,
      icon: <BookOpen className="w-5 h-5" />,
      image: catImage,
    })),
    {
      type: "aportes" as const,
      title: "Aportes a la Educación Actual",
      content: author.aportesActuales,
      icon: <GraduationCap className="w-5 h-5" />,
      image: catImage,
    },
    {
      type: "transposition" as const,
      title: "Transposición Didáctica",
      phases: author.transpositionPhases,
      icon: <GraduationCap className="w-5 h-5" />,
      image: transpositionImg,
    },
    {
      type: "connections" as const,
      title: "Red de Influencias",
      connections: author.connections,
      icon: <Users className="w-5 h-5" />,
      image: connectionsImg,
    },
  ];

  const currentSlide = enrichedSlides[slideIndex];

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

  // PDF Export
  const exportToPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: html2canvas } = await import("html2canvas");

      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const savedIndex = slideIndex;

      for (let i = 0; i < enrichedSlides.length; i++) {
        setSlideIndex(i);
        // Wait for render
        await new Promise(r => setTimeout(r, 300));

        if (slideRef.current) {
          const canvas = await html2canvas(slideRef.current, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#1a1a2e",
          });

          const imgData = canvas.toDataURL("image/jpeg", 0.92);
          const imgRatio = canvas.width / canvas.height;
          let imgW = pageWidth - 10;
          let imgH = imgW / imgRatio;

          if (imgH > pageHeight - 10) {
            imgH = pageHeight - 10;
            imgW = imgH * imgRatio;
          }

          const x = (pageWidth - imgW) / 2;
          const y = (pageHeight - imgH) / 2;

          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, "JPEG", x, y, imgW, imgH);
        }
      }

      pdf.save(`Flash-PPT_${author.name.replace(/\s+/g, "_")}.pdf`);
      setSlideIndex(savedIndex);
    } catch (err) {
      console.error("Error exporting PDF:", err);
    } finally {
      setIsExporting(false);
    }
  }, [slideIndex, enrichedSlides.length, author?.name]);

  const renderSlideContent = () => {
    switch (currentSlide.type) {
      case "cover":
        return (
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden ring-4 ring-${catColor}/20 shadow-xl`}>
                <img
                  src={author.portrait}
                  alt={getAltText(`Retrato de ${author.name} (${author.years})`, duaProfiles, `Pedagogo de la corriente ${category?.name}, ${author.paisOrigen}`)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className={`absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-${catColor}/20 text-foreground border border-${catColor}/30`}>
                {category?.icon} {category?.name}
              </span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-display text-3xl font-bold text-foreground">{currentSlide.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{currentSlide.subtitle}</p>
              <p className="text-xs text-muted-foreground mt-0.5">📍 {author.paisOrigen}</p>
              <p className="text-sm text-foreground mt-3 leading-relaxed">{currentSlide.content}</p>
              <p className="text-xs text-muted-foreground mt-2 italic">{author.enfoqueResumido}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                {author.keyConceptsShort.map((c, i) => (
                  <span key={i} className={`text-xs px-3 py-1 rounded-full bg-${catColor}/10 text-foreground font-medium border border-${catColor}/20`}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "bio":
        return (
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="sm:w-2/3 order-2 sm:order-1">
              <div className="flex items-center gap-2 mb-3">
                <Quote className="w-5 h-5 text-primary flex-shrink-0" />
                <h3 className="font-display font-semibold text-foreground text-lg">Historia de {author.name}</h3>
              </div>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{currentSlide.content}</p>
            </div>
            <div className="sm:w-1/3 order-1 sm:order-2 flex-shrink-0">
              <img
                src={currentSlide.image}
                alt={getAltText(`Contexto histórico de ${author.name}`, duaProfiles, `Ilustración del período ${author.years} en ${author.paisOrigen}`)}
                className="w-full h-40 sm:h-full rounded-xl object-cover"
                loading="lazy"
                width={768}
                height={512}
              />
            </div>
          </div>
        );

      case "contexto":
        return (
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="sm:w-2/3">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <h3 className="font-display font-semibold text-foreground text-lg">Contexto Histórico</h3>
              </div>
              <div className={`p-4 rounded-xl bg-${catColor}/5 border border-${catColor}/20 mb-3`}>
                <p className="text-xs font-medium text-muted-foreground mb-1">📍 Origen</p>
                <p className="text-sm text-foreground font-medium">{author.paisOrigen}</p>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{currentSlide.content}</p>
            </div>
            <div className="sm:w-1/3 flex-shrink-0">
              <img
                src={currentSlide.image}
                alt={getAltText(`Mapa conceptual del contexto de ${author.name}`, duaProfiles, `${author.paisOrigen}, ${author.years}`)}
                className="w-full h-40 sm:h-full rounded-xl object-cover"
                loading="lazy"
                width={768}
                height={512}
              />
            </div>
          </div>
        );

      case "concepts":
        return (
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="sm:w-2/3 space-y-2.5">
              {currentSlide.items?.map((concept, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-3 p-3 rounded-xl bg-accent/30 border border-accent"
                >
                  <div className={`w-7 h-7 rounded-lg bg-${catColor}/10 flex items-center justify-center flex-shrink-0`}>
                    <span className="text-[11px] font-bold text-foreground">{i + 1}</span>
                  </div>
                  <p className="text-[13px] text-foreground leading-relaxed">{concept}</p>
                </motion.div>
              ))}
            </div>
            <div className="sm:w-1/3 flex-shrink-0 hidden sm:block">
              <img
                src={currentSlide.image}
                alt={getAltText(`Conceptos clave de ${author.name}: ${author.keyConceptsShort.join(", ")}`, duaProfiles, `Diagrama visual de los ${author.keyConcepts.length} conceptos fundamentales`)}
                className="w-full h-full rounded-xl object-cover max-h-80"
                loading="lazy"
                width={768}
                height={512}
              />
            </div>
          </div>
        );

      case "methodology":
        return (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="sm:w-3/5">
                <div className={`p-5 rounded-2xl bg-gradient-to-br from-${catColor}/5 to-${catColor}/10 border border-${catColor}/20`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-semibold text-foreground">Enfoque Metodológico</h3>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{currentSlide.content}</p>
                </div>
              </div>
              <div className="sm:w-2/5 flex-shrink-0">
                <img
                  src={currentSlide.image}
                  alt={getAltText(`Metodología de ${author.name}`, duaProfiles, `Representación visual del enfoque: ${author.enfoqueResumido}`)}
                  className="w-full h-48 sm:h-full rounded-xl object-cover"
                  loading="lazy"
                  width={768}
                  height={512}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {author.keyConceptsShort.map((c, i) => (
                <div key={i} className="text-center p-3 rounded-xl bg-card border border-border">
                  <div className={`w-10 h-10 rounded-full bg-${catColor}/10 mx-auto flex items-center justify-center mb-2`}>
                    <Brain className="w-4 h-4 text-foreground" />
                  </div>
                  <p className="text-[11px] font-medium text-foreground">{c}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "obras":
        return (
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="sm:w-2/3 space-y-2.5">
              {currentSlide.items?.map((obra, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex gap-3 p-3 rounded-xl bg-${catColor}/5 border border-${catColor}/15`}
                >
                  <div className={`w-7 h-7 rounded-lg bg-${catColor}/10 flex items-center justify-center flex-shrink-0`}>
                    <BookMarked className="w-3.5 h-3.5 text-foreground" />
                  </div>
                  <p className="text-[13px] text-foreground leading-relaxed">{obra}</p>
                </motion.div>
              ))}
            </div>
            <div className="sm:w-1/3 flex-shrink-0 hidden sm:block">
              <img
                src={currentSlide.image}
                alt={getAltText(`Obras principales de ${author.name}`, duaProfiles, `Bibliografía destacada: ${author.obras[0]}`)}
                className="w-full h-full rounded-xl object-cover max-h-80"
                loading="lazy"
                width={768}
                height={512}
              />
            </div>
          </div>
        );

      case "citas":
        return (
          <div className="space-y-4">
            {currentSlide.items?.map((cita, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className={`p-5 rounded-2xl bg-gradient-to-br from-${catColor}/5 to-${catColor}/10 border border-${catColor}/20`}
              >
                <div className="flex gap-3">
                  <Quote className={`w-6 h-6 text-${catColor} flex-shrink-0 mt-0.5`} />
                  <p className="text-sm text-foreground italic leading-relaxed">"{cita}"</p>
                </div>
                <p className="text-[11px] text-muted-foreground text-right mt-2">— {author.name}</p>
              </motion.div>
            ))}
          </div>
        );

      case "aportes":
        return (
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="sm:w-3/5">
              <div className={`p-5 rounded-2xl bg-gradient-to-br from-${catColor}/5 to-${catColor}/10 border border-${catColor}/20`}>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Vigencia en el Siglo XXI</h3>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{currentSlide.content}</p>
              </div>
            </div>
            <div className="sm:w-2/5 flex-shrink-0">
              <img
                src={currentSlide.image}
                alt={getAltText(`Aportes actuales de ${author.name} a la educación`, duaProfiles, `Aplicaciones contemporáneas de ${author.keyConceptsShort[0]}`)}
                className="w-full h-48 sm:h-full rounded-xl object-cover"
                loading="lazy"
                width={768}
                height={512}
              />
            </div>
          </div>
        );

      case "transposition":
        return (
          <div className="space-y-4">
            <div className="w-full h-32 rounded-xl overflow-hidden mb-2">
              <img
                src={currentSlide.image}
                alt={getAltText(`Transposición didáctica de ${author.name}`, duaProfiles, `Secuencia de tres fases: Inicio, Desarrollo y Cierre basadas en ${author.enfoqueResumido}`)}
                className="w-full h-full object-cover"
                loading="lazy"
                width={768}
                height={512}
              />
            </div>
            {(["inicio", "desarrollo", "cierre"] as const).map((phase, i) => {
              const colors = ["bg-cat-escuela-nueva/10 border-cat-escuela-nueva/20", "bg-primary/10 border-primary/20", "bg-cat-giro-psicologico/10 border-cat-giro-psicologico/20"];
              const icons = ["🚀", "⚙️", "🎯"];
              const labels = ["Inicio", "Desarrollo", "Cierre"];
              return (
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`p-4 rounded-xl border ${colors[i]}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{icons[i]}</span>
                    <h4 className="text-sm font-semibold text-foreground">{labels[i]}</h4>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">
                    {currentSlide.phases?.[phase]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        );

      case "connections":
        return (
          <div className="space-y-4">
            <div className="w-full h-28 rounded-xl overflow-hidden">
              <img
                src={currentSlide.image}
                alt={getAltText(`Red de influencias de ${author.name}`, duaProfiles, `Conexiones pedagógicas con ${currentSlide.connections?.length} autores relacionados`)}
                className="w-full h-full object-cover"
                loading="lazy"
                width={768}
                height={512}
              />
            </div>
            <p className="text-sm text-muted-foreground">Autores que influenciaron o fueron influenciados por {author.name}:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentSlide.connections?.map(connId => {
                const conn = getAuthorById(connId);
                if (!conn) return null;
                const connCatColor = getCategoryColor(conn.category);
                return (
                  <div key={connId} className={`p-3 rounded-xl border border-${connCatColor}/20 bg-${connCatColor}/5 text-center`}>
                    <img
                      src={conn.portrait}
                      alt={getAltText(`Retrato de ${conn.name}`, duaProfiles, `${conn.years}, corriente ${categories.find(c => c.id === conn.category)?.name}`)}
                      className="w-14 h-14 rounded-lg object-cover mx-auto mb-2"
                      loading="lazy"
                    />
                    <p className="text-xs font-semibold text-foreground">{conn.name}</p>
                    <p className="text-[10px] text-muted-foreground">{conn.years}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{conn.keyConceptsShort[0]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      default: // "content" slides
        return (
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="sm:w-3/5 order-2 sm:order-1">
              <p className="text-sm text-foreground leading-relaxed">{currentSlide.content}</p>
            </div>
            <div className="sm:w-2/5 order-1 sm:order-2 flex-shrink-0">
              <img
                src={currentSlide.image}
                alt={getAltText(currentSlide.title, duaProfiles, `Slide sobre ${author.name}: ${currentSlide.title}`)}
                className="w-full h-36 sm:h-44 rounded-xl object-cover"
                loading="lazy"
                width={768}
                height={512}
              />
            </div>
          </div>
        );
    }
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
        <img
          src={author.portrait}
          alt={getAltText(`Retrato de ${author.name}`, duaProfiles, `Pedagogo ${author.paisOrigen}, ${author.years}`)}
          className="w-16 h-16 rounded-lg object-cover"
          width={64}
          height={64}
        />
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{author.name}</h1>
          <p className="text-sm text-muted-foreground">{author.years} · {author.description}</p>
          <p className="text-xs text-muted-foreground">📍 {author.paisOrigen}</p>
        </div>
      </motion.div>

      {/* Key concepts for altas capacidades */}
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
          <p className="text-xs text-muted-foreground mt-1 italic">Enfoque: {author.enfoqueResumido}</p>
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
          <motion.div key="visual" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            {/* Slide content */}
            <div ref={slideRef} className="glass-surface rounded-2xl p-6 min-h-[320px]">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  {'icon' in currentSlide && currentSlide.icon}
                  <h2 className="font-display font-semibold text-foreground text-lg">
                    {currentSlide.title}
                  </h2>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full bg-${catColor}/10 text-foreground`}>
                  {slideIndex + 1}/{enrichedSlides.length}
                </span>
              </div>
              {renderSlideContent()}
            </div>

            {/* Navigation + Export */}
            <div className="flex items-center justify-between">
              <button
                disabled={slideIndex === 0}
                onClick={() => setSlideIndex((i) => i - 1)}
                className="p-2.5 rounded-xl border border-border hover:bg-muted disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 overflow-x-auto max-w-[50%] py-1">
                  {enrichedSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all flex-shrink-0 ${
                        i === slideIndex ? "bg-primary scale-125" : "bg-muted hover:bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={exportToPDF}
                  disabled={isExporting}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                  title="Exportar todas las slides a PDF"
                >
                  {isExporting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  {isExporting ? "Exportando..." : "PDF"}
                </button>
              </div>
              <button
                disabled={slideIndex === enrichedSlides.length - 1}
                onClick={() => setSlideIndex((i) => i + 1)}
                className="p-2.5 rounded-xl border border-border hover:bg-muted disabled:opacity-30 transition-colors"
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
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-2/3">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{author.storytelling}</p>
                <div className="mt-4 p-3 rounded-xl bg-accent/30 border border-accent">
                  <p className="text-xs text-muted-foreground italic">"{author.citas[0]}"</p>
                  <p className="text-[10px] text-muted-foreground text-right mt-1">— {author.name}</p>
                </div>
              </div>
              <div className="sm:w-1/3">
                <img
                  src={catImage}
                  alt={getAltText(`Contexto de ${author.name}`, duaProfiles, `Corriente ${category?.name}: ${author.enfoqueResumido}`)}
                  className="w-full rounded-xl object-cover"
                  loading="lazy"
                  width={768}
                  height={512}
                />
              </div>
            </div>
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
