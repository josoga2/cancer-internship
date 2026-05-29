"use client";
import React, {  useEffect, useState } from "react";
import publicApi from "../../../publicApi"
import  Navbar  from "@/components/Nav/navbar";
import { useParams } from "next/navigation";
import Footer from "@/components/Nav/footer";
import { useRouter } from "next/navigation";
import api from "@/api";
import HeroSection from "@/components/widgets/internship-widget/HeroSection";
import ProgramSkillsTools, { type SkillTool } from "@/components/widgets/program-skills-tools";
import ProgramOutline, { type ProgramOutlineItem } from "@/components/widgets/program-outline";
import CareerOutlook from "@/components/widgets/career-outlook";
import CareerClaritySection from "@/components/widgets/career-clarity-section";
import GraduateTestimonialSection from "@/components/widgets/graduate-testimonial-section";
import FAQPreviewSection from "@/components/widgets/faq-preview-section";
import PotentialProjectsSection, { type PotentialProject } from "@/components/widgets/potential-projects-section";





export default function Page() {
    const params = useParams();
    const pathwayId = Number(params.pathwayid);
    const router = useRouter();

    const [pathways, setPathwayList] = useState<Array<{
        id?: string
        title?: string
        summary?: string
        description?: string
        published?: boolean
        start_date?: string
        overview?: string
        duration_label?: string
        duration_days?: number
        free?: boolean
        lenght_in_weeks?: number
        int_image?: string
        thumbnail?: string
        hero_background_image?: string
        skills_and_tools_detail?: SkillTool[]
        career_outlook_description?: string
        low_salary?: number
        median_salary?: number
        high_salary?: number
        brochure_link?: string
        price?: number
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

    // Fetch courses from the public API
    useEffect(() => {
        const fetchPathways = async () => {
            try {
                const response = await publicApi.get('/api/pathways/');
                if (response.status === 200) {
                    setPathwayList(response.data);
                } else {
                    console.error('Failed to fetch pathways:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching pathways:', error);
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


    const thisPathwayStatus = pathways.find((pathway) => Number(pathway.id) === Number(pathwayId))?.free;
    const heroPathway = pathways.find((pathway) => Number(pathway.id) === Number(pathwayId));
    const heroPathwayIsFree = Boolean(heroPathway && (heroPathway.free || Number(heroPathway.price || 0) <= 0));
    const internshipStatus: string = 'open';
    const heroDuration = heroPathway?.duration_label || (heroPathway?.lenght_in_weeks ? String(heroPathway.lenght_in_weeks) : "12");
    const heroCourseIds = new Set((heroPathway?.courses ?? []).map(String))
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

    const handleFreeEnroll = async () => {
        try {
            const response = await api.post('/api/add-free-pathway/');
            if (response.status === 200) {
                alert('Successfully enrolled in the free pathway! You will be redirected to your dashboard now.');
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
    <section className="w-full overflow-x-hidden">
        <Navbar />
        <HeroSection
            id={String(pathwayId)}
            internshipStatus={internshipStatus}
            programType="pathway"
            backgroundImage={heroPathway?.hero_background_image || heroPathway?.thumbnail || heroPathway?.int_image || ""}
            badgeText="High Job Demand"
            kicker="Become a"
            headline={heroPathway?.title || "Genome Data Scientist"}
            subcopy={heroPathway?.summary || heroPathway?.overview || ""}
            ctaText={heroPathwayIsFree ? "Enroll For Free" : "Enroll Now"}
            isFree={heroPathwayIsFree}
            duration={heroDuration}
        />
        <ProgramSkillsTools items={heroPathway?.skills_and_tools_detail} />
        <ProgramOutline
            items={outlineItems}
            courseCount={outlineCourses.length}
            lessonCount={outlineModuleIds.size}
            projectCount={outlineProjectCount}
            brochureLink={heroPathway?.brochure_link}
            brochureLabel="Download Pathway Brochure"
            childMode="modules"
            descriptionTitle="Pathway Description"
            description={heroPathway?.description || heroPathway?.overview || ""}
            programType="pathway"
            programId={String(pathwayId)}
            programPrice={heroPathway?.price || 0}
            programPriceLabel="This Pathway Alone"
        />
        <PotentialProjectsSection
            projects={heroPathway?.potential_projects}
            programType="pathway"
            programId={String(pathwayId)}
        />
        <CareerOutlook
            programTitle={heroPathway?.title || "Genome Data Science"}
            description={heroPathway?.career_outlook_description || heroPathway?.summary || heroPathway?.overview || ""}
            lowSalary={heroPathway?.low_salary}
            medianSalary={heroPathway?.median_salary}
            highSalary={heroPathway?.high_salary}
            guideLink={heroPathway?.brochure_link}
            programType="pathway"
            programId={String(pathwayId)}
        />
        <CareerClaritySection />
        <GraduateTestimonialSection programType="pathway" programId={String(pathwayId)} />
        <FAQPreviewSection />
        
        
            {/**MOBILE */}
        <main>
            

        </main>
    <Footer />
    </section>
  );
}
