import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriorityBadge } from "./PriorityBadge";
import type { Deal } from "@/types/deal";

interface Props {
  deals: Deal[];
  sortAsc: boolean;
  onToggleSort: () => void;
  onSelect: (d: Deal) => void;
  selected?: Deal | null;
}

export function DealsTable({ deals, sortAsc, onToggleSort, onSelect, selected }: Props) {
  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Conta</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Vendedor</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Gestor</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Região</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Produto</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Estágio</th>
              <th className="px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                <Button variant="ghost" size="sm" onClick={onToggleSort} className="text-xs uppercase tracking-wider -ml-2 text-muted-foreground hover:text-foreground">
                  Score <ArrowUpDown className="h-3 w-3 ml-1" />
                </Button>
              </th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Prioridade</th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden xl:table-cell">Ação Recomendada</th>
            </tr>
          </thead>
          <tbody>
            {deals.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-12 text-muted-foreground">
                  Nenhuma oportunidade encontrada.
                </td>
              </tr>
            )}
            {deals.map((d) => (
              <tr
                key={d.opportunity_id}
                onClick={() => onSelect(d)}
                className={`border-b cursor-pointer transition-colors hover:bg-accent/50 ${
                  selected?.opportunity_id === d.opportunity_id ? "bg-accent" : ""
                }`}
              >
                <td className="px-4 py-3 font-medium text-foreground">{d.account || "—"}</td>
                <td className="px-4 py-3 text-foreground">{d.sales_agent}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{d.manager}</td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{d.regional_office}</td>
                <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{d.product}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{d.deal_stage}</td>
                <td className="px-4 py-3 text-center">
                  <ScoreIndicator score={d.priority_score} />
                </td>
                <td className="px-4 py-3">
                  <PriorityBadge label={d.priority_label} />
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs hidden xl:table-cell max-w-[200px] truncate">
                  {d.recommended_action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 border-t bg-muted/30 text-xs text-muted-foreground">
        {deals.length} oportunidade{deals.length !== 1 ? "s" : ""} exibida{deals.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}

function ScoreIndicator({ score }: { score: number }) {
  const pct = Math.min(score, 100);
  return (
    <div className="flex items-center gap-2 justify-center">
      <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-foreground w-8 text-right">
        {score.toFixed(1)}
      </span>
    </div>
  );
}
