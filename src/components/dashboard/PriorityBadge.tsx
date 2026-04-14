import { cn } from "@/lib/utils";

interface Props {
  label: string;
  className?: string;
}

export function PriorityBadge({ label, className }: Props) {
  const styles: Record<string, string> = {
    "Foco Agora": "bg-priority-focus-bg text-priority-focus border-priority-focus/20",
    Nutrir: "bg-priority-nurture-bg text-priority-nurture border-priority-nurture/20",
    "Baixa Prioridade": "bg-priority-low-bg text-priority-low border-priority-low/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        styles[label] || "bg-muted text-muted-foreground",
        className
      )}
    >
      {label}
    </span>
  );
}
