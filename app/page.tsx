import About from "@/components/About";
//import Calendar from "@/components/Calendar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
//import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Scholarship from "@/components/Scholarship";
import Stories from "@/components/Stories";
import Testimonial from "@/components/Testimonial";
import Tracks from "@/components/Tracks";
import Upgrade from "@/components/Upgrade";
import Youtube from "@/components/Youtube";


export default function Home() {
  return (
    <main className="">
      <Scholarship />
      {/**<Navbar /> **/}
      <Hero />
      <Testimonial />
      <About />
      <Stories />
      {/**<Upgrade />**/}
      <Tracks />
      <Youtube />
      <Pricing />
      {/**<Calendar />**/}
      <Footer />
    </main>
  );
}
