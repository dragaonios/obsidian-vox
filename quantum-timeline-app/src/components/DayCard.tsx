import { motion } from 'framer-motion';
import { QuantumDay } from '../types';
import { TimelineLayer } from './TimelineLayer';
import { useQuantumStore } from '../store';

interface DayCardProps {
  day: QuantumDay;
  dayIndex: number;
  veilMode: boolean;
}

export function DayCard({ day, dayIndex, veilMode }: DayCardProps) {
  const { performClench } = useQuantumStore();

  const handleClench = () => {
    const primaryTimeline = day.activeBranches.find(t => t.isPrimary);
    if (!primaryTimeline) return;

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }

    performClench(dayIndex, primaryTimeline.id);
  };

  const visibleTimelines = veilMode
    ? day.activeBranches.filter(t => t.color !== 'gold')
    : day.activeBranches;

  return (
    <motion.div
      className="day-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: dayIndex * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Glitter Effect */}
      <div className="glitter-effect" />

      {/* Day Header */}
      <div className="day-header">
        <h3 className="day-number">Day {day.dayNumber}</h3>
        <span className="day-name">{day.dayName}</span>
      </div>

      {/* Timeline Slots */}
      <div className="timeline-slots">
        {/* Main Slot */}
        <div className="timeline-slot slot-main">
          <div className="slot-label">🌸 Main Timeline</div>
          <div className="superposition-layers">
            {visibleTimelines
              .filter(t => !t.isCollapsed)
              .map((timeline, idx) => (
                <TimelineLayer
                  key={timeline.id}
                  timeline={timeline}
                  slot={day.mainSlot}
                  dayIndex={dayIndex}
                  slotType="main"
                  zIndex={visibleTimelines.length - idx}
                />
              ))}
          </div>
        </div>

        {/* Third Option Slot */}
        <div className="timeline-slot slot-third-option">
          <div className="slot-label">🖤 Third Option Gate</div>
          <div className="superposition-layers">
            {visibleTimelines
              .filter(t => !t.isCollapsed)
              .map((timeline, idx) => (
                <TimelineLayer
                  key={timeline.id}
                  timeline={timeline}
                  slot={day.thirdOptionSlot}
                  dayIndex={dayIndex}
                  slotType="third-option"
                  zIndex={visibleTimelines.length - idx}
                />
              ))}
          </div>
        </div>

        {/* Drop Point Slot */}
        <div className="timeline-slot slot-drop-point">
          <div className="slot-label">💰 Drop Point</div>
          <div className="superposition-layers">
            {visibleTimelines
              .filter(t => !t.isCollapsed)
              .map((timeline, idx) => (
                <TimelineLayer
                  key={timeline.id}
                  timeline={timeline}
                  slot={day.dropPointSlot}
                  dayIndex={dayIndex}
                  slotType="drop-point"
                  zIndex={visibleTimelines.length - idx}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Clench Button */}
      <motion.button
        className="clench-button"
        onClick={handleClench}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        👑 CLENCH
      </motion.button>
    </motion.div>
  );
}
