import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuantumEngine } from '../quantum-engine';
import { ThirdOptionRule } from '../types';

interface ThirdOptionModalProps {
  onClose: () => void;
  engine: QuantumEngine;
  onEmpireGain: (amount: number) => void;
}

export function ThirdOptionModal({ onClose, engine, onEmpireGain }: ThirdOptionModalProps) {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [result, setResult] = useState<ThirdOptionRule | null>(null);

  const handleGenerate = () => {
    if (!optionA || !optionB) return;

    const thirdOption = engine.generateThirdOption(optionA, optionB);
    setResult(thirdOption);
    onEmpireGain(thirdOption.empireGain);

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(200);
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
        className="quantum-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2>⚡ Third Option Generator</h2>
        <p className="modal-subtitle">Enter the binary choice you face:</p>

        <input
          type="text"
          className="third-option-input"
          placeholder="Option A (e.g., Accept Kurt's hook)"
          value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
        />

        <input
          type="text"
          className="third-option-input"
          placeholder="Option B (e.g., Cut cold)"
          value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
        />

        <motion.button
          className="generate-third-btn"
          onClick={handleGenerate}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Generate Sovereign Path
        </motion.button>

        {result && (
          <motion.div
            className="third-option-result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>👑 Your Sovereign Path:</h3>
            <p className="sovereign-path">{result.thirdPath}</p>
            <p className="empire-gain">Empire Gain: ${result.empireGain}</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
