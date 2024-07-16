import Image from "next/image";
import cancer_leg from "../public/cancer.png";
import ml from "../public/dna.png"
import Buttons from "./Buttons";
import amr from '../public/Virus.png';
import dna from '../public/bacteria.png'


export default function Calendar(){

    return(
        
        <main>
            <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-10">
                <div className="flex flex-col gap-5 w-full">
                    <p className="font-bold text-xl w-full text-center">Upcoming Internship</p>
                    <p className="text-center">Start Preparing Ahead of Time 🚀</p>

                    <div className="grid grid-cols-3 w-full gap-10">
                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4 text-sm rounded-lg">
                            <Image src={cancer_leg} width={50} height={50} className='rounded-full' alt='industry-icon'/>
                            <p className='font-bold'>Cancer</p>
                            <p>Use RNA Seq and Genomics data to understand Cancers across different populations</p>
                            {Buttons("Begin Your Journey!", "?modal=true")}
                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4 text-sm rounded-lg">
                            <Image src={ml} width={50} height={50} className='rounded-full' alt='industry-icon'/>
                            <p className='font-bold'>Machine Learning in Biology</p>
                            <p>Use Machine Learning Models to deconvolute complex multimodal biological data</p>
                            {Buttons("Upcoming", "")}
                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4 text-sm rounded-lg">
                            <Image src={amr} width={50} height={50} className='rounded-full' alt='industry-icon'/>
                            <p className='font-bold'>Pathogen Genomics</p>
                            <p>Resolve AMR diversity and trends using Genomics data from clinical isolates</p>
                            {Buttons("Upcoming", "")}
                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4 text-sm rounded-lg">
                            <Image src={dna} width={50} height={50} className='rounded-full' alt='industry-icon'/>
                            <p className='font-bold'>Genomics</p>
                            <p>Learn to use BASh, R and Python to analyze whole genome sequence datasets</p>
                            {Buttons("Upcoming", "")}
                        </div>
                        
                    </div>
                </div>
            </section>

            <section className="md:hidden p-5">
                <div className=" flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-xl w-full text-center">Event Calendar for the Internship</p>
                        <p className="text-center">Start Preparing Ahead of Time 🚀</p>
                    </div>
                    
                    <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                        <Image src={cancer_leg} width={50} height={50} className='rounded-full' alt='industry-icon'/>
                        <p className='font-bold'>Cancer</p>
                        <p>Use RNA Seq and Genomics data to understand Cancers across different populations</p>
                        {Buttons("Register", "")}
                    </div>

                    <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                        <Image src={ml} width={50} height={50} className='rounded-full' alt='industry-icon'/>
                        <p className='font-bold'>Machine Learning in Biology</p>
                        <p>Use Machine Learning Models to deconvolute complex multimodal biological data</p>
                        {Buttons("Register", "")}
                    </div>

                    <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                        <Image src={amr} width={50} height={50} className='rounded-full' alt='industry-icon'/>
                        <p className='font-bold'>Pathogen Genomics</p>
                        <p>Resolve AMR diversity and trends using Genomics data from clinical isolates</p>
                        {Buttons("Register", "")}
                    </div>

                    <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                        <Image src={dna} width={50} height={50} className='rounded-full' alt='industry-icon'/>
                        <p className='font-bold'>Genomics</p>
                        <p>Learn to use BASh, R and Python to analyze whole genome sequence datasets</p>
                        {Buttons("Register", "")}
                    </div>
                </div>
                
            </section>
        </main>
    )
}
