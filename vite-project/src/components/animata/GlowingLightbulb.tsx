// GlowingLightbulb.tsx

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { LightbulbFilament } from 'phosphor-react';

function GlowingLightbulb() {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Initial state: white icon
      await controls.start({ opacity: 1, scale: 1, color: '#FFFFFF', transition: { duration: 0 } });
      // Transition to yellow color
      await controls.start({ color: '#FACC15', transition: { duration: 1 } });
      // Glowing effect using box-shadow
      await controls.start({
        boxShadow: [
          '0 0 0px rgba(250, 204, 21, 0)',       // No glow
          '0 0 10px rgba(250, 222, 11, 0.5)',    // Glow increases
          '0 0 20px rgba(250, 255, 0, 0.7)',    // Maximum glow
          '0 0 10px rgba(250, 222, 11, 0.5)',    // Glow decreases
          '0 0 0px rgba(250, 204, 21, 0)',       // Back to no glow
        ],
        transition: { duration: 2, repeat: Infinity, repeatType: 'mirror' },
      });
    };
    sequence();
  }, [controls]);

  return (
    <motion.div animate={controls} initial={{ opacity: 0, scale: 0.5 }}>
      <LightbulbFilament size={40} weight="duotone" className="mb-2" />
    </motion.div>
  );
}

export default GlowingLightbulb;
