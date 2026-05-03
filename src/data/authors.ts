export type CategoryId = "fundadores" | "escuela-nueva" | "giro-psicologico" | "pedagogia-critica" | "contemporaneos";

export interface Author {
  id: string;
  name: string;
  category: CategoryId;
  subtitle: string;
  description: string;
  years: string;
  portrait: string;
  keyConceptsShort: string[];
  keyConcepts: string[];
  methodology: string;
  storytelling: string;
  quizQuestions: { question: string; options: string[]; correct: number }[];
  slides: { title: string; content: string }[];
  transpositionPhases: { inicio: string; desarrollo: string; cierre: string };
  connections: string[];
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  colorVar: string;
}

export const categories: Category[] = [
  { id: "fundadores", name: "Fundadores", icon: "🏛️", colorVar: "--cat-fundadores" },
  { id: "escuela-nueva", name: "Escuela Nueva", icon: "🌱", colorVar: "--cat-escuela-nueva" },
  { id: "giro-psicologico", name: "Giro Psicológico", icon: "🧠", colorVar: "--cat-giro-psicologico" },
  { id: "pedagogia-critica", name: "Pedagogía Crítica", icon: "✊", colorVar: "--cat-pedagogia-critica" },
  { id: "contemporaneos", name: "Contemporáneos", icon: "🔮", colorVar: "--cat-contemporaneos" },
];

export interface SynthesisResult {
  key: string;
  title: string;
  description: string;
  application: string;
}

export const synthesisMatrix: Record<string, SynthesisResult> = {
  "freire-montessori": {
    key: "freire-montessori",
    title: "Alfabetización a través de la Autonomía Material",
    description: "La concientización de Freire se fusiona con la autonomía montessoriana: el estudiante construye su liberación intelectual manipulando materiales que reflejan su realidad social.",
    application: "Crear rincones de lectura crítica con materiales autocorrectivos que aborden temas de justicia social.",
  },
  "montessori-freire": {
    key: "montessori-freire",
    title: "Alfabetización a través de la Autonomía Material",
    description: "La concientización de Freire se fusiona con la autonomía montessoriana: el estudiante construye su liberación intelectual manipulando materiales que reflejan su realidad social.",
    application: "Crear rincones de lectura crítica con materiales autocorrectivos que aborden temas de justicia social.",
  },
  "dewey-vygotsky": {
    key: "dewey-vygotsky",
    title: "Laboratorio Democrático de Zona Próxima",
    description: "El pragmatismo experimental de Dewey se enriquece con la mediación social de Vygotsky: el aula es un laboratorio donde los pares más capaces andamian el descubrimiento.",
    application: "Proyectos de investigación colaborativa donde los roles rotan según la ZDP de cada estudiante.",
  },
  "vygotsky-dewey": {
    key: "vygotsky-dewey",
    title: "Laboratorio Democrático de Zona Próxima",
    description: "El pragmatismo experimental de Dewey se enriquece con la mediación social de Vygotsky.",
    application: "Proyectos de investigación colaborativa donde los roles rotan según la ZDP de cada estudiante.",
  },
  "piaget-bruner": {
    key: "piaget-bruner",
    title: "Descubrimiento Guiado por Etapas",
    description: "Las etapas cognitivas de Piaget se combinan con el aprendizaje por descubrimiento de Bruner: cada desafío se calibra al estadio del estudiante y se presenta como un misterio a resolver.",
    application: "Secuencias de problemas graduados que avanzan de lo concreto a lo simbólico según la edad.",
  },
  "bruner-piaget": {
    key: "bruner-piaget",
    title: "Descubrimiento Guiado por Etapas",
    description: "Las etapas cognitivas de Piaget con el descubrimiento de Bruner.",
    application: "Secuencias de problemas graduados que avanzan de lo concreto a lo simbólico.",
  },
  "malaguzzi-gardner": {
    key: "malaguzzi-gardner",
    title: "Atelier de Inteligencias Múltiples",
    description: "Los cien lenguajes de Malaguzzi se expresan a través de las inteligencias múltiples de Gardner: cada proyecto ofrece puertas de entrada visual, musical, kinestésica y lógica.",
    application: "Proyectos de atelier donde cada niño elige su lenguaje expresivo para documentar su aprendizaje.",
  },
  "gardner-malaguzzi": {
    key: "gardner-malaguzzi",
    title: "Atelier de Inteligencias Múltiples",
    description: "Los cien lenguajes de Malaguzzi con las inteligencias de Gardner.",
    application: "Proyectos de atelier donde cada niño elige su lenguaje expresivo.",
  },
  "freinet-neill": {
    key: "freinet-neill",
    title: "Taller Libre de Expresión Cooperativa",
    description: "Las técnicas cooperativas de Freinet se practican en el clima de libertad radical de Neill: los estudiantes publican sus textos sin censura y gobiernan su propio proceso editorial.",
    application: "Periódico escolar autogestionado con asamblea editorial semanal.",
  },
  "neill-freinet": {
    key: "neill-freinet",
    title: "Taller Libre de Expresión Cooperativa",
    description: "Libertad de Neill con la cooperación de Freinet.",
    application: "Periódico escolar autogestionado con asamblea editorial semanal.",
  },
  "comenio-pestalozzi": {
    key: "comenio-pestalozzi",
    title: "Didáctica Sensorial Universal",
    description: "La sistematización de Comenio se humaniza con la intuición de Pestalozzi: enseñar todo a todos partiendo siempre de la experiencia sensorial y el afecto.",
    application: "Materiales didácticos multisensoriales organizados en una secuencia gradual y universal.",
  },
  "pestalozzi-comenio": {
    key: "pestalozzi-comenio",
    title: "Didáctica Sensorial Universal",
    description: "Pestalozzi y Comenio: intuición sensorial + sistematización.",
    application: "Materiales didácticos multisensoriales organizados en secuencia gradual.",
  },
  "rousseau-dewey": {
    key: "rousseau-dewey",
    title: "Naturalismo Pragmático",
    description: "La educación natural de Rousseau se operativiza con el pragmatismo de Dewey: el niño aprende según su naturaleza pero en contextos democráticos reales.",
    application: "Excursiones y proyectos al aire libre donde se resuelven problemas comunitarios reales.",
  },
  "dewey-rousseau": {
    key: "dewey-rousseau",
    title: "Naturalismo Pragmático",
    description: "Dewey + Rousseau: pragmatismo en contexto natural.",
    application: "Excursiones y proyectos al aire libre con resolución de problemas comunitarios.",
  },
  "makarenko-freire": {
    key: "makarenko-freire",
    title: "Colectivo Crítico de Transformación",
    description: "La disciplina colectiva de Makarenko se orienta por la concientización de Freire: el grupo no solo se organiza, sino que analiza críticamente las estructuras que lo oprimen.",
    application: "Asambleas de aula donde se debaten problemas sociales y se diseñan acciones colectivas.",
  },
  "freire-makarenko": {
    key: "freire-makarenko",
    title: "Colectivo Crítico de Transformación",
    description: "Freire + Makarenko: concientización en colectivo.",
    application: "Asambleas de aula con análisis crítico y acciones colectivas.",
  },
  "illich-gardner": {
    key: "illich-gardner",
    title: "Redes de Aprendizaje Plurinteligente",
    description: "La desescolarización de Illich se canaliza a través de las inteligencias múltiples de Gardner: redes de aprendizaje donde cada nodo ofrece un tipo de inteligencia diferente.",
    application: "Plataforma de mentorías donde expertos comunitarios enseñan según su tipo de inteligencia dominante.",
  },
  "gardner-illich": {
    key: "gardner-illich",
    title: "Redes de Aprendizaje Plurinteligente",
    description: "Gardner + Illich: inteligencias múltiples en redes desescolarizadas.",
    application: "Plataforma de mentorías comunitarias por tipo de inteligencia.",
  },
};

export const authors: Author[] = [
  {
    id: "comenio",
    name: "Comenio",
    category: "fundadores",
    subtitle: "Agente LLM",
    description: "Pionero de la didáctica moderna. Defiende la enseñanza universal, gradual y acorde a la naturaleza.",
    years: "1592–1670",
    portrait: "/images/authors/comenio.jpg",
    keyConceptsShort: ["Pansofía", "Didáctica Magna", "Enseñanza graduada"],
    keyConcepts: [
      "Pansofía: enseñar todo a todos, en todos los grados.",
      "Organización escolar graduada: Materna, Elemental, Latina, Academia.",
      "Aprendizaje como juego: los niños deben asistir a la escuela con alegría.",
      "Autopsia: presentación directa de la realidad como método de enseñanza.",
      "Entorno físico importa: patios, jardines, luz natural.",
    ],
    methodology: "Método natural: del todo a las partes, de lo conocido a lo desconocido, de lo simple a lo complejo.",
    storytelling: "En una pequeña aldea de Moravia, un maestro soñó con que cada niño del mundo pudiera aprender. Comenio abrió las puertas de su 'Didáctica Magna' y escribió: 'Enseñemos todo a todos'. No importaba si eras hijo de un noble o de un campesino. El conocimiento, como la luz del sol, debía llegar a cada rincón. Su escuela tenía jardines donde los niños tocaban las plantas antes de leer sobre ellas, porque Comenio sabía que los sentidos son la puerta del alma.",
    quizQuestions: [
      { question: "¿Qué concepto central propuso Comenio?", options: ["Pansofía", "Zona de Desarrollo Próximo", "Condicionamiento operante", "Inteligencias múltiples"], correct: 0 },
      { question: "¿Cuántos niveles escolares propuso Comenio?", options: ["2", "3", "4", "5"], correct: 2 },
      { question: "¿Qué obra fundamental escribió Comenio?", options: ["Emilio", "Didáctica Magna", "La República", "El Contrato Social"], correct: 1 },
    ],
    slides: [
      { title: "Comenio: Padre de la Pedagogía", content: "Juan Amós Comenio (1592-1670) fue el primero en sistematizar la enseñanza como ciencia." },
      { title: "La Pansofía", content: "Su ideal: 'Enseñar todo a todos'. Una educación universal sin distinción de clase o género." },
      { title: "Escuela Graduada", content: "Propuso 4 niveles: Escuela Materna (0-6), Elemental (6-12), Latina (12-18) y Academia (18-25)." },
      { title: "Legado Actual", content: "Su organización escolar graduada sigue siendo la base de los sistemas educativos del mundo." },
    ],
    transpositionPhases: {
      inicio: "Mostrar imágenes de escuelas de diferentes épocas. Preguntar: ¿Por qué las escuelas están organizadas por edades?",
      desarrollo: "Los estudiantes investigan los 4 niveles de Comenio y los comparan con el sistema actual. Crean una línea de tiempo interactiva.",
      cierre: "Debate: ¿Sigue siendo vigente la idea de 'enseñar todo a todos' en la era digital?",
    },
    connections: ["rousseau", "pestalozzi"],
  },
  {
    id: "rousseau",
    name: "Rousseau",
    category: "fundadores",
    subtitle: "Agente LLM",
    description: "La educación debe seguir el desarrollo natural del niño y su libertad.",
    years: "1712–1778",
    portrait: "/images/authors/rousseau.jpg",
    keyConceptsShort: ["Naturalismo", "Emilio", "Educación negativa"],
    keyConcepts: [
      "El niño es bueno por naturaleza; la sociedad lo corrompe.",
      "Educación negativa: no imponer, dejar que la naturaleza guíe.",
      "La infancia tiene valor intrínseco, no es mera preparación.",
      "Aprender por experiencia directa con la naturaleza.",
      "Respetar las etapas de desarrollo del niño.",
    ],
    methodology: "Educación natural: observar al niño, respetar sus etapas, aprender de la experiencia directa.",
    storytelling: "Imagina un tutor que lleva a su alumno Emilio al bosque en lugar de al aula. 'Mira este río', dice. '¿Hacia dónde fluye? ¿Por qué?' No hay libros, no hay pupitres. Solo la naturaleza como maestra. Rousseau creía que un niño que trepa un árbol aprende más física que cien lecciones de pizarra. Su revolución fue simple y radical: el niño no es un adulto pequeño, es un ser completo que merece crecer a su propio ritmo.",
    quizQuestions: [
      { question: "¿Qué tipo de educación propuso Rousseau?", options: ["Positiva", "Negativa", "Formal", "Conductista"], correct: 1 },
      { question: "¿Cuál es la obra pedagógica más importante de Rousseau?", options: ["El Contrato Social", "Emilio", "Confesiones", "Discurso sobre la desigualdad"], correct: 1 },
      { question: "Según Rousseau, ¿quién corrompe al niño?", options: ["La naturaleza", "La familia", "La sociedad", "La religión"], correct: 2 },
    ],
    slides: [
      { title: "Rousseau: El Descubrimiento de la Infancia", content: "Jean-Jacques Rousseau (1712-1778) estableció que la infancia tiene valor propio." },
      { title: "Educación Natural", content: "El niño aprende mejor de la experiencia directa con la naturaleza que de los libros." },
      { title: "Educación Negativa", content: "No imponer valores prematuros. Permitir que la naturaleza del niño se despliegue libremente." },
      { title: "Legado", content: "Sentó las bases para Pestalozzi, Montessori y todo el movimiento de educación centrada en el niño." },
    ],
    transpositionPhases: {
      inicio: "Salida al patio o jardín. Observar un fenómeno natural. Preguntar: ¿Qué aprendemos sin que nadie nos enseñe?",
      desarrollo: "Diario de observación natural. Los estudiantes registran descubrimientos durante una semana sin instrucción formal.",
      cierre: "Compartir descubrimientos. Reflexionar: ¿Qué aprendimos solos y qué necesitó guía?",
    },
    connections: ["comenio", "pestalozzi", "dewey"],
  },
  {
    id: "pestalozzi",
    name: "Pestalozzi",
    category: "fundadores",
    subtitle: "Agente LLM",
    description: "Educación del corazón, la cabeza y la mano. Aprender haciendo y desde el amor.",
    years: "1746–1827",
    portrait: "/images/authors/pestalozzi.jpg",
    keyConceptsShort: ["Intuición", "Cabeza-Corazón-Mano", "Educación integral"],
    keyConcepts: [
      "Anschauung (Intuición): fundamento de todo conocimiento.",
      "Educación integral: cabeza (intelecto), corazón (moral), mano (técnica).",
      "De lo concreto a lo abstracto, de lo cercano a lo distante.",
      "Número, forma y palabra como estructuras del conocimiento.",
      "El docente como facilitador en relación horizontal.",
    ],
    methodology: "Método intuitivo: partir de la observación directa, avanzar gradualmente hacia la abstracción.",
    storytelling: "En las colinas suizas, Pestalozzi abrió su hogar a los niños huérfanos y pobres. No tenía recursos, pero sí un corazón enorme. 'La educación es amor', decía mientras enseñaba a contar usando piedras del río y a escribir dibujando las formas de las hojas. Para él, la mano que trabaja educa tanto como el libro que se lee. Sus alumnos aprendían carpintería por la mañana y filosofía por la tarde, porque el conocimiento verdadero une la cabeza, el corazón y las manos.",
    quizQuestions: [
      { question: "¿Qué tres dimensiones integra la educación según Pestalozzi?", options: ["Mente, cuerpo, espíritu", "Cabeza, corazón, mano", "Razón, emoción, acción", "Saber, hacer, ser"], correct: 1 },
      { question: "¿Qué concepto es el fundamento del método de Pestalozzi?", options: ["Pansofía", "Intuición (Anschauung)", "Condicionamiento", "Zona Próxima"], correct: 1 },
      { question: "¿A qué población enfocó Pestalozzi su trabajo?", options: ["Aristocracia", "Niños desfavorecidos", "Universitarios", "Militares"], correct: 1 },
    ],
    slides: [
      { title: "Pestalozzi: Educar con Amor", content: "Johann Heinrich Pestalozzi (1746-1827) llevó las ideas de Rousseau a la práctica social." },
      { title: "Cabeza, Corazón y Mano", content: "La educación integral desarrolla el intelecto, la moral y las habilidades técnicas por igual." },
      { title: "Método Intuitivo", content: "Partir siempre de lo concreto: observar, tocar, experimentar antes de teorizar." },
      { title: "Legado Actual", content: "Precursor de la educación técnica, la formación profesional y el aprendizaje experiencial." },
    ],
    transpositionPhases: {
      inicio: "Traer un objeto cotidiano. Observarlo con los 5 sentidos antes de hablar de él.",
      desarrollo: "Construir algo con las manos que represente un concepto abstracto (ej: una maqueta de un ecosistema).",
      cierre: "Presentar la creación explicando qué aprendieron con la cabeza, el corazón y las manos.",
    },
    connections: ["comenio", "rousseau", "montessori", "froebel"],
  },
  {
    id: "dewey",
    name: "Dewey",
    category: "escuela-nueva",
    subtitle: "Agente LLM",
    description: "La educación es experiencia. Aprender haciendo, resolviendo problemas reales en comunidad.",
    years: "1859–1952",
    portrait: "/images/authors/dewey.jpg",
    keyConceptsShort: ["Pragmatismo", "Aprender haciendo", "Democracia educativa"],
    keyConcepts: [
      "La escuela como comunidad democrática y laboratorio social.",
      "Aprender haciendo (learning by doing).",
      "Método experimental de 5 pasos: situación, problema, hipótesis, verificación, conclusión.",
      "Educación como reconstrucción continua de la experiencia.",
      "Pensamiento reflexivo como objetivo educativo.",
    ],
    methodology: "Método experimental: 1) Situación real, 2) Identificar problema, 3) Formular hipótesis, 4) Verificar, 5) Concluir.",
    storytelling: "En Chicago, a finales del siglo XIX, John Dewey fundó una escuela donde no había pupitres fijos. Los niños cocinaban para aprender química, cultivaban un huerto para entender biología y publicaban un periódico para practicar lengua. 'La educación no es preparación para la vida', proclamaba Dewey, 'la educación ES vida'. Su escuela-laboratorio demostró que cuando un niño resuelve un problema real, el conocimiento se graba a fuego en su mente.",
    quizQuestions: [
      { question: "¿Cuántos pasos tiene el método experimental de Dewey?", options: ["3", "4", "5", "6"], correct: 2 },
      { question: "¿Cómo concibe Dewey la escuela?", options: ["Como un templo del saber", "Como un laboratorio democrático", "Como un lugar de disciplina", "Como una fábrica de conocimiento"], correct: 1 },
      { question: "¿Cuál es el lema asociado a Dewey?", options: ["Saber es poder", "Aprender haciendo", "Enseñar todo a todos", "El niño es bueno"], correct: 1 },
    ],
    slides: [
      { title: "Dewey: Pragmatismo Educativo", content: "John Dewey (1859-1952) transformó la educación con su filosofía pragmatista." },
      { title: "Aprender Haciendo", content: "La experiencia directa y la resolución de problemas reales son el motor del aprendizaje." },
      { title: "Los 5 Pasos", content: "Situación → Problema → Hipótesis → Verificación → Conclusión. Un ciclo de pensamiento reflexivo." },
      { title: "Democracia y Educación", content: "La escuela debe ser un microcosmos de la sociedad democrática que queremos construir." },
    ],
    transpositionPhases: {
      inicio: "Presentar una situación-problema real del entorno escolar o comunitario.",
      desarrollo: "Seguir los 5 pasos de Dewey: identificar el problema, formular hipótesis, investigar, verificar, concluir.",
      cierre: "Presentar la solución a la comunidad y reflexionar sobre el proceso de pensamiento.",
    },
    connections: ["rousseau", "freinet", "vygotsky"],
  },
  {
    id: "montessori",
    name: "Montessori",
    category: "escuela-nueva",
    subtitle: "Agente LLM",
    description: "Ambiente preparado y libertad con propósito. El niño construye su propio aprendizaje.",
    years: "1870–1952",
    portrait: "/images/authors/montessori.jpg",
    keyConceptsShort: ["Ambiente preparado", "Autonomía", "Períodos sensibles"],
    keyConcepts: [
      "El niño como constructor activo de su conocimiento.",
      "Ambiente preparado: materiales autocorrectivos y orden.",
      "Períodos sensibles: ventanas de oportunidad para cada aprendizaje.",
      "Libertad dentro de límites: autonomía con estructura.",
      "El adulto como guía, no como transmisor.",
    ],
    methodology: "Observar al niño, preparar el ambiente, ofrecer materiales adecuados al período sensible, dejar que trabaje a su ritmo.",
    storytelling: "María Montessori, la primera mujer médica de Italia, observó algo que los pedagogos habían ignorado: los niños tienen sus propios ritmos. En su Casa dei Bambini, los pequeños elegían sus materiales, trabajaban en silencio concentrado y aprendían a leer casi solos. 'No me lo digas, déjame hacerlo', parecían decir. Montessori diseñó un mundo a la medida del niño: mesas pequeñas, estantes bajos, materiales que se autocorrigen. La revolución silenciosa de la autonomía.",
    quizQuestions: [
      { question: "¿Qué son los 'períodos sensibles' en Montessori?", options: ["Momentos de crisis", "Ventanas de aprendizaje óptimo", "Evaluaciones periódicas", "Recreos estructurados"], correct: 1 },
      { question: "¿Cómo se llama el entorno de aprendizaje montessoriano?", options: ["Aula abierta", "Ambiente preparado", "Laboratorio", "Taller"], correct: 1 },
      { question: "¿Cuál es el rol del adulto en Montessori?", options: ["Transmisor", "Evaluador", "Guía", "Director"], correct: 2 },
    ],
    slides: [
      { title: "Montessori: La Pedagogía Científica", content: "María Montessori (1870-1952) creó un método basado en la observación científica del niño." },
      { title: "Ambiente Preparado", content: "Un espacio ordenado con materiales autocorrectivos que invitan al niño a aprender por sí mismo." },
      { title: "Períodos Sensibles", content: "Cada niño tiene ventanas de oportunidad únicas para cada tipo de aprendizaje." },
      { title: "Autonomía con Propósito", content: "Libertad para elegir qué aprender, dentro de un ambiente cuidadosamente diseñado." },
    ],
    transpositionPhases: {
      inicio: "Presentar 3-4 estaciones de trabajo con materiales manipulativos. Los estudiantes eligen libremente.",
      desarrollo: "Trabajo autónomo con materiales autocorrectivos. El docente observa y guía individualmente.",
      cierre: "Círculo de reflexión: ¿Qué elegiste? ¿Qué descubriste? ¿Qué harías diferente?",
    },
    connections: ["pestalozzi", "piaget", "malaguzzi"],
  },
  {
    id: "freinet",
    name: "Freinet",
    category: "escuela-nueva",
    subtitle: "Agente LLM",
    description: "Cooperación, expresión libre y técnicas activas para una escuela de la vida.",
    years: "1896–1966",
    portrait: "/images/authors/freinet.jpg",
    keyConceptsShort: ["Imprenta escolar", "Texto libre", "Cooperación"],
    keyConcepts: [
      "Imprenta escolar: dar la palabra al alumno.",
      "Texto libre: expresión auténtica como motor del aprendizaje.",
      "Correspondencia interescolar: conectar aulas.",
      "Tanteo experimental: aprender por ensayo y error.",
      "Educación por el trabajo: el aula como taller cooperativo.",
    ],
    methodology: "Técnicas de vida: texto libre, imprenta, correspondencia, ficheros, planes de trabajo cooperativo.",
    storytelling: "Célestin Freinet era un maestro de pueblo que volvió herido de la Primera Guerra. No podía hablar mucho tiempo seguido, así que tuvo una idea genial: trajo una imprenta al aula. Los niños escribían sus propios textos, los imprimían y los enviaban a escuelas de otros pueblos. De pronto, escribir tenía sentido: alguien real iba a leerlos. La cooperación nació de la necesidad, y Freinet demostró que la pedagogía más poderosa surge cuando el maestro confía en sus alumnos.",
    quizQuestions: [
      { question: "¿Qué técnica revolucionaria introdujo Freinet en el aula?", options: ["El pizarrón digital", "La imprenta escolar", "El proyector", "La radio educativa"], correct: 1 },
      { question: "¿Qué es el 'tanteo experimental'?", options: ["Evaluación continua", "Aprender por ensayo y error", "Método científico", "Trabajo individual"], correct: 1 },
      { question: "¿Cómo concibe Freinet el aula?", options: ["Como un laboratorio", "Como un templo", "Como un taller cooperativo", "Como un gimnasio"], correct: 2 },
    ],
    slides: [
      { title: "Freinet: La Voz del Alumno", content: "Célestin Freinet (1896-1966) democratizó el aula dando la palabra al estudiante." },
      { title: "Técnicas de Vida", content: "Imprenta escolar, texto libre, correspondencia: herramientas para una educación auténtica." },
      { title: "Cooperación", content: "El aula es un taller donde se trabaja en equipo para producir conocimiento compartido." },
      { title: "Vigencia", content: "Blogs, wikis, redes sociales educativas: las técnicas Freinet renacen en la era digital." },
    ],
    transpositionPhases: {
      inicio: "Los estudiantes escriben un 'texto libre' sobre algo que les importa. Sin tema impuesto.",
      desarrollo: "En cooperativa, editan, ilustran y publican los textos (blog, mural, revista de aula).",
      cierre: "Correspondencia: envían sus producciones a otra clase y reciben respuesta.",
    },
    connections: ["dewey", "neill", "makarenko"],
  },
  {
    id: "neill",
    name: "Neill",
    category: "escuela-nueva",
    subtitle: "Agente LLM",
    description: "Libertad, responsabilidad y respeto. El niño al centro, sin coerción.",
    years: "1883–1973",
    portrait: "/images/authors/neill.jpg",
    keyConceptsShort: ["Summerhill", "Libertad", "Autogobierno"],
    keyConcepts: [
      "Summerhill: la escuela donde los niños deciden si asisten a clase.",
      "Libertad sin libertinaje: responsabilidad como contraparte.",
      "Asamblea escolar democrática: todos votan, incluidos los niños.",
      "El juego como actividad más importante de la infancia.",
      "No imponer la moral adulta; confiar en la bondad natural.",
    ],
    methodology: "Libertad total de asistencia, asamblea democrática semanal, aprendizaje autodirigido.",
    storytelling: "En una colina verde de Suffolk, Inglaterra, existe una escuela donde nadie te obliga a ir a clase. Alexander Neill fundó Summerhill creyendo que 'un niño feliz es un niño que aprende'. Aquí los niños votan las reglas en asamblea, el director tiene el mismo voto que un niño de seis años, y si prefieres trepar árboles que estudiar matemáticas, nadie te detendrá. Lo sorprendente: cuando la presión desaparece, la curiosidad florece.",
    quizQuestions: [
      { question: "¿Cómo se llama la escuela fundada por Neill?", options: ["Waldorf", "Summerhill", "Montessori", "Reggio Emilia"], correct: 1 },
      { question: "¿Cómo se toman las decisiones en Summerhill?", options: ["El director decide", "Por votación en asamblea", "Los padres eligen", "Por antigüedad"], correct: 1 },
      { question: "¿Qué actividad considera Neill la más importante?", options: ["La lectura", "El deporte", "El juego", "La meditación"], correct: 2 },
    ],
    slides: [
      { title: "Neill: La Escuela de la Libertad", content: "Alexander Neill (1883-1973) creó Summerhill, la escuela más libre del mundo." },
      { title: "Libertad de Asistencia", content: "Los niños eligen si van a clase. La motivación intrínseca reemplaza la obligación." },
      { title: "Democracia Radical", content: "Asamblea semanal: cada persona, sin importar edad, tiene un voto." },
      { title: "El Juego es Sagrado", content: "Neill creía que el juego libre es el trabajo más importante de la infancia." },
    ],
    transpositionPhases: {
      inicio: "Asamblea de aula: los estudiantes proponen qué quieren aprender esta semana.",
      desarrollo: "Proyectos autodirigidos: cada uno elige su tema, ritmo y forma de presentación.",
      cierre: "Asamblea de cierre: compartir logros, votar reglas nuevas, evaluar la experiencia.",
    },
    connections: ["rousseau", "freinet", "illich"],
  },
  {
    id: "piaget",
    name: "Piaget",
    category: "giro-psicologico",
    subtitle: "Agente LLM",
    description: "El conocimiento se construye activamente. Etapas del desarrollo y equilibrio cognitivo.",
    years: "1896–1980",
    portrait: "/images/authors/piaget.jpg",
    keyConceptsShort: ["Constructivismo", "Etapas cognitivas", "Equilibración"],
    keyConcepts: [
      "Constructivismo: el niño construye activamente su conocimiento.",
      "4 etapas: sensoriomotora, preoperacional, operaciones concretas, operaciones formales.",
      "Asimilación y acomodación como mecanismos de aprendizaje.",
      "Equilibración: búsqueda constante de balance cognitivo.",
      "El error como motor del aprendizaje (conflicto cognitivo).",
    ],
    methodology: "Presentar conflictos cognitivos adecuados a la etapa; dejar que el niño reconstruya sus esquemas.",
    storytelling: "Jean Piaget pasaba horas observando a sus propios hijos. Un día, su hija trató de meter un cubo grande en un agujero pequeño. Falló, giró el cubo, falló de nuevo, pensó... y encontró la solución. En ese momento, Piaget vio cómo se construye la inteligencia: no se transmite, se construye activamente. Cada error es un peldaño. Cada conflicto cognitivo, una oportunidad. El niño no es una vasija vacía, es un científico en miniatura.",
    quizQuestions: [
      { question: "¿Cuántas etapas del desarrollo cognitivo propuso Piaget?", options: ["2", "3", "4", "5"], correct: 2 },
      { question: "¿Qué proceso describe la incorporación de nueva información a esquemas existentes?", options: ["Acomodación", "Asimilación", "Equilibración", "Maduración"], correct: 1 },
      { question: "¿Qué es el 'conflicto cognitivo' en Piaget?", options: ["Un problema de conducta", "Una disonancia que impulsa el aprendizaje", "Un trastorno psicológico", "Una técnica de evaluación"], correct: 1 },
    ],
    slides: [
      { title: "Piaget: El Arquitecto del Constructivismo", content: "Jean Piaget (1896-1980) revolucionó nuestra comprensión de cómo los niños piensan." },
      { title: "Las 4 Etapas", content: "Sensoriomotora (0-2), Preoperacional (2-7), Operaciones Concretas (7-11), Formales (11+)." },
      { title: "Asimilación y Acomodación", content: "Dos caras de la misma moneda: incorporar lo nuevo y reestructurar lo existente." },
      { title: "El Error como Maestro", content: "El conflicto cognitivo es el motor: solo cuando algo no encaja, el pensamiento avanza." },
    ],
    transpositionPhases: {
      inicio: "Presentar un fenómeno contraintuitivo que genere conflicto cognitivo (ej: conservación de líquidos).",
      desarrollo: "Experimentar con materiales concretos. Registrar hipótesis y resultados. Confrontar predicciones.",
      cierre: "Metacognición: ¿Qué pensabas antes? ¿Qué piensas ahora? ¿Qué cambió en tu mente?",
    },
    connections: ["vygotsky", "bruner", "montessori"],
  },
  {
    id: "vygotsky",
    name: "Vygotsky",
    category: "giro-psicologico",
    subtitle: "Agente LLM",
    description: "El aprendizaje es social. La interacción y el lenguaje median el desarrollo.",
    years: "1896–1934",
    portrait: "/images/authors/vygotsky.jpg",
    keyConceptsShort: ["ZDP", "Mediación social", "Andamiaje"],
    keyConcepts: [
      "Zona de Desarrollo Próximo (ZDP): lo que puedo hacer con ayuda hoy, lo haré solo mañana.",
      "Mediación: el conocimiento se construye en interacción social.",
      "Andamiaje (scaffolding): apoyo temporal que se retira gradualmente.",
      "El lenguaje como herramienta del pensamiento.",
      "Doble formación: primero social (interpsicológica), luego individual (intrapsicológica).",
    ],
    methodology: "Identificar la ZDP, ofrecer andamiaje a través de la interacción social, retirar apoyos gradualmente.",
    storytelling: "En la Rusia revolucionaria, un joven psicólogo llamado Vygotsky hizo una pregunta que cambió todo: '¿Y si la inteligencia no está dentro de la cabeza, sino entre las personas?' Observó que un niño que no podía resolver un rompecabezas solo, lo lograba con la ayuda de un compañero más experto. Esa zona mágica entre lo que puedo y lo que podré, la llamó Zona de Desarrollo Próximo. El aprendizaje es, antes que nada, un acto social.",
    quizQuestions: [
      { question: "¿Qué significa ZDP?", options: ["Zona de Desarrollo Pleno", "Zona de Desarrollo Próximo", "Zona de Descubrimiento Progresivo", "Zona de Debate Pedagógico"], correct: 1 },
      { question: "¿Qué rol cumple el lenguaje según Vygotsky?", options: ["Solo comunicación", "Herramienta del pensamiento", "Obstáculo para el aprendizaje", "Medio de evaluación"], correct: 1 },
      { question: "¿Qué es el 'andamiaje'?", options: ["Un material didáctico", "Apoyo temporal que se retira gradualmente", "Una técnica de evaluación", "Un tipo de currículo"], correct: 1 },
    ],
    slides: [
      { title: "Vygotsky: El Aprendizaje es Social", content: "Lev Vygotsky (1896-1934) demostró que pensamos con y a través de los demás." },
      { title: "Zona de Desarrollo Próximo", content: "La distancia entre lo que hago solo y lo que puedo hacer con ayuda: ahí está el aprendizaje." },
      { title: "Andamiaje", content: "Como los andamios de un edificio: se colocan para construir y se retiran cuando la estructura se sostiene sola." },
      { title: "El Lenguaje Piensa", content: "Hablar no solo expresa el pensamiento, lo crea. El diálogo es la cuna de la inteligencia." },
    ],
    transpositionPhases: {
      inicio: "Tarea individual diagnóstica para identificar la ZDP de cada estudiante.",
      desarrollo: "Trabajo en pares experto-novato. El más avanzado guía al otro con preguntas, no respuestas.",
      cierre: "El novato realiza la tarea solo. Reflexión: ¿Qué ayuda fue crucial? ¿Qué ya puedo hacer solo?",
    },
    connections: ["piaget", "bruner", "dewey"],
  },
  {
    id: "bruner",
    name: "Bruner",
    category: "giro-psicologico",
    subtitle: "Agente LLM",
    description: "Aprender por descubrimiento. Modos de representación y andamiaje pedagógico.",
    years: "1915–2016",
    portrait: "/images/authors/bruner.jpg",
    keyConceptsShort: ["Descubrimiento", "Representación", "Currículo espiral"],
    keyConcepts: [
      "Aprendizaje por descubrimiento: el alumno construye significados propios.",
      "3 modos de representación: enactivo (acción), icónico (imagen), simbólico (lenguaje).",
      "Currículo espiral: revisitar temas con mayor complejidad.",
      "Andamiaje: el docente estructura el descubrimiento.",
      "Narrativa como forma de organizar el conocimiento.",
    ],
    methodology: "Presentar problemas que inviten al descubrimiento, transitando de lo enactivo a lo simbólico.",
    storytelling: "Jerome Bruner creía que cualquier tema puede enseñarse a cualquier edad, si se presenta de la forma correcta. Un niño de 5 años puede entender la gravedad dejando caer objetos (modo enactivo). A los 8, dibujando flechas hacia abajo (modo icónico). A los 12, con la fórmula F=ma (modo simbólico). El currículo no es una escalera, es una espiral: cada vuelta revisitas el mismo tema pero desde más alto, viendo más lejos.",
    quizQuestions: [
      { question: "¿Cuáles son los tres modos de representación de Bruner?", options: ["Visual, auditivo, kinestésico", "Enactivo, icónico, simbólico", "Concreto, abstracto, formal", "Sensorial, racional, intuitivo"], correct: 1 },
      { question: "¿Qué es el currículo espiral?", options: ["Enseñar en círculos", "Revisitar temas con mayor complejidad", "Repetir contenidos", "Organizar por espirales temáticas"], correct: 1 },
      { question: "¿Qué tipo de aprendizaje promueve Bruner?", options: ["Memorístico", "Por descubrimiento", "Conductista", "Transmisivo"], correct: 1 },
    ],
    slides: [
      { title: "Bruner: Aprender Descubriendo", content: "Jerome Bruner (1915-2016) propuso que el alumno debe descubrir, no recibir." },
      { title: "Tres Modos de Representación", content: "Enactivo (hacer), Icónico (imaginar), Simbólico (abstraer). Del cuerpo a la mente." },
      { title: "Currículo Espiral", content: "Cualquier tema puede enseñarse a cualquier edad si se ajusta el modo de representación." },
      { title: "El Poder de la Narrativa", content: "Las historias organizan el conocimiento mejor que las listas de datos." },
    ],
    transpositionPhases: {
      inicio: "Exploración libre de materiales manipulativos relacionados con el tema (modo enactivo).",
      desarrollo: "Del hacer al representar: dibujar, diagramar (icónico), luego formalizar con conceptos (simbólico).",
      cierre: "Narrar el descubrimiento: contar la historia de lo aprendido como si fuera un cuento.",
    },
    connections: ["piaget", "vygotsky", "dewey"],
  },
  {
    id: "freire",
    name: "Freire",
    category: "pedagogia-critica",
    subtitle: "Agente LLM",
    description: "Educación como práctica de la libertad. Diálogo, conciencia crítica y transformación social.",
    years: "1921–1997",
    portrait: "/images/authors/freire.jpg",
    keyConceptsShort: ["Concientización", "Diálogo", "Educación bancaria"],
    keyConcepts: [
      "Educación bancaria vs. educación liberadora.",
      "Concientización: toma de conciencia crítica de la realidad.",
      "Diálogo como base del proceso educativo.",
      "Palabras generadoras: partir del universo vocabular del oprimido.",
      "Praxis: reflexión + acción = transformación.",
    ],
    methodology: "Investigación del universo temático, palabras generadoras, círculos de cultura, diálogo problematizador.",
    storytelling: "En los barrios más pobres de Recife, Brasil, Paulo Freire enseñó a leer a campesinos en 45 días. ¿Su secreto? No usó cartillas infantiles. Empezó con las palabras de sus vidas: 'ladrillo', 'salario', 'tierra'. Cada palabra abría una conversación sobre su realidad. Leer no era solo descifrar letras, era descifrar el mundo. 'La educación no cambia el mundo', dijo Freire, 'cambia a las personas que van a cambiar el mundo'.",
    quizQuestions: [
      { question: "¿Qué critica Freire con el concepto de 'educación bancaria'?", options: ["La falta de tecnología", "Depositar conocimiento en el alumno pasivo", "La educación gratuita", "Los bancos escolares incómodos"], correct: 1 },
      { question: "¿Qué son las 'palabras generadoras'?", options: ["Vocabulario académico", "Palabras del universo del aprendiz", "Términos técnicos", "Contraseñas"], correct: 1 },
      { question: "¿Qué es la praxis según Freire?", options: ["Solo reflexión", "Solo acción", "Reflexión + Acción", "Teoría pura"], correct: 2 },
    ],
    slides: [
      { title: "Freire: Pedagogía del Oprimido", content: "Paulo Freire (1921-1997) transformó la educación en un acto de libertad." },
      { title: "Educación Bancaria vs. Liberadora", content: "No depositar conocimiento: dialogar, problematizar, concientizar." },
      { title: "Concientización", content: "Aprender a leer el mundo, no solo las palabras. Conciencia crítica como motor de cambio." },
      { title: "Praxis Transformadora", content: "Reflexión sin acción es verbalismo. Acción sin reflexión es activismo. Juntas: transformación." },
    ],
    transpositionPhases: {
      inicio: "Investigar el 'universo temático' del grupo: ¿qué problemas viven? ¿qué palabras usan?",
      desarrollo: "Círculo de cultura: debatir un problema real usando preguntas problematizadoras. Leer el mundo.",
      cierre: "Praxis: diseñar una acción concreta de transformación basada en lo discutido.",
    },
    connections: ["makarenko", "illich", "dewey"],
  },
  {
    id: "makarenko",
    name: "Makarenko",
    category: "pedagogia-critica",
    subtitle: "Agente LLM",
    description: "Colectividad, disciplina consciente y trabajo como camino de formación humana.",
    years: "1888–1939",
    portrait: "/images/authors/makarenko.jpg",
    keyConceptsShort: ["Colectivismo", "Disciplina activa", "Trabajo productivo"],
    keyConcepts: [
      "El colectivo como sujeto educativo principal.",
      "Disciplina de la acción, no de la prohibición.",
      "Trabajo productivo como eje formativo.",
      "Respeto absoluto por la persona con alta exigencia grupal.",
      "Perspectivas: cercana, media y lejana como motivación.",
    ],
    methodology: "Organización colectiva con roles rotativos, trabajo productivo real, asambleas, disciplina positiva.",
    storytelling: "En la Ucrania devastada por la guerra civil, Anton Makarenko recibió a cientos de huérfanos callejeros. No tenía libros ni aulas, pero tenía una idea revolucionaria: el colectivo educa. Los jóvenes construyeron su propia escuela, administraron un taller de carpintería y hasta una granja. 'No educo individuos', decía Makarenko, 'educo colectivos donde cada individuo florece'. La disciplina no era castigo: era el orgullo de pertenecer a algo más grande que uno mismo.",
    quizQuestions: [
      { question: "¿Qué es el 'colectivo' para Makarenko?", options: ["Un grupo de amigos", "El sujeto educativo principal", "Un equipo deportivo", "Una clase escolar"], correct: 1 },
      { question: "¿Qué tipo de disciplina propone Makarenko?", options: ["Punitiva", "De la acción", "Militar", "Permisiva"], correct: 1 },
      { question: "¿Qué papel cumple el trabajo en su pedagogía?", options: ["Es un castigo", "Es el eje formativo", "Es optativo", "Es solo manual"], correct: 1 },
    ],
    slides: [
      { title: "Makarenko: La Fuerza del Colectivo", content: "Anton Makarenko (1888-1939) demostró que el grupo educa más que el individuo." },
      { title: "Disciplina Positiva", content: "No 'no hagas', sino 'hagamos'. La disciplina nace del compromiso compartido." },
      { title: "Trabajo como Educación", content: "Producir algo real da sentido al aprendizaje y dignifica a la persona." },
      { title: "Perspectivas", content: "Metas cercanas, medias y lejanas mantienen la motivación del colectivo viva." },
    ],
    transpositionPhases: {
      inicio: "Formar equipos con roles definidos. Presentar un proyecto productivo real para el grupo.",
      desarrollo: "Trabajo colectivo con roles rotativos. Reuniones de equipo para evaluar progreso y resolver conflictos.",
      cierre: "Asamblea general: presentar resultados, celebrar logros colectivos, planificar la siguiente meta.",
    },
    connections: ["freire", "freinet", "dewey"],
  },
  {
    id: "illich",
    name: "Illich",
    category: "pedagogia-critica",
    subtitle: "Agente LLM",
    description: "Desescolarizar la sociedad. Aprender en redes, en libertad y a lo largo de la vida.",
    years: "1926–2002",
    portrait: "/images/authors/illich.jpg",
    keyConceptsShort: ["Desescolarización", "Redes de aprendizaje", "Convivialidad"],
    keyConcepts: [
      "La escuela institucionalizada confunde enseñanza con aprendizaje.",
      "Redes de aprendizaje: conectar aprendices con recursos y personas.",
      "Tramas de aprendizaje: objetos, modelos, pares, educadores.",
      "Convivialidad: herramientas que empoderan en vez de controlar.",
      "Aprendizaje a lo largo de toda la vida, no solo en la escuela.",
    ],
    methodology: "Crear redes de aprendizaje: bancos de habilidades, intercambio entre pares, acceso libre a recursos.",
    storytelling: "Ivan Illich hizo la pregunta más incómoda de la historia de la educación: '¿Y si la escuela es el problema?' En su provocador libro 'La sociedad desescolarizada', imaginó un mundo donde cualquiera pudiera aprender cualquier cosa de cualquier persona, sin muros, sin títulos, sin campanas. Propuso 'tramas de aprendizaje': redes donde quien sabe algo lo comparte con quien quiere aprenderlo. Internet, décadas después, le dio la razón.",
    quizQuestions: [
      { question: "¿Qué propone Illich sobre la escuela?", options: ["Reformarla", "Desescolarizar la sociedad", "Privatizarla", "Digitalizarla"], correct: 1 },
      { question: "¿Qué son las 'tramas de aprendizaje'?", options: ["Programas escolares", "Redes de conexión entre aprendices y recursos", "Exámenes", "Mallas curriculares"], correct: 1 },
      { question: "¿Qué concepto clave introduce Illich?", options: ["Pansofía", "Convivialidad", "Constructivismo", "Conductismo"], correct: 1 },
    ],
    slides: [
      { title: "Illich: La Sociedad Desescolarizada", content: "Ivan Illich (1926-2002) cuestionó la existencia misma de la escuela." },
      { title: "La Escuela como Problema", content: "Confundimos asistir con aprender, títulos con saber, enseñanza con educación." },
      { title: "Tramas de Aprendizaje", content: "Redes libres: objetos educativos, modelos a seguir, pares para practicar, educadores itinerantes." },
      { title: "Profeta de Internet", content: "Las plataformas de aprendizaje en línea son la materialización del sueño de Illich." },
    ],
    transpositionPhases: {
      inicio: "Mapear las habilidades del grupo: ¿qué sabe cada uno que pueda enseñar a otro?",
      desarrollo: "Crear una 'trama de aprendizaje' en el aula: intercambios de saberes entre pares, sin rol fijo de docente.",
      cierre: "Reflexión: ¿Qué aprendimos fuera del formato tradicional? ¿Qué limita y qué libera la institución?",
    },
    connections: ["freire", "neill", "gardner"],
  },
  {
    id: "malaguzzi",
    name: "Malaguzzi",
    category: "contemporaneos",
    subtitle: "Agente LLM",
    description: "El niño tiene cien lenguajes. Escucha, creatividad y comunidad como esencia educativa.",
    years: "1920–1994",
    portrait: "/images/authors/malaguzzi.jpg",
    keyConceptsShort: ["100 lenguajes", "Atelier", "Documentación"],
    keyConcepts: [
      "Los cien lenguajes del niño: múltiples formas de expresión.",
      "Atelier: taller de arte integrado en el proceso educativo.",
      "Documentación pedagógica: hacer visible el aprendizaje.",
      "La escuela como comunidad de investigación.",
      "Escucha activa: el adulto aprende del niño.",
    ],
    methodology: "Proyectos emergentes basados en los intereses del niño, documentación, atelier, participación comunitaria.",
    storytelling: "Después de la Segunda Guerra Mundial, en Reggio Emilia, Italia, los padres decidieron construir una escuela con los ladrillos de los edificios bombardeados. Loris Malaguzzi llegó en bicicleta y vio algo extraordinario: una comunidad que creía que la educación de sus hijos merecía lo mejor. 'El niño tiene cien lenguajes', escribió, 'pero le robamos noventa y nueve'. En sus escuelas, los niños pintan, esculpen, construyen, cantan y bailan para aprender. Cada proyecto es una aventura de descubrimiento documentada con fotos, videos y palabras.",
    quizQuestions: [
      { question: "¿Cuántos 'lenguajes' tiene el niño según Malaguzzi?", options: ["10", "50", "100", "Infinitos"], correct: 2 },
      { question: "¿Qué es el 'atelier' en Reggio Emilia?", options: ["Un examen", "Un taller artístico integrado", "Un aula tradicional", "Un recreo"], correct: 1 },
      { question: "¿Qué ciudad italiana se asocia a Malaguzzi?", options: ["Roma", "Milán", "Reggio Emilia", "Florencia"], correct: 2 },
    ],
    slides: [
      { title: "Malaguzzi: Los Cien Lenguajes", content: "Loris Malaguzzi (1920-1994) creó la filosofía educativa de Reggio Emilia." },
      { title: "Cien Lenguajes", content: "El niño se expresa pintando, construyendo, cantando, bailando... La escuela debe honrar todos esos lenguajes." },
      { title: "El Atelier", content: "Un taller de arte permanente donde la creatividad es herramienta de conocimiento." },
      { title: "Documentación", content: "Hacer visible el pensamiento del niño: fotos, transcripciones, obras. El proceso importa tanto como el resultado." },
    ],
    transpositionPhases: {
      inicio: "Escuchar las preguntas e intereses de los niños. ¿Qué les intriga? ¿Qué quieren explorar?",
      desarrollo: "Proyecto de atelier: explorar el tema con múltiples lenguajes (pintura, arcilla, música, teatro, construcción).",
      cierre: "Documentación: crear una exposición que narre el viaje de aprendizaje del grupo.",
    },
    connections: ["montessori", "gardner", "dewey"],
  },
  {
    id: "gardner",
    name: "Gardner",
    category: "contemporaneos",
    subtitle: "Agente LLM",
    description: "Múltiples inteligencias para reconocer y potenciar el talento de cada persona.",
    years: "1943–",
    portrait: "/images/authors/gardner.jpg",
    keyConceptsShort: ["Inteligencias múltiples", "8 inteligencias", "Educación personalizada"],
    keyConcepts: [
      "No existe una sola inteligencia, sino al menos 8.",
      "Lingüística, lógico-matemática, espacial, musical, corporal-kinestésica, interpersonal, intrapersonal, naturalista.",
      "Cada persona tiene un perfil de inteligencias único.",
      "La educación debe ofrecer múltiples puertas de entrada.",
      "Evaluar la diversidad, no la uniformidad.",
    ],
    methodology: "Ofrecer múltiples puertas de entrada al contenido, evaluar con instrumentos variados, personalizar.",
    storytelling: "Howard Gardner se preguntó algo que nadie se había preguntado: '¿Y si ser inteligente no es solo sacar buenas notas en matemáticas?' Su teoría de las Inteligencias Múltiples reveló que el bailarín, el músico, el líder social y el naturalista son tan inteligentes como el matemático. Solo que su inteligencia habla en otro idioma. Gardner les dio nombre a ocho formas de ser brillante y, con eso, millones de niños que se creían 'poco inteligentes' descubrieron que su genio simplemente necesitaba otro escenario.",
    quizQuestions: [
      { question: "¿Cuántas inteligencias propuso Gardner originalmente?", options: ["5", "7", "8", "10"], correct: 2 },
      { question: "¿Cuál de estas NO es una inteligencia de Gardner?", options: ["Musical", "Emocional", "Naturalista", "Espacial"], correct: 1 },
      { question: "¿Qué critica Gardner del concepto tradicional de inteligencia?", options: ["Que sea medible", "Que sea única y uniforme", "Que se enseñe en la escuela", "Que se relacione con la genética"], correct: 1 },
    ],
    slides: [
      { title: "Gardner: Inteligencias Múltiples", content: "Howard Gardner (1943-) demostró que la inteligencia no es una, sino múltiple." },
      { title: "Las 8 Inteligencias", content: "Lingüística, Lógico-matemática, Espacial, Musical, Corporal, Interpersonal, Intrapersonal, Naturalista." },
      { title: "Cada Niño es Único", content: "No hay alumnos 'poco inteligentes', hay inteligencias no reconocidas por la escuela." },
      { title: "Puertas de Entrada", content: "Todo tema puede abordarse desde múltiples inteligencias: cantar las tablas, bailar la historia." },
    ],
    transpositionPhases: {
      inicio: "Test informal de inteligencias múltiples: ¿cómo prefiere cada uno aprender y expresarse?",
      desarrollo: "Mismo contenido, 4 estaciones: una lingüística, una visual-espacial, una corporal, una musical.",
      cierre: "Portafolio de inteligencias: cada alumno presenta su aprendizaje en el lenguaje de su inteligencia dominante.",
    },
    connections: ["malaguzzi", "bruner", "illich"],
  },
];

export function getAuthorsByCategory(categoryId: CategoryId): Author[] {
  return authors.filter((a) => a.category === categoryId);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getCategoryColor(categoryId: CategoryId): string {
  const map: Record<CategoryId, string> = {
    fundadores: "cat-fundadores",
    "escuela-nueva": "cat-escuela-nueva",
    "giro-psicologico": "cat-giro-psicologico",
    "pedagogia-critica": "cat-pedagogia-critica",
    contemporaneos: "cat-contemporaneos",
  };
  return map[categoryId];
}
