import { motion } from 'framer-motion';

interface WindfallAnimationProps {
  amount: number;
}

export function WindfallAnimation({ amount }: WindfallAnimationProps) {
  return (
    <motion.div
      className="windfall-container"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="windfall-content">
        <motion.div
          className="windfall-text"
          animate={{
            textShadow: [
              '0 0 20px #ff69b4',
              '0 0 40px #ff69b4, 0 0 60px #ffd700',
              '0 0 20px #ff69b4'
            ]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          💰 +${amount} 💎
        </motion.div>

        {/* Glitter Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="glitter-particle"
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1
            }}
            animate={{
              x: (Math.random() - 0.5) * 400,
              y: (Math.random() - 0.5) * 400,
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.02,
              ease: 'easeOut'
            }}
            style={{
              left: '50%',
              top: '50%',
              position: 'absolute',
              width: '6px',
              height: '6px',
              background: i % 2 === 0 ? '#ffd700' : '#ff69b4',
              borderRadius: '50%'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
