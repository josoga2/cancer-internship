import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import winfred from "@/../public/winfred.svg"
import ayano from "@/../public/ayano.jpeg"
import adekoya from "@/../public/adekoya.jpeg"
import barve from "@/../public/barve.jpeg"
import { EnrollDialog } from "@/components/enroll/enroll";
import HbButton from "../hb-buttons";

export default function TestimonialsEnroll({ InternshipStatus }: { InternshipStatus: string }) {
    return (
        <main>
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
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
                        <div className="w-full flex flex-col items-center justify-center py-10">
                            {InternshipStatus === 'close' && (
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
                            {InternshipStatus !== 'close' && <EnrollDialog />}
                        </div>
                    </div>
                </div>
            </div>

            {/**Mobile */}
            <div className="flex flex-col w-full md:hidden gap-5 rounded-xl border border-hb-lightgreen p-2">
                <div className="flex flex-col gap-5 items-center rounded-xl">
                    <p className="text-lg font-bold text-center">Join thousands of global learners</p>
                    <p className="text-sm text-center">
                        Learn and work with people across the world.
                    </p>

                    <div className="flex flex-col gap-5 py-5 items-center justify-start w-full">
                        {/**1 */}
                        <div className="flex flex-col gap-10 items-center border rounded-xl bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
                            <Image src={winfred} alt="biology" className="rounded-full w-[100px]" />
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <p className="text-sm text-gray-700">{`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}</p>
                                <p className="text-base font-bold pt-5  text-center">{`Winfred Gatua (Now a bioinformatician at in University of Bristol, UK)`}</p>
                            </div>
                        </div>

                        {/**2 */}
                        <div className="flex flex-col gap-10 items-center border rounded-xl bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
                            <Image src={ayano} alt="biology" className="rounded-full w-[100px]" />
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <p className="text-sm text-gray-700">{`"Through the [internship], I was introduced to the world of genomics and bioinformatics, gaining hands-on experience with tools and pipeline development that gave me a strong foundation. That single event helped me clarify my interests and set me on the data-driven biomedica path I walk today. I will always be grateful to the access, exposure and direction that came from that one LinkedIn post."`}</p>
                                <p className="text-base font-bold pt-5  text-center">{`Temitope Ayano (Now a Data Analyst at GFA Tech, Nigeria)`}</p>
                            </div>
                        </div>
                    
                        {/**3 */}
                        <div className="flex flex-col gap-10 items-center border rounded-xl bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
                            <Image src={adekoya} alt="adekoya" className="rounded-full w-[100px]" />
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <p className="text-sm text-gray-700">{`"HackBio provided me with my first real-world bioinformatics project, allowing me to apply the skills I had been learning in a meaningful way. The experience bridged the gap between theory and practice, and completing the project gave me a huge confidence boost. The training phase at HackBio was also highly motivating, with constant help from mentors. It reinforced the importance of community and mentorship in learning technical skills."`}</p>
                                <p className="text-base font-bold pt-5  text-center">{`Aanuoluwa Adekoya (Now a bioinformatician at in University of Tennessee, Knoxville, USA.)`}</p>
                            </div>
                        </div>

                        {/**4 */}
                        <div className="flex flex-col gap-10 items-center border rounded-xl bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
                            <Image src={barve} alt="barve" className="rounded-full w-[100px]" />
                            <div className="flex flex-col gap-2 items-center justify-center ">
                                <p className="text-sm text-gray-700">{`"[I] started without a programming background. HackBio played a crucial role in my growth in bioinformatics by giving me hands-on experince in metagenomics analysis, team collaboration and leadership. The internship was structured in multiple stages with a final project."`}</p>
                                <p className="text-base font-bold pt-5 text-center">{`Isha Barve (Now a bioinformatician at Lubeck University, Germany)`}</p>
                            </div>
                    </div>
                </div>

                    
                <a href='/internship'> 
                    <EnrollDialog /> 
                </a>
                </div>
            </div>
        </main>
    )
}