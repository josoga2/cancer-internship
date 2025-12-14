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
        <main className="hidden md:flex md:max-w-screen-lg bg md:m-auto md:items-center pt-5 md:justify-between">
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
                <LearningTracks />

                <div className="w-full flex flex-col items-center justify-center py-10">
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
                <div className="flex flex-col gap-2 items-center justify-start w-full mx-auto px-5 py-20">
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


                            <div  className="py-5 flex flex-col gap-5 items-start justify-start w-full">
                                <p className="text-2xl font-bold">Description</p>
                                <div className="prose">
                                <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{upcoming.description}</Markdown>
                                </div>
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

                        </div>
                    </div>
                ))}

                <div className="flex flex-col gap-5 py-5 items-center justify-start w-full">
                {/**1 */}
                <div className="flex flex-col gap-10 items-center bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
                <Image src={winfred} alt="biology" className="rounded-full w-[100px]" />
                <div className="flex flex-col gap-2 items-center justify-center">
                    <p className="text-sm text-gray-700">{`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}</p>
                    <p className="text-base font-bold pt-5  text-center">{`Winfred Gatua (Now a bioinformatician at in University of Bristol, UK)`}</p>
                </div>
                </div>


            
                {/**2 */}
                <div className="flex flex-col gap-10 items-center bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
                <Image src={ayano} alt="biology" className="rounded-full w-[100px]" />
                <div className="flex flex-col gap-2 items-center justify-center">
                    <p className="text-sm text-gray-700">{`"Through the [internship], I was introduced to the world of genomics and bioinformatics, gaining hands-on experience with tools and pipeline development that gave me a strong foundation. That single event helped me clarify my interests and set me on the data-driven biomedica path I walk today. I will always be grateful to the access, exposure and direction that came from that one LinkedIn post."`}</p>
                    <p className="text-base font-bold pt-5  text-center">{`Temitope Ayano (Now a Data Analyst at GFA Tech, Nigeria)`}</p>
                </div>

                </div>
            
                {/**3 */}
                <div className="flex flex-col gap-10 items-center bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
                <Image src={adekoya} alt="adekoya" className="rounded-full w-[100px]" />
                <div className="flex flex-col gap-2 items-center justify-center">
                    <p className="text-sm text-gray-700">{`"HackBio provided me with my first real-world bioinformatics project, allowing me to apply the skills I had been learning in a meaningful way. The experience bridged the gap between theory and practice, and completing the project gave me a huge confidence boost. The training phase at HackBio was also highly motivating, with constant help from mentors. It reinforced the importance of community and mentorship in learning technical skills."`}</p>
                    <p className="text-base font-bold pt-5  text-center">{`Aanuoluwa Adekoya (Now a bioinformatician at in University of Tennessee, Knoxville, USA.)`}</p>
                </div>
                </div>

                {/**4 */}
                <div className="flex flex-col gap-10 items-center bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
                <Image src={barve} alt="barve" className="rounded-full w-[100px]" />
                <div className="flex flex-col gap-2 items-center justify-center ">
                    <p className="text-sm text-gray-700">{`"[I] started without a programming background. HackBio played a crucial role in my growth in bioinformatics by giving me hands-on experince in metagenomics analysis, team collaboration and leadership. The internship was structured in multiple stages with a final project."`}</p>
                    <p className="text-base font-bold pt-5 text-center">{`Isha Barve (Now a bioinformatician at Lubeck University, Germany)`}</p>
                </div>
            </div>
                </div>

                <div className="w-full text-start items-center justify-center">
                    <p className="w-full pb-10 text-center text-2xl font-bold">Learning Tracks</p>
                    <div className="grid grid-cols-1 gap-10 items-start justify-center w-full ">
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

                
                </div>

        </main>
    <Footer />
    </section>
  );
}
