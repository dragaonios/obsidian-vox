// Ash'Luxael Quantum Timeline View
// 7-Day Sacred Grid with Superposition Display

import { ItemView, WorkspaceLeaf, Notice } from 'obsidian';
import { QuantumEngine } from './quantum-engine';
import { MetaQuantumState, SacredWeek, QuantumDay, QuantumTimeline, DropExecution } from './types';

export const VIEW_TYPE_QUANTUM_TIMELINE = 'quantum-timeline-view';

export class QuantumTimelineView extends ItemView {
  private engine: QuantumEngine;
  private state: MetaQuantumState;
  private currentWeek: SacredWeek;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
    this.engine = new QuantumEngine();
    this.initializeQuantumState();
  }

  getViewType(): string {
    return VIEW_TYPE_QUANTUM_TIMELINE;
  }

  getDisplayText(): string {
    return 'Ash\'Luxael Quantum Timeline';
  }

  getIcon(): string {
    return 'star';
  }

  private initializeQuantumState(): void {
    const startOfWeek = this.getMonday(new Date());
    this.currentWeek = this.engine.createSacredWeek(startOfWeek);

    this.state = {
      currentWeek: this.currentWeek,
      allTimelines: new Map(),
      clenchHistory: [],
      veilMode: false,
      alreadyDoneMode: false
    };

    // Register timelines
    this.currentWeek.activeTimelines.forEach(timeline => {
      this.state.allTimelines.set(timeline.id, timeline);
    });
  }

  private getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  async onOpen(): Promise<void> {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass('quantum-timeline-container');

    this.renderQuantumTimeline(container);
  }

  private renderQuantumTimeline(container: HTMLElement): void {
    // Header
    const header = container.createEl('div', { cls: 'quantum-header' });
    header.createEl('h2', { text: '✧ ASH\'LUXAEL QUANTUM TIMELINE ✧' });
    header.createEl('p', {
      text: 'Everything is superposition until You clench.',
      cls: 'quantum-subtitle'
    });

    // Controls
    this.renderControls(container);

    // Sacred 7-Day Grid
    const gridContainer = container.createEl('div', { cls: 'sacred-grid' });
    this.renderSacredGrid(gridContainer);
  }

  private renderControls(container: HTMLElement): void {
    const controls = container.createEl('div', { cls: 'quantum-controls' });

    // Veil Mode Toggle
    const veilToggle = controls.createEl('button', {
      text: this.state.veilMode ? '🌑 Veil Active' : '👁️ Veil Inactive',
      cls: 'veil-toggle'
    });
    veilToggle.addEventListener('click', () => {
      this.state.veilMode = !this.state.veilMode;
      new Notice(this.state.veilMode ? 'Empire branches veiled' : 'All timelines visible');
      this.refresh();
    });

    // Already Done Mode Toggle
    const doneToggle = controls.createEl('button', {
      text: this.state.alreadyDoneMode ? '✓ Already Done Mode' : '◯ Normal Mode',
      cls: 'done-toggle'
    });
    doneToggle.addEventListener('click', () => {
      this.state.alreadyDoneMode = !this.state.alreadyDoneMode;
      new Notice(this.state.alreadyDoneMode ? 'Already Done mode activated' : 'Normal mode');
      this.refresh();
    });

    // Third Option Generator
    const thirdOptionBtn = controls.createEl('button', {
      text: '⚡ Generate Third Option',
      cls: 'third-option-btn'
    });
    thirdOptionBtn.addEventListener('click', () => this.showThirdOptionDialog());
  }

  private renderSacredGrid(container: HTMLElement): void {
    this.currentWeek.days.forEach((day, index) => {
      const dayCard = container.createEl('div', { cls: 'quantum-day-card' });

      // Day Header
      const dayHeader = dayCard.createEl('div', { cls: 'day-header' });
      dayHeader.createEl('h3', { text: `Day ${day.dayNumber}` });
      dayHeader.createEl('span', { text: day.dayName, cls: 'day-name' });

      // Render 3 slots with superposition
      this.renderSlot(dayCard, day, 'main', day.mainSlot);
      this.renderSlot(dayCard, day, 'third-option', day.thirdOptionSlot);
      this.renderSlot(dayCard, day, 'drop-point', day.dropPointSlot);

      // Clench Button (Tiara Tap)
      const clenchBtn = dayCard.createEl('button', {
        text: '👑 CLENCH',
        cls: 'clench-button'
      });
      clenchBtn.addEventListener('click', () => this.performClench(day));
    });
  }

  private renderSlot(
    container: HTMLElement,
    day: QuantumDay,
    type: 'main' | 'third-option' | 'drop-point',
    slot: any
  ): void {
    const slotEl = container.createEl('div', { cls: `timeline-slot slot-${type}` });

    const slotLabel = slotEl.createEl('div', { cls: 'slot-label' });
    const labels = {
      'main': '🌸 Main Timeline',
      'third-option': '🖤 Third Option Gate',
      'drop-point': '💰 Drop Point'
    };
    slotLabel.textContent = labels[type];

    // Superposition layers
    const layersContainer = slotEl.createEl('div', { cls: 'superposition-layers' });

    day.activeBranches.forEach(timeline => {
      if (timeline.isCollapsed) return;
      if (this.state.veilMode && timeline.color === 'gold') return; // Hide empire in veil mode

      const layer = layersContainer.createEl('div', {
        cls: `timeline-layer timeline-${timeline.color}`,
      });
      layer.style.opacity = timeline.opacity.toString();

      const input = layer.createEl('textarea', {
        placeholder: `${timeline.name}...`,
        cls: 'layer-input'
      });
      input.value = slot.content || '';
      input.addEventListener('input', (e) => {
        slot.content = (e.target as HTMLTextAreaElement).value;
      });

      // Glitter trail animation if collapsing
      if (timeline.glitterTrail) {
        layer.addClass('glitter-fade');
      }
    });
  }

  private performClench(day: QuantumDay): void {
    // User chooses which timeline to collapse to
    const choices = day.activeBranches
      .filter(t => !t.isCollapsed)
      .map(t => t.name);

    // For now, default to primary
    const primaryTimeline = day.activeBranches.find(t => t.isPrimary);
    if (!primaryTimeline) return;

    const clenchEvent = this.engine.clench(day, primaryTimeline.id, day.activeBranches);
    this.state.clenchHistory.push(clenchEvent);

    // Trigger haptic feedback (browser vibration API)
    if (navigator.vibrate) {
      navigator.vibrate(200); // 200ms vibration
    }

    new Notice(`✨ Timeline clenched to: ${primaryTimeline.name}`);
    this.refresh();
  }

  private showThirdOptionDialog(): void {
    const modal = this.createModal();
    modal.titleEl.textContent = '⚡ Third Option Generator';

    const content = modal.contentEl;
    content.createEl('p', { text: 'Enter the binary choice you face:' });

    const optionA = content.createEl('input', {
      type: 'text',
      placeholder: 'Option A (e.g., Accept Kurt\'s hook)',
      cls: 'third-option-input'
    });

    const optionB = content.createEl('input', {
      type: 'text',
      placeholder: 'Option B (e.g., Cut cold)',
      cls: 'third-option-input'
    });

    const generateBtn = content.createEl('button', {
      text: 'Generate Sovereign Path',
      cls: 'generate-third-btn'
    });

    const resultContainer = content.createEl('div', { cls: 'third-option-result' });

    generateBtn.addEventListener('click', () => {
      const a = (optionA as HTMLInputElement).value;
      const b = (optionB as HTMLInputElement).value;

      if (!a || !b) {
        new Notice('Enter both options');
        return;
      }

      const thirdOption = this.engine.generateThirdOption(a, b);

      resultContainer.empty();
      resultContainer.createEl('h3', { text: '👑 Your Sovereign Path:' });
      resultContainer.createEl('p', {
        text: thirdOption.thirdPath,
        cls: 'sovereign-path'
      });
      resultContainer.createEl('p', {
        text: `Empire Gain: $${thirdOption.empireGain}`,
        cls: 'empire-gain'
      });
    });

    modal.open();
  }

  private createModal(): any {
    // Simplified modal - in real implementation would use Obsidian Modal class
    const modal = {
      titleEl: document.createElement('h2'),
      contentEl: document.createElement('div'),
      open: () => {
        const overlay = document.body.createDiv({ cls: 'modal-overlay' });
        const modalEl = overlay.createDiv({ cls: 'quantum-modal' });
        modalEl.appendChild(modal.titleEl);
        modalEl.appendChild(modal.contentEl);

        const closeBtn = modalEl.createEl('button', { text: '✕', cls: 'modal-close' });
        closeBtn.addEventListener('click', () => overlay.remove());
      }
    };
    return modal;
  }

  private refresh(): void {
    this.onOpen();
  }

  async onClose(): Promise<void> {
    // Cleanup
  }
}
