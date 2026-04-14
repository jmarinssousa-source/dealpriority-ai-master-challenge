import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Filters } from "@/hooks/useDeals";

interface Props {
  filters: Filters;
  setFilters: (f: Filters) => void;
  options: Record<string, string[]>;
  resetFilters: () => void;
}

const filterConfig: { key: keyof Filters; label: string }[] = [
  { key: "sales_agent", label: "Vendedor" },
  { key: "manager", label: "Gestor" },
  { key: "regional_office", label: "Região" },
  { key: "product", label: "Produto" },
  { key: "deal_stage", label: "Estágio" },
  { key: "priority_label", label: "Prioridade" },
];

export function FiltersBar({ filters, setFilters, options, resetFilters }: Props) {
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="bg-card rounded-lg border p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filtros</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-muted-foreground">
            <X className="h-3 w-3 mr-1" /> Limpar filtros
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        <div className="relative xl:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conta, ID ou vendedor..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-9 h-9 text-sm"
          />
        </div>
        {filterConfig.map(({ key, label }) => (
          <Select
            key={key}
            value={filters[key] || "all"}
            onValueChange={(v) => setFilters({ ...filters, [key]: v === "all" ? "" : v })}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos — {label}</SelectItem>
              {(options[key] || []).map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>
    </div>
  );
}
