import { motion } from "framer-motion";
import { type Author, getCategoryColor } from "@/data/authors";
import { MessageCircle } from "lucide-react";
import { useNexusStore } from "@/store/useNexusStore";

interface AuthorCardProps {
  author: Author;
  compact?: boolean;
}

export default function AuthorCard({ author, compact }: AuthorCardProps) {
  const { setSelectedAuthorId, setActiveModule, addConsultedAuthor } = useNexusStore();
  const colorClass = getCategoryColor(author.category);

  const handleClick = () => {
    setSelectedAuthorId(author.id);
    addConsultedAuthor(author.id);
    setActiveModule("prisma");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group glass-surface rounded-lg overflow-hidden hover:shadow-card-hover transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex gap-3 p-3">
        <img
          src={author.portrait}
          alt={author.name}
          loading="lazy"
          width={80}
          height={80}
          className="w-20 h-20 rounded-md object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display font-semibold text-foreground leading-tight">
                {author.name}
              </h3>
              <span className={`text-xs font-medium text-${colorClass}`}>
                {author.subtitle}
              </span>
            </div>
          </div>
          {!compact && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {author.description}
            </p>
          )}
          <button
            className={`mt-2 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-${colorClass}/10 text-${colorClass} hover:bg-${colorClass}/20 transition-colors`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <MessageCircle className="w-3 h-3" />
            Conversar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
