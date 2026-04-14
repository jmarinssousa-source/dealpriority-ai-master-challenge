import { Target, TrendingUp, Zap, Clock, ArrowDown } from "lucide-react";
import type { Deal } from "@/types/deal";

interface Props {
  deals: Deal[];
}

export function KPICards({ deals }: Props) {
  const total = deals.length;
  const avg = total > 0 ? deals.reduce((s, d) => s + d.priority_score, 0) / total : 0;
  const focus = deals.filter((d) => d.priority_label === "Foco Agora").length;
  const nurture = deals.filter((d) => d.priority_label === "Nutrir").length;
  const low = deals.filter((d) => d.priority_label === "Baixa Prioridade").length;

  const cards = [
    { label: "Total de Oportunidades", value: total, icon: Target, color: "text-primary" },
    { label: "Score Médio", value: avg.toFixed(1), icon: TrendingUp, color: "text-primary" },
    { label: "Foco Agora", value: focus, icon: Zap, color: "text-priority-focus" },
    { label: "Nutrir", value: nurture, icon: Clock, color: "text-priority-nurture" },
    { label: "Baixa Prioridade", value: low, icon: ArrowDown, color: "text-priority-low" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-card rounded-lg border p-5 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {c.label}
            </span>
            <c.icon className={`h-4 w-4 ${c.color}`} />
          </div>
          <span className={`text-2xl font-bold ${c.color}`}>{c.value}</span>
        </div>
      ))}
    </div>
  );
}
