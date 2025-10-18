import { getFiberColor, getFiberPositionInRibbon, type FiberColor } from "@shared/schema";
import { getFiberColorClass } from "@/lib/fiberColors";

interface FiberRibbonProps {
  cableId: string;
  ribbonNumber: number;
  startFiber: number;
  endFiber: number;
  ribbonSize: number;
  onFiberClick?: (fiberNumber: number) => void;
  highlightedFibers?: number[];
}

export function FiberRibbon({
  cableId,
  ribbonNumber,
  startFiber,
  endFiber,
  ribbonSize,
  onFiberClick,
  highlightedFibers = [],
}: FiberRibbonProps) {
  const ribbonStartFiber = (ribbonNumber - 1) * ribbonSize + 1;
  const ribbonEndFiber = Math.min(ribbonNumber * ribbonSize, endFiber);

  const fibers = [];
  for (let i = ribbonStartFiber; i <= ribbonEndFiber; i++) {
    if (i >= startFiber && i <= endFiber) {
      fibers.push(i);
    }
  }

  return (
    <div className="space-y-1" data-testid={`fiber-ribbon-${ribbonNumber}`}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground w-8">R{ribbonNumber}</span>
        <div className="flex gap-0.5 flex-1">
          {fibers.map((fiberNumber) => {
            const positionInRibbon = getFiberPositionInRibbon(fiberNumber, ribbonSize);
            const color = getFiberColor(positionInRibbon);
            const colorClass = getFiberColorClass(color);
            const isHighlighted = highlightedFibers.includes(fiberNumber);

            return (
              <div
                key={fiberNumber}
                className={`h-5 flex-1 border-l-4 flex items-center justify-center cursor-pointer transition-all hover-elevate ${
                  isHighlighted ? "ring-2 ring-primary ring-offset-1" : ""
                }`}
                style={{
                  borderLeftColor: `hsl(var(--fiber-${color}))`,
                  backgroundColor: `hsl(var(--fiber-${color}) / 0.15)`,
                }}
                onClick={() => onFiberClick?.(fiberNumber)}
                data-testid={`fiber-${cableId}-${fiberNumber}`}
                title={`Fiber ${fiberNumber} (${color})`}
              >
                <span className="text-[10px] font-mono font-medium">{fiberNumber}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
