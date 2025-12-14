import { BookOpenCheck, BrainCircuit, Cable, Pill, Tablets } from "lucide-react";

export default function Hbworks() {
    return (
        <main>
            <div className="hidden w-full py-10 h-full md:flex flex-col gap-5  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="py-5 bg-hb-lightgreen w-full h-full  flex flex-col gap-5 px-10">
                    <div className="w-full h-full py-10 px-10 flex flex-col gap-5 bg-hb-lightgreen items-center justify-center ">
                        <p className="text-xl font-bold text-center"> Why HackBio Works</p>
                        <p className="text-center text-base">Scalable, Efficient and Verified Talent Development Pipelines </p>
                        <div className="flex flex-row gap-10 py-5 items-start justify-start">

                            <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] border-hb-green border-2 p-5 rounded-md">
                                <BookOpenCheck className="text-red-400 bg-amber-100" size={30} />
                                <p className="font-bold text-lg pt-2 text-start">Structured Learning</p>
                                <p className="text-sm text-gray-700 text-start">We break down complex topics into manageable projects and tasks, with clear milestones and deliverables.</p>
                            </div>

                            <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] border-hb-green border-2 p-5 rounded-md">
                                <BrainCircuit className="text-blue-500 bg-amber-100" size={30} />
                                <p className="font-bold text-lg pt-2 text-start">Deeply Practical</p>
                                <p className="text-sm text-gray-700 text-start">All training are embedded with MCQ, frequent code tasks and actual projects with real world datasets. </p>
                            </div>

                            <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] border-hb-green border-2 p-5 rounded-md">
                                <Cable className="text-hb-green bg-amber-100" size={30} />
                                <p className="font-bold text-lg pt-2 text-start">Career Outcomes</p>
                                <p className="text-sm text-gray-700 text-start">Structured skill collections directed towards academic and industry career options across several applications. </p>
                            </div>
                    
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="flex flex-col w-full md:hidden gap-2  rounded-xl">
                <div className="flex flex-col gap-5 p-5 bg-hb-lightgreen rounded-xl">
                    <p className="text-lg font-bold text-center">Why HackBio Works</p>
                    <p className="text-sm text-center">
                        Scalable, Efficient and Verified Talent Development Pipelines
                    </p>
                    <div className="flex flex-col gap-5">
                        <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
                            <BookOpenCheck className="text-red-400 bg-amber-100" size={30} />
                            <p className="font-bold">Structured Learning</p>
                            <p className="text-sm text-gray-700">
                                We break down complex topics into manageable projects and tasks, with clear milestones and deliverables.              
                            </p>
                        </div>
                    <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
                        <BrainCircuit className="text-blue-500 bg-amber-100" size={30} />
                        <p className="font-bold">Deeply Practical</p>
                        <p className="text-sm text-gray-700">
                            All training are embedded with MCQ, frequent code tasks and actual projects with real world datasets.
                        </p>
                    </div>
                    <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
                        <Cable className="text-hb-green bg-amber-100" size={30} />
                        <p className="font-bold">Career Outcomes</p>
                        <p className="text-sm text-gray-700">
                            Structured skill collections directed towards academic and industry career options across several applications.
                        </p>
                    </div>
                    </div>
                </div>
            </div>
        </main>
    )
}