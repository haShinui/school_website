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
      className="relative w-full sm:w-60 md:w-64 lg:w-72 h-96 overflow-hidden rounded-lg shadow-lg m-4"
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
          rest: { left: '50%', bottom: '1rem', transform: 'translateX(-50%)', fontSize: '1.25rem' }, // Centered at the bottom
          hover: { left: '1rem', top: '0.5rem', bottom: 'auto', transform: 'none', fontSize: '1.75rem' }, // Moves to top-left on hover
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Name Text */}
        <h3 className="relative text-white font-semibold">{member.name}</h3>

        {/* Role (appears under the name on hover) */}
        <motion.p
          className="text-gray-400 text-sm absolute left-0 w-full"
          variants={{
            rest: { opacity: 0, y: 20 }, // Hidden in rest state, positioned below the name
            hover: { opacity: 1, y: 0 }, // Appears slightly below the name on hover
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
        <p className="text-white text-lg text-center">{member.quote}</p>
      </motion.div>
    </MotionCard>
  );
};

export default TeamMemberCard;
