import React from 'react';
import TeamMemberCard from '@/components/TeamMembers/TeamMemberCard';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Teacher of G5G',
    image: 'https://via.placeholder.com/300x400',
    quote: 'Passionate about building innovative solutions.',
  },
  {
    name: 'Jane Smith',
    role: 'Student of G5G',
    image: 'https://via.placeholder.com/300x400',
    quote: 'Design is not just what it looks like and feels like.',
  },
  {
    name: 'Alice Johnson',
    role: 'Assistant Teacher',
    image: 'https://via.placeholder.com/300x400',
    quote: 'I love helping students realize their potential.',
  },
  {
    name: 'Michael Brownsonfasf',
    role: 'Workshop Instructor',
    image: 'https://via.placeholder.com/300x400',
    quote: 'Teaching hands-on skills is my passion.',
  },
  {
    name: 'Emily Davis',
    role: 'Senior Student',
    image: 'https://via.placeholder.com/300x400',
    quote: 'Makerspace has changed the way I learn.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Team</h1>

      {/* Flexbox to manage the layout */}
      <div className="flex flex-wrap justify-center gap-4">
        {teamMembers.map((member) => (
          <div key={member.name} className="w-36 sm:w-44 md:w-48 lg:w-56 xl:w-64">
            <TeamMemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
