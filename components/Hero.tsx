import Image from "next/image"
import cancer from "../public/cancer.png"
import Buttons from "./Buttons"


export default function Hero(){

    return(
        
        <main>
            <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  p-10 px-10 bg-figma-grey">
                <div className="grid grid-cols-2 items-center w-full">
                    {/**Cancer Image */}
                    <div className="flex flex-col items-center justify-center gap-10">
                        <Image src={cancer} alt="cancer" className="h-72 w-72" />
                        <p></p>
                    </div>
                    {/**Description */}
                    <div className="">
                        <div className="flex flex-col gap-5">
                            <p className="text-gray-500 text-lg font-bold">HackBio Internships</p>
                            <p className="text-xs bg-gradient-to-tr from-hbblue-3 to-pink-500 w-min rounded-full py-0.5 px-2 text-white">Upcoming</p>
                            <span className="flex items-center gap-2"><p className="text-black text-4xl font-bold">Clinical Oncology</p>  </span> 
                            <span className="text-black text-lg py-5">Master Core Bioinformatics Skills in just <p className="font-bold text-2xl text-orange-500 underline underline-offset-2 decoration-4 py-2">8 weeks </p></span>
                            
                            {Buttons("Apply Now!", "?modal=true")}
                            
                            
                        </div>
                    </div>
                </div>
            </section>

            <section className="md:hidden p-5 bg-figma-grey">
                <div className=" flex flex-col gap-10">
                    <p className="text-gray-500 text-lg font-bold">HackBio Internships</p>
                    <span className="flex flex-col items-start gap-2"><p className="text-black text-4xl font-bold">Clinical Oncology</p> <p className="text-xs mt-2 bg-gradient-to-tr from-hbblue-3 to-pink-500 w-min rounded-full py-0.5 px-2 text-white">Upcoming</p> </span> 
                    <p className="text-black text-lg py-5">The fastest way to become an expert in Bioinformatics and Biomedical Data Analysis<p className="font-bold text-2xl text-orange-500 underline underline-offset-2 decoration-4 py-2">8 weeks </p></p>
                    {Buttons("Apply Now!", "?modal=true")}
                </div>
            </section>
        </main>
    )
}