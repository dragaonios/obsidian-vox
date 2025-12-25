import { motion } from 'framer-motion';
import { QuantumTimeline, TimelineSlot } from '../types';
import { useQuantumStore } from '../store';

interface TimelineLayerProps {
  timeline: QuantumTimeline;
  slot: TimelineSlot;
  dayIndex: number;
  slotType: string;
  zIndex: number;
}

export function TimelineLayer({ timeline, slot, dayIndex, slotType, zIndex }: TimelineLayerProps) {
  const { updateSlotContent } = useQuantumStore();

  const colorMap = {
    pink: '#ff69b4',
    black: '#333',
    gold: '#ffd700',
    violet: '#9400d3'
  };

  return (
    <motion.div
      className={`timeline-layer timeline-${timeline.color}`}
      style={{
        opacity: timeline.opacity,
        zIndex,
        borderColor: colorMap[timeline.color]
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: timeline.glitterTrail ? 0 : timeline.opacity,
        scale: timeline.glitterTrail ? 1.1 : 1
      }}
      transition={{ duration: 0.5 }}
    >
      <textarea
        className="layer-input"
        placeholder={`${timeline.name}...`}
        value={slot.content}
        onChange={(e) => updateSlotContent(dayIndex, slotType, e.target.value)}
        style={{
          borderColor: colorMap[timeline.color],
          color: colorMap[timeline.color]
        }}
      />

      {timeline.glitterTrail && (
        <motion.div
          className="glitter-particles"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      )}
    </motion.div>
  );
}
