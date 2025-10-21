import { getPairColor, getPairPositionInBinder } from "@shared/schema";
import { getPairColorVariable } from "@/lib/fiberColors";

interface CopperBinderProps {
  cableId: string;
  binderNumber: number;
  startPair: number;
  endPair: number;
  binderSize: number;
  onPairClick?: (pairNumber: number) => void;
  highlightedPairs?: number[];
}

export function FiberRibbon({
  cableId,
  binderNumber,
  startPair,
  endPair,
  binderSize,
  onPairClick,
  highlightedPairs = [],
}: CopperBinderProps) {
  const binderStartPair = (binderNumber - 1) * binderSize + 1;
  const binderEndPair = Math.min(binderNumber * binderSize, endPair);

  const pairs = [];
  for (let i = binderStartPair; i <= binderEndPair; i++) {
    if (i >= startPair && i <= endPair) {
      pairs.push(i);
    }
  }

  return (
    <div className="space-y-1" data-testid={`copper-binder-${binderNumber}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground w-8">B{binderNumber}</span>
        <div className="flex gap-0.5 flex-1">
          {pairs.map((pairNumber) => {
            const positionInBinder = getPairPositionInBinder(pairNumber, binderSize);
            const pairColor = getPairColor(positionInBinder);
            const colorVar = getPairColorVariable(pairColor.tip, pairColor.ring);
            const isHighlighted = highlightedPairs.includes(pairNumber);

            return (
              <div
                key={pairNumber}
                className={`h-5 flex-1 border-l-4 flex items-center justify-center cursor-pointer transition-all hover-elevate ${
                  isHighlighted ? "ring-2 ring-primary ring-offset-1" : ""
                }`}
                style={{
                  borderLeftColor: `hsl(var(--${colorVar}))`,
                  backgroundColor: `hsl(var(--${colorVar}) / 0.15)`,
                }}
                onClick={() => onPairClick?.(pairNumber)}
                data-testid={`pair-${cableId}-${pairNumber}`}
                title={`Pair ${pairNumber} (${pairColor.tip}/${pairColor.ring})`}
              >
                <span className="text-[10px] font-mono font-medium">{pairNumber}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
