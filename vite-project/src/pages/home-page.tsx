import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import GibberishText from '@/components/animata/text/gibberish-text';
import TypingText from '@/components/animata/text/typing-text';
//import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LightbulbFilament, UsersThree } from "phosphor-react";
import SkewCard from '@/components/animata/card/github-card-skew';
import RotatingGearIcon from '@/components/animata/RotatingGearIcon';
import HoverCard from '@/components/MyCards/HoverCard(with ext)';

export function HomePageComponent() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1723600901481-8908d556c66f?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <GibberishText
              text={t('hero.title')}
              className="text-emerald-400"
              initialDelay={0}
              duration={1000}
              intervalTime={100}
              staggerDelay={50}
            />
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            <TypingText
              text={t('hero.subtitle')}
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
          <h2 className="text-4xl font-bold text-center mb-12">{t('welcome.title')}</h2>

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
                    <CardTitle>{t('features.innovate.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {t('features.innovate.description')}
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
                    <CardTitle>{t('features.create.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {t('features.create.description')}
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
                      className="mb-2 text-primary group-hover:animate-bounce-thrice group-hover:text-emerald-400"
                    />
                    <CardTitle>{t('features.collaborate.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {t('features.collaborate.description')}
                  </CardContent>
                </Card>
              </SkewCard>
            </motion.div>
          </div>

          {/* Students and Parents Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-12">{t('info.title')}</h2>
            <Tabs defaultValue="students" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="students">{t('tabs.students')}</TabsTrigger>
                <TabsTrigger value="parents">{t('tabs.parents')}</TabsTrigger>
              </TabsList>
              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('info.students.title')}</CardTitle>
                    <CardDescription>{t('info.students.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>{t('info.students.bullet1')}</li>
                      <li>{t('info.students.bullet2')}</li>
                      <li>{t('info.students.bullet3')}</li>
                      <li>{t('info.students.bullet4')}</li>
                      <li>{t('info.students.bullet5')}</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="parents">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('info.parents.title')}</CardTitle>
                    <CardDescription>{t('info.parents.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>{t('info.parents.bullet1')}</li>
                      <li>{t('info.parents.bullet2')}</li>
                      <li>{t('info.parents.bullet3')}</li>
                      <li>{t('info.parents.bullet4')}</li>
                      <li>{t('info.parents.bullet5')}</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
          <section className="py-16">
  <h2 className="text-3xl font-bold text-center mb-12">Explore Our Machines</h2>
  <div className="flex flex-wrap justify-center gap-4">
    {/* 3D Printer Card */}
    <HoverCard
            title={t('hoverCards.3DPrinter.title')}
            description={t('hoverCards.3DPrinter.description')}
            image="https://images.unsplash.com/photo-1715592600579-5949748d349f?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />

          {/* Sewing Machine Card */}
          <HoverCard
            title={t('hoverCards.sewingMachine.title')}
            description={t('hoverCards.sewingMachine.description')}
            image="https://plus.unsplash.com/premium_photo-1664195857591-968c2a9f2c03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2V3aW5nJTIwbWFjaGluZXxlbnwwfHwwfHx8MA%3D%3D"
          />

          {/* Soldering Station Card */}
          <HoverCard
            title={t('hoverCards.solderingStation.title')}
            description={t('hoverCards.solderingStation.description')}
            image="https://plus.unsplash.com/premium_photo-1663013225893-dac76c8f03ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29sZGVyaW5nfGVufDB8fDB8fHww"
          />
  </div>
</section>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} {t('footer.copy')}</p>
        </div>
      </footer>
    </div>
  );
}
