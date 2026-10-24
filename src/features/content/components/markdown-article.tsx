/** Minimal markdown renderer for seed article bodies (headings, lists, paragraphs). */
export function MarkdownArticle({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n\n+/);

  return (
    <div className="prose-nbh space-y-4 text-[var(--text-body)]">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={index} className="pt-4 text-2xl text-[var(--text-heading)]">
              {trimmed.slice(3)}
            </h2>
          );
        }
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={index} className="pt-2 text-xl text-[var(--text-heading)]">
              {trimmed.slice(4)}
            </h3>
          );
        }
        if (trimmed.split("\n").every((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line))) {
          const ordered = /^\d+\.\s+/.test(trimmed);
          const Tag = ordered ? "ol" : "ul";
          return (
            <Tag
              key={index}
              className={`space-y-1 pl-5 ${ordered ? "list-decimal" : "list-disc"}`}
            >
              {trimmed.split("\n").map((line) => (
                <li key={line}>{line.replace(/^([-*]|\d+\.)\s+/, "")}</li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={index}>
            {trimmed.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}
