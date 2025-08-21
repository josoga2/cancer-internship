"use client";
import { Button } from "@/components/ui/button"
import publicApi from "@/publicApi";
import winfred from "../../../public/winfred.svg"
import { useState, useEffect } from "react";
import keywords from "../../../public/keywords.svg"

import Image from "next/image";
import Navbar from "@/components/Nav/navbar";



export default function Home() {

    const [pathway, setPathwayList] = useState<Array<{
        id?: string
        title?: string
        free?: boolean
        overview?: string
        int_image?: string
        courses?: Array<string | number>
    }>>([
        {
            id: "",
            title: "",
            free: false,
            overview: "",
            int_image: "https://hbapi.jisender.com/media/internship_images/drugs.jpg",
            courses: [""]
        }
    ]);

    const [coursesList, setCoursesList] = useState<Array<{
        id?: number | string
        title?: string
        description?: string
        published?: boolean
        image?: string
    }>>([
        {
            id: "",
            title: "",
            description: "",
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
                const response = await publicApi.get('/api/pathways/');
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
        <div className="hidden md:flex md:max-w-screen-lg bg md:m-auto md:items-center pt-5 md:justify-between">

        <div className="">

            <div className="py-5 h-full w-full flex flex-row justify-between items-center">
                <div className="flex flex-col gap-5">
                <p className="text-3xl font-bold text-start"> Career Paths</p>
                <p className="text-lg">Step by step, one skill at a time</p>
                </div>
                <Image src={keywords} alt="biology" className="w-2/5" />
            </div>

            {/** Learning Paths */}
            {pathway.map((learning) => (
                <div key={learning.id} className="py-5 w-full flex flex-row gap-5 justify-start items-center pb-10">
                    <div className="flex flex-col gap-10 w-full">
                        <div className="flex flex-row gap-10">
                            <img src={learning.int_image} alt="learning_image" width={64} height={64} className="w-24 h-24" />
                            <div className="flex flex-col gap-2 items-start justify-center">
                                <p className="text-2xl font-bold">{learning.title}</p>
                                <p className="text-base">{learning.overview}</p>
                            </div>
                        </div>
                        
                        <div className="py-10 w-full bg-gray-100 rounded-xl h-full flex flex-row gap-10 items-start px-10">
                            {coursesList
                                .filter(course => {
                                    const courseIds = (learning.courses ?? []).filter((id): id is string | number => id !== undefined);
                                    return courseIds.includes(course.id as string | number);
                                })
                                .map(course => (
                                    <div className="flex flex-col gap-5 items-start justify-start" key={course.id}>
                                        <img src={course.image} alt="biology" className="hover:border-2 hover:border-hb-green border-gray-300 border-2 hover:rounded-md rounded-md h-[150px] w-[150px]"/>
                                        <p className="font-medium max-w-[150px]">{course.title}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <div className="py-10 w-full h-full bg-green-50 flex flex-col gap-5 px-10">
            <p className="text-3xl font-bold text-center"> Join thousands of global learners</p>
            <p className="text-center text-base">For real, you will work and learn with people around the world.</p>

            <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
                <Image src={winfred} alt="biology" className="rounded-full " />
                <div className="flex flex-col gap-2 ">
                <p className="text-base text-gray-700">{`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}</p>
                <p className="text-sm font-bold pt-5">{`Winfred Gatua (Now in University of Bristol, UK)`}</p>
                </div>
            </div>
                <div className="flex items-center justify-center">
                <Button className="bg-green-600 text-lg py-6 px-10 font-bold w-fit">Start Learning</Button>
                </div>
            </div>

        </div>
        
        <div className="block md:hidden text-center text-lg text-gray-700">Learn by Practice</div>
        </div>

                {/* Mobile View */}
        <div className="block md:hidden px-4 py-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3">
            <p className="text-2xl font-bold">Career Paths</p>
            <p className="text-base text-gray-600">Step by step, one skill at a time</p>
            <Image src={keywords} alt="biology" className="w-3/4 pt-5" />
        </div>

        {/* Learning Paths */}
        {pathway.map((learning) => (
            <div key={learning.id} className="space-y-4">
            <div className="flex flex-row gap-5 items-start text-start pt-10">
                <img
                src={learning.int_image}
                alt="learning_image"
                className="w-20 h-20 rounded-md"
                />
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-bold">{learning.title}</p>
                    <p className="text-sm text-gray-600">{learning.overview}</p>
                </div>
            </div>

            <div className="flex flex-col overflow-auto gap-4 bg-gray-100  rounded-md p-2">
                {coursesList
                .filter((course) => {
                    const courseIds = (learning.courses ?? []).filter(
                    (id): id is string | number => id !== undefined
                    );
                    return courseIds.includes(course.id as string | number);
                })
                .map((course) => (
                    <div
                    key={course.id}
                    className="flex flex-row items-center text-center gap-2"
                    >
                    <img
                        src={course.image}
                        alt="course_image"
                        className="h-[100px] w-[100px] items-start object-cover rounded-md border-2 border-gray-200 hover:border-green-600"
                    />
                    <p className="text-sm items-start text-start font-medium">{course.title}</p>
                    </div>
                ))}
            </div>
            </div>
        ))}

        {/* CTA Section */}
        <div className="bg-green-50 rounded-xl p-6 space-y-4">
            <p className="text-2xl font-bold text-center">
            Join thousands of global learners
            </p>
            <p className="text-sm text-gray-600 text-center">
            Work and learn with people around the world.
            </p>

            <div className="flex flex-col items-center text-center gap-4">
            <Image src={winfred} alt="biology" className="rounded-full w-16 h-16" />
            <p className="text-sm text-gray-700 italic">
                "My HackBio experience (and preprint) was my leverage for an interesting
                conversation with my Graduate School Admission Team."
            </p>
            <p className="text-xs font-bold">
                Winfred Gatua (Now in University of Bristol, UK)
            </p>
            </div>

            <div className="flex justify-center">
            <Button className="bg-green-600 text-base py-3 px-6 font-bold">
                Start Learning
            </Button>
            </div>
        </div>
        </div>

    </section>

  );
}
