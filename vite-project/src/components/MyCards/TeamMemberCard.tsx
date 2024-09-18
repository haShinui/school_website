import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  quote: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const MotionCard = motion(Card);

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const [isTapped, setIsTapped] = useState(false); // Track the tap/click state for mobile

  const handleTap = () => {
    setIsTapped(!isTapped); // Toggle the animation on tap
  };

  return (
    <MotionCard
      className="relative w-full aspect-[1/1.75] overflow-hidden rounded-lg shadow-lg"
      whileHover={!isTapped ? "hover" : "rest"} // Only trigger hover animation if not tapped
      initial="rest"
      animate={isTapped ? "hover" : "rest"} // Animate to hover state on tap
      exit="rest"
      onTap={handleTap} // Handle touch/click interaction for mobile
    >
      {/* Background Image */}
      <motion.img
        src={member.image}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover"
        variants={{
          rest: { filter: 'blur(0px)' },
          hover: { filter: 'blur(4px)' },
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Overlay for Darkening the Image */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-40"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Rest state text - Name at Bottom-Left */}
      <motion.div
        className="absolute left-4 bottom-4"
        variants={{
          rest: { opacity: 1, bottom: '3%', left: '7%' }, // Bottom-left at rest
          hover: { opacity: 0, top: '3%', left: '7%' }, // Fade out on hover
        }}
        transition={{ duration: 0.35 }}
      >
        <h3 className="text-white font-semibold text-xs sm:text-base md:text-lg lg:text-xl">
          {member.name}
        </h3>
      </motion.div>

      {/* Hover state text - Name at Top-Left */}
      <motion.div
        className="absolute left-4 bottom-4"
        variants={{
          rest: { opacity: 0, bottom: '0rem', left: '7%', scale: 1 }, // Hidden on rest
          hover: { opacity: 1, top: '3%', left: '7%', scale: 1 }, // Moves to top-left on hover
        }}
        transition={{ duration: 0.35 }}
      >
        <h3 className="text-white font-semibold text-sm sm:text-xl md:text-2xl lg:text-3xl">
          {member.name}
        </h3>
        {/* Role (Only appears on hover) */}
        <motion.p
          className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg"
          variants={{
            rest: { opacity: 0 }, // Role is hidden in rest state
            hover: { opacity: 1 }, // Role appears in hover state
          }}
          transition={{ duration: 0.35 }}
        >
          {member.role}
        </motion.p>
      </motion.div>

      {/* Quote */}
      <motion.div
        className="absolute bottom-0 left-0 w-full px-4"
        variants={{
          rest: { opacity: 0, y: 20 },
          hover: { opacity: 1, y: -20 },
        }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg text-center">
          {member.quote}
        </p>
      </motion.div>
    </MotionCard>
  );
};

export default TeamMemberCard;
