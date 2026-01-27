"use client";
import publicApi from "@/publicApi";
import { useState, useEffect } from "react";
import keywords from "../../../public/keywords.svg"
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import OrganizationsTestimonials from "@/components/widgets/home-widgets/org-testimonial-carousel";
import { Sparkle } from "lucide-react";
import TestimonialsInterns from "@/components/widgets/home-widgets/testimonials-interns";
import HbPrices from "@/components/all-pricings/preview";
import React from "react";


export default function Learning() {
    const router = useRouter();

    const [pathway, setPathwayList] = useState<Array<{
        id?: string
        title?: string
        free?: boolean
        overview?: string
        published?: boolean
        int_image?: string
        finished?: boolean
        complexity_level?: string
        courses?: Array<string | number>
    }>>([
        {
            id: "",
            title: "",
            free: false,
            overview: "",
            published: false,
            finished: false,
            complexity_level: "beginner",
            int_image: "https://hbapi.jisender.com/media/internship_images/drugs.jpg",
            courses: [""]
        }
    ]);

    const [coursesList, setCoursesList] = useState<Array<{
        id?: number | string
        title?: string
        description?: string
        published?: boolean
        overview?: string
        image?: string
    }>>([
        {
            id: "",
            title: "",
            description: "",
            overview: "",
            published: false,
            image: "https://hbapi.jisender.com/media/course_images/biology.png"
        }
    ]);
    //console.log(pathway);
    //console.log(coursesList);

    // Fetch courses from the public API
    useEffect(() => {
        const fetchPathways = async () => {
            try {
                const response = await publicApi.get('/api/internships/');
                if (response.status === 200) {
                    setPathwayList(response.data);
                } else {
                    console.error('Failed to fetch internships:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching internships:', error);
            }
        };
        fetchPathways();
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

  return (
    <section>
        <Navbar />
        <div className="hidden md:flex md:max-w-5xl bg md:m-auto md:items-center pt-24 md:justify-between ">

        <div className=" p-5 ">
            <div className="py-5 h-full w-full flex flex-row justify-between items-center">
                <div className="flex flex-col gap-5">
                <p className="text-3xl font-bold text-start">This is where to start!</p>
                <p className="text-lg">Build your career, Step by step, one skill at a time</p>
                </div>
                <Image src={keywords} alt="biology" className="w-2/4" />
            </div>

          {/* Organizations */}
          <OrganizationsTestimonials />

          {/** Learning Paths */}
          {/**Beginners */}
          <div className="flex flex-col bg-hb-lightgreen">
            <hr className="border-t  pt-10" />
            <div className="bg-hb-lightgreen">
              <span className="text-4xl font-extralight text-gray-500 pl-10 pb-10 flex flex-row gap-5">Beginners <Sparkle className="text-base" /> </span> 
              {pathway
                .filter(pw => pw.complexity_level === "Beginner")
                .map((learning) => (
                <div key={learning.id} className="py-5 w-full flex flex-row gap-5 justify-start items-center p-10">
                  <div className="flex flex-col gap-10 w-full">
                    <div className="flex flex-row gap-10 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                      <img src={learning.int_image} alt="learning_image" width={64} height={64} className="w-24 h-24" />
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <p className="text-2xl font-bold">{learning.title}</p>
                        <p className="text-base">{learning.overview}</p>
                      </div>
                    </div>
                
                    <div className=" w-full  rounded-xl h-full flex flex-row flex-nowrap gap-10 items-start ">
                      {coursesList
                        .filter(course => {
                        const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                        return courseIds.includes(course.id as string | number);
                        })
                        .map(course => (
                        <div className="flex flex-col h-45 w-40 gap-2 items-start border p-2 hover:shadow rounded-lg bg-zinc-100 justify-start hover:cursor-pointer hover:underline" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                          <img src={course.image} alt="biology" className="rounded-md h-20 w-20 object-cover border"/>
                          <p className="text-sm w-full">{course.title}</p>
                        </div>
                      ))}
                    </div>
                    <hr className="border-t  pt-10" />
                  </div>
                </div> 
              ))}
            </div>

          {/**Intermediate */}
          <div className="bg-white">
          <hr className="border-t  pt-10" />
            <span className="text-4xl font-extralight text-gray-500 pl-10 pb-10 flex flex-row gap-1">Intermediate <Sparkle className="text-base" /> <Sparkle className="text-base" /></span> 
            {pathway
              .filter(pw => pw.complexity_level === "Intermediate")
              .map((learning) => (
              <div key={learning.id} className="py-5 w-full flex flex-row gap-5 justify-start items-center p-10">
                <div className="flex flex-col gap-10 w-full">
                  <div className="flex flex-row gap-10 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                    <img src={learning.int_image} alt="learning_image" width={64} height={64} className="w-24 h-24" />
                    <div className="flex flex-col gap-2 items-start justify-center">
                      <p className="text-2xl font-bold">{learning.title}</p>
                      <p className="text-base">{learning.overview}</p>
                    </div>
                  </div>
              
                  <div className=" w-full  rounded-xl h-full flex flex-row flex-nowrap gap-10 items-start ">
                    {coursesList
                      .filter(course => {
                      const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                      return courseIds.includes(course.id as string | number);
                      })
                      .map(course => (
                      <div className="flex flex-col h-45 w-40 gap-2 items-start border p-2 hover:shadow rounded-lg bg-hb-lightgreen justify-start hover:cursor-pointer hover:underline" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                        <img src={course.image} alt="biology" className="rounded-md h-20 w-20 object-cover border"/>
                        <p className="text-sm w-full">{course.title}</p>
                      </div>
                    ))}
                  </div>
                  <hr className="border-t  " />
                </div>
                <hr className="border" />
              </div> 
            ))}
            </div>

          {/**Advanced */}
          <div className="bg-hb-lightgreen">
          <hr className="border-t  pt-10" />
            <span className="text-4xl font-extralight text-gray-500 pl-10 pb-10 flex flex-row gap-1">Advanced <Sparkle className="text-base" /><Sparkle className="text-base" /><Sparkle className="text-base" /> </span> 
            {pathway
              .filter(pw => pw.complexity_level === "Advanced")
              .map((learning) => (
              <div key={learning.id} className="py-5 w-full flex flex-row gap-5 justify-start items-center p-10">
                <div className="flex flex-col gap-10 w-full">
                  <div className="flex flex-row gap-10 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                    <img src={learning.int_image} alt="learning_image" width={64} height={64} className="w-24 h-24" />
                    <div className="flex flex-col gap-2 items-start justify-center">
                      <p className="text-2xl font-bold">{learning.title}</p>
                      <p className="text-base">{learning.overview}</p>
                    </div>
                  </div>
              
                  <div className=" w-full  rounded-xl h-full flex flex-row flex-nowrap gap-10 items-start ">
                    {coursesList
                      .filter(course => {
                      const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                      return courseIds.includes(course.id as string | number);
                      })
                      .map(course => (
                      <div className="flex flex-col h-45 w-40 gap-2 items-start bg-zinc-100 border p-2 hover:shadow rounded-lg justify-start hover:cursor-pointer hover:underline" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                        <img src={course.image} alt="biology" className="rounded-md h-20 w-20 object-cover border"/>
                        <p className="text-sm w-full">{course.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div> 
            ))}
            
            </div>
          </div>

          <TestimonialsInterns />

          <div className="flex flex-col gap-2 items-center justify-center">
              {/*<FreePrice /> */}
              {/*<PremiumPrice />*/}
              <p className="font-bold pt-5">Gain full access to all our courses and internships (including future ones).</p>
              <HbPrices plan="Become a Pro" discount={0.5} progId="" prog=""/>
          </div>
        </div>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden px-4 py-20 space-y-8">
          <div className="flex flex-col items-center text-center gap-5">
              <Image src={keywords} alt="biology" className="w-full pt-5" />
              <p className="text-2xl font-bold">Career Paths</p>
              <p className="text-base text-gray-600">Step by step, one skill at a time</p>
          </div>

          {/* Organizations */}
          <OrganizationsTestimonials />
          
          <div className="flex flex-col bg-hb-lightgreen p-2">
            <hr className="border-t " />
            <div className="bg-hb-lightgreen">
              <span className="text-2xl p-2 font-extralight text-gray-500  flex flex-row gap-5">Beginners <Sparkle className="text-base" /> </span> 
              {pathway
                .filter(pw => pw.complexity_level === "Beginner")
                .map((learning) => (
                <div key={learning.id} className="py-5 w-full flex flex-col gap-5 justify-start items-center px-2">
                  <div className="flex flex-col gap-10 w-full">
                    <div className="flex flex-col gap-10 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                      <img src={learning.int_image} alt="learning_image" width={40} height={40} className="w-16 h-16" />
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <p className="text-base font-bold">{learning.title}</p>
                        <p className="text-sm">{learning.overview}</p>
                      </div>
                    </div>
                
                    <div className=" w-full  rounded-xl h-full flex flex-col flex-nowrap gap-5 items-center justify-center ">
                      {coursesList
                        .filter(course => {
                        const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                        return courseIds.includes(course.id as string | number);
                        })
                        .map(course => (
                        <div className="flex flex-col h-fit w-45 gap-5 items-center border p-2 hover:shadow rounded-lg bg-zinc-100 justify-start hover:cursor-pointer hover:underline" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                          <img src={course.image} alt="biology" className="rounded-md h-35 w-40 object-cover border"/>
                          <p className="text-sm text-center w-full">{course.title}</p>
                        </div>
                      ))}
                    </div>
                    <hr className="border-t  pt-10" />
                  </div>
                </div> 
              ))}
            </div>

          {/**Intermediate */}
          <div className="bg-white">
          <hr className="border-t  p-2" />
            <span className="text-2xl font-extralight text-gray-500 items-start flex flex-row gap-1 p-2">Intermediate <Sparkle className="text-xs" /> <Sparkle className="text-xs" /></span> 
            {pathway
              .filter(pw => pw.complexity_level === "Intermediate")
              .map((learning) => (
              <div key={learning.id} className="py-5 w-full flex flex-col gap-5 justify-center items-center p-2">
                <div className="flex flex-col gap-10 w-full">
                  <div className="flex flex-col gap-10 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                    <img src={learning.int_image} alt="learning_image" width={40} height={40} className="w-16 h-16" />
                    <div className="flex flex-col gap-2 items-start justify-center">
                      <p className="text-base font-bold">{learning.title}</p>
                      <p className="text-sm">{learning.overview}</p>
                    </div>
                  </div>
              
                  <div className=" w-full rounded-xl h-full flex flex-col flex-nowrap gap-5 items-center ">
                    {coursesList
                      .filter(course => {
                      const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                      return courseIds.includes(course.id as string | number);
                      })
                      .map(course => (
                      <div className="flex flex-col h-fit w-45 gap-5 items-center border p-2 hover:shadow rounded-lg bg-hb-lightgreen justify-start hover:cursor-pointer hover:underline" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                        <img src={course.image} alt="biology" className="rounded-md h-35 w-40 object-cover border"/>
                        <p className="text-sm text-center w-full">{course.title}</p>
                      </div>
                    ))}
                  </div>
                  <hr className="border-t  " />
                </div>
                <hr className="border" />
              </div> 
            ))}
            </div>

          {/**Advanced */}
          <div className="bg-hb-lightgreen">
          <hr className="border-t " />
            <span className="text-2xl p-2 font-extralight text-gray-500 flex flex-row gap-1">Advanced <Sparkle className="text-base" /><Sparkle className="text-base" /><Sparkle className="text-base" /> </span> 
            {pathway
              .filter(pw => pw.complexity_level === "Advanced")
              .map((learning) => (
              <div key={learning.id} className="py-5 w-full flex flex-col gap-5 justify-start items-center ">
                <div className="flex flex-col gap-10 w-full">
                  <div className="flex flex-col gap-10 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                    <img src={learning.int_image} alt="learning_image" width={40} height={40} className="w-16 h-16" />
                    <div className="flex flex-col gap-2 items-start justify-center">
                      <p className="text-base font-bold">{learning.title}</p>
                      <p className="text-sm">{learning.overview}</p>
                    </div>
                  </div>
              
                  <div className=" w-full items-center rounded-xl h-full flex flex-col flex-nowrap gap-10  ">
                    {coursesList
                      .filter(course => {
                      const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                      return courseIds.includes(course.id as string | number);
                      })
                      .map(course => (
                      <div className="flex flex-col h-fit w-45 gap-5 items-center bg-zinc-100 border p-2 hover:shadow rounded-lg justify-start hover:cursor-pointer hover:underline" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                        <img src={course.image} alt="biology" className="rounded-md h-40 w-50 object-cover border"/>
                        <p className="text-sm w-full">{course.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div> 
            ))}
            
            </div>
          </div>

          <TestimonialsInterns />
          
          <div className="flex flex-col gap-2 items-center justify-center">
              {/*<FreePrice /> */}
              {/*<PremiumPrice />*/}
              <p className="font-bold pt-5">Gain full access to all our courses and internships (including future ones).</p>
              <HbPrices plan="Become a Pro" discount={0.5} progId="" prog=""/>
          </div>
          
        

        </div>
        <Footer />

    </section>

  );
}
