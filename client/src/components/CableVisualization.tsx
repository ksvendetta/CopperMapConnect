import { Cable, Splice, getRibbonNumber } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FiberRibbon } from "./FiberRibbon";
import { Badge } from "@/components/ui/badge";

interface CableVisualizationProps {
  cable: Cable;
  splices: Splice[];
  position: "left" | "middle" | "right";
}

export function CableVisualization({ cable, splices, position }: CableVisualizationProps) {
  const ribbonCount = Math.ceil(cable.fiberCount / cable.ribbonSize);
  const ribbons = Array.from({ length: ribbonCount }, (_, i) => i + 1);

  const relatedSplices = splices.filter(
    (s) => s.sourceCableId === cable.id || s.destinationCableId === cable.id
  );

  const highlightedFibers = new Set<number>();
  relatedSplices.forEach((splice) => {
    if (splice.sourceCableId === cable.id) {
      for (let i = splice.sourceStartFiber; i <= splice.sourceEndFiber; i++) {
        highlightedFibers.add(i);
      }
    }
    if (splice.destinationCableId === cable.id) {
      for (let i = splice.destinationStartFiber; i <= splice.destinationEndFiber; i++) {
        highlightedFibers.add(i);
      }
    }
  });

  return (
    <Card className="min-w-[240px] max-w-[280px]" data-testid={`card-cable-viz-${cable.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-mono font-semibold text-sm truncate" data-testid={`text-viz-cable-name-${cable.id}`}>
            {cable.name}
          </h3>
          <Badge variant="secondary" className="text-xs font-mono" data-testid={`badge-viz-cable-count-${cable.id}`}>
            {cable.fiberCount}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs" data-testid={`badge-viz-cable-type-${cable.id}`}>
            {cable.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {ribbons.map((ribbonNum) => (
          <FiberRibbon
            key={ribbonNum}
            cableId={cable.id}
            ribbonNumber={ribbonNum}
            startFiber={1}
            endFiber={cable.fiberCount}
            ribbonSize={cable.ribbonSize}
            highlightedFibers={Array.from(highlightedFibers)}
          />
        ))}
        
        {relatedSplices.length > 0 && (
          <div className="pt-2 space-y-1 border-t">
            {relatedSplices.map((splice) => {
              const isSource = splice.sourceCableId === cable.id;
              const ponRange = splice.ponStart && splice.ponEnd
                ? `pon,${splice.ponStart}-${splice.ponEnd}`
                : null;
              const fiberRange = isSource
                ? `${splice.sourceStartFiber}-${splice.sourceEndFiber}`
                : `${splice.destinationStartFiber}-${splice.destinationEndFiber}`;

              return (
                <div key={splice.id} className="text-[10px] font-mono text-muted-foreground">
                  {ponRange && <div data-testid={`text-viz-pon-${splice.id}`}>{ponRange}</div>}
                  <div data-testid={`text-viz-fiber-range-${splice.id}`}>{fiberRange}</div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
