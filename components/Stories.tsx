import Image from "next/image";
import Buttons from "./Buttons";
import winfred from '../public/winfred.svg'
import halimat from '../public/halimat.svg'
import michael from '../public/mikchael.svg'
import nuru from '../public/nurudden.svg'

export default function Stories(){

    return(
        
        <main>
            <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-10 ">
                <div className="w-full">
                    <div className="w-full flex flex-col items-center gap-10 bg-hbblue-0.5 py-5">
                        <Image src={michael} alt="figshot" className="w-32 h-32 rounded-full border-4 border-hbgreen-1" />
                        <span className="flex flex-col gap-2 max-w-96 text-center font-light text-lg">
                            <p>The genomics track of the internship was the dealmaker for me. I have secured a research jobs at 2 startups even before starting my PhD</p>
                            <p>- Michael Olufemi</p>
                            <p className="font-bold">Now in University of Massachusets</p>
                        </span>
                    </div>
                    <div className="w-full grid grid-cols-3 items-center pt-10 gap-10 text-sm">
                        {/**Col 1 */}
                        <div className="w-full pl-5 flex flex-col gap-5">
                            <p className="text-3xl font-medium ">HackBio makes Experts out of Students</p>
                            {Buttons("Apply Now!", "?modal=true")}
                        </div>

                        {/**Col 2 */}
                        <div className="w-full">
                            <div className="flex flex-col gap-5 max-w-sm rounded-md p-5 bg-hbblue-0.5">
                                <div className="flex flex-row items-center gap-2">
                                    <Image src={winfred} alt="img-2" className="w-16 h-16 rounded-full border-2"  />
                                    <p className="font-semibold">Winfred Gatua</p>
                                </div>
                                <p>My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team.</p>
                                <p className="font-bold">Now in University of Bristol UK</p>
                            </div>
                        </div>

                        {/**Col 3 */}
                        <div className="w-full grid grid-rows-2 gap-5">
                            <div className="flex flex-col gap-5 max-w-sm rounded-md p-5 bg-hbblue-0.5">
                                <div className="flex flex-row items-center gap-2">
                                    <Image src={halimat} alt="img-2" className="w-16 h-16 rounded-full border-2"  />
                                    <p className="font-semibold">Halimat Chisom Atanda</p>
                                </div>
                                <p>It was really inclusive. I liked that the mentors were always available to respond to questions, comments, and anything at all. I would say that is the highlight of the workshop for me.</p>
                                <p className="font-bold">Now in University of Queensland, Australia</p>
                            </div>
                            <div className="flex flex-col gap-5 max-w-sm rounded-md p-5 bg-hbblue-0.5">
                                <div className="flex flex-row items-center gap-2">
                                    <Image src={nuru} alt="img-2" className="w-16 h-16 rounded-full border-2"  />
                                    <p className="font-semibold">Nurudeen Rahman</p>
                                </div>
                                <p>Had the privilege of being part of the first hackbio program, the skills I learnt and exposure came through during my PhD applications</p>
                                <p className="font-bold">Now in Swiss Tropical and Public Health Institute, Switzerland</p>
                            </div>
                        </div>
                    </div>
                    <div className="pb-10"></div>
                    <hr className=" w-full hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between " />
                </div>
            </section>

            <section className="md:hidden p-5">
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex flex-col items-center gap-10 bg-hbblue-0.5 py-5">
                        <Image src={michael} alt="figshot" className="w-32 h-32 rounded-full border-4 border-hbgreen-1" />
                        <span className="flex flex-col gap-2 max-w-96 text-center font-light text-base">
                            <p>The genomics track of the internship was the dealmaker for me. I have secured a research jobs at 2 startups even before starting my PhD</p>
                            <p>- Michael Olufemi</p>
                            <p className="font-bold">Now in University of Massachusets</p>
                        </span>
                    </div>
                    <div className="w-72 grid grid-cols-1 items-center pt-10 gap-10 text-sm">
                        {/**Col 1 */}
                        <div className="w-full pl-5 flex flex-col gap-5 items-center text-center">
                            <p className="text-3xl font-medium ">HackBio makes Experts out of Students</p>
                            {Buttons("Apply Now!", "?modal=true")}
                        </div>

                        {/**Col 2 */}
                        <div className="w-72">
                            <div className="flex flex-col gap-5 max-w-sm rounded-md p-5 bg-hbblue-0.5">
                                <div className="flex flex-row items-center gap-2">
                                    <Image src={winfred} alt="img-2" className="w-16 h-16 rounded-full border-2"  />
                                    <p className="font-semibold">Winfred Gatua</p>
                                </div>
                                <p>My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team.</p>
                                <p className="font-bold">Now in University of Bristol UK</p>
                            </div>
                        </div>

                        {/**Col 3 */}
                        <div className="w-full grid grid-rows-2 gap-5">
                            <div className="flex flex-col gap-5 max-w-sm rounded-md p-5 bg-hbblue-0.5">
                                <div className="flex flex-row items-center gap-2">
                                    <Image src={halimat} alt="img-2" className="w-16 h-16 rounded-full border-2"  />
                                    <p className="font-semibold">Halimat Chisom Atanda</p>
                                </div>
                                <p>It was really inclusive. I liked that the mentors were always available to respond to questions, comments, and anything at all. I would say that is the highlight of the workshop for me.</p>
                                <p className="font-bold">Now in University of Queensland, Australia</p>
                            </div>
                            <div className="flex flex-col gap-5 max-w-sm rounded-md p-5 bg-hbblue-0.5">
                                <div className="flex flex-row items-center gap-2">
                                    <Image src={nuru} alt="img-2" className="w-16 h-16 rounded-full border-2"  />
                                    <p className="font-semibold">Nurudeen Rahman</p>
                                </div>
                                <p>Had the privilege of being part of the first hackbio program, the skills I learnt and exposure came through during my PhD applications</p>
                                <p className="font-bold">Now in Swiss Tropical and Public Health Institute, Switzerland</p>
                            </div>
                        </div>
                    </div>
                    <div className="pb-10"></div>
                    <hr className=" w-full  md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between " />
                </div>
            </section>
        </main>
    )
}