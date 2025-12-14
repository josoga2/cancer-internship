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
import sm_testimonial from '../../../public/sm_testimonial.svg'
import testimonials from '../../../public/Testimonials.svg'
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import publicApi from "../../publicApi"
import { EnrollDialog } from "@/components/enroll/enroll";
import  Navbar  from "@/components/Nav/navbar";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import ayano from '../../../public/ayano.jpeg'
import adekoya from '../../../public/adekoya.jpeg'
import barve from '../../../public/barve.jpeg'
import Footer from "@/components/Nav/footer";
import { Button } from "@/components/ui/button";
import UpcomingSection from "@/components/widgets/internship-widget/upcoming";
import UpcomingCourseDetails from "@/components/widgets/internship-widget/upcoming-course-details";
import UpcomingCourseDescription from "@/components/widgets/internship-widget/upcoming-course-description";
import HeroSection from "@/components/widgets/internship-widget/HeroSection";
import TestimonialsInterns from "@/components/widgets/home-widgets/testimonials-interns";
import HbButton from "@/components/widgets/hb-buttons";
import LearningTracks from "@/components/widgets/internship-widget/LearningTracks";
import TestimonialsEnroll from "@/components/widgets/internship-widget/testimonials-enroll";
import LearningExperience from "@/components/widgets/internship-widget/LearningExperience";
import FreePrice from "@/components/widgets/internship-widget/PricingFree";
import PremiumPrice from "@/components/widgets/internship-widget/PricingPremium";



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
    const internshipStatus: string = 'open';


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
        <main className="hidden md:flex md:max-w-screen-lg bg md:m-auto md:items-center pt-5 md:justify-between border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
            {/** Hero */}
            <div className="">
                <HeroSection id="hero-section" internshipStatus={internshipStatus} />

                {internship.filter(int => int.published === true).map((upcoming, idx) => (
                    <div key={upcoming.id} className="flex flex-row items-start ">
                        <UpcomingSection id={upcoming.id || ""} start_date={upcoming.start_date || ""} int_image={upcoming.int_image || ""} title={upcoming.title || ""} overview={upcoming.overview || ""} lenght_in_weeks={upcoming.lenght_in_weeks || 1} internshipStatus={internshipStatus} />
                        <div className="flex flex-col gap-5 items-start justify-center w-full overflow-y-auto">
                            <p className="text-2xl font-bold pb-10">What will you learn?</p>
                            
                            {coursesList
                                .filter(course =>{
                                    //upcoming.courses?.filter(upCourse => upCourse.id === course.id)
                                    const courseIds = (upcoming.courses ?? []).filter((id): id is string | number => id !== undefined);
                                    return courseIds.includes(course.id as string | number);    
                                    }
                                )
                                .map((course, n) => (
                                    <div key={course.id}>    
                                        <UpcomingCourseDetails id={course.id as string} n={n} title={course.title || ""} />
                                    </div>
                            ))}
                            <UpcomingCourseDescription description={upcoming.description || ""} internshipStatus={internshipStatus} />
                        </div>
                    </div>
                ))}


                <TestimonialsEnroll InternshipStatus={internshipStatus}/>
                <div className="w-full flex flex-col items-center justify-center">
                    <LearningTracks />
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    {internshipStatus === 'close' && (
                        <HbButton
                            text="Application Closed."
                            type="primary"
                            onClick={() => {
                                if (typeof window !== "undefined") {
                                    window.alert("Application closed! Join us next year");
                                }
                            }}
                        />
                    )}
                    {internshipStatus !== 'close' && <EnrollDialog />}
                </div>

                {/** who is this internship for?*/}
                <LearningExperience internshipStatus={internshipStatus} />
                <div className="flex flex-col gap-2 items-center justify-start w-full mx-auto px-5 ">
                    <span className="flex flex-row items-start font-bold text-2xl gap-2"> <p> Stay at the forefront of AI, Bioinformatics and Data</p> </span>
                    <div className="flex flex-row gap-2 items-start">
                        {/*<FreePrice /> */}
                        <PremiumPrice />
                    </div>
                </div>
            </div>
        </main>
        
        {/**MOBILE */}
        <main>
            <div className="flex md:hidden flex-col gap-10 pt-20 w-full p-5">
                <HeroSection id="hero-section-mobile" internshipStatus={internshipStatus} />

                {internship.filter(int => int.published === true).map((upcoming, idx) => (
                    <div key={upcoming.id} className="flex flex-col gap-5 w-full">
                        <UpcomingSection id={upcoming.id || ""} start_date={upcoming.start_date || ""} int_image={upcoming.int_image || ""} title={upcoming.title || ""} overview={upcoming.overview || ""} lenght_in_weeks={upcoming.lenght_in_weeks || 1} internshipStatus={internshipStatus} />
                        

                        <div className="flex flex-col gap-3">
                            <div className="text-xl font-bold"> <p> {`What will you learn?`} </p> <p className="text-xs py-3 underline font-normal"> {`(click course item to preview)`} </p> </div>
                            {coursesList
                                        .filter(course =>{
                                            //upcoming.courses?.filter(upCourse => upCourse.id === course.id)
                                            const courseIds = (upcoming.courses ?? []).filter((id): id is string | number => id !== undefined);
                                            return courseIds.includes(course.id as string | number);    
                                            }
                                        ).map((course, ndx) => (
                                        <div key={course.id}>    
                                            <UpcomingCourseDetails id={course.id as string} n={ndx} title={course.title || ""} />
                                        </div>
                            ))}


                            <UpcomingCourseDescription description={upcoming.description || ""} internshipStatus={internshipStatus} />

                        </div>
                    </div>
                ))}

                <TestimonialsEnroll InternshipStatus={internshipStatus}/>
                <LearningTracks />

                <div className="w-full flex flex-col items-center justify-center">
                    {internshipStatus === 'close' && (
                        <Button
                            onClick={() => {
                                if (typeof window !== "undefined") {
                                    window.alert("Application closed! Join us next year");
                                }
                            }}
                            className="bg-hb-green text-white"
                        >
                            Application Closed.
                        </Button>
                    )}
                    {internshipStatus !== 'close' && <EnrollDialog />}
                </div>

                <LearningExperience internshipStatus={internshipStatus} />

                <div className="flex flex-col items-center py-10">
                    {internshipStatus === 'close' && (
                        <Button
                            onClick={() => {
                                if (typeof window !== "undefined") {
                                    window.alert("Application closed! Join us next year");
                                }
                            }}
                            className="bg-hb-green text-white"
                        >
                            Application Closed.
                        </Button>
                    )}
                    {internshipStatus !== 'close' && <EnrollDialog />}
                </div>

                <div className="flex flex-col gap-2 items-center justify-start w-full ">
                    <span className="flex flex-row items-start font-bold text-2xl gap-2"> <p> Stay at the forefront of AI, Bioinformatics and Data</p> </span>
                    <div className="flex flex-row gap-2 items-start">
                        {/*<FreePrice /> */}
                        <PremiumPrice />
                    </div>
                </div>
                
            </div>

        </main>
    <Footer />
    </section>
  );
}
