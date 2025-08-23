"use client";
import { useEffect, useState } from "react";
import winfred from "../../../../../public/winfred.svg"
import keywords from "../../../../../public/keywords.svg"
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import React from "react";
import publicApi from "@/publicApi";
import { EnrollCourseDialog } from "@/components/enroll/enroll-course";
import Navbar from "@/components/Nav/navbar";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'



export default function Page() {

    const [coursesList, setCoursesList] = useState<Array<{
        id?: number | string
        title?: string
        description?: string
        overview?: string
        published?: boolean
        image?: string
        courses?: Array<{
            id?: number | string
        }>
    }>>([
        {
            id: "",
            title: "",
            description: "",
            overview: "",
            published: false,
            image: "/",
            courses: [{ id: "" }]
        }
    ]);

    const [modulesList, setModulesList] = useState<Array<{
        id?: number | string
        title?: string
        course?: number | string
        description?: string
    }>>([
        {
            id: "",
            title: "",
            course: "",
            description: "",
        }
    ]);

    const [contentList, setContentList] = useState<Array<{
        id?: number | string
        title?: string
        module?: number | string
    }>>([
        {
            id: 1,
            title: "",
            module: "",
        }
    ]);

    //const router = useRouter();
    const params = useParams();
    const  courseId = Number(params.courseId);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await publicApi.get('/api/courses/');
                if (response.status === 200) {
                    setCoursesList(
                        response.data.filter(
                            (course: { published: boolean; id: number | string }) =>
                                course.published === true && Number(course.id) === courseId
                        )
                    );
                } else {
                    console.error('Failed to fetch courses:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);
    //console.log(coursesList)
    
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await publicApi.get('/api/modules/');
                if (response.status === 200) {
                    setModulesList(
                        response.data.filter(
                            (module: { course: number | string }) => Number(module.course) === courseId
                        )
                    );
                } else {
                    console.error('Failed to fetch modules:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching modules:', error);
            }
        };
        fetchModules();
    }, []);
    

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await publicApi.get('/api/contents/');
                if (response.status === 200) {
                    setContentList(response.data);
                } else {
                    console.error('Failed to fetch contents:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching contents:', error);
            }
        };
        fetchContents();
    }, []);

    console.log(coursesList);



  return (
    <section>
        <Navbar />
        <div className="hidden md:flex md:max-w-screen-lg bg md:m-auto md:items-center pt-5 md:justify-between">
        
        <div className=" ">

        <div className="py-5 h-full w-full flex flex-row justify-between items-center">
            <div className="flex flex-col gap-5 max-w-2/5">
                <p className="text-3xl font-bold text-start"> {coursesList[0].title} </p>
                <p className="text-base "> {coursesList[0].overview} </p>
                <EnrollCourseDialog />
            
            </div>
            <Image src={keywords} alt="biology" className="w-2/5" />
        </div>

        {/** Learning Paths */}


        <div  className="py-5 w-full flex flex-col gap-5 justify-center items-center pb-10">
            <div className="flex flex-col gap-2 w-full items-start justify-start">
                <p className="text-2xl font-bold">Start Now</p>
            </div>
            <div className="flex flex-row gap-10 w-full justify-center">
                <div className="grid grid-cols-2 gap-10 w-full items-start justify-between ">
                    <div className="flex flex-col gap-7 items-start justify-start border-2 border-green-600 rounded-lg px-5 py-10 w-4/5 sticky top-0">
                        <img src={coursesList[0].image} alt="course-image" width={64} height={64} className="border-2 rounded-md border-green-300"/>
                        <p className="text-xl font-bold">{coursesList[0].title}</p>
                        
                        <span className="flex flex-row gap-5 items-center justify-center">
                            <p className="text-base">{modulesList.length} Lessons</p>
                        </span>
                        <EnrollCourseDialog />

                    </div>
                    <div className="flex flex-col gap-5 items-start justify-center w-full overflow-y-auto">
                        <p className="text-2xl font-bold">What will you learn?</p>
                        
                        {modulesList.map((module, idx) => (
                            <div key={module.id} className="flex flex-col gap-10 items-start justify-start w-full">
                                <div className="flex flex-col gap-10 items-start justify-start w-full">
                                <div className="flex flex-row gap-5 items-center justify-start w-full rounded-lg border border-green-300 px-7 py-3 hover:bg-green-50">
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value={(module.id ?? '').toString()}>
                                            <AccordionTrigger className="text-xl font-bold">{idx+1}.  {module.title}</AccordionTrigger>
                                            <AccordionContent className="text-base ">
                                                <p className="py-2 pb-3"> {module.description}</p>
                                                <hr className="w-full h-5" />
                                                <ul className="list-disc pl-5  text-neutral-600">
                                                    {contentList
                                                        .filter((content) => content.module === module.id)
                                                        .map((content) => (
                                                            <li className="py-1 " key={content.id}>{content.title}</li>
                                                        ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                                </div>
                            </div>
                            
                        ))}

                        <div className="py-5 flex flex-col gap-5 items-start justify-start w-full">
                            <p className="text-2xl font-bold">Course Description</p>
                            <div className="prose">
                                <Markdown  remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{coursesList[0].description}</Markdown>
                            </div>
                            <p className="leading-7 text-lg"> </p>
                            <EnrollCourseDialog />

                        </div>

                        
                    </div>
                </div>
                
            </div>
        </div>
        

        {/** who is this internship for?*/}
        <div className="w-full flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-center p-10">Who is this course for?</p>
        </div>

        <div className="flex flex-row gap-24 items-start justify-center w-full mx-auto px-5">
            <div className="flex flex-col gap-5 max-w-2/5 rounded border-2 p-10  border-green-500 shadow-md shadow-green-300 items-start justify-start  ">
            <span className="flex flex-row items-start font-bold text-2xl gap-2 flex-wrap"> <p>You are a</p> <p className="text-green-600 underline">great</p> <p>fit if:</p> </span>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
                <li className="text-base"> Self-taught learners who are tired of piecing together YouTube videos and random tutorials, and want <strong>  a structured, real-world learning experience.</strong> </li>
                <li className="text-base"> Ambitious beginners in bioinformatics, data science, or computational biology who are ready to roll up their sleeves and <strong> get hands-on.</strong> </li>
                <li className="text-base"> Researchers or postgrads who want to learn how to analyze biological data, <strong> build pipelines, or publish with confidence.</strong> </li>
                <li className="text-base"> Anyone ready to put in the work, follow the roadmap, and build a real portfolio they can proudly show <strong> employers or grad schools.</strong> </li>
            </ul>
        </div>
        <div className="flex flex-col gap-5 max-w-2/5 rounded border-2 p-10 border-zinc-500 shadow-2xl shadow-zinc-300 items-start justify-start ">
            <span className="flex flex-row items-start font-bold text-2xl gap-2 flex-wrap"> <p>You are</p> <p className="text-red-600 underline">not </p> <p>a fit if:</p> </span>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
                <li className="text-base"> Those looking for a  <strong> “watch-and-passively-consume”</strong> experience — this is hands-on, project-based learning. </li>
                <li className="text-base"> People expecting <strong> instant results. </strong> - We believe growth is earned, not gifted </li>
                <li className="text-base"> Folks <strong> unwilling to collaborate</strong> — HackBio thrives on peer-to-peer support, team challenges, and real-world interactions. </li>
                <li className="text-base"> Advanced experts looking for deep academic theory — we focus on practical skills, tools, and industry application.</li>
            </ul>
            </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center py-10">
            <EnrollCourseDialog />
        </div>
        

        <div className="flex flex-col gap-10 items-center justify-start w-full mx-auto px-5 py-20">
            <span className="flex flex-row items-start font-bold text-2xl gap-2"> <p>One time pricing, Lifetime Access</p> </span>
            <div className="flex flex-col gap-3 max-w-2/5 rounded border-2 p-5 px-10 border-green-500 shadow-2xl items-start justify-start  ">
                <span className="flex flex-row items-start font-bold text-2xl gap-2 py-5"> <p>Premium Learning</p> </span>
                <span className="flex flex-row items-start font-bold text-xl gap-2 pb-5"> <p>$20</p> <p className="text-red-600 line-through text-base">{`$40`}</p> <p className="text-red-600  text-xl">{`(50% off)`}</p>  </span>
                <ul className="flex flex-col gap-2 items-start justify-start ">
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Complete Training Pack </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> AI-Assisted Training and Mentorship </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Weekly Graded Tasks + Feedback </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> 1-on-1 troubleshooting meetings </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Unlimited access to final project phase </span></li>
                    <li className="flex flex-row items-center gap-2"> <GoDotFill className="text-lg"/> <span className=" gap-2 items-start justify-start text-base"> Graded Certification </span></li>
                </ul>
                <p className="font-bold">* Active only for the duration of the internship</p>
                <EnrollCourseDialog />

            </div>
        </div>


        <div className="py-10 w-full h-full bg-green-50 flex flex-col gap-5 ">
          <p className="text-3xl font-bold text-center"> Join thousands of global learners</p>
          <p className="text-center">For real, you will work and learn with people around the world.</p>

          <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
            <Image src={winfred} alt="biology" className="rounded-full w-[120px] h-[120px] " />
            <div className="flex flex-col gap-2 ">
              <p className="text-base text-gray-700">{`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}</p>
              <p className="text-base font-bold pt-5">{`Winfred Gatua (Now in University of Bristol, UK)`}</p>
            </div>
          </div>
            <div className="flex items-center justify-center">
            <EnrollCourseDialog />
            </div>
        </div>

      </div>
      
      
    </div>
    {/**Mobile Version */}
      <div className="max-w-full p-4  block md:hidden">

        {/* Hero Section */}
        <div className="flex flex-col gap-5 py-10">
            <p className="text-2xl font-bold">{coursesList[0].title}</p>
            <p className="text-base text-gray-700">{coursesList[0].overview}</p>
            <EnrollCourseDialog />
        </div>

        {/* Course Overview */}
        <div className="flex flex-col gap-5 py-5">
            <p className="text-lg font-bold">Start Now</p>
            <div className="border-2 border-green-600 rounded-lg px-5 py-7">
            <img src={coursesList[0].image} alt="course-image" className="w-16 h-16 border-2 border-green-300 rounded-md mb-4" />
            <p className="text-base font-bold mb-2">{coursesList[0].title}</p>

            <p className="text-sm">{modulesList.length} Lessons</p>
            <div className="mt-4">
                <EnrollCourseDialog />
            </div>
            </div>
        </div>

        {/* Learning Objectives */}
        <div className="py-10">
            <p className="text-2xl font-bold mb-5">What will you learn?</p>
            {modulesList.map((module, idx) => (
            <Accordion key={module.id} type="single" collapsible className="w-full border-b border-gray-200 py-3">
                <AccordionItem value={(module.id ?? '').toString()}>
                <AccordionTrigger className="text-lg font-bold">{idx+1}. {module.title}</AccordionTrigger>
                <AccordionContent className="text-base">
                    <p className="mb-2">{module.description}</p>
                    <ul className="list-disc pl-5 text-sm text-neutral-600">
                    {contentList.filter((content) => content.module === module.id).map((content) => (
                        <li key={content.id}>{content.title}</li>
                    ))}
                    </ul>
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            ))}
        </div>

        {/* Course Description */}
        <div className="py-10">
            <p className="text-2xl font-bold mb-4">Course Description</p>
            <p className="text-base leading-7 mb-4">
                {coursesList[0].description}
            </p>
            <EnrollCourseDialog />
        </div>

        {/* Audience Fit */}
        <div className="py-10">
            <p className="text-3xl font-bold text-center mb-10">Who is this course for?</p>
            <div className="flex flex-col gap-10">
            <div className="border border-green-500 rounded-lg p-5 shadow-md">
                <p className="text-xl font-bold text-green-600 mb-3">You are a great fit if:</p>
                <ul className="list-disc pl-5 text-sm">
                <li>Self-taught learners tired of piecing together random tutorials.</li>
                <li>Ambitious beginners in bioinformatics or data science.</li>
                <li>Researchers/postgrads wanting to build confidence in data analysis.</li>
                <li>Anyone ready to follow a roadmap and build a real portfolio.</li>
                </ul>
            </div>
            <div className="border border-zinc-500 rounded-lg p-5 shadow-md">
                <p className="text-xl font-bold text-red-600 mb-3">You are not a fit if:</p>
                <ul className="list-disc pl-5 text-sm">
                <li>Looking for passive consumption — this is hands-on.</li>
                <li>Expecting instant results — growth is earned.</li>
                <li>Experts seeking deep theory — we focus on applied skills.</li>
                </ul>
            </div>
            </div>
        </div>

        {/* Pricing */}
        <div className="py-10">
            <p className="text-2xl font-bold text-center mb-5">One time pricing, Lifetime Access</p>
            <div className="border border-green-500 rounded-lg p-5 shadow-lg">
            <p className="text-xl font-bold mb-2">Premium Learning</p>
            <span className="flex flex-row items-start font-bold text-4xl gap-2 pb-5"> <p>$20</p> <p className="text-red-600 line-through text-xl">{`$40`}</p> <p className="text-red-600  text-xl">{`(50% off)`}</p>  </span>
            <ul className="list-disc pl-5 mt-4 text-sm">
                <li>Complete Training Pack</li>
                <li>AI-Assisted Training</li>
                <li>Projects + grading + feedback</li>
                <li>Unlimited number to final projects</li>
            </ul>
            <div className="mt-4">
                <EnrollCourseDialog />
            </div>
            </div>
        </div>

        {/* Testimonial */}
        <div className="bg-green-50 py-10 px-5">
            <p className="text-2xl font-bold text-center mb-4">Join thousands of global learners</p>
            <p className="text-center text-sm mb-6">For real, you will work and learn with people around the world.</p>
            <div className="flex flex-col items-center text-center">
            <Image src={winfred} alt="testimonial" className="rounded-full w-24 h-24 mb-4" />
            <p className="text-base italic text-gray-700">
                "My HackBio experience (and preprint) was my leverage for an interesting conversation with my Graduate School Admission Team."
            </p>
            <p className="text-sm font-bold pt-3">Winfred Gatua — University of Bristol, UK</p>
            </div>
            <div className="mt-6 flex justify-center">
            <EnrollCourseDialog />
            </div>
        </div>
        </div>
    </section>
  );
}
