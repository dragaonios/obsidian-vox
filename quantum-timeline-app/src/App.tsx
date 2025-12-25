import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuantumStore } from './store';
import { QuantumEngine } from './quantum-engine';
import { DayCard } from './components/DayCard';
import { ThirdOptionModal } from './components/ThirdOptionModal';
import { DropExecutionModal } from './components/DropExecutionModal';
import { WindfallAnimation } from './components/WindfallAnimation';
import './App.css';

const engine = new QuantumEngine();

function App() {
  const {
    currentWeek,
    veilMode,
    alreadyDoneMode,
    empireCounter,
    initializeWeek,
    toggleVeilMode,
    toggleAlreadyDoneMode
  } = useQuantumStore();

  const [showThirdOption, setShowThirdOption] = useState(false);
  const [showDropExecution, setShowDropExecution] = useState(false);
  const [windfall, setWindfall] = useState<number | null>(null);

  useEffect(() => {
    if (!currentWeek) {
      initializeWeek();
    }
  }, [currentWeek, initializeWeek]);

  const handleWindfall = (amount: number) => {
    setWindfall(amount);
    setTimeout(() => setWindfall(null), 2000);
  };

  if (!currentWeek) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          ✧
        </motion.div>
        <p>Initializing quantum superposition...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Lace Pattern Overlay */}
      <div className="lace-overlay" />

      {/* Header */}
      <motion.header
        className="quantum-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="main-title">✧ ASH'LUXAEL QUANTUM TIMELINE ✧</h1>
        <p className="subtitle">Everything is superposition until You clench.</p>

        {/* Empire Counter */}
        <motion.div
          className="empire-counter"
          whileHover={{ scale: 1.05 }}
        >
          <span className="counter-label">Empire:</span>
          <span className="counter-value">${empireCounter.toLocaleString()}</span>
        </motion.div>
      </motion.header>

      {/* Controls */}
      <div className="quantum-controls">
        <motion.button
          className={`control-btn veil-btn ${veilMode ? 'active' : ''}`}
          onClick={toggleVeilMode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {veilMode ? '🌑 Veil Active' : '👁️ Veil Inactive'}
        </motion.button>

        <motion.button
          className={`control-btn done-btn ${alreadyDoneMode ? 'active' : ''}`}
          onClick={toggleAlreadyDoneMode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {alreadyDoneMode ? '✓ Already Done' : '◯ Normal Mode'}
        </motion.button>

        <motion.button
          className="control-btn third-option-btn"
          onClick={() => setShowThirdOption(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ⚡ Third Option
        </motion.button>

        <motion.button
          className="control-btn drop-btn"
          onClick={() => setShowDropExecution(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💎 Execute Drop
        </motion.button>
      </div>

      {/* Sacred 7-Day Grid */}
      <div className="sacred-grid">
        {currentWeek.days.map((day, index) => (
          <DayCard
            key={day.dayNumber}
            day={day}
            dayIndex={index}
            veilMode={veilMode}
          />
        ))}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showThirdOption && (
          <ThirdOptionModal
            onClose={() => setShowThirdOption(false)}
            engine={engine}
            onEmpireGain={handleWindfall}
          />
        )}

        {showDropExecution && (
          <DropExecutionModal
            onClose={() => setShowDropExecution(false)}
            onDropExecuted={handleWindfall}
          />
        )}

        {windfall !== null && (
          <WindfallAnimation amount={windfall} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="app-footer">
        <p>👑 You don't follow timelines. You clench them into existence. 👑</p>
        <p className="signature">🔒 LUXAEL-ETERNAL-LOCK 🕸️ × ∞ 🖤</p>
      </footer>
    </div>
  );
}

export default App;
