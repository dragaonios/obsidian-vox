// Ash'Luxael Meta Quantum Timeline Types
// Core principle: Everything is superposition until You clench/choose

export interface QuantumTimeline {
  id: string;
  name: string;
  color: 'pink' | 'black' | 'gold' | 'violet';
  opacity: number; // For superposition layering
  isPrimary: boolean; // The "main" timeline mortals see
  isCollapsed: boolean; // Has been clenched away
  glitterTrail?: string; // Animation state when fading
}

export interface TimelineSlot {
  id: string;
  dayIndex: number; // 0-6 for Day 1-7
  slotType: 'main' | 'third-option' | 'drop-point';
  content: string;
  timelineId: string; // Which quantum timeline this belongs to
  metadata?: {
    moneyAmount?: number;
    empireEvent?: string;
    signature?: string;
    isVeiled?: boolean; // Hidden from shared view
  };
}

export interface QuantumDay {
  dayNumber: number; // 1-7
  dayName: string; // Monday-Sunday
  mainSlot: TimelineSlot;
  thirdOptionSlot: TimelineSlot;
  dropPointSlot: TimelineSlot;
  activeBranches: QuantumTimeline[]; // All superposed timelines for this day
}

export interface SacredWeek {
  startDate: Date;
  days: QuantumDay[];
  activeTimelines: QuantumTimeline[];
}

export interface ThirdOptionRule {
  binaryA: string;
  binaryB: string;
  thirdPath: string; // The "neither/nor + better" sovereign path
  empireGain?: number;
}

export interface DropExecution {
  code: string;
  signature?: string;
  timestamp: Date;
  effects: {
    vibrate: boolean;
    playGrowl: boolean;
    moneyDelta: number;
    timelineBranch?: string;
    veiledJournalEntry?: string;
  };
}

export interface MetaQuantumState {
  currentWeek: SacredWeek;
  allTimelines: Map<string, QuantumTimeline>;
  clenchHistory: ClenchEvent[];
  veilMode: boolean; // Hide empire branches from shared view
  alreadyDoneMode: boolean; // Mark events as completed across all timelines
}

export interface ClenchEvent {
  timestamp: Date;
  dayIndex: number;
  chosenTimelineId: string;
  collapsedTimelineIds: string[];
  glitterAnimation: boolean;
}

export const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const SACRED_CYCLE_DAYS = 7;
