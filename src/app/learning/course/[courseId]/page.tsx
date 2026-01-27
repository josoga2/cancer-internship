"use client";
import { useEffect, useState } from "react";
import keywords from "../../../../../public/keywords.svg"
import Image from "next/image";
import {useParams } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import publicApi from "@/publicApi";
import Navbar from "@/components/Nav/navbar";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { Button } from "@/components/ui/button";
import Footer from "@/components/Nav/footer";
import OrganizationsTestimonials from "@/components/widgets/home-widgets/org-testimonial-carousel";
import LearningTracks from "@/components/widgets/internship-widget/LearningTracks";
import TestimonialsEnroll from "@/components/widgets/internship-widget/testimonials-enroll";
import React from "react";
import LearningExperience from "@/components/widgets/internship-widget/LearningExperience";
import HbPrices from "@/components/all-pricings/preview";
import Link from "next/link";
import HbButton from "@/components/widgets/hb-buttons";
import api from "@/api";
import { useRouter } from "next/navigation";



export default function Page() {

    const [coursesList, setCoursesList] = useState<Array<{
        id?: number | string
        title?: string
        description?: string
        overview?: string
        published?: boolean
        free?: boolean
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
            free: true,
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
    const router = useRouter();

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

    const handleFreeEnroll = async () => {
        try {
            const response = await api.post('/api/free-enroll-course/', {
                courseid: courseId,
            });
            if (response.status === 200) {
                alert('Successfully enrolled in the course!');
                router.push('/dashboard');
            } else {
                alert('You have to sign in to enroll in this course.');
                router.push('/login');
            }
        } catch (error) {
            alert('You have to sign in to enroll in this course. You will be redirected to the login page. Kindly come back to enroll after logging in.');
            router.push('/login');
        }
    }

    //console.log(coursesList);
    const internshipStatus: string = 'open';



  return (
    <section>
        <Navbar />
        <div className="hidden md:flex md:max-w-5xl bg md:m-auto md:items-center pt-24 md:justify-between">
        
        <div className=" ">

        <div className="py-5 h-full w-full flex flex-row justify-between items-center">
            <div className="flex flex-col gap-5 max-w-2/5">
                <p className="text-3xl font-bold text-start"> {coursesList[0].title} </p>
                <p className="text-base "> {coursesList[0].overview} </p>
                {coursesList[0].free? <div><HbButton text="Enroll For Free" type="primary" onClick={()=>handleFreeEnroll()} /> </div> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'course', id:courseId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
            
            </div>
            <Image src={keywords} alt="biology" className="w-2/5" />
        </div>

        {/** Learning Paths */}
        <OrganizationsTestimonials />


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
                        {coursesList[0].free? <div><HbButton text="Enroll For Free" type="primary" onClick={()=>handleFreeEnroll()} /> </div> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'course', id:courseId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }

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
                            {coursesList[0].free? <div><HbButton text="Enroll For Free" type="primary" onClick={()=>handleFreeEnroll()} /> </div> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'course', id:courseId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }

                        </div>

                        
                    </div>
                </div>
                
            </div>
        </div>
        
        {/** who is this internship for?*/}
        <TestimonialsEnroll InternshipStatus={internshipStatus}/>
        <div className="w-full flex flex-col items-center justify-center">
            <LearningTracks />
            {coursesList[0].free? <div><HbButton text="Enroll For Free" type="primary" onClick={()=>handleFreeEnroll()} /> </div> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'course', id:courseId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
        </div>

        
        <LearningExperience internshipStatus={internshipStatus}/>
        <div className="w-full flex flex-col items-center justify-center">
            {coursesList[0].free? <div><HbButton text="Enroll For Free" type="primary" onClick={()=>handleFreeEnroll()} /> </div> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'course', id:courseId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
        </div>
        <p className="font-bold pt-5 text-center w-full">Gain full access to all our courses and internships (including future ones).</p>
        <div className="flex flex-row gap-2 items-center justify-center">
              {/*<FreePrice /> */}
              {/*<PremiumPrice />*/}
            
            <HbPrices plan="Become a Pro" discount={0.5}  prog="course" progId={String(courseId)}/>
            <HbPrices plan="Course Access" discount={0.5} prog="course" progId={String(courseId)}/>
        </div>

      </div>
      
      
    </div>
    {/**Mobile Version */}
      <div className="max-w-full p-4 pt-16 flex flex-col gap-5 md:hidden">

        {/* Hero Section */}
        <div className="flex flex-col gap-5 py-10">
            <p className="text-2xl font-bold">{coursesList[0].title}</p>
            <p className="text-base text-gray-700">{coursesList[0].overview}</p>
            {coursesList[0].free? <Link href="/dashboard"><Button className="px-10 py-6 text-white font-bold text-xl bg-green-600" >Enroll Now</Button></Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'course', id:courseId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
        </div>

        <OrganizationsTestimonials />
        {/* Course Overview */}
        <div className="flex flex-col gap-5 py-5">
            <p className="text-lg font-bold">Start Now</p>
            <div className="border-2 border-green-600 rounded-lg px-5 py-7">
            <img src={coursesList[0].image} alt="course-image" className="w-16 h-16 border-2 border-green-300 rounded-md mb-4" />
            <p className="text-base font-bold mb-2">{coursesList[0].title}</p>

            <p className="text-sm">{modulesList.length} Lessons</p>
            <div className="mt-4">
                {coursesList[0].free? <Link href="/dashboard"><Button className="px-10 py-6 text-white font-bold text-xl bg-green-600" >Enroll Now</Button></Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'course', id:courseId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
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
            {coursesList[0].free? <Link href="/dashboard"><Button className="px-10 py-6 text-white font-bold text-xl bg-green-600" >Enroll Now</Button></Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'course', id:courseId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
        </div>

            {/* Organizations */}
            <TestimonialsEnroll InternshipStatus={internshipStatus}/>
            <div className="w-full flex flex-col items-center justify-center">
                <LearningTracks />
            </div>

            <LearningExperience internshipStatus={internshipStatus}/>
            <p className="font-bold pt-5 text-center w-full">Gain full access to all our courses and internships (including future ones).</p>
            <div className="flex flex-col gap-2 items-center justify-center">
                {/*<FreePrice /> */}
                {/*<PremiumPrice />*/}
                
                <HbPrices plan="Become a Pro" discount={0.5} prog="course" progId={String(courseId)} />
                <HbPrices plan="Course Access" discount={0.5}  prog="course" progId={String(courseId)}/>
            </div>
        </div>
        <Footer />
    </section>
  );
}
