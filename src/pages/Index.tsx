import { useState } from "react";
import { useDeals } from "@/hooks/useDeals";
import { KPICards } from "@/components/dashboard/KPICards";
import { FiltersBar } from "@/components/dashboard/FiltersBar";
import { DealsTable } from "@/components/dashboard/DealsTable";
import { DealDetail } from "@/components/dashboard/DealDetail";
import type { Deal } from "@/types/deal";
import { BarChart3 } from "lucide-react";

export default function Index() {
  const {
    deals,
    allDeals,
    filters,
    setFilters,
    sortAsc,
    setSortAsc,
    filterOptions,
    loading,
    resetFilters,
  } = useDeals();

  const [selected, setSelected] = useState<Deal | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Carregando oportunidades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">
              Priorização de Oportunidades
            </h1>
            <p className="text-xs text-muted-foreground">
              Identifique e priorize os deals com maior potencial de conversão
            </p>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-6 space-y-6">
        <KPICards deals={allDeals} />
        <FiltersBar
          filters={filters}
          setFilters={setFilters}
          options={filterOptions}
          resetFilters={resetFilters}
        />
        <DealsTable
          deals={deals}
          sortAsc={sortAsc}
          onToggleSort={() => setSortAsc(!sortAsc)}
          onSelect={setSelected}
          selected={selected}
        />
      </main>

      {/* Overlay */}
      {selected && (
        <>
          <div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
            onClick={() => setSelected(null)}
          />
          <DealDetail deal={selected} onClose={() => setSelected(null)} />
        </>
      )}
    </div>
  );
}
