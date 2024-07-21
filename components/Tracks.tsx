import Image from "next/image";
import cancer_leg from "../public/cancer.png";
import ml from "../public/dna.png"
import amr from '../public/Virus.png';
import dna from '../public/bacteria.png'
import drug from '../public/inductry.png'


export default function Tracks(){

    return(
        
        <main>
            <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between pb-10 pt-10 px-10">
                <div className="flex flex-col gap-5 w-full">
                    <p className="font-bold text-xl w-full text-center">What you will do in this Internship</p>
                    <p className="text-center">Industry/Academia relevant learning tracks</p>

                    <div className="grid grid-cols-3 gap-10 ">
                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4 rounded-lg">
                            <Image src={drug} width={50} height={50} className='rounded-md border-2 border-hbblue-3' alt='industry-icon'/>
                            <p className='font-bold'>Drug Discovery</p>
                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                            <Image src={ml} width={50} height={50} className='rounded-md border-2 border-hbblue-3' alt='industry-icon'/>
                            <p className='font-bold'>Biomarker Discovery</p>

                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                            <Image src={amr} width={50} height={50} className='rounded-md border-2 border-hbblue-3' alt='industry-icon'/>
                            <p className='font-bold'>Data, ML/AI in Cancer</p>

                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                            <Image src={dna} width={50} height={50} className='rounded-md border-2 border-hbblue-3' alt='industry-icon'/>
                            <p className='font-bold'>Frontend Bioinformatics</p>

                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                            <Image src={dna} width={50} height={50} className='rounded-md border-2 border-hbblue-3' alt='industry-icon'/>
                            <p className='font-bold'>AMRs in Cancer</p>

                        </div>
                    </div>
                </div>
            </section>

            <section className="md:hidden p-5">
                <div className=" flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-xl w-full text-center">Learning Tracks for the Upcoming Cohort</p>
                        <p className="text-center">Industry/Academia relevant tracks </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-10 ">
                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4 rounded-lg">
                            <Image src={drug} width={50} height={50} className='rounded-md border-2 border-hbblue-3' alt='industry-icon'/>
                            <p className='font-bold'>Drug Discovery</p>
                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                            <Image src={ml} width={50} height={50} className='rounded-md border-2 border-hbblue-3' alt='industry-icon'/>
                            <p className='font-bold'>Biomarker Discovery</p>

                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                            <Image src={amr} width={50} height={50} className='rounded-md border-2 border-hbblue-3' alt='industry-icon'/>
                            <p className='font-bold'>Data, ML/AI in Cancer</p>

                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                            <Image src={dna} width={50} height={50} className='rounded-md border-2 border-hbblue-3' alt='industry-icon'/>
                            <p className='font-bold'>Frontend Bioinformatics</p>

                        </div>

                        <div className="flex flex-col gap-2 bg-hbblue-0.5 p-4  rounded-lg ">
                            <Image src={dna} width={50} height={50} className='rounded-md border-2 border-hbblue-3' alt='industry-icon'/>
                            <p className='font-bold'>AMRs in Cancer</p>

                        </div>
                    </div>
                </div>
                
            </section>
        </main>
    )
}
