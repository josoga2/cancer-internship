import React from "react";
import HbButtons from "@/components/widgets/hb-buttons";
import winfred from "../../public/winfred.svg"
import testimonials from '../../public/Testimonials.svg'
import learners from '../../public/learners.png'
import talent_map from '../../public/wolrd-map.png'
import ayano from '../../public/ayano.jpeg'
import adekoya from '../../public/adekoya.jpeg'
import barve from '../../public/barve.jpeg'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import Image from "next/image";
import Navbar from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import CoreSpecializations from "@/components/widgets/home-widgets/core-specializations";
import Hbworks from "@/components/widgets/home-widgets/hb-works";
import Hero from "@/components/widgets/home-widgets/hero";
import OrganizationsTestimonials from "@/components/widgets/home-widgets/org-testimonial-carousel";
import ForLearners from "@/components/widgets/home-widgets/for-learners";
import ForRecruiters from "@/components/widgets/home-widgets/for-recruiters";
import TestimonialsInterns from "@/components/widgets/home-widgets/testimonials-interns";


export default function Home() {
  return (
    <main>
      <Navbar />
    <div className="w-full">
      <div className="hidden md:flex w-full flex-col md:max-w-screen-lg bg md:m-auto md:items-center pt-10 md:justify-between">
        {/* Hero Section */}
        
        <Hero />

        <OrganizationsTestimonials />
        
        <ForLearners />

            {/**for companies */}
        <ForRecruiters />


        <Hbworks />

        {/**Core Specializations */}
        <CoreSpecializations />

        <TestimonialsInterns />


      </div>
      {/**Mobile */}
      <div className="flex flex-col w-full md:hidden bg pt-20 px-5 gap-10">

        {/* Hero Section */}
        <Hero />

        {/* Organizations */}
        <OrganizationsTestimonials />

        {/* Learners Section */}
        <ForLearners />

        {/* Recruiters Section */}
        <ForRecruiters />

        {/* Why HackBio Works */}
        <Hbworks />

        {/* Core Specializations */}
        <CoreSpecializations />
        

        {/* Learners Testimonials */}
        <TestimonialsInterns />
      </div>


    </div>
    <Footer />
    </main>
  );
}
