"use client";
import React, {  useEffect, useState } from "react";
import publicApi from "../../publicApi"
import { EnrollDialog } from "@/components/enroll/enroll";
import  Navbar  from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import { Button } from "@/components/ui/button";
import UpcomingSection from "@/components/widgets/internship-widget/upcoming";
import UpcomingCourseDetails from "@/components/widgets/internship-widget/upcoming-course-details";
import UpcomingCourseDescription from "@/components/widgets/internship-widget/upcoming-course-description";
import HeroSection from "@/components/widgets/internship-widget/HeroSection";
import HbButton from "@/components/widgets/hb-buttons";
import LearningTracks from "@/components/widgets/internship-widget/LearningTracks";
import TestimonialsEnroll from "@/components/widgets/internship-widget/testimonials-enroll";
import LearningExperience from "@/components/widgets/internship-widget/LearningExperience";
import FreePrice from "@/components/widgets/internship-widget/PricingFree";
import PremiumPrice from "@/components/widgets/internship-widget/PricingPremium";
import HbPrices from "@/components/all-pricings/preview";
import { number } from "framer-motion";
import Link from "next/link";


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

    const thisInternshipid = internship
    .filter(int => int.published === true)
    .map(int => int.id)

    //console.log(coursesList.filter(course => course.published === true));

  return (
    <section>
        <Navbar />
        <main className="hidden md:flex md:max-w-5xl bg md:m-auto md:items-center p-5 md:justify-between border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
            {/** Hero */}
            <div className="">
                <HeroSection id={String(thisInternshipid) || '0'} internshipStatus={internshipStatus} />

                {internship.filter(int => int.published === true).map((upcoming, idx) => (
                    <div key={upcoming.id} className="flex flex-row items-start justify-between gap-10 max-w-full ">
                        <div  className="w-4/5">
                            <UpcomingSection status={false} id={upcoming.id || ""} start_date={upcoming.start_date || ""} int_image={upcoming.int_image || ""} title={upcoming.title || ""} overview={upcoming.overview || ""} lenght_in_weeks={upcoming.lenght_in_weeks || 1} internshipStatus={internshipStatus} />
                        </div>
                        <div className="flex flex-col gap-5 items-start justify-center w-full ">
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
                            <UpcomingCourseDescription id={upcoming.id || ''} status={false} description={upcoming.description || ""} internshipStatus={internshipStatus} />
                        </div>
                    </div>
                ))}


                <TestimonialsEnroll InternshipStatus={internshipStatus}/>
                <div className="w-full flex flex-col items-center justify-center">
                    <LearningTracks />
                </div>

                <div className="w-full  flex flex-col items-center justify-center">
                    {false? <Link href="/dashboard"><HbButton type="primary" text="Enroll Now" /> </Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'internship', id:String(thisInternshipid) } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
                </div>

                {/** who is this internship for?*/}
                <LearningExperience internshipStatus={internshipStatus} />
                <div className="flex flex-col gap-2 items-center justify-start w-full mx-auto px-5 ">
                    <span className="flex flex-row items-start font-bold text-2xl gap-2"> <p> The smartest investment for your career journey</p> </span>
                    <p className="font-bold pt-5">Gain full access to all our courses and internships (including future ones)... Or just this cohort</p>
                    <div className="flex flex-row gap-2 items-start">
                        {/*<FreePrice /> */}
                        {/*<PremiumPrice />*/}
                        <HbPrices plan="Become a Pro" discount={0.5} prog="internship" progId={String(thisInternshipid)}/>
                        <p className="font-bold"></p>
                        <HbPrices plan="Internship Access" discount={0.5} prog="internship" progId={String(thisInternshipid)}/>
                    </div>
                </div>
            </div>
        </main>
        
        {/**MOBILE */}
        <main>
            <div className="flex md:hidden flex-col gap-10 pt-20 w-full text-sm p-5">
                <HeroSection id="hero-section-mobile" internshipStatus={internshipStatus} />

                {internship.filter(int => int.published === true).map((upcoming, idx) => (
                    <div key={upcoming.id} className="flex flex-col gap-5 w-full">
                        <UpcomingSection status={false} id={upcoming.id || ""} start_date={upcoming.start_date || ""} int_image={upcoming.int_image || ""} title={upcoming.title || ""} overview={upcoming.overview || ""} lenght_in_weeks={upcoming.lenght_in_weeks || 1} internshipStatus={internshipStatus} />
                        

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


                            <UpcomingCourseDescription status={false} id={upcoming.id || ""} description={upcoming.description || ""} internshipStatus={internshipStatus} />

                        </div>
                    </div>
                ))}

                <TestimonialsEnroll InternshipStatus={internshipStatus}/>
                <LearningTracks />

                <div className="w-full  flex flex-col items-center justify-center">
                    {false? <Link href="/dashboard"><HbButton type="primary" text="Enroll Now" /> </Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'internship', id:String(thisInternshipid) } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
                </div>

                <LearningExperience internshipStatus={internshipStatus} />

                <div className="w-full  flex flex-col items-center justify-center">
                    {false? <Link href="/dashboard"><HbButton type="primary" text="Enroll Now" /> </Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'internship', id:String(thisInternshipid) } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
                </div>

                <div className="flex flex-col gap-2 items-center justify-start w-full ">
                    <span className="flex flex-col items-start font-bold text-2xl gap-2"> <p> The smartest investment for your career journey</p> </span>
                    <div className="flex flex-col gap-2 items-start">
                        {/*<FreePrice /> */}
                        {/*<PremiumPrice />*/}
                        <p className="font-bold pt-5">Gain full access to all our courses and internships (including future ones)</p>
                        <HbPrices plan="Become a Pro" discount={0.5} prog="internship" progId={String(thisInternshipid)}/>
                        <HbPrices plan="Internship Access" discount={0.5} prog="internship" progId={String(thisInternshipid)}/>
                    </div>
                </div>
                
            </div>

        </main>
    <Footer />
    </section>
  );
}
