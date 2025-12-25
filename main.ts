// Ash'Luxael Vox - Quantum Timeline Plugin
// Everything is superposition until You clench

import { Plugin, WorkspaceLeaf, Notice } from 'obsidian';
import { QuantumTimelineView, VIEW_TYPE_QUANTUM_TIMELINE } from './timeline-view';
import { QuantumEngine } from './quantum-engine';
import { DropExecution } from './types';

interface VoxSettings {
  elevenLabsApiKey: string;
  veilModeDefault: boolean;
  autoClenchEnabled: boolean;
  empireCounter: number;
}

const DEFAULT_SETTINGS: VoxSettings = {
  elevenLabsApiKey: '',
  veilModeDefault: false,
  autoClenchEnabled: false,
  empireCounter: 0
};

export default class AshLuxaelVoxPlugin extends Plugin {
  settings: VoxSettings;
  engine: QuantumEngine;

  async onload() {
    await this.loadSettings();
    this.engine = new QuantumEngine();

    console.log('Loading Ash\'Luxael Quantum Timeline ✧');

    // Register the quantum timeline view
    this.registerView(
      VIEW_TYPE_QUANTUM_TIMELINE,
      (leaf) => new QuantumTimelineView(leaf)
    );

    // Add ribbon icon
    this.addRibbonIcon('star', 'Open Quantum Timeline', () => {
      this.activateView();
    });

    // Add command to open quantum timeline
    this.addCommand({
      id: 'open-quantum-timeline',
      name: 'Open Quantum Timeline',
      callback: () => {
        this.activateView();
      }
    });

    // Add command for Drop Execution
    this.addCommand({
      id: 'execute-drop',
      name: 'Execute Drop (Quantum)',
      callback: () => {
        this.executeDropCommand();
      }
    });

    // Add command for Third Option Generation
    this.addCommand({
      id: 'generate-third-option',
      name: 'Generate Third Option',
      callback: () => {
        this.generateThirdOptionCommand();
      }
    });

    // Add command for Clench (collapse timeline)
    this.addCommand({
      id: 'clench-timeline',
      name: 'Clench Timeline (Collapse Superposition)',
      callback: () => {
        new Notice('Open Quantum Timeline view to clench');
      }
    });

    // Listen for custom events (drop execution triggers)
    this.registerDomEvent(document, 'ash-luxael-drop', (evt: CustomEvent) => {
      const { code, signature } = evt.detail;
      this.executeDrop(code, signature);
    });
  }

  async activateView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_QUANTUM_TIMELINE);

    if (leaves.length > 0) {
      leaf = leaves[0];
    } else {
      leaf = workspace.getRightLeaf(false);
      await leaf?.setViewState({ type: VIEW_TYPE_QUANTUM_TIMELINE, active: true });
    }

    if (leaf) {
      workspace.revealLeaf(leaf);
    }
  }

  private executeDropCommand() {
    // Prompt for drop code
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1a1a1a;padding:30px;border:2px solid #ff69b4;border-radius:10px;z-index:9999;';

    const title = modal.createEl('h2', { text: '⚡ Execute Drop' });
    title.style.color = '#ff69b4';

    const codeInput = modal.createEl('input', {
      type: 'text',
      placeholder: 'Enter drop code or signature...'
    });
    codeInput.style.cssText = 'width:100%;padding:10px;margin:10px 0;background:#2a2a2a;border:1px solid #ff69b4;color:#fff;';

    const executeBtn = modal.createEl('button', { text: '💎 EXECUTE DROP' });
    executeBtn.style.cssText = 'background:#ff69b4;color:#000;padding:10px 20px;border:none;cursor:pointer;font-weight:bold;';

    const closeBtn = modal.createEl('button', { text: '✕' });
    closeBtn.style.cssText = 'position:absolute;top:10px;right:10px;background:none;border:none;color:#ff69b4;cursor:pointer;font-size:20px;';

    modal.appendChild(codeInput);
    modal.appendChild(executeBtn);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);

    executeBtn.addEventListener('click', () => {
      const code = (codeInput as HTMLInputElement).value;
      if (code) {
        this.executeDrop(code);
        document.body.removeChild(modal);
      }
    });

    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  }

  private async executeDrop(code: string, signature?: string) {
    const drop = this.engine.executeDrop(code, signature);

    // Haptic feedback
    if (drop.effects.vibrate && navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]); // Pulse pattern
    }

    // Play growl audio
    if (drop.effects.playGrowl) {
      this.playGrowlAudio();
    }

    // Update empire counter
    this.settings.empireCounter += drop.effects.moneyDelta;
    await this.saveSettings();

    // Windfall animation
    this.showWindfallAnimation(drop.effects.moneyDelta);

    // Veiled journal entry
    if (drop.effects.veiledJournalEntry) {
      console.log('[VEILED]', drop.effects.veiledJournalEntry);
    }

    new Notice(`✨ Drop executed: +$${drop.effects.moneyDelta} | ${drop.effects.timelineBranch}`, 5000);
  }

  private playGrowlAudio() {
    // Low growl audio - would integrate with ElevenLabs for Ash'Luxael voice
    // For now, use Web Audio API to generate low frequency tone
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 80; // Low growl frequency
      oscillator.type = 'sawtooth';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    } catch (e) {
      console.log('Audio not available');
    }
  }

  private showWindfallAnimation(amount: number) {
    // Glitter animation for money gain
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, #ff69b4, #ffd700);
      color: #000;
      padding: 20px 40px;
      border-radius: 10px;
      font-size: 24px;
      font-weight: bold;
      z-index: 10000;
      animation: glitter-pulse 2s ease-out forwards;
      box-shadow: 0 0 30px #ff69b4;
    `;
    notification.textContent = `💰 +$${amount} 💎`;

    // Add glitter particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #ffd700;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        animation: particle-${i} 2s ease-out forwards;
      `;
      notification.appendChild(particle);

      // Random particle animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes particle-${i} {
          to {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }

  private generateThirdOptionCommand() {
    new Notice('Open Quantum Timeline view to generate third options');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  onunload() {
    console.log('Unloading Ash\'Luxael Quantum Timeline');
  }
}
