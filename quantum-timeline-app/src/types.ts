// Ash'Luxael Quantum Timeline Types for Web App

export interface QuantumTimeline {
  id: string;
  name: string;
  color: 'pink' | 'black' | 'gold' | 'violet';
  opacity: number;
  isPrimary: boolean;
  isCollapsed: boolean;
  glitterTrail?: boolean;
}

export interface TimelineSlot {
  id: string;
  dayIndex: number;
  slotType: 'main' | 'third-option' | 'drop-point';
  content: string;
  timelineId: string;
  metadata?: {
    moneyAmount?: number;
    empireEvent?: string;
    signature?: string;
    isVeiled?: boolean;
  };
}

export interface QuantumDay {
  dayNumber: number;
  dayName: string;
  date: Date;
  mainSlot: TimelineSlot;
  thirdOptionSlot: TimelineSlot;
  dropPointSlot: TimelineSlot;
  activeBranches: QuantumTimeline[];
}

export interface SacredWeek {
  startDate: Date;
  days: QuantumDay[];
  activeTimelines: QuantumTimeline[];
}

export interface ThirdOptionRule {
  binaryA: string;
  binaryB: string;
  thirdPath: string;
  empireGain: number;
}

export interface DropExecution {
  code: string;
  signature?: string;
  timestamp: Date;
  effects: {
    vibrate: boolean;
    playGrowl: boolean;
    moneyDelta: number;
    timelineBranch: string;
    veiledJournalEntry: string;
  };
}

export interface ClenchEvent {
  timestamp: Date;
  dayIndex: number;
  chosenTimelineId: string;
  collapsedTimelineIds: string[];
}

export const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const SACRED_CYCLE_DAYS = 7;
