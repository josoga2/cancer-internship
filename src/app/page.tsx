import { buildPageMetadata } from "@/lib/page-metadata";
import Navbar from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import CoreSpecializations from "@/components/widgets/home-widgets/core-specializations";
import Hbworks from "@/components/widgets/home-widgets/hb-works";
import Hero from "@/components/widgets/home-widgets/hero";
import OrganizationsTestimonials from "@/components/widgets/home-widgets/org-testimonial-carousel";
import ComputationalBiologistsSection from "@/components/widgets/home-widgets/computational-biologists-section";
import FeaturedCareerPathways from "@/components/widgets/home-widgets/featured-career-pathways";
import SuccessStorySection from "@/components/widgets/home-widgets/success-story-section";
import TestimonialsEnroll from "@/components/widgets/internship-widget/testimonials-enroll";
import GettingStartedResources from "@/components/widgets/home-widgets/getting-started-resources";
import ForLearners from "@/components/widgets/home-widgets/for-learners";
import ForRecruiters from "@/components/widgets/home-widgets/for-recruiters";
import TestimonialsInterns from "@/components/widgets/home-widgets/testimonials-interns";

export const metadata = buildPageMetadata({
  title: "HackBio Internship",
  description:
    "Learn bioinformatics, data science, and AI by doing real-world projects with HackBio internships.",
  urlPath: "/",
});

export default function Home() {
  return (
    <main className="bg-white text-[#1f1f24] dark:bg-[#020617] dark:text-white">
    <Navbar /> 
    <div className="w-full">
      <div className="hidden md:flex w-full flex-col bg md:items-center md:justify-between">
        {/* Hero Section */}
        
        <Hero />

        <div className="flex w-full max-w-5xl flex-col items-center">
        <OrganizationsTestimonials />

        <ComputationalBiologistsSection />

        <FeaturedCareerPathways />

        <SuccessStorySection />

         <TestimonialsEnroll InternshipStatus="open" variant="home" /> 

         <GettingStartedResources /> 
        
        {/* <ForLearners /> */}

            {/**for companies */}
        {/* <ForRecruiters /> */}


        {/* <Hbworks /> */}

        {/**Core Specializations */}
        {/* <CoreSpecializations /> */}

        {/* <TestimonialsInterns /> */}
        </div>


      </div>
      {/**Mobile */}
      <div className="flex flex-col w-full md:hidden bg pt-20 px-5 gap-10">

        {/* Hero Section */}
        <Hero />

        <div className="flex w-full flex-col gap-10 px-5">
        {/* Organizations */}
        <OrganizationsTestimonials />

        <ComputationalBiologistsSection />

        <FeaturedCareerPathways />

        <SuccessStorySection />

        <TestimonialsEnroll InternshipStatus="open" variant="home" />

        <GettingStartedResources />

        {/* Learners Section */}
        {/* <ForLearners /> */}

        {/* Recruiters Section */}
        {/* <ForRecruiters /> */}

        {/* Why HackBio Works */}
        {/* <Hbworks /> */}

        {/* Core Specializations */}
        {/* <CoreSpecializations /> */}
        

        {/* Learners Testimonials */}
        {/* <TestimonialsInterns /> */}
        </div>
      </div>


    </div>
    <Footer />
    </main>
  );
}
