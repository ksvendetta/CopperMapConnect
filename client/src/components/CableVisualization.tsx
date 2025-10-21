import { Cable, Splice, getBinderNumber } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FiberRibbon } from "./FiberRibbon";
import { Badge } from "@/components/ui/badge";

interface CableVisualizationProps {
  cable: Cable;
  splices: Splice[];
  position: "left" | "middle" | "right";
}

export function CableVisualization({ cable, splices, position }: CableVisualizationProps) {
  const binderCount = Math.ceil(cable.fiberCount / cable.ribbonSize);
  const binders = Array.from({ length: binderCount }, (_, i) => i + 1);

  const relatedSplices = splices.filter(
    (s) => s.sourceCableId === cable.id || s.destinationCableId === cable.id
  );

  const highlightedPairs = new Set<number>();
  relatedSplices.forEach((splice) => {
    if (splice.sourceCableId === cable.id) {
      for (let i = splice.sourceStartFiber; i <= splice.sourceEndFiber; i++) {
        highlightedPairs.add(i);
      }
    }
    if (splice.destinationCableId === cable.id) {
      for (let i = splice.destinationStartFiber; i <= splice.destinationEndFiber; i++) {
        highlightedPairs.add(i);
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
        {binders.map((binderNum) => (
          <FiberRibbon
            key={binderNum}
            cableId={cable.id}
            binderNumber={binderNum}
            startPair={1}
            endPair={cable.fiberCount}
            binderSize={cable.ribbonSize}
            highlightedPairs={Array.from(highlightedPairs)}
          />
        ))}
        
        {relatedSplices.length > 0 && (
          <div className="pt-2 space-y-1 border-t">
            {relatedSplices.map((splice) => {
              const isSource = splice.sourceCableId === cable.id;
              const ponRange = splice.ponStart && splice.ponEnd
                ? `pon,${splice.ponStart}-${splice.ponEnd}`
                : null;
              const pairRange = isSource
                ? `${splice.sourceStartFiber}-${splice.sourceEndFiber}`
                : `${splice.destinationStartFiber}-${splice.destinationEndFiber}`;

              return (
                <div key={splice.id} className="text-[10px] font-mono text-muted-foreground">
                  {ponRange && <div data-testid={`text-viz-pon-${splice.id}`}>{ponRange}</div>}
                  <div data-testid={`text-viz-pair-range-${splice.id}`}>{pairRange}</div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
