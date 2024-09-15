// src/pages/AboutPage.tsx

import React from 'react';
import TeamMemberCard from '@/components/TeamMembers/TeamMemberCard';

const teamMembers = [
    {
      name: 'John Doe',
      role: 'Teacher of G5G', // Role appears under the name on hover
      image: 'https://picsum.photos/300/400',
      quote: 'Passionate about building innovative solutions.',
    },
    {
      name: 'Jane Smith',
      role: 'Student of G5G', // Another role example
      image: 'https://via.placeholder.com/300x400',
      quote: 'Design is not just what it looks like and feels like.',
    },
    // Add more team members as needed
  ];

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      {/* ... existing content ... */}

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Meet the Team</h2>
        <div className="flex flex-wrap justify-center">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* ... existing content ... */}
    </div>
  );
};

export default AboutPage;
