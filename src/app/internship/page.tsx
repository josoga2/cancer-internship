"use client";
import React, {  useEffect, useState } from "react";
import winfred from "../../../public/winfred.svg"
import { ArrowRight } from 'lucide-react';
import keywords from "../../../public/keywords.svg"
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import publicApi from "../../publicApi"
import { EnrollDialog } from "@/components/enroll/enroll";
import  Navbar  from "@/components/Nav/navbar";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";



export default function Page() {

    const [internship, setInternshipList] = useState<Array<{
        id?: string
        title?: string
        description?: string
        published?: boolean
        start_date?: string
        overview?: string
        lenght_in_weeks?: number
        int_image?: string
        courses?: Array<{
            id?: number | string
        }>
    }>>([
        {
            id: "",
            title: "",
            description: "",
            published: false,
            start_date: "",
            overview: "",
            lenght_in_weeks: 0,
            int_image: "/",
            courses: [{ id: "" }]
        }
    ]);

    // Prefill with empty items until useEffect is mounted
    const [coursesList, setCoursesList] = useState<Array<{
        id?: number | string
        title?: string
        description?: string
        published?: boolean
    }>>([
        {
            id: "",
            title: "",
            description: "",
            published: false
        }
    ]);

    // Fetch courses from the public API
    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await publicApi.get('/api/internships/');
                if (response.status === 200) {
                    setInternshipList(response.data);
                } else {
                    console.error('Failed to fetch internships:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching internships:', error);
            }
        };
        fetchInternships();
    }, []);
    //console.log(internship);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await publicApi.get('/api/courses/');
                if (response.status === 200) {
                    setCoursesList(response.data);
                } else {
                    console.error('Failed to fetch courses:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    //console.log(coursesList.filter(course => course.published === true));

  return (
    <main className="max-w-4/5 mx-auto 2xl:max-w-2/3">
        <Navbar />
      <div className="hidden md:flex flex-col gap-2 w-full items-start">
        
        <div className="py-5 h-full w-full flex flex-row justify-between items-center">
            <div className="flex flex-col gap-5">
            <p className="text-5xl font-bold text-start">Open Internships</p>
            <p className="text-2xl">Fast, Fun and Complete Bioinformatics Training</p>
            <EnrollDialog />

            </div>
            <Image src={keywords} alt="biology" className="w-1/2" />
        </div>

        {/** Learning Paths */}

        {internship.map((upcoming) => (
            <div key={upcoming.id} className="py-5 w-full flex flex-col gap-5 justify-center items-center pb-10">
                <div className="flex flex-col gap-2 w-full items-start justify-start">
                    <p className="text-3xl font-bold">Upcoming</p>
                    <p className="text-lg">{upcoming.start_date}</p>
                </div>
                <div className="flex flex-row gap-10 w-full justify-center">
                    <div className="grid grid-cols-2 gap-10 w-full items-start justify-start ">
                        <div className="flex flex-col gap-7 items-start justify-start border-2 border-hb-green rounded-lg px-5 py-10 w-4/5  sticky top-0">
                            <img src={upcoming.int_image} alt="upcoming_int" width={64} height={64} className="border-2 rounded-md border-hb-green"/>
                            <p className="text-2xl font-bold">{upcoming.title}</p>
                            <p className="text-lg">{upcoming.overview}</p>
                            <span className="flex flex-row gap-5 items-center justify-center">
                                <p className="text-lg">{upcoming.lenght_in_weeks} Weeks</p>
                            </span>
                            <EnrollDialog />

                        </div>
                        <div className="flex flex-col gap-5 items-start justify-center w-full overflow-y-auto">
                            <p className="text-3xl font-bold">What will you learn?</p>
                            
                            {coursesList.filter(course => course.published === true).map((course) => (
                                <div key={course.id} className="flex flex-col gap-10 items-start justify-start w-full">
                                    <div className="flex flex-col gap-10 items-start justify-start w-full">
                                    <a href={`learning/course/${course.id}`} className="flex flex-row gap-5 items-center justify-start w-full rounded-lg border border-hb-green px-7 py-7 hover:bg-green-50">
                                        <p className="text-2xl font-bold">{course.id}. </p>
                                        <p className="text-2xl font-bold">{course.title}</p>
                                        <ArrowRight className="ml-auto text-hb-green" />
                                    </a>
                                    </div>
                                </div>
                                
                            ))}

                            
                                <div  className="py-5 flex flex-col gap-5 items-start justify-start w-full">
                                    <p className="text-2xl font-bold">Description</p>
                                    <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{upcoming.description}</Markdown>
                                    <EnrollDialog />

                                </div>
                           

                            

                            
                        </div>
                    </div>
                    
                </div>
            </div>
        ))}

        {/** who is this internship for?*/}
        <div className="w-full flex flex-col items-center justify-center">
            <p className="text-5xl font-bold text-center p-10">Who is this internship for?</p>
        </div>

        <div className="flex flex-row gap-24 items-start justify-center w-full mx-auto px-5">
            <div className="flex flex-col gap-5 max-w-2/5 rounded border-2 p-10  border-hb-green shadow-md shadow-hb-green items-start justify-start  ">
            <span className="flex flex-row items-start font-bold text-4xl gap-2 flex-wrap"> <p>You are a</p> <p className="text-hb-green underline">great</p> <p className="">fit if:</p> </span>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
                <li className="text-lg"> Self-taught learners who are tired of piecing together YouTube videos and random tutorials, and want <strong>  a structured, real-world learning experience.</strong> </li>
                <li className="text-lg"> Ambitious beginners in bioinformatics, data science, or computational biology who are ready to roll up their sleeves and <strong> get hands-on.</strong> </li>
                <li className="text-lg"> Researchers or postgrads who want to learn how to analyze biological data, <strong> build pipelines, or publish with confidence.</strong> </li>
                <li className="text-lg"> Anyone ready to put in the work, follow the roadmap, and build a real portfolio they can proudly show <strong> employers or grad schools.</strong> </li>
            </ul>
        </div>
        <div className="flex flex-col gap-5 max-w-2/5 rounded border-2 p-10 border-zinc-500 shadow-2xl shadow-zinc-300 items-start justify-start ">
            <div className="flex flex-row items-start font-bold text-4xl gap-2 flex-wrap"> <p>You are</p> <p className="text-red-600 underline">not </p> <p>a fit if:</p> </div>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
                <li className="text-lg"> Those looking for a  <strong> “watch-and-passively-consume”</strong> experience — this is hands-on, project-based learning. </li>
                <li className="text-lg"> People expecting <strong> instant results. </strong> - We believe growth is earned, not gifted </li>
                <li className="text-lg"> Folks <strong> unwilling to collaborate</strong> — HackBio thrives on peer-to-peer support, team challenges, and real-world interactions. </li>
                <li className="text-lg"> Advanced experts looking for deep academic theory — we focus on practical skills, tools, and industry application.</li>
            </ul>
            </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center py-10">
            <EnrollDialog />
        </div>
        

        <div className="flex flex-col gap-10 items-center justify-start w-full mx-auto px-5 py-20">
            <span className="flex flex-row items-start font-bold text-4xl gap-2"> <p>One time pricing, Lifetime Access</p> </span>
            <div className="flex flex-col gap-5 max-w-4/5 rounded border-2 p-5 px-10 border-hb-green shadow-2xl items-start justify-start  ">
                <span className="flex flex-row items-start font-bold text-4xl gap-2 py-5"> <p>Premium Learning</p> </span>
                <span className="flex flex-row items-start font-bold text-4xl gap-2 pb-5"> <p>$20</p> <p className="text-red-600 line-through text-xl">$40 </p>  </span>
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
                <EnrollDialog />

            </div>
        </div>


        <div className="py-10 w-full h-full bg-hb-green/25 flex flex-col gap-5 ">
          <p className="text-5xl font-bold text-center"> Join thousands of global learners</p>
          <p className="text-center">For real, you will work and learn with people around the world.</p>

          <div className="flex flex-row gap-10 items-center justify-center w-3/5 mx-auto py-5">
            <Image src={winfred} alt="biology" className="rounded-full " />
            <div className="flex flex-col gap-2 ">
              <p className="text-lg text-gray-700">{`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}</p>
              <p className="text-base font-bold pt-5">{`Winfred Gatua (Now in University of Bristol, UK)`}</p>
            </div>
          </div>
            <div className="flex items-center justify-center">
                <EnrollDialog />
            </div>
        </div>

      </div>
      
        {/**MOBILE */}
        <div className="flex md:hidden flex-col gap-10 w-full p-1">
            <Image src={keywords} alt="biology" className="w-full" />
            <div className="flex flex-col gap-4">
                <p className="text-3xl font-bold text-start">Open Internships</p>
                <p className="text-lg">Fast, Fun and Complete Bioinformatics Training</p>
                <EnrollDialog />
            </div>

            

            {internship.map((upcoming) => (
                <div key={upcoming.id} className="flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-1">
                    <p className="text-2xl font-bold">Upcoming</p>
                    <p className="text-md">{upcoming.start_date}</p>
                </div>

                <div className="flex flex-col gap-5 border-2 border-hb-green rounded-lg px-5 py-5">
                    <img src={upcoming.int_image} alt="internship" width={64} height={64} className="border-2 rounded-md border-hb-green" />
                    <p className="text-xl font-bold">{upcoming.title}</p>
                    <p className="text-md">{upcoming.overview}</p>
                    <p className="text-md">{upcoming.lenght_in_weeks} Weeks</p>
                    <EnrollDialog />
                </div>

                <div className="flex flex-col gap-3">
                    <div className="text-xl font-bold"> <p> {`What will you learn?`} </p> <p className="text-sm py-3 underline font-normal"> {`(click to preview)`} </p> </div>
                    {coursesList.filter(course => course.published).map((course) => (
                    <a key={course.id} href={`learning/course/${course.id}`} className="flex flex-row items-center  gap-2 border border-hb-green rounded-lg px-5 py-4 hover:bg-green-50">
                        <p className="text-lg font-bold">{course.id}. {course.title} </p>
                        <ArrowRight className="text-hb-green min-w-10" />
                    </a>
                    ))}


                        <div  className="py-5 flex flex-col gap-5 items-start justify-start w-full">
                            <p className="text-2xl font-bold">Description</p>
                            <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{upcoming.description}</Markdown>
                            <EnrollDialog />

                        </div>

                </div>
                </div>
            ))}

            <div className="flex flex-col gap-5 items-center">
                <p className="text-3xl font-bold text-center">Who is this internship for?</p>
            </div>

            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4 border-2 border-hb-green p-5 rounded shadow-md">
                <p className="text-xl font-bold">You are a <span className="text-hb-green underline">great</span> fit if:</p>
                <ul className="list-disc pl-5 text-md">
                    <li>Self-taught learners who want structure and hands-on projects</li>
                    <li>Ambitious beginners ready to get practical</li>
                    <li>Researchers/postgrads needing pipeline + publication skills</li>
                    <li>Anyone willing to follow the roadmap to a real portfolio</li>
                </ul>
                </div>

                <div className="flex flex-col gap-4 border-2 border-zinc-500 p-5 rounded shadow-md">
                <p className="text-xl font-bold">You are <span className="text-red-600 underline">not</span> a fit if:</p>
                <ul className="list-disc pl-5 text-md">
                    <li>You want passive content consumption</li>
                    <li>You expect instant results</li>
                    <li>You hate collaboration</li>
                    <li>You want deep academic theory, not practical skills</li>
                </ul>
                </div>
            </div>

            <div className="flex flex-col items-center py-10">
                <EnrollDialog />
            </div>

            <div className="flex flex-col gap-6 border-2 border-hb-green p-5 rounded shadow-md">
                <p className="text-2xl font-bold">One-time pricing, Lifetime Access</p>
                <p className="text-xl font-bold">Premium Learning</p>
                <p className="text-xl font-bold">$20 <span className="text-red-600 line-through text-base">$40</span></p>
                <ul className="flex flex-col gap-2 text-md">
                <li>Complete Training Pack</li>
                <li>Weekly mentorship calls</li>
                <li>AI-Assisted Mentorship</li>
                <li>Team Projects + Feedback</li>
                <li>Graded Tasks, Server Access*</li>
                <li>Support for manuscript</li>
                <li>Graded Certification</li>
                <li>No Eviction</li>
                </ul>
                <p className="text-sm">*Server active only during internship</p>
                <EnrollDialog />
            </div>

            <div className="bg-hb-green/25 py-10 px-5 flex flex-col gap-4 items-center">
                <p className="text-3xl font-bold text-center">Join thousands of global learners</p>
                <p className="text-center">You’ll work with peers from around the world.</p>
                <div className="flex flex-col gap-2 items-center">
                <Image src={winfred} alt="learner" className="rounded-full w-24 h-24" />
                <p className="text-md text-gray-700 italic text-center">"My HackBio experience (and preprint) was my leverage for grad school admissions."</p>
                <p className="text-base font-bold">Winfred Gatua – University of Bristol</p>
                </div>
                <EnrollDialog />
            </div>
            </div>

    </main>
  );
}
