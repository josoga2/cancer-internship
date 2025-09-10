"use client";
import React from "react";
import { Button } from "@/components/ui/button"
import biology from "../../../../public/biology.svg"
import winfred from "../../../../public/winfred.svg"
import keywords from "../../../../public/keywords.svg"
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Navbar from "@/components/Nav/navbar";


const Upcomings = [
    {
        id: 1,
        title: "Coding for Life Scientists",
        desc: "A gentle introduction to coding with life science context",
        image: biology.src,
        weeks: 58,
        start: "Nov. 15th, 2025",
        lessons: '2',
        courses: [
            {
                id: 1,
                title: "Molecular Biology",
                desc: "Learn the basics of molecular biology, including DNA, RNA, and protein synthesis.",
                link: "#",
            },
            {
                id: 2,
                title: "Algorithmic thinking in Bio",
                desc: "Learn how to think algorithmically and apply it to biological problems.",
                link: "#",
            },
            {
                id: 3,
                title: "Coding with Python",
                desc: "Learn the basics of Python programming and how to apply it to biological problems.",
                link: "#",
            },
            {
                id: 4,
                title: "Coding with R",
                desc: "Learn the basics of R programming and how to apply it to biological problems.",
                link: "#",
            },
            {
                id: 5,
                title: "Final Capstone Project",
                desc: "Apply your knowledge to a real-world biological problem.",
                link: "#",
            },
        ]
    },
    
]

export default function Page() {
  return (
    <div className="max-w-4/5 mx-auto">

      <div className="hidden md:flex flex-col gap-2 w-full items-start">
        <Navbar />
        <div className="py-5 h-full w-full flex flex-row justify-between items-center">
            <div className="flex flex-col gap-5">
                <p className="text-5xl font-bold text-start">Linear Algebra for Bio</p>
                <p className="text-2xl">Fundamental maths for life scientists.</p>
                <Button className="bg-green-600 text-xl py-6 px-10 font-bold w-fit">Enroll Now</Button>
            
            </div>
            <Image src={keywords} alt="biology" className="w-1/2" />
        </div>
        

        {/** Learning Paths */}

        {Upcomings.map((upcoming) => (
            <div key={upcoming.id} className="py-5 w-full flex flex-col gap-5 justify-center items-center pb-10">
                <div className="flex flex-col gap-2 w-full items-start justify-start">
                    <p className="text-3xl font-bold">Start Now</p>
                </div>
                <div className="flex flex-row gap-10 w-full justify-center">
                    <div className="flex flex-row gap-10 w-full items-start justify-between ">
                        <div className="flex flex-col gap-7 items-start justify-start border-2 border-green-600 rounded-lg px-5 py-10 w-1/3 sticky top-0">
                            <Image src={upcoming.image} alt="winfred" width={64} height={64} className="border-2 rounded-md border-green-300"/>
                            <p className="text-2xl font-bold">{upcoming.title}</p>
                            <p className="text-lg">{upcoming.desc}</p>
                            <span className="flex flex-row gap-5 items-center justify-center">
                                <p className="text-lg">{upcoming.lessons} Lessons</p>
                                <p className="text-lg">{upcoming.weeks} Weeks</p>
                            </span>
                            <Button className="bg-green-600 text-xl py-6 px-10 font-bold w-fit">Enroll Now</Button>

                        </div>
                        <div className="flex flex-col gap-5 items-start justify-center max-w-1/2 overflow-y-auto">
                            <p className="text-3xl font-bold">What will you learn?</p>
                            
                            {upcoming.courses.map((course) => (
                                <div key={course.id} className="flex flex-col gap-10 items-start justify-start w-full">
                                    <div className="flex flex-col gap-10 items-start justify-start w-full">
                                    <div className="flex flex-row gap-5 items-center justify-start w-full rounded-lg border border-green-100 px-7 py-3 hover:bg-green-50">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value={course.id.toString()}>
                                                <AccordionTrigger className="text-xl">{course.title}</AccordionTrigger>
                                                <AccordionContent className="text-xl">
                                                    {course.desc}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                    </div>
                                </div>
                                
                            ))}

                            <div className="py-5 flex flex-col gap-5 items-start justify-start w-full">
                                <p className="text-2xl font-bold">Course Description</p>
                                <p className="leading-7 text-lg">Start building visual patterns and discover formulas that govern them. Use these visualizations to compare sequences that show different growth, from linear to quadratic, exponential, and beyond. Define patterns and sequences recursively, and explore the fascinating shapes that emerge from the simplest recursive processes. And most importantly, see algebra like you've never seen it before!</p>
                                <Button className="bg-green-600 text-xl py-6 px-10 font-bold w-fit">Enroll Now</Button>

                            </div>

                            
                        </div>
                    </div>
                    
                </div>
            </div>
        ))}

        {/** who is this internship for?*/}
        <div className="w-full flex flex-col items-center justify-center">
            <p className="text-5xl font-bold text-center p-10">Who is this course for?</p>
        </div>

        <div className="flex flex-row gap-24 items-start justify-center w-full mx-auto px-5">
            <div className="flex flex-col gap-5 max-w-2/5 rounded border-2 p-10  border-green-500 shadow-md shadow-green-300 items-start justify-start  ">
            <span className="flex flex-row items-start font-bold text-4xl gap-2 flex-wrap"> <p>You are a</p> <p className="text-green-600 underline">great</p> <p>fit if:</p> </span>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
                <li className="text-lg"> Self-taught learners who are tired of piecing together YouTube videos and random tutorials, and want <strong>  a structured, real-world learning experience.</strong> </li>
                <li className="text-lg"> Ambitious beginners in bioinformatics, data science, or computational biology who are ready to roll up their sleeves and <strong> get hands-on.</strong> </li>
                <li className="text-lg"> Researchers or postgrads who want to learn how to analyze biological data, <strong> build pipelines, or publish with confidence.</strong> </li>
                <li className="text-lg"> Anyone ready to put in the work, follow the roadmap, and build a real portfolio they can proudly show <strong> employers or grad schools.</strong> </li>
            </ul>
        </div>
        <div className="flex flex-col gap-5 max-w-2/5 rounded border-2 p-10 border-zinc-500 shadow-2xl shadow-zinc-300 items-start justify-start ">
            <span className="flex flex-row items-start font-bold text-4xl gap-2 flex-wrap"> <p>You are</p> <p className="text-red-600 underline">not </p> <p>a fit if:</p> </span>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
                <li className="text-lg"> Those looking for a  <strong> “watch-and-passively-consume”</strong> experience — this is hands-on, project-based learning. </li>
                <li className="text-lg"> People expecting <strong> instant results. </strong> - We believe growth is earned, not gifted </li>
                <li className="text-lg"> Folks <strong> unwilling to collaborate</strong> — HackBio thrives on peer-to-peer support, team challenges, and real-world interactions. </li>
                <li className="text-lg"> Advanced experts looking for deep academic theory — we focus on practical skills, tools, and industry application.</li>
            </ul>
            </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center py-10">
            <Button className="bg-green-600 text-xl py-6 px-10 font-bold w-fit">Enroll Now</Button>
        </div>
        

        <div className="flex flex-col gap-10 items-center justify-start w-full mx-auto px-5 py-20">
            <span className="flex flex-row items-start font-bold text-4xl gap-2"> <p>One time pricing, Lifetime Access</p> </span>
            <div className="flex flex-col gap-5 max-w-4/5 rounded border-2 p-5 px-10 border-green-500 shadow-2xl items-start justify-start  ">
                <span className="flex flex-row items-start font-bold text-4xl gap-2 py-5"> <p>Premium Learning</p> </span>
                <span className="flex flex-row items-start font-bold text-4xl gap-2 pb-5"> <p>$15</p> <p className="text-red-600 line-through text-xl">$30 </p>  </span>
                <ul className="flex flex-col gap-5 items-start justify-start ">
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Complete Training Pack </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Weekly mentorship calls </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> AI-Assisted Training and Mentorship </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Teamwork and Projects </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Weekly Graded Tasks + Feedback </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> 1-on-1 troubleshooting meetings </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Unlimited access to Bioinformatics servers* </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Complete All 8 stages </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Unlimited access to final project phase </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Support for first draft manuscript </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Graded Certification </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> No Eviction from the internship </span></li>
                </ul>
                <p className="font-bold">* Active only for the duration of the internship</p>
                <Button className="bg-green-600 text-xl py-6 px-10 font-bold w-fit">Enroll Now</Button>

            </div>
        </div>


        <div className="py-10 w-full h-full bg-green-50 flex flex-col gap-5 ">
          <p className="text-5xl font-bold text-center"> Join thousands of global learners</p>
          <p className="text-center">For real, you will work and learn with people around the world.</p>

          <div className="flex flex-row gap-10 items-center justify-center max-w-2/5 mx-auto py-5">
            <Image src={winfred} alt="biology" className="rounded-full " />
            <div className="flex flex-col gap-2 ">
              <p className="text-lg text-gray-700">{`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}</p>
              <p className="text-base font-bold pt-5">{`Winfred Gatua (Now in University of Bristol, UK)`}</p>
            </div>
          </div>
            <div className="flex items-center justify-center">
            <Button className="bg-green-600 text-xl py-6 px-10 font-bold w-fit">Enroll Now</Button>
            </div>
        </div>

      </div>
      
      <div className="block md:hidden text-center text-2xl text-gray-700">Learn by Practice</div>
    </div>
  );
}
