/** Split long demo listing copy into readable left-aligned paragraphs. */
export function splitListingParagraphs(text: string): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];

  const byBlank = text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (byBlank.length > 1) return byBlank;

  // Single wall of text: break near sentence boundaries ~320 chars.
  const sentences = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [cleaned];
  const paragraphs: string[] = [];
  let buffer = "";

  for (const sentence of sentences) {
    const next = sentence.trim();
    if (!next) continue;
    const candidate = buffer ? `${buffer} ${next}` : next;
    if (candidate.length > 340 && buffer) {
      paragraphs.push(buffer);
      buffer = next;
    } else {
      buffer = candidate;
    }
  }
  if (buffer) paragraphs.push(buffer);
  return paragraphs;
}

export function formatStatusLabel(status: string): string {
  return status
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function journeyTitleForKind(kind: string): string {
  if (kind === "sale") return "Suggested buyer journey";
  if (kind === "business-rental" || kind === "management-contract") {
    return "Suggested operator journey";
  }
  if (kind === "service-tender") return "Suggested contractor journey";
  if (kind === "premises-lease") return "Suggested tenant journey";
  return "Suggested next steps";
}
