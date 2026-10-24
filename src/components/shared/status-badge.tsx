import { cn } from "@/lib/utils";

/**
 * Always light-tint pills + dark ink so labels stay readable on page
 * surfaces and inside `.on-dark` heroes (where CSS forces white text).
 */
const toneMap = {
  success: {
    className: "bg-[#e8f7ef] text-[#0f7a45] ring-[#0f7a45]/20",
    color: "#0f7a45",
    background: "#e8f7ef",
  },
  warning: {
    className: "bg-[#fff6e0] text-[#9a6700] ring-[#9a6700]/20",
    color: "#9a6700",
    background: "#fff6e0",
  },
  error: {
    className: "bg-[#fef3f2] text-[#b42318] ring-[#b42318]/20",
    color: "#b42318",
    background: "#fef3f2",
  },
  info: {
    className: "bg-[#eff6ff] text-[#0b3d91] ring-[#1e6ef4]/20",
    color: "#0b3d91",
    background: "#eff6ff",
  },
  neutral: {
    className: "bg-white text-[#3a3a3c] ring-black/10",
    color: "#3a3a3c",
    background: "#ffffff",
  },
} as const;

export function StatusBadge({
  label,
  tone = "neutral",
  icon,
  className,
}: {
  label: string;
  tone?: keyof typeof toneMap;
  icon?: React.ReactNode;
  className?: string;
}) {
  const palette = toneMap[tone];

  return (
    <span
      data-tone={tone}
      data-contrast="readable"
      className={cn(
        "status-badge inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
        palette.className,
        className,
      )}
      style={{ color: palette.color, backgroundColor: palette.background }}
    >
      {icon}
      <span className="status-badge__label" style={{ color: palette.color }}>
        {label}
      </span>
    </span>
  );
}
