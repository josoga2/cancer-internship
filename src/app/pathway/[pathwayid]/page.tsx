"use client";
import React, {  useEffect, useState } from "react";
import keywords from "../../../../public/keywords.svg"
import Image from "next/image";
import publicApi from "../../../publicApi"
import  Navbar  from "@/components/Nav/navbar";
import { useParams } from "next/navigation";
import Footer from "@/components/Nav/footer";
import UpcomingSection from "@/components/widgets/internship-widget/upcoming";
import UpcomingCourseDescription from "@/components/widgets/internship-widget/upcoming-course-description";
import UpcomingCourseDetails from "@/components/widgets/internship-widget/upcoming-course-details";
import LearningTracks from "@/components/widgets/internship-widget/LearningTracks";
import TestimonialsEnroll from "@/components/widgets/internship-widget/testimonials-enroll";
import OrganizationsTestimonials from "@/components/widgets/home-widgets/org-testimonial-carousel";
import HbPrices from "@/components/all-pricings/preview";
import HbButton from "@/components/widgets/hb-buttons";
import LearningExperience from "@/components/widgets/internship-widget/LearningExperience";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/api";





export default function Page() {
    const params = useParams();
    const pathwayId = Number(params.pathwayid);
    const router = useRouter();

    const [internship, setInternshipList] = useState<Array<{
        id?: string
        title?: string
        description?: string
        published?: boolean
        start_date?: string
        overview?: string
        free?: boolean
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
            free: false,
            lenght_in_weeks: 0,
            int_image: "/",
            courses: [""]
        }
    ]);
    //console.log(internship);
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


    const thisPathwayStatus = internship.find(int => Number(int.id) === Number(pathwayId))?.free;
    const CPathName = internship.find(int => Number(int.id) === Number(pathwayId))?.title
    const CPathOverview = internship.find(int => Number(int.id) === Number(pathwayId))?.overview
    const internshipStatus: string = 'open';

    const handleFreeEnroll = async () => {
        try {
            const response = await api.post('/api/free-enroll-internship/', {
                internship_id: pathwayId,
            });
            if (response.status === 200) {
                alert('Successfully enrolled in the Career Track! You will be redirected to your dashboard now.');
                router.push('/dashboard');
            } else {
                alert('You have to sign in to enroll in this course.');
                router.push('/login');
            }
        } catch (error) {
            alert('You have to sign in to enroll in this course. You will be redirected to sign in now. Kindly come back to enroll after logging in.');
            router.push('/login');
        }
    }

    //console.log(thisPathwayStatus);

    //console.log(coursesList.filter(course => course.published === true));

  return (
    <section>
        <Navbar />
        <main className="hidden md:flex md:max-w-5xl bg md:m-auto md:items-center pt-5 md:justify-between ">
            
        <div className="flex flex-col gap-5">
            <div className="py-5 h-full w-full flex flex-row  pt-10 justify-between items-center">
                <div className="flex flex-col gap-5 max-w-2/5">
                    <p className="text-3xl font-bold text-start">{CPathName} </p>
                    <p className="text-base">{CPathOverview} </p>
                    {thisPathwayStatus? <div><HbButton text="Enroll For Free" type="primary" onClick={()=>handleFreeEnroll()} /> </div> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'career', id:pathwayId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
                </div>
                <Image src={keywords} alt="biology" className="w-2/5" />
            </div>

            <OrganizationsTestimonials />

            {/** Learning Paths */}

            {internship.filter(c => Number(pathwayId) === Number(c.id) ).map((upcoming) => (
            <div key={upcoming.id} className="flex flex-row items-start justify-between gap-10 max-w-full">
                <div className="w-4/5">
                    <UpcomingSection status={upcoming.free || false} id={upcoming.id || ""} start_date={upcoming.start_date || ""} int_image={upcoming.int_image || ""} title={upcoming.title || ""} overview={upcoming.overview || ""} lenght_in_weeks={upcoming.lenght_in_weeks || 1} internshipStatus={internshipStatus} />
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
                    <UpcomingCourseDescription status={upcoming.free || false} id={upcoming.id || ""} description={upcoming.description || ""} internshipStatus={internshipStatus} />
                </div>
            </div>
            ))}


            <TestimonialsEnroll InternshipStatus={internshipStatus}/>
            <div className="w-full flex flex-col items-center justify-center">
                <LearningTracks />
            </div>

            <div className="w-full flex flex-col items-center justify-center">
                {thisPathwayStatus? <Link href="/dashboard"><Button className="px-10 py-6 text-white font-bold text-xl bg-green-600" >Enroll Now</Button></Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'career', id:pathwayId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
            </div>

            {/** who is this internship for?*/}
            <LearningExperience internshipStatus={internshipStatus} />
            <div className="flex flex-col gap-2 items-center justify-start w-full mx-auto px-5 ">
                <span className="flex flex-row items-start font-bold text-2xl gap-2"> <p> The smartest investment for your career journey</p> </span>
                <p className="font-bold pt-5">Gain full access to all our courses and internships (including future ones)... Or just this pathway</p>
                <div className="flex flex-row gap-2 items-start">
                    {/*<FreePrice /> */}
                    {/*<PremiumPrice />*/}
                    <HbPrices plan="Become a Pro" discount={0.5} prog="career" progId={String(pathwayId)}/>
                    <p className="font-bold"></p>
                    <HbPrices plan="Career Pathway" discount={0.5} prog="career" progId={String(pathwayId)}/>
                </div>
            </div>
        </div>
        </main>
        
            {/**MOBILE */}
        <main>
            <div className="flex md:hidden flex-col gap-10 w-full p-5">
                <Image src={keywords} alt="biology" className="w-full" />
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold text-start">{CPathName} </p>
                    <p className="text-sm">{CPathOverview} </p>
                    {thisPathwayStatus? <Link href="/dashboard"><Button className=" py-6 text-white font-bold text-xl bg-green-600" >Enroll Now</Button></Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'career', id:pathwayId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
                </div>

                

                {internship.filter(c => Number(pathwayId) === Number(c.id) ).map((upcoming) => (
                    <div key={upcoming.id} className="flex flex-col gap-5 w-full">
                        <UpcomingSection status={upcoming.free || false} id={upcoming.id || ""} start_date={upcoming.start_date || ""} int_image={upcoming.int_image || ""} title={upcoming.title || ""} overview={upcoming.overview || ""} lenght_in_weeks={upcoming.lenght_in_weeks || 1} internshipStatus={internshipStatus} />
                     

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


                            <UpcomingCourseDescription status={upcoming.free || false} id={upcoming.id || ""} description={upcoming.description || ""} internshipStatus={internshipStatus} />

                        </div>
                    </div>
                ))}

                <TestimonialsEnroll InternshipStatus={internshipStatus}/>
                <LearningTracks />

                <div className="w-full flex flex-col items-center justify-center">
                    {thisPathwayStatus? <Link href="/dashboard"><Button className=" py-6 text-white font-bold text-xl bg-green-600" >Enroll Now</Button></Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'career', id:pathwayId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
                </div>

                <LearningExperience internshipStatus={internshipStatus} />

                <div className="flex flex-col items-center py-10">
                    {thisPathwayStatus? <Link href="/dashboard"><Button className=" py-6 text-white font-bold text-xl bg-green-600" >Enroll Now</Button></Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'career', id:pathwayId } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }
                </div>

                <div className="flex flex-col gap-2 items-center justify-start w-full  ">
                    <span className="flex flex-col items-start font-bold text-2xl gap-2"> <p> The smartest investment for your career journey</p> </span>
                    <p className="text-sm font-bold pt-5">Gain full access to all our courses and internships (including future ones)</p>
                    <div className="flex flex-col gap-2 items-start">
                        {/*<FreePrice /> */}
                        {/*<PremiumPrice />*/}
                        <HbPrices plan="Become a Pro" discount={0.5} prog="career" progId={String(pathwayId)}/>
                        <p className="font-bold text-sm">... Or just this pathway</p>
                        <HbPrices plan="Career Pathway" discount={0.5} prog="career" progId={String(pathwayId)}/>
                    </div>
                </div>
            </div>

        </main>
    <Footer />
    </section>
  );
}
