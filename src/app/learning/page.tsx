"use client";
import React from "react";
import { Button } from "@/components/ui/button"
import biology from "../../../public/biology.svg"
import chem from "../../../public/chem.svg"
import data from "../../../public/data.svg"
import omics from "../../../public/omics.svg"
import coding from "../../../public/coding.svg"
import molbio from "../../../public/molbio.svg"
import algo from "../../../public/algo.svg"
import winfred from "../../../public/winfred.svg"
import dna from "../../../public/dna.svg"
import keywords from "../../../public/keywords.svg"

import Image from "next/image";
import Navbar from "@/components/Nav/navbar";


const Learnings = [
    {
        id: 1,
        title: "Biology",
        desc: "Foundational Concepts in Biology",
        image: biology.src,
        courses: [
            {
                id: 1,
                title: "Molecular Biology",
                image: biology.src,
                hover: "Start Learning Here"
            },
            {
                id: 2,
                title: "Cell Biology",
                image: coding.src,
            },
            {
                id: 3,
                title: "Cell Biology",
                image: coding.src,
            },
            {
                id: 4,
                title: "Cell Biology",
                image: coding.src,
            },
        ],
    },
    {
        id: 2,
        title: "Basic Maths",
        desc: "Brush up on fundamental maths for life science",
        image: omics.src,
        courses: [
            {
                id: 1,
                title: "Molecular Biology",
                image: biology.src,
            },
            {
                id: 2,
                title: "Cell Biology",
                image: coding.src,
            },
            {
                id: 3,
                title: "Cell Biology",
                image: coding.src,
            },
            {
                id: 4,
                title: "Cell Biology",
                image: coding.src,
            },
            {
                id: 5,
                title: "Cell Biology",
                image: coding.src,
            },
        ],
    }
    
]

export default function Home() {
  return (
    <div className=" max-w-4/5 mx-auto">

      <div className="hidden md:flex flex-col gap-2 w-full items-start ">
        <Navbar />
        <div className="py-5 h-full w-full flex flex-row justify-between items-center">
            <div className="flex flex-col gap-5">
            <p className="text-5xl font-bold text-start"> Learning Paths</p>
            <p className="text-2xl">Step by step, one skill at a time</p>
            </div>
            <Image src={keywords} alt="biology" className="w-1/2" />
        </div>

        {/** Learning Paths */}
        {Learnings.map((learning) => (
            <div key={learning.id} className="py-5 w-full flex flex-row gap-5 justify-start items-center pb-10">
                <div className="flex flex-col gap-10 w-full">
                    <div className="flex flex-row gap-10">
                        <Image src={learning.image} alt="winfred" width={64} height={64} className="w-24 h-24" />
                        <div className="flex flex-col gap-2 items-start justify-center">
                            <p className="text-3xl font-bold">{learning.title}</p>
                            <p className="text-lg">{learning.desc}</p>
                        </div>
                    </div>
                    
                    <div className="py-10 w-full bg-gray-100 rounded-xl h-full flex flex-row gap-5 px-10">
                        {learning.courses.map((course) => (
                            <div className="flex flex-col gap-2 items-center justify-center" key={course.id}>
                                <Image src={course.image} alt="biology" height={192} width={192} className="hover:border-2 hover:border-green-600 hover:rounded-md"/>
                                <p className="font-bold">{course.title}</p>
                            </div>
                        ))}
                        
                    </div>  
                </div>
            </div>
        ))}

        <div className="py-10 w-full h-full bg-green-50 flex flex-col gap-5 px-10">
          <p className="text-5xl font-bold text-center"> Join thousands of global learners</p>
          <p className="text-center">For real, you will work and learn with people around the world.</p>

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
      
      <div className="block md:hidden text-center text-2xl text-gray-700">Learn by Practice</div>
    </div>
  );
}
