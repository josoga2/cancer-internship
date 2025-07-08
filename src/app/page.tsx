import React from "react";
import { Agbalumo } from "next/font/google";
import { Button } from "@/components/ui/button"
import biology from "../../public/biology.svg"
import chem from "../../public/chem.svg"
import data from "../../public/data.svg"
import omics from "../../public/omics.svg"
import coding from "../../public/coding.svg"
import molbio from "../../public/molbio.svg"
import algo from "../../public/algo.svg"
import winfred from "../../public/winfred.svg"
import dna from "../../public/dna.svg"
import testimonials from '../../public/Testimonials.png'

import Image from "next/image";
import Navbar from "@/components/Nav/navbar";

const agbalumo = Agbalumo({
  subsets: ["latin"],
  display: "swap",
  weight: "400"
});

export default function Home() {
  return (
    <div className="w-full max-w-full mx-auto">
      <div className="hidden md:flex flex-col gap-2 items-center justify-center w-full">
        <Navbar />
        <div 
          className="w-full flex flex-col items-center justify-center pb-10 relative"
          style={{
            backgroundImage: `url(${dna.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.9
          }}
        >
          <p className={`${agbalumo.className} text-8xl font-bold text-center`}>Learn</p>
          <p className={`${agbalumo.className} text-8xl font-bold text-center`}>by Practice</p>
          <p className="text-center w-1/2 text-2xl py-10 text-gray-700">
            Structured, project based and beginner friendly way to start your Bioinformatics and AI Journey.
          </p>
          <a href="/internship"><Button className="bg-green-600 text-xl py-6 px-10 font-bold">Start Learning</Button></a>
        </div>

        <div className="py-10 w-2/3 flex flex-col gap-5 px-10">
          <p className="text-3xl font-bold text-center">Trusted by scientists in 100+ schools globally</p>
          <div className="flex flex-row gap-10 py-5 items-center justify-center">
            <Image src={testimonials} alt="chem" className="w-1/2 " />
            
          </div>
        </div>
        
        <div className="py-5 bg-green-50 w-full h-full flex flex-col gap-5 px-10">
          <p className="text-5xl font-bold text-center"> Guided Paths to Mastery</p>
          <p className="text-center text-2xl">Pick a structured learning path that fits your learning stage</p>
          <div className="flex flex-row gap-10 py-10 items-center justify-center">
            <a href=""><Image src={biology} alt="biology"  /> </a>
            <a href=""><Image src={data} alt="biology"  /></a>
            <a href=""><Image src={coding} alt="biology"  /></a>
          </div>

          {/* <div className="flex flex-row gap-10 items-center justify-center">
            <Image src={chem} alt="biology" />
            <Image src={omics} alt="biology" />
          </div> */}
        </div>

        <div className="py-10 w-full h-full flex flex-col gap-5 px-10">
          <p className="text-5xl font-bold text-center"> For any background</p>
          <p className="text-center text-2xl">What is your background? We will bring you up to speed!</p>

          <div className="flex flex-row gap-10 items-center justify-center">
            <a><Image src={molbio} alt="biology" /></a>
            <a><Image src={algo} alt="biology" /></a>
          </div>
        </div>

        <div className="py-5 w-full h-full bg-green-50 flex flex-col gap-5 px-10">
          <p className="text-5xl font-bold text-center"> Join thousands of global learners</p>
          <p className="text-center text-2xl">For real, you will work and learn with 100s of people around the world.</p>

          <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
            <Image src={winfred} alt="biology" className="rounded-full " />
            <div className="flex flex-col gap-2 ">
              <p className="text-lg text-gray-700">{`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}</p>
              <p className="text-base font-bold pt-5">{`Winfred Gatua (Now in University of Bristol, UK)`}</p>
            </div>
          </div>
            <div className="flex items-center justify-center">
            <Button className="bg-green-600 text-xl py-6 px-10 font-bold w-fit">Start Learning</Button>
            </div>
        </div>


      </div>
      
      <div className="flex flex-col gap-10 md:hidden w-full">
            <Navbar />
        {/* Hero Section */}
        <div
          className="w-full flex flex-col items-center justify-center text-center px-6 "
          style={{
            backgroundImage: `url(${dna.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.9
          }}
        >
          <p className={`${agbalumo.className} text-5xl font-bold`}>Learn</p>
          <p className={`${agbalumo.className} text-5xl font-bold`}>by Practice</p>
          <p className="text-lg text-gray-700 pt-6">
            Structured, project based and beginner friendly way to start your Bioinformatics and AI Journey.
          </p>
          <a href="/internship" className="mt-6">
            <Button className="bg-green-600 text-lg py-4 px-8 font-bold">Start Learning</Button>
          </a>
        </div>

        {/* Trusted by Scientists */}
        <div className="px-6 flex flex-col items-center gap-6">
          <p className="text-2xl font-bold text-center">Trusted by scientists in 100+ schools globally</p>
          <div className="grid grid-cols-2 gap-4 place-items-center">
            <Image src={chem} alt="chem" className="w-48 h-48" />
            <Image src={biology} alt="biology" className="w-48 h-48" />
            <Image src={data} alt="molbio" className="w-48 h-48" />
            <Image src={omics} alt="omics" className="w-48 h-48" />
            <Image src={coding} alt="coding" className="w-48 h-48" />
          </div>
        </div>

        {/* Guided Paths */}
        <div className="bg-green-50 px-6 py-10 flex flex-col items-center gap-6">
          <p className="text-3xl font-bold text-center">Guided Paths to Mastery</p>
          <p className="text-lg text-center">Pick a structured learning path that fits your learning stage</p>
          <div className="grid grid-cols-1 gap-4 place-items-center">
            <a href=""><Image src={biology} alt="biology" className="w-48 h-48" /></a>
            <a href=""><Image src={data} alt="data" className="w-48 h-48" /></a>
            <a href=""><Image src={coding} alt="coding" className="w-48 h-48" /></a>
          </div>
        </div>

        {/* For Any Background */}
        <div className="px-6 py-10 flex flex-col items-center gap-6">
          <p className="text-3xl font-bold text-center">For any background</p>
          <p className="text-lg text-center">What is your background? We will bring you up to speed!</p>
          <div className="grid grid-cols-1 gap-4 place-items-center">
            <a><Image src={molbio} alt="molbio" className="w-64 h-64" /></a>
            <a><Image src={algo} alt="algo" className="w-64 h-64" /></a>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-green-50 px-6 py-10 flex flex-col items-center gap-6">
          <p className="text-3xl font-bold text-center">Join thousands of global learners</p>
          <p className="text-lg text-center">For real, you will work and learn with 100s of people around the world.</p>
          <div className="flex flex-col items-center gap-4 text-center">
            <Image src={winfred} alt="Winfred Gatua" className="rounded-full w-36 h-36" />
            <p className="text-sm text-gray-700">
              {`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}
            </p>
            <p className="text-base font-bold">{`Winfred Gatua (Now in University of Bristol, UK)`}</p>
          </div>
          <Button className="bg-green-600 text-lg py-4 px-8 font-bold w-fit">Start Learning</Button>
        </div>
      </div>

    </div>
  );
}
