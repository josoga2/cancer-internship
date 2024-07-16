import Calendar from "@/components/Calendar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Scholarship from "@/components/Scholarship";
import Testimonial from "@/components/Testimonial";
import Tracks from "@/components/Tracks";
import Upgrade from "@/components/Upgrade";


export default function Home() {
  return (
    <main className="">
      <Scholarship />
      <Navbar />
      <Hero />
      <Testimonial />
      <Upgrade />
      <Tracks />
      <Pricing />
      <Calendar />
      <Footer />
    </main>
  );
}
