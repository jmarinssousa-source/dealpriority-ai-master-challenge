import { X, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "./PriorityBadge";
import type { Deal } from "@/types/deal";

interface Props {
  deal: Deal;
  onClose: () => void;
}

export function DealDetail({ deal, onClose }: Props) {
  const d = deal;
  const pct = Math.min(d.priority_score, 100);

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-card border-l shadow-2xl z-50 animate-slide-in-right flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-bold text-foreground">Detalhes da Oportunidade</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Score Hero */}
        <div className="rounded-lg bg-accent p-5 text-center space-y-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Priority Score
          </span>
          <div className="text-4xl font-bold text-primary">{d.priority_score.toFixed(1)}</div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <PriorityBadge label={d.priority_label} className="text-sm px-3 py-1" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            ["ID", d.opportunity_id],
            ["Conta", d.account || "—"],
            ["Vendedor", d.sales_agent],
            ["Gestor", d.manager],
            ["Região", d.regional_office],
            ["Produto", d.product],
            ["Estágio", d.deal_stage],
            ["Data Engajamento", d.engage_date],
            ["Valor Fechamento", d.close_value || "—"],
          ].map(([label, value]) => (
            <div key={label} className="space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                {label}
              </span>
              <p className="text-sm font-medium text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Positive Reasons */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Pontos Positivos</span>
          </div>
          <div className="space-y-2">
            {[d.top_positive_reason_1, d.top_positive_reason_2].filter(Boolean).map((r, i) => (
              <div key={i} className="flex items-start gap-2 rounded-md bg-accent/50 p-3">
                <TrendingUp className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Reasons */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Riscos Identificados</span>
          </div>
          <div className="space-y-2">
            {[d.top_risk_reason_1, d.top_risk_reason_2].filter(Boolean).map((r, i) => (
              <div key={i} className="flex items-start gap-2 rounded-md bg-destructive/5 p-3">
                <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Lightbulb className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Ação Recomendada</span>
          </div>
          <div className="rounded-md border-2 border-primary/20 bg-accent p-4">
            <p className="text-sm font-medium text-foreground">{d.recommended_action}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
