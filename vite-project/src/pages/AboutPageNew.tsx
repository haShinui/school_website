'use client'
import { useState } from 'react';
//import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import SwapText from "@/components/animata/text/swap-text";
import TeamMemberCard from "@/components/MyCards/TeamMemberCard";
import StaggeredLetter from "@/components/animata/text/staggered-letter";
import apiMethods from '@/services/apiService'; // Import your API service for sending emails

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
    image: "https://plus.unsplash.com/premium_photo-1661942126259-fb08e7cce1e2?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Design is not just what it looks like and feels like.",
  },
  {
    name: "Alice Johnson",
    role: "Assistant Teacher",
    image: "https://plus.unsplash.com/premium_photo-1683121771856-3c3964975777?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    quote:
      "I love helping students realize their potential. afsdafsd fadsaf fsdafsd afdsafas afdsadf asdfasdfas fsdfasdfasdfas asdff",
  },
  {
    name: "Michael Brownsonfasf",
    role: "Workshop Instructor",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
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

export function AboutPageNew() {
  const [emailStatus, setEmailStatus] = useState<string | null>(null); // State to handle email sending status

  const handleSendCourseSignupEmail = async () => {
    try {
      const response = await apiMethods.sendCourseSignupEmail();
      setEmailStatus(response.message); // Display the response message
    } catch (error) {
      console.error('Error sending course signup email:', error);
      setEmailStatus('Failed to send email');
    }
  };
  const quotes = [
    "Innovation is seeing what everybody has seen and thinking what nobody has thought.",
    "The best way to predict the future is to create it.",
    "Creativity is intelligence having fun."
  ];

  const coreValues = ["Innovation", "Collaboration", "Hands-on Learning", "Creativity", "Safety"];

  const faqItems = [
    { question: "Who can use the makerspace?", answer: "Our makerspace is open to all students, faculty, and staff of our school. We also offer special community events throughout the year." },
    { question: "What kind of equipment do you have?", answer: "We have a wide range of equipment including 3D printers, laser cutters, CNC machines, electronics workstations, and traditional hand tools." },
    { question: "Do I need prior experience to use the makerspace?", answer: "No prior experience is necessary! We offer training sessions for all of our equipment and staff are always available to help." },
    { question: "How can I get involved?", answer: "You can sign up for workshops, propose a project, or apply to become a student mentor. Check our events calendar or speak with a staff member to learn more." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-primary/10 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center">
            <h1 className="text-5xl font-bold">What is a&nbsp;</h1>
            <StaggeredLetter
              text="Makerspace?"
              delay={0.1}
              initialDelay={0.7}
              direction="drop"
              className="inline-block mb-4 text-emerald-400 dark:text-emerald-300"
            />
          </div>
          <p className="text-lg mb-4">
            Our makerspace is a hub for creativity, innovation, and hands-on learning (make this cycle text animations ).
          </p>
          <p className="text-lg">
            Whether you're interested in robotics, 3D printing, electronics, or traditional crafts, our makerspace offers a supportive environment to explore, learn, and create.
          </p>
        </div>
      </section>

      {/* Team Section with SwapText and Hover Cards */}
      <section className="py-6 px-4 bg-secondary/10">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-3 pt-9">
            <SwapText
              initialText="Our Team"
              finalText="Bringing Your Ideas to Reality"
              supportsHover={true}
              textClassName="text-xl md:text-5xl lg:text-6xl font-bold"
              initialTextClassName="text-foreground"
              finalTextClassName="text-emerald-400 dark:text-emerald-300"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="w-36 sm:w-44 md:w-48 lg:w-56 xl:w-64 2xl:w-72">
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Empowering Creativity</h2>
          <p className="text-lg text-muted-foreground text-center italic">
            "Empowering students with the tools, skills, and mindset to turn their ideas into reality through hands-on learning experiences."
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Core Values</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-background rounded-full px-6 py-2 text-primary font-semibold"
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities and Equipment */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-6">Explore Our Facilities</h2>
          <p className="text-lg mb-4">
            Our state-of-the-art makerspace is equipped with a wide range of tools and technologies to support various projects and learning experiences:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>3D printers for rapid prototyping</li>
            <li>Laser cutters for precise material cutting and engraving</li>
            <li>CNC machines for computer-controlled cutting and carving</li>
            <li>Electronics workstations with soldering equipment and components</li>
            <li>Woodworking tools for traditional craftsmanship</li>
            <li>Sewing machines and textile equipment for fabric projects</li>
            <li>Virtual reality setup for immersive design experiences</li>
          </ul>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-16 px-4 bg-primary/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-10">Inspirational Quotes</h2>
          <div className="space-y-6">
            {quotes.map((quote, index) => (
              <blockquote key={index} className="text-xl italic text-center">
                "{quote}"
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-secondary/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Makerspace Team</h2>
          <p className="text-lg mb-8">
            Are you passionate about making, innovation, and education? We're always looking for enthusiastic individuals to join our team and help inspire the next generation of makers and innovators.
          </p>
          <Button variant="secondary">
            Join Us
          </Button>
        </div>
      </section>

      {/* Contact Information and Social Media */}
      <section className="py-16 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-10">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="mr-2" size={20} />
                  <a href="mailto:info@schoolmakerspace.edu" className="hover:underline">
                    info@schoolmakerspace.edu
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2" size={20} />
                  <a href="tel:+1234567890" className="hover:underline">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center">
                  <MapPin className="mr-2" size={20} />
                  <span>123 Maker Street, Innovation City, ST 12345</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary">
                  <Facebook size={24} />
                </a>
                <a href="#" className="hover:text-primary">
                  <Twitter size={24} />
                </a>
                <a href="#" className="hover:text-primary">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Email Button */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Send Us an Email</h2>
          <button onClick={handleSendCourseSignupEmail} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send Email
          </button>

          {/* Display the email status message */}
          {emailStatus && <p className="mt-4 text-lg">{emailStatus}</p>}
        </div>
      </section>
    </div>
  );
}