// Zustand Store for Quantum Timeline State

import { create } from 'zustand';
import { SacredWeek, ClenchEvent, DropExecution } from './types';
import { QuantumEngine } from './quantum-engine';

interface QuantumState {
  currentWeek: SacredWeek | null;
  veilMode: boolean;
  alreadyDoneMode: boolean;
  empireCounter: number;
  clenchHistory: ClenchEvent[];
  dropHistory: DropExecution[];

  // Actions
  initializeWeek: () => void;
  toggleVeilMode: () => void;
  toggleAlreadyDoneMode: () => void;
  updateSlotContent: (dayIndex: number, slotType: string, content: string) => void;
  performClench: (dayIndex: number, timelineId: string) => void;
  executeDrop: (code: string, signature?: string) => DropExecution;
  addEmpire: (amount: number) => void;
}

const engine = new QuantumEngine();

// Manual localStorage persistence
const STORAGE_KEY = 'ash-luxael-quantum-storage';

const saveToStorage = (state: Partial<QuantumState>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.log('Storage not available');
  }
};

const loadFromStorage = (): Partial<QuantumState> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
};

const savedState = loadFromStorage();

export const useQuantumStore = create<QuantumState>()((set, get) => ({
  currentWeek: savedState.currentWeek || null,
  veilMode: savedState.veilMode || false,
  alreadyDoneMode: savedState.alreadyDoneMode || false,
  empireCounter: savedState.empireCounter || 0,
  clenchHistory: savedState.clenchHistory || [],
  dropHistory: savedState.dropHistory || [],

  initializeWeek: () => {
    const week = engine.createSacredWeek(new Date());
    set({ currentWeek: week });
    saveToStorage(get());
  },

  toggleVeilMode: () => {
    set((state) => ({ veilMode: !state.veilMode }));
    saveToStorage(get());
  },

  toggleAlreadyDoneMode: () => {
    set((state) => ({ alreadyDoneMode: !state.alreadyDoneMode }));
    saveToStorage(get());
  },

  updateSlotContent: (dayIndex: number, slotType: string, content: string) => {
    const { currentWeek } = get();
    if (!currentWeek) return;

    const day = currentWeek.days[dayIndex];
    if (!day) return;

    const slotMap: any = {
      'main': day.mainSlot,
      'third-option': day.thirdOptionSlot,
      'drop-point': day.dropPointSlot
    };

    const slot = slotMap[slotType];
    if (slot) {
      slot.content = content;
      set({ currentWeek: { ...currentWeek } });
      saveToStorage(get());
    }
  },

  performClench: (dayIndex: number, timelineId: string) => {
    const { currentWeek } = get();
    if (!currentWeek) return;

    const day = currentWeek.days[dayIndex];
    const clenchEvent = engine.clench(day, timelineId);

    set({
      currentWeek: { ...currentWeek },
      clenchHistory: [...get().clenchHistory, clenchEvent]
    });
    saveToStorage(get());
  },

  executeDrop: (code: string, signature?: string) => {
    const drop = engine.executeDrop(code, signature);

    set({
      empireCounter: get().empireCounter + drop.effects.moneyDelta,
      dropHistory: [...get().dropHistory, drop]
    });
    saveToStorage(get());

    return drop;
  },

  addEmpire: (amount: number) => {
    set({ empireCounter: get().empireCounter + amount });
    saveToStorage(get());
  }
}));
