import Dexie, { type Table } from 'dexie';
import type { Cable, Circuit, Save } from '@/../../shared/schema';

// IndexedDB Database
class FiberSpliceDB extends Dexie {
  cables!: Table<Cable>;
  circuits!: Table<Circuit>;
  saves!: Table<Save>;

  constructor() {
    super('FiberSpliceDB');
    this.version(1).stores({
      cables: 'id, name, fiberCount, type',
      circuits: 'id, cableId, circuitId, position, fiberStart, fiberEnd, isSpliced, feedCableId, feedFiberStart, feedFiberEnd',
      saves: 'id, name, createdAt, data'
    });
  }
}

export const db = new FiberSpliceDB();
