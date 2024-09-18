import React from "react";
import TeamMemberCard from "@/components/MyCards/TeamMemberCard";
import HoverCard from "@/components/MyCards/HoverCard"; // Adjust the path as needed
import SwapText from "@/components/animata/text/swap-text";

const teamMembers = [
  {
    name: "John Doe",
    role: "Teacher of G5G",
    image: "https://plus.unsplash.com/premium_photo-1664300900349-afd61c20f8b8?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  // Additional Team Members
  {
    name: "David Wilson",
    role: "Project Manager",
    image: "https://picsum.photos/id/1027/600/800",
    quote: "Ensuring that all projects run smoothly and efficiently.",
  },
  {
    name: "Sophia Martinez",
    role: "Lead Developer",
    image: "https://picsum.photos/id/1001/600/800",
    quote: "Building scalable and robust applications.",
  },
  {
    name: "Liam Anderson",
    role: "UI/UX Designer",
    image: "https://picsum.photos/id/1025/600/800",
    quote: "Designing intuitive and user-friendly interfaces.",
  },
  {
    name: "Olivia Thompson",
    role: "Content Strategist",
    image: "https://picsum.photos/id/1020/600/800",
    quote: "Creating engaging and relevant content.",
  },
  {
    name: "Noah Harris",
    role: "Marketing Specialist",
    image: "https://picsum.photos/id/1035/600/800",
    quote: "Promoting our projects to reach a wider audience.",
  },
];


const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-8 text-foreground">
      <div className="flex justify-center pt-9">
  {/* Add SwapText within a centered flex container */}
  <div className="flex justify-center">
        <SwapText
          initialText="Our Team"
          finalText="Bringing Your Ideas to Reality" // Change as needed
          supportsHover={true} // Enables hover swapping
          textClassName="text-xl  md:text-5xl lg:text-6xl font-bold" // Controls text size
          initialTextClassName="dark-slate-900 dark:text-white" // Initial text color
          finalTextClassName="text-emerald-400 dark:text-emerald-300 " // Final text color
          // Optionally, disableClick={true} if you don't want click swapping
        />
      </div>

</div>

      {/* Flexbox to manage the layout */}
      <div className="flex flex-wrap justify-center gap-4">
        {teamMembers.map((member) => (
          <div key={member.name} className="w-36 sm:w-44 md:w-48 lg:w-56 xl:w-64 2xl:w-72">
            <TeamMemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
