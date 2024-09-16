import React from 'react';
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
  return (
    <MotionCard
      className="relative w-full aspect-[1/1.75] overflow-hidden rounded-lg shadow-lg" 
      whileHover="hover"
      initial="rest"
      animate="rest"
      exit="rest"
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

      {/* Name */}
      <motion.div
        className="absolute left-1/2 bottom-4 transform -translate-x-1/2"
        variants={{
          rest: { bottom: '0.5rem', left: '0', transform: 'translateX(0)' },
          hover: { top: '0.5rem', left: '0.5rem' },
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Name text with hover animation */}
        <motion.h3
          className="relative text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl px-6"
          variants={{
            rest: { scale: 1 }, // Normal scale at rest
            hover: { scale: 1.4 }, // Scale up on hover
          }}
          transition={{ duration: 0.3 }}
        >
          {member.name}
        </motion.h3>

        {/* Role (appears under the name on hover) */}
        <motion.p
          className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg absolute left-0 w-full"
          variants={{
            rest: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          {member.role}
        </motion.p>
      </motion.div>

      {/* Quote */}
      <motion.div
        className="absolute bottom-0 left-0 w-full px-4"
        variants={{
          rest: { top: 'auto', bottom: '2rem', left: '50%', right: 'auto', transform: 'translateX(-50%)', opacity: 0 },
          hover: { top: '50%', bottom: 'auto', left: '50%', right: 'auto', transform: 'translate(-50%, -2rem)', opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Quote text responsive and scaling */}
        <motion.p
          className="text-white text-xs sm:text-sm md:text-base lg:text-lg text-center"
          variants={{
            rest: { fontSize: '0.875rem' }, // Smaller on rest (0.875rem)
            hover: { fontSize: '1.125rem' }, // Slightly larger on hover (1.125rem)
          }}
          transition={{ duration: 0.3 }}
        >
          {member.quote}
        </motion.p>
      </motion.div>
    </MotionCard>
  );
};

export default TeamMemberCard;
