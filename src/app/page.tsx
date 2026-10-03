import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import WhyYoullLoveIt from "@/components/WhyYoullLoveIt";
import Skills from "@/components/Skills";
import Education from "@/components/sections/Education";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <Skills />
      <WhyYoullLoveIt />
      <Education />
      <Footer />
    </main>
  );
}
