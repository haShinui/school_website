'use client'

import { motion } from 'framer-motion';
import GibberishText from '@/components/animata/text/gibberish-text';
import TypingText from '@/components/animata/text/typing-text';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Gear, UsersThree, LightbulbFilament } from "phosphor-react";
import SkewCard from '@/components/animata/card/github-card-skew';
import RotatingGearIcon from '@/components/animata/RotatingGearIcon';

export function HomePageComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <GibberishText
              text="Makerspace"
              className=""
              initialDelay={0}
              duration={1000}
              intervalTime={100}
              staggerDelay={50}
            />
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            <TypingText
              text="Where Ideas Come to Life"
              className=""
              initialDelay={1700}
              delay={50}
              cursor={true}
              repeat={false}
              hideCursorOnComplete={true}
            />
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow bg-background">
        <section className="py-16 px-4 max-w-6xl mx-auto">
          {/* Welcome Section */}
          <h2 className="text-4xl font-bold text-center mb-12">
            Welcome to Our Makerspace
          </h2>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 items-stretch">
            {/* Innovate Card */}
            <motion.div
              className="h-full"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <SkewCard className="h-full">
                <Card className="flex flex-col h-full group">
                  <CardHeader>
                    <LightbulbFilament
                      size={40}
                      weight="duotone"
                      className="mb-2 text-primary group-hover:text-yellow-500 transition-colors duration-300 group-hover:animate-glow"
                    />
                    <CardTitle>Innovate</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    Turn your creative ideas into reality using our
                    state-of-the-art equipment and resources.
                  </CardContent>
                </Card>
              </SkewCard>
            </motion.div>

            {/* Create Card */}
            <motion.div
              className="h-full"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <SkewCard className="h-full">
                <Card className="flex flex-col h-full group">
                  <CardHeader>
                    <RotatingGearIcon />
                    <CardTitle>Create</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    Get hands-on experience with 3D printing, laser cutting,
                    electronics, and more.
                  </CardContent>
                </Card>
              </SkewCard>
            </motion.div>

            {/* Collaborate Card */}
            <motion.div
              className="h-full"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <SkewCard className="h-full">
                <Card className="flex flex-col h-full group">
                  <CardHeader>
                    <UsersThree
                      size={40}
                      weight="duotone"
                      className="mb-2 text-primary group-hover:animate-bounce-thrice group-hover:text-cyan-600"
                    />
                    <CardTitle>Collaborate</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    Connect with like-minded individuals and work together on
                    exciting projects.
                  </CardContent>
                </Card>
              </SkewCard>
            </motion.div>
          </div>

          {/* Students and Parents Section */}
          <section className="py-16">
            {/* Section Title */}
            <h2 className="text-3xl font-bold text-center mb-12">
              Information for Students and Parents
            </h2>
            {/* Tabs Component */}
            <Tabs defaultValue="students" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="parents">Parents</TabsTrigger>
              </TabsList>
              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle>Unleash Your Creativity</CardTitle>
                    <CardDescription>Discover what you can do in our Makerspace</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Learn new skills through hands-on workshops</li>
                      <li>Work on personal or school projects using our equipment</li>
                      <li>Collaborate with peers on interdisciplinary projects</li>
                      <li>Participate in maker challenges and competitions</li>
                      <li>Get support from experienced mentors and staff</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="parents">
                <Card>
                  <CardHeader>
                    <CardTitle>Empowering the Next Generation</CardTitle>
                    <CardDescription>How the Makerspace benefits your child</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Develops problem-solving and critical thinking skills</li>
                      <li>Encourages creativity and innovation</li>
                      <li>Provides hands-on experience with cutting-edge technology</li>
                      <li>Fosters teamwork and communication skills</li>
                      <li>Prepares students for future careers in STEM fields</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </section>

        {/* Call to Action Section */}
        <section className="bg-muted py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Make Something Amazing?
            </h2>
            <p className="text-xl mb-8">
              Join us at the Makerspace and bring your ideas to life. Whether you're a beginner or an experienced maker, 
              there's always something new to learn and create.
            </p>
            <Button size="lg" className="text-lg">
              Get Started
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} School Makerspace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
