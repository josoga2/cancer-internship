import process from "../public/process-all.jpg"
import Image from "next/image";
import Buttons from "./Buttons";

export default function Upgrade(){

    return(
        
        <main>
            <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-10 pb-10 bg-hbblue-0.5">
                <div className=" ">
                    <p className="py-5 text-2xl font-bold">Upgrade to #Premium!  🚀</p>
                    <div className="grid grid-cols-2 w-full items-center gap-10">
                        <div className="">
                            <Image src={process} alt="process" className="w-full h-full object-cover "/>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className=" text-lg font-bold">Upgrade to the Premium Package to unlock exclusive research benefits and comprehensive training!</p>
                            
                            <div className="flex flex-col ">
                                <p className="font-bold text-lg">Gain Massive Clarity</p>
                                <p className="text-base">Master Coding  and its applications in Biology</p>
                            </div>

                            <div className="flex flex-col ">
                                <p className="font-bold text-lg">Project + Research Experience</p>
                                <p className="text-base">Over 1000+ hours of scientific research and experience gained.</p>
                            </div>

                            <div className="flex flex-col ">
                                <p className="font-bold text-lg">Expert Guidance & Mentorship</p>
                                <p className="text-base">Work in Teams and know how to visualize and present like a pro.</p>
                            </div>
                            
                            ?modal=true
                        </div>
                    </div>
                </div>
            </section>

            <section className="md:hidden p-5 bg-hbblue-0.5">
                <p className="font-bold text-4xl py-10 text-center justify-center bg-figma">Upgrade to #Premium 🚀 </p> 

                <div className="flex flex-col w-full justify-center items-center gap-10 p-10">
                    <Image src={process} alt="proImage" height={300} width={400}/>

                    <p className=" text-lg font-bold">Upgrade to the Premium Package to unlock exclusive research benefits and comprehensive training!</p>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-xl">1️⃣ Gain Massive Clarity</p>
                            <p className="text-lg">Master Coding and its applications in Biology</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-xl">2️⃣ Project + Research Experience</p>
                            <p className="text-lg">Over 1000+ hours of scientific research and experience gained.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-xl">3️⃣ Expert Guidance & Mentorship</p>
                            <p className="text-lg">Work in Teams and know how to visualize and present like a pro.</p>
                        </div>
                        ?modal=true
                    </div>
                </div>
            </section>
        </main>
    )
}