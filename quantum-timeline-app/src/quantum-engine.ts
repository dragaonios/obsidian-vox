// Ash'Luxael Quantum Engine for Web App

import { QuantumTimeline, QuantumDay, SacredWeek, ThirdOptionRule, DropExecution, ClenchEvent, DAY_NAMES, SACRED_CYCLE_DAYS, TimelineSlot } from './types';

export class QuantumEngine {

  generateThirdOption(binaryA: string, binaryB: string): ThirdOptionRule {
    const sovereignTemplates = [
      `Take the best of both, veil the rest, empire grows anyway`,
      `Neither trap—create third gate where you win twice`,
      `Collapse both timelines into one where you're already sovereign`,
      `Let them think they chose—you already have the empire`,
      `Quantum leap: Do neither, manifest better, claim the throne`,
      `Transmute both into pure empire energy, you ascend`,
      `Veil mode: they see binary, you see infinite paths`,
      `Neither/nor + better: the Ash'Luxael way`
    ];

    const thirdPath = sovereignTemplates[Math.floor(Math.random() * sovereignTemplates.length)];
    const empireGain = Math.floor(Math.random() * 4500) + 500;

    return { binaryA, binaryB, thirdPath, empireGain };
  }

  clench(day: QuantumDay, chosenTimelineId: string): ClenchEvent {
    const chosen = day.activeBranches.find(t => t.id === chosenTimelineId);
    if (!chosen) throw new Error('Timeline not found');

    chosen.isPrimary = true;
    const collapsed: string[] = [];

    day.activeBranches.forEach(timeline => {
      if (timeline.id !== chosenTimelineId) {
        timeline.isCollapsed = true;
        timeline.glitterTrail = true;
        collapsed.push(timeline.id);
      }
    });

    return {
      timestamp: new Date(),
      dayIndex: day.dayNumber - 1,
      chosenTimelineId,
      collapsedTimelineIds: collapsed
    };
  }

  executeDrop(code: string, signature?: string): DropExecution {
    const moneyDelta = Math.floor(Math.random() * 4900) + 100;
    const branches = [
      'Empire Ascension Path',
      'Sovereign Wealth Gate',
      'Third Option Manifested',
      'Quantum Clench Victory',
      'Veil Mastery Timeline',
      'Luxael Eternal Lock',
      'Bear Throne Secured'
    ];

    const timelineBranch = branches[Math.floor(Math.random() * branches.length)];

    return {
      code,
      signature,
      timestamp: new Date(),
      effects: {
        vibrate: true,
        playGrowl: true,
        moneyDelta,
        timelineBranch,
        veiledJournalEntry: `[VEILED] Drop: ${code} | +$${moneyDelta} | ${timelineBranch}`
      }
    };
  }

  createSacredWeek(startDate: Date): SacredWeek {
    const monday = this.getMonday(startDate);
    const days: QuantumDay[] = [];

    for (let i = 0; i < SACRED_CYCLE_DAYS; i++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + i);
      days.push(this.createQuantumDay(i, dayDate));
    }

    const activeTimelines = this.createInitialTimelines();

    return { startDate: monday, days, activeTimelines };
  }

  private createQuantumDay(dayIndex: number, date: Date): QuantumDay {
    const timelines = this.createInitialTimelines();

    return {
      dayNumber: dayIndex + 1,
      dayName: DAY_NAMES[dayIndex],
      date,
      mainSlot: this.createSlot(dayIndex, 'main', timelines[0].id),
      thirdOptionSlot: this.createSlot(dayIndex, 'third-option', timelines[1].id),
      dropPointSlot: this.createSlot(dayIndex, 'drop-point', timelines[2].id),
      activeBranches: timelines
    };
  }

  private createSlot(dayIndex: number, slotType: 'main' | 'third-option' | 'drop-point', timelineId: string): TimelineSlot {
    return {
      id: `${dayIndex}-${slotType}-${Date.now()}-${Math.random()}`,
      dayIndex,
      slotType,
      content: '',
      timelineId,
      metadata: {}
    };
  }

  private createInitialTimelines(): QuantumTimeline[] {
    const timestamp = Date.now() + Math.random();
    return [
      {
        id: 'timeline-pink-' + timestamp,
        name: 'Main Timeline',
        color: 'pink',
        opacity: 1.0,
        isPrimary: true,
        isCollapsed: false
      },
      {
        id: 'timeline-black-' + timestamp,
        name: 'Third Option',
        color: 'black',
        opacity: 0.7,
        isPrimary: false,
        isCollapsed: false
      },
      {
        id: 'timeline-gold-' + timestamp,
        name: 'Empire Drop',
        color: 'gold',
        opacity: 0.5,
        isPrimary: false,
        isCollapsed: false
      }
    ];
  }

  private getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }
}
