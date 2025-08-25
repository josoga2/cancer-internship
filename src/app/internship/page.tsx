"use client";
import React, {  useEffect, useState } from "react";
import { ArrowRight } from 'lucide-react';
import winfred from "../../../public/winfred.svg"
import keywords from "../../../public/keywords.svg"
import microbe from "../../../public/microbe.webp"
import phealth from "../../../public/phealth.jpg"
import molmed from '../../../public/molmed.webp'
import animals from '../../../public/animals.webp'
import plantAnim from '../../../public/plants.webp'
import cancers from '../../../public/cancer.webp'
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import publicApi from "../../publicApi"
import { EnrollDialog } from "@/components/enroll/enroll";
import  Navbar  from "@/components/Nav/navbar";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { EnrollLiteDialog } from "@/components/enroll/enrollLite";



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
        courses?: Array<string | number>
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
            courses: [""]
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
    <section>
        <Navbar />
    <main className="hidden md:flex md:max-w-screen-lg bg md:m-auto md:items-center pt-5 md:justify-between">
        
      <div className="">
        
        
        <div className="py-5 h-full w-full flex flex-row  pt-10 justify-between items-center">
            <div className="flex flex-col gap-5">
            <p className="text-3xl font-bold text-start">Open Internship</p>
            <p className="text-lg">Fast, Fun and Complete Bioinformatics Training</p>
            <EnrollDialog />

            </div>
            <Image src={keywords} alt="biology" className="w-2/5" />
        </div>

        {/** Learning Paths */}

        {internship.filter(int => int.published === true).map((upcoming, idx) => (
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
                            <p className="text-base">{upcoming.overview}</p>
                            <span className="flex flex-row gap-5 items-center justify-center">
                                <p className="text-base">{upcoming.lenght_in_weeks} Weeks</p>
                            </span>
                            <EnrollDialog />

                        </div>
                        <div className="flex flex-col gap-5 items-start justify-center w-full overflow-y-auto">
                            <p className="text-2xl font-bold">What will you learn?</p>
                            
                            {coursesList
                                .filter(course =>{
                                    //upcoming.courses?.filter(upCourse => upCourse.id === course.id)
                                    const courseIds = (upcoming.courses ?? []).filter((id): id is string | number => id !== undefined);
                                    return courseIds.includes(course.id as string | number);    
                                    }
                                )
                                .map((course) => (
                                    <div key={course.id} className="flex flex-col gap-10 items-start justify-start w-full">
                                        <div className="flex flex-col gap-10 items-start justify-start w-full">
                                            <a href={`learning/course/${course.id}`} className="flex flex-row gap-5 items-center justify-start w-full rounded-lg border border-hb-green px-7 py-5 min-h-24 hover:bg-green-50">
                                                <p className="text-lg font-bold">{idx+1}. </p>
                                                <p className="text-lg font-bold">{course.title}</p>
                                                <ArrowRight className="ml-auto text-hb-green" />
                                            </a>
                                        </div>
                                    </div>
                            ))}

                            
                                <div  className="py-5 flex flex-col  items-start justify-start w-full gap-5">
                                    <p className="text-2xl font-bold">Description</p>
                                    <div className="prose">
                                    <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{upcoming.description}</Markdown>
                                    </div>
                                    <EnrollDialog />

                                </div>
                           

                            

                            
                        </div>
                    </div>
                    
                </div>
            </div>
        ))}


        {/**LEARNING TRACKS */}
        <div className="w-full">
            <p className="w-full pb-10 text-center text-4xl font-bold">Learning Tracks</p>
            <div className="grid grid-cols-3 gap-10 items-start justify-start w-full">
                <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                    <Image src={microbe.src} alt="microbe" width={50} height={50} />
                    <p className="font-bold">Microbes and Viruses</p>
                </div>
                <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                    <Image src={molmed.src} alt="microbe" width={50} height={50} />
                    <p className="font-bold">Molecular Medicine</p>
                </div>
                <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                    <Image src={plantAnim.src} alt="microbe" width={50} height={50} />
                    <p className="font-bold">Plant Health and Physiology</p>
                </div>
                <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                    <Image src={cancers.src} alt="microbe" width={50} height={50} />
                    <p className="font-bold">Cancers Biomarker Discovery </p>
                </div>
                <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                    <Image src={phealth.src} alt="microbe" width={50} height={50} />
                    <p className="font-bold">Public Health & Genomic Epid. </p>
                </div>
                <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                    <Image src={animals.src} alt="microbe" width={50} height={50} />
                    <p className="font-bold">Animal Health and Physiology</p>
                </div>
            </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center py-10">
            <EnrollDialog />
        </div>

        {/** who is this internship for?*/}
        <div className="w-full flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-center p-10">Who is this internship for?</p>
        </div>

        <div className="flex flex-row gap-24 items-start justify-center w-full mx-auto px-5">
            <div className="flex flex-col gap-5 max-w-2/5 rounded border-2 p-10  border-hb-green shadow-md shadow-hb-green items-start justify-start  ">
            <span className="flex flex-row items-start font-bold text-2xl gap-2 flex-wrap"> <p>You are a</p> <p className="text-hb-green underline">great</p> <p className="">fit if:</p> </span>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
                <li className="text-base"> Self-taught learners who are tired of piecing together YouTube videos and random tutorials, and want <strong>  a structured, real-world learning experience.</strong> </li>
                <li className="text-base"> Ambitious beginners in bioinformatics, data science, or computational biology who are ready to roll up their sleeves and <strong> get hands-on.</strong> </li>
                <li className="text-base"> Researchers or postgrads who want to learn how to analyze biological data, <strong> build pipelines, or publish with confidence.</strong> </li>
                <li className="text-base"> Anyone ready to put in the work, follow the roadmap, and build a real portfolio they can proudly show <strong> employers or grad schools.</strong> </li>
            </ul>
        </div>
        <div className="flex flex-col gap-5 max-w-2/5 rounded border-2 p-10 border-zinc-500 shadow-2xl shadow-zinc-300 items-start justify-start ">
            <div className="flex flex-row items-start font-bold text-2xl gap-2 flex-wrap"> <p>You are</p> <p className="text-red-600 underline">not </p> <p>a fit if:</p> </div>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
                <li className="text-base"> Those looking for a  <strong> “watch-and-passively-consume”</strong> experience — this is hands-on, project-based learning. </li>
                <li className="text-base"> People expecting <strong> instant results. </strong> - We believe growth is earned, not gifted </li>
                <li className="text-base"> Folks <strong> unwilling to collaborate</strong> — HackBio thrives on peer-to-peer support, team challenges, and real-world interactions. </li>
                <li className="text-base"> Advanced experts looking for deep academic theory — we focus on practical skills, tools, and industry application.</li>
            </ul>
            </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center py-10">
            <EnrollDialog />
        </div>
        
        

        <div className="flex flex-col gap-10 items-center justify-start w-full mx-auto px-5 py-20">
            <span className="flex flex-row items-start font-bold text-2xl gap-2"> <p>One time pricing, Lifetime Access</p> </span>
            <div className="flex flex-row gap-10">
                {/* <div className="flex flex-col gap-5 max-w-4/5 rounded border-2 p-5 px-10 border-hb-green shadow-2xl items-start justify-start  ">
                    <span className="flex flex-col items-start font-bold text-4xl gap-2 py-5"> <p>Lite Learning</p> <p className="text-lg text-red-500">{`(Without project phase)`}</p> </span>
                    <span className="flex flex-row items-start font-bold text-4xl gap-2 pb-5"> <p>$10</p> <p className="text-red-600 line-through text-xl">{`$20`}</p> <p className="text-red-600  text-xl">{`(50% off)`}</p>  </span>
                    <ul className="flex flex-col gap-5 items-start justify-start ">
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Complete Training Pack </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Weekly mentorship calls </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> AI-Assisted Training and Mentorship </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Teamwork and Projects </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Graded Certification </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> Weekly Graded Tasks + Feedback </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl"> 1-on-1 troubleshooting meetings </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl line-through"> Unlimited access to Bioinformatics servers* </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl line-through"> Complete All 8 stages </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl  line-through"> Unlimited access to final project phase </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl  line-through"> Support for first draft manuscript </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-xl  line-through"> No Eviction from the internship </span></li>
                    </ul>

                    <EnrollLiteDialog />

                </div> */}
                <div className="flex flex-col gap-5 rounded border-2 p-5 px-10 border-hb-green shadow-2xl items-start justify-center  ">
                    <span className="flex flex-row items-start font-bold text-2xl gap-2 py-5"> <p>Premium Learning</p> </span>
                    <span className="flex flex-row items-start font-bold text-2xl gap-2 pb-5"> <p>$20</p> <p className="text-red-600 line-through text-base">{`$40`}</p> <p className="text-red-600  text-xl">{`(50% off)`}</p>  </span>
                    <ul className="flex flex-col gap-5 items-start justify-start ">
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Complete Training Pack </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Weekly mentorship calls </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> AI-Assisted Training and Mentorship </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Teamwork and Projects </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Weekly Graded Tasks + Feedback </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> 1-on-1 troubleshooting meetings </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Unlimited access to Bioinformatics servers* </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Complete All 8 stages </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Unlimited access to final project phase </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Support for first draft manuscript </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Graded Certification </span></li>
                        <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> No Eviction from the internship </span></li>
                    </ul>
                    <p className="font-bold">* Active only for the duration of the internship</p>
                    <EnrollDialog />

                </div>
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
      </main>
      
        {/**MOBILE */}
        <main>
        <div className="flex md:hidden flex-col gap-10 w-full p-5">
            <Image src={keywords} alt="biology" className="w-full" />
            <div className="flex flex-col gap-4">
                <p className="text-2xl font-bold text-start">Open Internships</p>
                <p className="text-base">Fast, Fun and Complete Bioinformatics Training</p>
                <EnrollDialog />
            </div>

            

            {internship.filter(int => int.published === true).map((upcoming, idx) => (
                <div key={upcoming.id} className="flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-3 items-start justify-start w-full">
                    <p className="text-xl font-bold">Upcoming</p>
                    <p className="text-base">{upcoming.start_date}</p>
                </div>

                <div className="flex flex-col gap-5 border-2 border-hb-green rounded-lg px-5 py-5">
                    <img src={upcoming.int_image} alt="internship" width={64} height={64} className="border-2 rounded-md border-hb-green" />
                    <p className="text-lg font-bold">{upcoming.title}</p>
                    <p className="text-sm">{upcoming.overview}</p>
                    <p className="text-sm">{upcoming.lenght_in_weeks} Weeks</p>
                    <EnrollDialog />
                </div>

                <div className="flex flex-col gap-3">
                    <div className="text-xl font-bold"> <p> {`What will you learn?`} </p> <p className="text-sm py-3 underline font-normal"> {`(click course item to preview)`} </p> </div>
                    {coursesList
                                .filter(course =>{
                                    //upcoming.courses?.filter(upCourse => upCourse.id === course.id)
                                    const courseIds = (upcoming.courses ?? []).filter((id): id is string | number => id !== undefined);
                                    return courseIds.includes(course.id as string | number);    
                                    }
                                ).map((course) => (
                    <a key={course.id} href={`learning/course/${course.id}`} className="flex flex-row items-center min-h-24 gap-3 border border-hb-green rounded-lg px-5 py-4 hover:bg-green-50">
                        <p className="text-base font-bold">{idx+1}. {course.title} → </p>
                    </a>
                    ))}


                    <div  className="py-5 flex flex-col gap-5 items-start justify-start w-full">
                        <p className="text-2xl font-bold">Description</p>
                        <div className="prose">
                        <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{upcoming.description}</Markdown>
                        </div>
                        <EnrollDialog />

                    </div>

                </div>
                </div>
            ))}

            <div className="w-full">
                <p className="w-full pb-10 text-start text-2xl font-bold">Learning Tracks</p>
                <div className="grid grid-cols-1 gap-10 items-center justify-start ">
                    <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                        <Image src={microbe.src} alt="microbe" width={50} height={50} />
                        <p className="font-bold">Microbes and Viruses</p>
                    </div>
                    <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                        <Image src={molmed.src} alt="microbe" width={50} height={50} />
                        <p className="font-bold">Molecular Medicine</p>
                    </div>
                    <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                        <Image src={plantAnim.src} alt="microbe" width={50} height={50} />
                        <p className="font-bold">Plant Health and Physiology</p>
                    </div>
                    <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                        <Image src={cancers.src} alt="microbe" width={50} height={50} />
                        <p className="font-bold">Cancers Biomarker Discovery </p>
                    </div>
                    <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                        <Image src={phealth.src} alt="microbe" width={50} height={50} />
                        <p className="font-bold">Public Health & Genomic Epid. </p>
                    </div>
                    <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                        <Image src={animals.src} alt="microbe" width={50} height={50} />
                        <p className="font-bold">Animal Health and Physiology</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center py-10">
                <EnrollDialog />
            </div>

            <div className="flex flex-col gap-5 items-center">
                <p className="text-2xl font-bold text-center">Who is this internship for?</p>
            </div>

            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4 border-2 border-hb-green p-5 rounded shadow-md">
                <p className="text-lg font-bold">You are a <span className="text-hb-green underline">great</span> fit if:</p>
                <ul className="list-disc pl-5 text-base">
                    <li>Self-taught learners who want structure and hands-on projects</li>
                    <li>Ambitious beginners ready to get practical</li>
                    <li>Researchers/postgrads needing pipeline + publication skills</li>
                    <li>Anyone willing to follow the roadmap to a real portfolio</li>
                </ul>
                </div>

                <div className="flex flex-col gap-4 border-2 border-zinc-500 p-5 rounded shadow-md">
                <p className="text-lg font-bold">You are <span className="text-red-600 underline">not</span> a fit if:</p>
                <ul className="list-disc pl-5 text-base">
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
                <span className="flex flex-row items-start font-bold text-4xl gap-2 pb-5"> <p>$20</p> <p className="text-red-600 line-through text-xl">{`$40`}</p> <p className="text-red-600  text-xl">{`(50% off)`}</p>  </span>
                <ul className="flex flex-col gap-2 text-base items-start justify-start list-disc pl-5">
                    <li>Complete Training Pack</li>
                    <li>Weekly mentorship calls</li>
                    <li>AI-Assisted Mentorship</li>
                    <li>Teamwork and  Projects</li>
                    <li>Weekly Graded Tasks + Feedback</li>
                    <li>Unlimited Access to Bioinformatics Server*</li>
                    <li>Complete all 8 stages*</li>
                    <li>Unlimited access to final project phase</li>
                    <li>Support for first draft manuscript</li>
                    <li>1-on-1 troubleshooting meetings</li>
                    <li>Graded Certification</li>
                    <li>No Eviction from the internship</li>
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
    </section>
  );
}
