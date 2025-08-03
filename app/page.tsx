import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Pricing from "./sections/Pricing";
import Faq from "./sections/Faq";
import Testimonials from "./sections/Testimonials";
import Download from "./sections/Download";
export default function Home() {
  return (
    <main className="overflow-hidden text-black bg-white dark:bg-black dark:text-white">
      <Navbar/>
      <Hero/>
      <Features/>
      <Pricing/>
      <Faq/>
      <Testimonials/>
      <Download/>
      <Footer/>
    </main>
  );
}
