"use client";
import { useEffect, useState } from "react";
import {useParams } from "next/navigation";
import publicApi from "@/publicApi";
import Navbar from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import React from "react";
import api from "@/api";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/widgets/internship-widget/HeroSection";
import ProgramSkillsTools, { type SkillTool } from "@/components/widgets/program-skills-tools";
import ProgramOutline, { type ProgramOutlineItem } from "@/components/widgets/program-outline";
import CareerOutlook from "@/components/widgets/career-outlook";
import CareerClaritySection from "@/components/widgets/career-clarity-section";
import GraduateTestimonialSection from "@/components/widgets/graduate-testimonial-section";
import FAQPreviewSection from "@/components/widgets/faq-preview-section";



export default function Page() {

    const [coursesList, setCoursesList] = useState<Array<{
        id?: number | string
        title?: string
        summary?: string
        description?: string
        overview?: string
        duration_label?: string
        duration_days?: number
        published?: boolean
        free?: boolean
        image?: string
        thumbnail?: string
        hero_background_image?: string
        skills_and_tools_detail?: SkillTool[]
        career_outlook_description?: string
        low_salary?: number
        median_salary?: number
        high_salary?: number
        brochure_link?: string
        price?: number
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
        course?: number | string
        content_type?: string
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
                const response = await publicApi.get('/api/public/modules/');
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
                const response = await publicApi.get('/api/public/contents/');
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
    const heroCourse = coursesList[0];
    const heroCourseIsFree = Boolean(heroCourse && (heroCourse.free || Number(heroCourse.price || 0) <= 0));
    const heroDuration = heroCourse?.duration_label || (heroCourse?.duration_days ? `${heroCourse.duration_days} Days` : "12");
    const courseContents = contentList.filter(
        (content) =>
            Number(content.course) === Number(courseId) ||
            modulesList.some((module) => Number(module.id) === Number(content.module))
    )
    const outlineItems: ProgramOutlineItem[] = modulesList.map((module, index) => ({
        id: module.id,
        label: `Module ${index + 1}:`,
        title: module.title,
        description: module.description,
        children: contentList
            .filter((content) => Number(content.module) === Number(module.id))
            .map((content) => ({
                id: content.id,
                title: content.title,
                content_type: content.content_type,
            })),
    }))
    const outlineProjectCount = courseContents.filter((content) => content.content_type === "project").length



  return (
    <section>
        <Navbar />
        <HeroSection
            id={String(courseId)}
            internshipStatus={internshipStatus}
            programType="course"
            backgroundImage={heroCourse?.hero_background_image || heroCourse?.thumbnail || heroCourse?.image || ""}
            badgeText="High Job Demand"
            kicker="Become a"
            headline={heroCourse?.title || "Genome Data Scientist"}
            subcopy={heroCourse?.summary || heroCourse?.overview || ""}
            ctaText={heroCourseIsFree ? "Enroll For Free" : "Enroll Now"}
            isFree={heroCourseIsFree}
            duration={heroDuration}
        />
        <ProgramSkillsTools items={heroCourse?.skills_and_tools_detail} />
        <ProgramOutline
            items={outlineItems}
            courseCount={1}
            lessonCount={modulesList.length}
            projectCount={outlineProjectCount}
            brochureLink={heroCourse?.brochure_link}
            brochureLabel="Download Course Brochure"
            childMode="contents"
            descriptionTitle="Course Description"
            description={heroCourse?.description || heroCourse?.overview || ""}
            programType="course"
            programId={String(courseId)}
            programPrice={heroCourse?.price || 0}
            programPriceLabel="This Course Alone"
        />
        <CareerOutlook
            programTitle={heroCourse?.title || "Genome Data Science"}
            description={heroCourse?.career_outlook_description || heroCourse?.summary || heroCourse?.overview || ""}
            lowSalary={heroCourse?.low_salary}
            medianSalary={heroCourse?.median_salary}
            highSalary={heroCourse?.high_salary}
            guideLink={heroCourse?.brochure_link}
            programType="course"
            programId={String(courseId)}
        />
        <CareerClaritySection />
        <GraduateTestimonialSection programType="course" programId={String(courseId)} />
        <FAQPreviewSection />
        <div className="hidden md:flex md:max-w-5xl bg md:m-auto md:items-center pt-12 md:justify-between">
        
        <div className=" ">

        {/** Learning Paths */}


      </div>
      
      
    </div>
    {/**Mobile Version */}
    <div className="max-w-full p-4 pt-16 flex flex-col gap-5 md:hidden">
            
    </div>
    <Footer />
    </section>
  );
}
