import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  image: string;
}

// Green beam animation based on title width
const beamVariants = {
  initial: {
    width: 0, // Initially hidden
  },
  animate: (titleWidth: number) => ({
    width: `${titleWidth}px`, // Expand to match the title's width
    transition: { duration: 0.4, ease: "easeInOut" }, // Smooth slide-in
  }),
  exit: {
    width: 0, // Shrink back to 0 on exit
    transition: { delay: 0.6, duration: 0.4, ease: "easeInOut" }, // Delay before shrinking
  },
};

// Title and green line container movement
const containerVariants = {
  initial: { bottom: '3%' }, // Start at the bottom
  animate: {
    bottom: '40%', // Move up when hovered
    transition: {
      delay: 0.4, // Wait for green line animation to finish
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    bottom: '3%', // Move back to original position on hover exit
    transition: { delay: 0.5, duration: 0.4, ease: "easeInOut" }, // Add a delay before moving down
  },
};

// Quote text animation
const textVariants = {
  initial: { opacity: 0, bottom: '1%'}, // Hidden below
  animate: {
    opacity: 1,
    bottom: '19%',
    transition: { delay: 0.8, duration: 0.4, ease: "easeInOut" }, // Delay for smooth appearance
  },
  exit: {
    opacity: 0,
    bottom: '1%', // Fade out and move down on hover exit
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const HoverCard: React.FC<CardProps> = ({ title, description, image }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleWidth, setTitleWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Set the width of the title for the green line
  useEffect(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.offsetWidth);
    }
  }, [title]);

  return (
    <motion.div
      className="relative w-full max-w-xs aspect-[3/4] rounded-lg overflow-hidden shadow-lg"
      initial="initial"
      animate={isHovered ? "animate" : "initial"}
      exit="exit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image */}
      <img className="absolute inset-0 w-full h-full object-cover" src={image} alt={title} />

      {/* Title and Green Line (Positioned at the bottom initially) */}
      <motion.div
        className="absolute bottom-4 left-4 text-white w-fit"
        variants={containerVariants}
        initial="initial"
        animate={isHovered ? "animate" : "initial"}
        exit="exit"
      >
        {/* Title */}
        <motion.div ref={titleRef} className="text-3xl font-bold">
          {title}
        </motion.div>

        {/* Green Line below the title */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="line"
              className="h-1 bg-green-500 mt-1"
              variants={beamVariants}
              custom={titleWidth} // Pass the title width to the animation
              initial="initial"
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* AnimatePresence for showing/hiding the description on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="text"
            className="absolute bottom-10 left-4 text-white"
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <p className="text-lg">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HoverCard;
