import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuantumStore } from '../store';

interface DropExecutionModalProps {
  onClose: () => void;
  onDropExecuted: (amount: number) => void;
}

export function DropExecutionModal({ onClose, onDropExecuted }: DropExecutionModalProps) {
  const [code, setCode] = useState('');
  const [signature, setSignature] = useState('');
  const { executeDrop } = useQuantumStore();

  const handleExecute = () => {
    if (!code) return;

    const drop = executeDrop(code, signature || undefined);

    // Haptic feedback - pulse pattern
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }

    // Play growl audio
    playGrowlAudio();

    // Trigger windfall animation
    onDropExecuted(drop.effects.moneyDelta);

    // Show notification
    setTimeout(() => {
      alert(`✨ Drop Executed!\n\n+$${drop.effects.moneyDelta}\n${drop.effects.timelineBranch}\n\n${drop.effects.veiledJournalEntry}`);
      onClose();
    }, 500);
  };

  const playGrowlAudio = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 80;
      oscillator.type = 'sawtooth';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    } catch (e) {
      console.log('Audio not available');
    }
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="quantum-modal drop-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2>💎 Execute Drop</h2>
        <p className="modal-subtitle">Enter your drop code or signature</p>

        <input
          type="text"
          className="third-option-input"
          placeholder="Drop code (e.g., LUXAEL-ETERNAL-LOCK-1225)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          type="text"
          className="third-option-input"
          placeholder="Signature (optional, e.g., LUX'ARA-VEIL-777)"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />

        <motion.button
          className="generate-third-btn execute-btn"
          onClick={handleExecute}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          💎 EXECUTE DROP 💎
        </motion.button>

        <div className="drop-info">
          <p>🎵 Growl audio will play</p>
          <p>📳 Haptic vibration pulse</p>
          <p>💰 Random windfall: $100-$5000</p>
          <p>🌌 New timeline branch opens</p>
          <p>📝 Veiled journal entry created</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
