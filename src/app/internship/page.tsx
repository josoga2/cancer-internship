"use client";
import React, {  useEffect, useState } from "react";
import publicApi from "../../publicApi"
import  Navbar  from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import HeroSection from "@/components/widgets/internship-widget/HeroSection";
import TestimonialsEnroll from "@/components/widgets/internship-widget/testimonials-enroll";
import ProgramSkillsTools, { type SkillTool } from "@/components/widgets/program-skills-tools";
import ProgramOutline, { type ProgramOutlineItem } from "@/components/widgets/program-outline";
import CareerOutlook from "@/components/widgets/career-outlook";
import CareerClaritySection from "@/components/widgets/career-clarity-section";
import GraduateTestimonialSection from "@/components/widgets/graduate-testimonial-section";
import FAQPreviewSection from "@/components/widgets/faq-preview-section";
import PotentialProjectsSection, { type PotentialProject } from "@/components/widgets/potential-projects-section";


export default function Page() {

    const [internship, setInternshipList] = useState<Array<{
        id?: string
        title?: string
        summary?: string
        description?: string
        published?: boolean
        start_date?: string
        overview?: string
        lenght_in_weeks?: number
        int_image?: string
        hero_background_image?: string
        skills_and_tools_detail?: SkillTool[]
        career_outlook_description?: string
        low_salary?: number
        median_salary?: number
        high_salary?: number
        brochure_link?: string
        price?: number
        free?: boolean
        courses?: Array<string | number>
        potential_projects?: PotentialProject[]
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
    const [modulesList, setModulesList] = useState<Array<{
        id?: number | string
        title?: string
        description?: string
        course?: number | string
    }>>([]);
    const [contentList, setContentList] = useState<Array<{
        id?: number | string
        title?: string
        module?: number | string
        course?: number | string
        content_type?: string
    }>>([]);
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

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await publicApi.get('/api/public/modules/');
                if (response.status === 200) {
                    setModulesList(response.data);
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
                }
            } catch (error) {
                console.error('Error fetching contents:', error);
            }
        };
        fetchContents();
    }, []);

    const publishedInternships = internship.filter(int => int.published === true)
    const heroInternship = publishedInternships[0]
    const heroInternshipIsFree = Boolean(heroInternship && (heroInternship.free || Number(heroInternship.price || 0) <= 0))
    const thisInternshipid = heroInternship?.id || "0"
    const heroDuration = heroInternship?.lenght_in_weeks ? String(heroInternship.lenght_in_weeks) : "12"
    const heroCourseIds = new Set((heroInternship?.courses ?? []).map(String))
    const outlineCourses = coursesList.filter((course) => heroCourseIds.has(String(course.id)))
    const outlineModuleIds = new Set(
        modulesList
            .filter((module) => heroCourseIds.has(String(module.course)))
            .map((module) => String(module.id))
    )
    const outlineItems: ProgramOutlineItem[] = outlineCourses.map((course, index) => ({
        id: course.id,
        label: `Course ${index + 1}:`,
        title: course.title,
        description: course.description,
        children: modulesList
            .filter((module) => String(module.course) === String(course.id))
            .map((module) => ({
                id: module.id,
                title: module.title,
                description: module.description,
            })),
    }))
    const outlineProjectCount = contentList.filter(
        (content) =>
            content.content_type === "project" &&
            (heroCourseIds.has(String(content.course)) || outlineModuleIds.has(String(content.module)))
    ).length

    //console.log(coursesList.filter(course => course.published === true));

  return (
    <section className="w-full overflow-x-hidden">
        <Navbar />
        <main className="hidden w-full md:block">
            {/** Hero */}
            <div className="mx-auto w-full">
                <HeroSection
                    id={String(thisInternshipid)}
                    internshipStatus={internshipStatus}
                    programType="internship"
                    backgroundImage={heroInternship?.hero_background_image || heroInternship?.int_image || ""}
                    badgeText="High Job Demand"
                    kicker="Become a"
                    headline={heroInternship?.title || "Genome Data Scientist"}
                    subcopy={heroInternship?.summary || heroInternship?.overview || ""}
                    ctaText={heroInternshipIsFree ? "Enroll For Free" : "Enroll Now"}
                    isFree={heroInternshipIsFree}
                    duration={heroDuration}
                />
                <ProgramSkillsTools items={heroInternship?.skills_and_tools_detail} />
                <ProgramOutline
                    items={outlineItems}
                    courseCount={outlineCourses.length}
                    lessonCount={outlineModuleIds.size}
                    projectCount={outlineProjectCount}
                    brochureLink={heroInternship?.brochure_link}
                    brochureLabel="Download Internship Brochure"
                    childMode="modules"
                    descriptionTitle="Internship Description"
                    description={heroInternship?.description || heroInternship?.overview || ""}
                    programType="internship"
                    programId={String(thisInternshipid)}
                    programPrice={heroInternship?.price || 0}
                    programPriceLabel="This Internship Alone"
                />
                <PotentialProjectsSection
                    projects={heroInternship?.potential_projects}
                    programType="internship"
                    programId={String(thisInternshipid)}
                />
                <CareerOutlook
                    programTitle={heroInternship?.title || "Genome Data Science"}
                    description={heroInternship?.career_outlook_description || heroInternship?.summary || heroInternship?.overview || ""}
                    lowSalary={heroInternship?.low_salary}
                    medianSalary={heroInternship?.median_salary}
                    highSalary={heroInternship?.high_salary}
                    guideLink={heroInternship?.brochure_link}
                    programType="internship"
                    programId={String(thisInternshipid)}
                />
                <CareerClaritySection />
                <GraduateTestimonialSection programType="internship" programId={String(thisInternshipid)} />
                
                <TestimonialsEnroll InternshipStatus={internshipStatus}/>
                <FAQPreviewSection />
                
            </div>
        </main>
        
        {/**MOBILE */}
        <main className="w-full md:hidden">
            <div className="flex flex-col gap-10 pt-20 w-full min-w-0 text-sm px-0">
                <HeroSection
                    id={String(thisInternshipid)}
                    internshipStatus={internshipStatus}
                    programType="internship"
                    backgroundImage={heroInternship?.hero_background_image || heroInternship?.int_image || ""}
                    badgeText="High Job Demand"
                    kicker="Become a"
                    headline={heroInternship?.title || "Genome Data Scientist"}
                    subcopy={heroInternship?.summary || heroInternship?.overview || ""}
                    ctaText={heroInternshipIsFree ? "Enroll For Free" : "Enroll Now"}
                    isFree={heroInternshipIsFree}
                    duration={heroDuration}
                />
                <ProgramSkillsTools items={heroInternship?.skills_and_tools_detail} />
                <ProgramOutline
                    items={outlineItems}
                    courseCount={outlineCourses.length}
                    lessonCount={outlineModuleIds.size}
                    projectCount={outlineProjectCount}
                    brochureLink={heroInternship?.brochure_link}
                    brochureLabel="Download Internship Brochure"
                    childMode="modules"
                    descriptionTitle="Internship Description"
                    description={heroInternship?.description || heroInternship?.overview || ""}
                    programType="internship"
                    programId={String(thisInternshipid)}
                    programPrice={heroInternship?.price || 0}
                    programPriceLabel="This Internship Alone"
                />
                <PotentialProjectsSection
                    projects={heroInternship?.potential_projects}
                    programType="internship"
                    programId={String(thisInternshipid)}
                />
                <CareerOutlook
                    programTitle={heroInternship?.title || "Genome Data Science"}
                    description={heroInternship?.career_outlook_description || heroInternship?.summary || heroInternship?.overview || ""}
                    lowSalary={heroInternship?.low_salary}
                    medianSalary={heroInternship?.median_salary}
                    highSalary={heroInternship?.high_salary}
                    guideLink={heroInternship?.brochure_link}
                    programType="internship"
                    programId={String(thisInternshipid)}
                />
                <CareerClaritySection />
                <GraduateTestimonialSection programType="internship" programId={String(thisInternshipid)} />
                <TestimonialsEnroll InternshipStatus={internshipStatus}/>
                <FAQPreviewSection />
                
                
            </div>

        </main>
    <Footer />
    </section>
  );
}
