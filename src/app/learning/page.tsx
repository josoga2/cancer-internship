"use client";
import { Button } from "@/components/ui/button"
import publicApi from "@/publicApi";
import winfred from "../../../public/winfred.svg"
import { useState, useEffect } from "react";
import keywords from "../../../public/keywords.svg"
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import { EnrollDialog } from "@/components/enroll/enroll";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

import ayano from '../../../public/ayano.jpeg'
import adekoya from '../../../public/adekoya.jpeg'
import barve from '../../../public/barve.jpeg'
import testimonials from '../../../public/Testimonials.svg'
import sm_testimonial from '../../../public/sm_testimonial.svg'


export default function Home() {
    const router = useRouter();

    const [pathway, setPathwayList] = useState<Array<{
        id?: string
        title?: string
        free?: boolean
        overview?: string
        published?: boolean
        int_image?: string
        courses?: Array<string | number>
    }>>([
        {
            id: "",
            title: "",
            free: false,
            overview: "",
            published: false,
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
        <div className="hidden md:flex md:max-w-screen-lg bg md:m-auto md:items-center pt-24 md:justify-between">

        <div className="">

            <div className="py-5 h-full w-full flex flex-row justify-between items-center">
                <div className="flex flex-col gap-5">
                <p className="text-3xl font-bold text-start"> Career Paths</p>
                <p className="text-lg">Build your career, Step by step, one skill at a time</p>
                </div>
                <Image src={keywords} alt="biology" className="w-2/5" />
            </div>

            {/* Organizations */}
          <div className="flex flex-col items-center gap-5">
            <p className="text-lg font-bold text-center">
              100+ Organizations have hired our graduates
            </p>
            <img
              src={testimonials.src}
              alt="organizations-that-trust-hackbio"
              className="w-full"
            />
          </div>

            {/** Learning Paths */}
            {pathway.filter(pw => pw.published === true).map((learning) => (
                <div key={learning.id} className="py-5 w-full flex flex-row gap-5 justify-start items-center pb-10">
                    <div className="flex flex-col gap-10 w-full">
                        <div className="flex flex-row gap-10 hover:underline hover:cursor-pointer" onClick={() => router.push(`/pathway/${learning.id}`)}>
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
                                    <div className="flex flex-col gap-5 items-start justify-start hover:cursor-pointer hover:underline " key={course.id} onClick={() => router.push(`/learning/course/${course.id}`)}>
                                        <img src={course.image} alt="biology" className="hover:border-2 hover:border-hb-green border-gray-300 border-2 hover:rounded-md rounded-md h-[150px] w-[150px]"/>
                                        <p className="font-medium max-w-[150px]">{course.title}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <div className="py-5 w-full h-full bg-hb-lightgreen flex flex-col gap-5 px-10">
          <p className="text-xl font-bold text-center"> Join thousands of global learners</p>
          <p className="text-center text-base">For real, you will work and learn with hundreds of people around the world.</p>

          <Carousel>
            <CarouselContent>
              <CarouselItem>
                {/**1 */}
                <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
                  <Image src={winfred} alt="biology" className="rounded-full w-[100px]" />
                  <div className="flex flex-col gap-2 ">
                    <p className="text-sm text-gray-700">{`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}</p>
                    <p className="text-base font-bold pt-5">{`Winfred Gatua (Now a bioinformatician at in University of Bristol, UK)`}</p>
                  </div>
                </div>

              </CarouselItem>

              <CarouselItem>
                {/**2 */}
                <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
                  <Image src={ayano} alt="biology" className="rounded-full w-[100px]" />
                  <div className="flex flex-col gap-2 ">
                    <p className="text-sm text-gray-700">{`"Through the [internship], I was introduced to the world of genomics and bioinformatics, gaining hands-on experience with tools and pipeline development that gave me a strong foundation. That single event helped me clarify my interests and set me on the data-driven biomedica path I walk today. I will always be grateful to the access, exposure and direction that came from that one LinkedIn post."`}</p>
                    <p className="text-base font-bold pt-5">{`Temitope Ayano (Now a Data Analyst at GFA Tech, Nigeria)`}</p>
                  </div>
                </div>

              </CarouselItem>
              <CarouselItem>
                {/**3 */}
                <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
                  <Image src={adekoya} alt="adekoya" className="rounded-full w-[100px]" />
                  <div className="flex flex-col gap-2 ">
                    <p className="text-sm text-gray-700">{`"HackBio provided me with my first real-world bioinformatics project, allowing me to apply the skills I had been learning in a meaningful way. The experience bridged the gap between theory and practice, and completing the project gave me a huge confidence boost. The training phase at HackBio was also highly motivating, with constant help from mentors. It reinforced the importance of community and mentorship in learning technical skills."`}</p>
                    <p className="text-base font-bold pt-5">{`Aanuoluwa Adekoya (Now a bioinformatician at in University of Tennessee, Knoxville, USA.)`}</p>
                  </div>
                </div>

              </CarouselItem>

              <CarouselItem>
                {/**4 */}
                <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
                  <Image src={barve} alt="barve" className="rounded-full w-[100px]" />
                  <div className="flex flex-col gap-2 ">
                    <p className="text-sm text-gray-700">{`"[I] started without a programming background. HackBio played a crucial role in my growth in bioinformatics by giving me hands-on experince in metagenomics analysis, team collaboration and leadership. The internship was structured in multiple stages with a final project."`}</p>
                    <p className="text-base font-bold pt-5">{`Isha Barve (Now a bioinformatician at Lubeck University, Germany)`}</p>
                  </div>
                </div>

              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-hb-green text-white h-[75px] w-[75px] text-4xl" />
            <CarouselNext className="bg-hb-green text-white h-[75px] w-[75px] text-4xl" />
          </Carousel>

          
            <div className="flex items-start justify-center">
                <EnrollDialog />
            </div>
        </div>

        </div>
        
        <div className="block md:hidden text-center text-lg text-gray-700">Learn by Practice</div>
        </div>

                {/* Mobile View */}
        <div className="block md:hidden px-4 py-20 space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3">
            <p className="text-2xl font-bold">Career Paths</p>
            <p className="text-base text-gray-600">Step by step, one skill at a time</p>
            <Image src={keywords} alt="biology" className="w-full pt-5" />
        </div>

        {/* Organizations */}
        <div className="flex flex-col items-center gap-5">
          <p className="text-lg font-bold text-center">
            100+ Organizations have hired our graduates
          </p>
          <img
            src={sm_testimonial.src}
            alt="organizations-that-trust-hackbio"
            className="w-full"
          />
        </div>

        {/* Learning Paths */}
        {pathway.filter(pw => pw.published === true).map((learning) => (
            <div key={learning.id} className="space-y-4">
            <div className="flex flex-row gap-5 items-start text-start pt-10" onClick={() => router.push(`/pathway/${learning.id}`)}>
                <img
                src={learning.int_image}
                alt="learning_image"
                className="w-20 h-20 rounded-md"
                />
                <div className="flex flex-col gap-2 pb-5">
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
                    className="flex flex-row items-center text-center gap-2 "
                    onClick={() => router.push(`/learning/course/${course.id}`)}
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

        </div>
        <Footer />

    </section>

  );
}
