import React from "react";
import TeamMemberCard from "@/components/MyCards/TeamMemberCard";
import HoverCard from "@/components/MyCards/HoverCard"; // Adjust the path as needed

const teamMembers = [
  {
    name: "John Doe",
    role: "Teacher of G5G",
    image: "https://picsum.photos/id/1005/600/800",
    quote: "Passionate about building innovative solutions.",
  },
  {
    name: "Jane Smith",
    role: "Student of G5G",
    image: "https://picsum.photos/id/1011/600/800",
    quote: "Design is not just what it looks like and feels like.",
  },
  {
    name: "Alice Johnson",
    role: "Assistant Teacher",
    image: "https://picsum.photos/id/1012/600/800",
    quote:
      "I love helping students realize their potential. afsdafsd fadsaf fsdafsd afdsafas afdsadf asdfasdfas fsdfasdfasdfas asdff",
  },
  {
    name: "Michael Brownsonfasf",
    role: "Workshop Instructor",
    image: "https://picsum.photos/id/1013/600/800",
    quote: "Teaching hands-on skills is my passion.",
  },
  {
    name: "Emily Davis",
    role: "Senior Student",
    image: "https://picsum.photos/id/1014/600/800",
    quote: "Makerspace has changed the way I learn.",
  },
];


const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-8 text-foreground">
      <h1 className="text-4xl font-bold text-center mb-8">Our Team</h1>

      {/* Flexbox to manage the layout */}
      <div className="flex flex-wrap justify-center gap-4">
        {teamMembers.map((member) => (
          <div key={member.name} className="w-36 sm:w-44 md:w-48 lg:w-56 xl:w-64">
            <TeamMemberCard member={member} />
          </div>
        ))}
      </div>

      {/* Hover card section */}
      <div className="flex justify-center items-center h-screen">
        <HoverCard
          title="Something awesome"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fuga placeat odio pariatur doloribus sint?"
          image="https://picsum.photos/600/800"  // Placeholder image with 4:3 ratio
        />
      </div>
    </div>
  );
};

export default AboutPage;
