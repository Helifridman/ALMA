import { VOCAB_BY_ID } from "@/content/vocabulary";

/** Vocabulary picture: an illustration if one exists, otherwise a large emoji placeholder. */
export function Picture({ vocabId, size = "md", className = "" }: { vocabId: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const item = VOCAB_BY_ID[vocabId];
  const dims = size === "lg" ? "text-7xl h-28" : size === "sm" ? "text-3xl h-12" : "text-5xl h-20";
  if (!item) return null;
  if (item.imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.imageUrl} alt={item.word} className={`object-contain ${dims} ${className}`} />;
  }
  return (
    <span className={`flex items-center justify-center ${dims} ${className}`} role="img" aria-label={item.translationHe}>
      {item.emoji}
    </span>
  );
}
