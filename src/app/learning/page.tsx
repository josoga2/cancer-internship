"use client";
import publicApi from "@/publicApi";
import { useState, useEffect } from "react";
import keywords from "../../../public/keywords.svg"
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import OrganizationsTestimonials from "@/components/widgets/home-widgets/org-testimonial-carousel";
import { ArrowDown, ArrowRight, Sparkle } from "lucide-react";
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
        free?: boolean
    }>>([
        {
            id: "",
            title: "",
            description: "",
            overview: "",
            published: false,
            image: "https://hbapi.jisender.com/media/course_images/biology.png",
            free: false
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
            <div className="py-5 h-full w-full flex flex-row justify-center items-center">
                <div className="flex flex-col gap-5">
                <p className="text-3xl font-bold text-center">Career Pathways.</p>
                <p className="text-lg text-center">Build your career, Step by step, one skill at a time</p>
                </div>
                
            </div>


          {/** Learning Paths */}
          {/**Beginners */}
          <div className="flex flex-col items-center  ">
            <hr className=" pt-10" />
            <div className="">
            <div className="flex flex-col flex-nowrap gap-4">
              <span className="text-sm font-bold text-gray-500 flex pl-5 flex-row gap-5">BEGINNER </span> 
              {pathway
                .filter(pw => pw.complexity_level === "Beginner")
                .map((learning) => (
                <div key={learning.id} className="py-5 w-full flex flex-row gap-5 justify-start items-center ">
                  <div className="flex flex-col gap-10 w-full  rounded p-5">
                    <div className="flex flex-row gap-5 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                      <img src={learning.int_image} alt="learning_image" width={64} height={64} className="w-24 h-24" />
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <p className="text-base font-bold">{learning.title}</p>
                        <p className="text-sm">{learning.overview}</p>
                      </div>
                    </div>
                
                    <div className="flex border p-2 flex-row flex-nowrap gap-4 overflow-x-auto w-220 scrollbar-thin">
                      {coursesList
                        .filter(course => {
                        const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                        return courseIds.includes(course.id as string | number);
                        })
                        .map((course, ind) => (
                          <div key={course.id} className=" flex items-center gap-4">
                            <div className="w-64 shrink-0 flex gap-2 items-center border p-2 rounded-lg bg-zinc-100 hover:shadow cursor-pointer" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                              <img src={course.image} alt="biology" className="rounded-md h-20 w-20 object-cover border"/>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm w-fit hover:cursor-pointer hover:underline">{course.title}</p>
                                <p className="text-xs w-fit bg-hb-lightgreen text-hb-green">{course.free ? "Free" : "Paid"}</p>
                              </div>
                              
                            </div>
                            {ind !== ((learning.courses?.length ?? 1) -1) && (
                              <div> <ArrowRight className="text-hb-green" /> </div>
                            )}
                        </div>

                      ))}
                    </div>
                  </div>
                </div> 
              ))}
            </div>
              
              
          </div>

          {/**Intermediate */}
          <div className="flex flex-col items-center  ">
            <hr className=" pt-10" />
            <div className="flex flex-col flex-nowrap gap-4">
              <span className="text-sm font-bold text-gray-500 flex pl-5 flex-row gap-5">INTERMEDIATE </span> 
              {pathway
                .filter(pw => pw.complexity_level === "Intermediate")
                .map((learning) => (
                <div key={learning.id} className="py-5 w-full flex flex-row gap-5 justify-start items-center ">
                  <div className="flex flex-col gap-10 w-full  rounded p-5">
                    <div className="flex flex-row gap-5 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                      <img src={learning.int_image} alt="learning_image" width={64} height={64} className="w-24 h-24" />
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <p className="text-base font-bold">{learning.title}</p>
                        <p className="text-sm">{learning.overview}</p>
                      </div>
                    </div>
                
                    <div className="flex border p-2 flex-row flex-nowrap gap-4 overflow-x-auto w-220 scrollbar-thin">
                      {coursesList
                        .filter(course => {
                        const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                        return courseIds.includes(course.id as string | number);
                        })
                        .map((course, ind) => (
                          <div key={course.id} className=" flex items-center gap-4">
                            <div className="w-64 shrink-0 flex gap-2 items-center border p-2 rounded-lg bg-zinc-100 hover:shadow cursor-pointer" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                              <img src={course.image} alt="biology" className="rounded-md h-20 w-20 object-cover border"/>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm w-fit hover:cursor-pointer hover:underline">{course.title}</p>
                                <p className="text-xs w-fit bg-hb-lightgreen text-hb-green">{course.free ? "Free" : "Paid"}</p>
                              </div>
                              
                            </div>
                            {ind !== ((learning.courses?.length ?? 1) -1) && (
                              <div> <ArrowRight className="text-hb-green" /> </div>
                            )}
                        </div>

                      ))}
                    </div>
                  </div>
                </div> 
              ))}
            </div>
          </div>

          {/**Advanced */}
          <div className="flex flex-col items-center  ">
            <hr className=" pt-10" />
            <div className="">
            <div className="flex flex-col flex-nowrap gap-4">
              <span className="text-sm font-bold text-gray-500 flex pl-5 flex-row gap-5">ADVANCED </span> 
              {pathway
                .filter(pw => pw.complexity_level === "Advanced")
                .map((learning) => (
                <div key={learning.id} className="py-5 w-full flex flex-row gap-5 justify-start items-center ">
                  <div className="flex flex-col gap-10 w-full  rounded p-5">
                    <div className="flex flex-row gap-5 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                      <img src={learning.int_image} alt="learning_image" width={64} height={64} className="w-24 h-24" />
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <p className="text-base font-bold">{learning.title}</p>
                        <p className="text-sm">{learning.overview}</p>
                      </div>
                    </div>
                
                    <div className="flex border p-2 flex-row flex-nowrap gap-4 overflow-x-auto w-220 scrollbar-thin">
                      {coursesList
                        .filter(course => {
                        const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                        return courseIds.includes(course.id as string | number);
                        })
                        .map((course, ind) => (
                          <div key={course.id} className=" flex items-center gap-4">
                            <div className="w-64 shrink-0 flex gap-2 items-center border p-2 rounded-lg bg-zinc-100 hover:shadow cursor-pointer" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                              <img src={course.image} alt="biology" className="rounded-md h-20 w-20 object-cover border"/>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm w-fit hover:cursor-pointer hover:underline">{course.title}</p>
                                <p className="text-xs w-fit bg-hb-lightgreen text-hb-green">{course.free ? "Free" : "Paid"}</p>
                              </div>
                              
                            </div>
                            {ind !== ((learning.courses?.length ?? 1) -1) && (
                              <div> <ArrowRight className="text-hb-green" /> </div>
                            )}
                        </div>

                      ))}
                    </div>
                  </div>
                </div> 
              ))}
            </div>
              
              
          </div>
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
              <p className="text-2xl font-bold">Career Pathways</p>
              <p className="text-base text-gray-600">Build your career, Step by step, one skill at a time</p>
          </div>

          
          {/**Beginners */}
          <div className="flex flex-col items-center  ">
            <hr className=" pt-10" />
            <div className="">
            <div className="flex flex-col flex-nowrap gap-4">
              <span className="text-sm font-bold text-gray-500 flex pl-5 flex-row gap-5">BEGINNER </span> 
              {pathway
                .filter(pw => pw.complexity_level === "Beginner")
                .map((learning) => (
                <div key={learning.id} className="py-5 w-full flex flex-col gap-5 justify-start items-center ">
                  <div className="flex flex-col gap-10 w-full  rounded p-5">
                    <div className="flex flex-row gap-5 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <p className="text-base font-bold">{learning.title}</p>
                        <p className="text-sm">{learning.overview}</p>
                      </div>
                    </div>
                
                    <div className="flex border p-2 flex-col flex-nowrap gap-4   scrollbar-thin">
                      {coursesList
                        .filter(course => {
                        const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                        return courseIds.includes(course.id as string | number);
                        })
                        .map((course, ind) => (
                          <div key={course.id} className=" flex flex-col items-center gap-4">
                            <div className="w-64 shrink-0 flex gap-2 items-center border p-2 rounded-lg bg-zinc-100 hover:shadow cursor-pointer" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                              <img src={course.image} alt="biology" className="rounded-md h-20 w-20 object-cover border"/>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm w-fit hover:cursor-pointer hover:underline">{course.title}</p>
                                <p className="text-xs w-fit bg-hb-lightgreen text-hb-green">{course.free ? "Free" : "Paid"}</p>
                              </div>
                              
                            </div>
                            {ind !== ((learning.courses?.length ?? 1) -1) && (
                              <div> <ArrowDown className="text-hb-green" /> </div>
                            )}
                        </div>

                      ))}
                    </div>
                  </div>
                </div> 
              ))}
            </div>
              
              
          </div>

          {/**Intermediate */}
          <div className="flex flex-col items-center  ">
            <hr className=" pt-10" />
            <div className="">
            <div className="flex flex-col flex-nowrap gap-4">
              <span className="text-sm font-bold text-gray-500 flex pl-5 flex-row gap-5">INTERMEDIATE </span> 
              {pathway
                .filter(pw => pw.complexity_level === "Intermediate")
                .map((learning) => (
                <div key={learning.id} className="py-5 w-full flex flex-col gap-5 justify-start items-center ">
                  <div className="flex flex-col gap-10 w-full  rounded p-5">
                    <div className="flex flex-row gap-5 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <p className="text-base font-bold">{learning.title}</p>
                        <p className="text-sm">{learning.overview}</p>
                      </div>
                    </div>
                
                    <div className="flex border p-2 flex-col flex-nowrap gap-4   scrollbar-thin">
                      {coursesList
                        .filter(course => {
                        const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                        return courseIds.includes(course.id as string | number);
                        })
                        .map((course, ind) => (
                          <div key={course.id} className=" flex flex-col items-center gap-4">
                            <div className="w-64 shrink-0 flex gap-2 items-center border p-2 rounded-lg bg-zinc-100 hover:shadow cursor-pointer" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                              <img src={course.image} alt="biology" className="rounded-md h-20 w-20 object-cover border"/>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm w-fit hover:cursor-pointer hover:underline">{course.title}</p>
                                <p className="text-xs w-fit bg-hb-lightgreen text-hb-green">{course.free ? "Free" : "Paid"}</p>
                              </div>
                              
                            </div>
                            {ind !== ((learning.courses?.length ?? 1) -1) && (
                              <div> <ArrowDown className="text-hb-green" /> </div>
                            )}
                        </div>

                      ))}
                    </div>
                  </div>
                </div> 
              ))}
            </div>
              
              
            </div>
          </div>

          <div className="flex flex-col items-center  ">
            <hr className=" pt-10" />
            <div className="">
            <div className="flex flex-col flex-nowrap gap-4">
              <span className="text-sm font-bold text-gray-500 flex pl-5 flex-row gap-5">ADVANCED </span> 
              {pathway
                .filter(pw => pw.complexity_level === "Advanced")
                .map((learning) => (
                <div key={learning.id} className="py-5 w-full flex flex-col gap-5 justify-start items-center ">
                  <div className="flex flex-col gap-10 w-full  rounded p-5">
                    <div className="flex flex-row gap-5 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
                      <div className="flex flex-col gap-2 items-start justify-center">
                        <p className="text-base font-bold">{learning.title}</p>
                        <p className="text-sm">{learning.overview}</p>
                      </div>
                    </div>
                
                    <div className="flex border p-2 flex-col flex-nowrap gap-4   scrollbar-thin">
                      {coursesList
                        .filter(course => {
                        const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                        return courseIds.includes(course.id as string | number);
                        })
                        .map((course, ind) => (
                          <div key={course.id} className=" flex flex-col items-center gap-4">
                            <div className="w-64 shrink-0 flex gap-2 items-center border p-2 rounded-lg bg-zinc-100 hover:shadow cursor-pointer" key={course.id} onClick={() => router.push(`/pathway/${learning.id}`)}>
                              <img src={course.image} alt="biology" className="rounded-md h-20 w-20 object-cover border"/>
                              <div className="flex flex-col gap-2">
                                <p className="text-sm w-fit hover:cursor-pointer hover:underline">{course.title}</p>
                                <p className="text-xs w-fit bg-hb-lightgreen text-hb-green">{course.free ? "Free" : "Paid"}</p>
                              </div>
                              
                            </div>
                            {ind !== ((learning.courses?.length ?? 1) -1) && (
                              <div> <ArrowDown className="text-hb-green" /> </div>
                            )}
                        </div>

                      ))}
                    </div>
                  </div>
                </div> 
              ))}
            </div>
              
              
          </div>
          </div>

          </div>

          <TestimonialsInterns />
          
          <div className="flex flex-col gap-2 items-center justify-center">
              {/*<FreePrice /> */}
              {/*<PremiumPrice />*/}
              <p className="font-bold pt-5">Gain full access to all our courses and internships (including future ones).</p>
              <HbPrices plan="Become a Pro" discount={0.5} progId="pathway" prog="2"/>
          </div>
          
        

        </div>
        <Footer />

    </section>

  );
}
