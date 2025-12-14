import HbButtons from "@/components/widgets/hb-buttons";
import talent_map from "@/../public/wolrd-map.png"

export default function ForRecruiters() {
    return (
        <main>
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="pt-20 pb-10  w-full h-full  flex flex-col gap-5 px-1 border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen ">
          
                    <div className="grid grid-cols-2 gap-10 items-center justify-center">
            
                        <div className="flex flex-row gap-5 py-10 items-center justify-center">
                            <img src={talent_map.src} alt="biology" className="w-[900px] h-full" /> 
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <p className="text-start font-semibold text-hb-green text-lg"> {`>_ For Recruiters`}</p>
                            <p className="font-bold">Hire pre-vetted bioinformatics talents, globally</p>
                            <p className="">Stop wasting time screening thousands of resumes. HackBio graduates are trained on real projects assessed weekly and ranked by performance.</p>
                            <ul className="pl-10 flex flex-col gap-2">
                                <li className="list-disc">Vetted global bioinformatics talents open to <span className="font-bold underline">ACADEMIC</span> and <span className="font-bold underline">INDUSTRY</span> talents</li>
                                <li className="list-disc">  Hire PhD students, Full-time, Freelancers and Contract-interns </li>
                                <li className="list-disc">  Zero overhead on your side, flexible engagement </li>
                            </ul>
                            <div className="flex flex-row gap-5 py-5">
                                <a href="/hire-talents"> <HbButtons text="Hire Talents →" type="primary"/> </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 p-2  rounded-xl">
                <div className="flex flex-col gap-5 p-5 border border-hb-lightgreen rounded-xl">
                    <img src={talent_map.src} alt="hackbio talent map" className="w-full rounded-lg" />
                    <p className="font-semibold text-hb-green text-base">{`>_ For Recruiters`}</p>
                    <p className="font-bold text-lg">Hire pre-vetted bioinformatics talents</p>
                    <p className="text-sm">
                        HackBio graduates are trained on real projects assessed weekly and ranked
                        by performance.
                    </p>
                    <ul className="pl-5 list-disc text-sm space-y-2">
                        <li>
                            Vetted global talents for <span className="font-bold underline">ACADEMIC</span> and{" "}
                            <span className="font-bold underline">INDUSTRY</span>
                        </li>
                        <li>Hire PhD students, Full-time, Freelancers and Contract-interns</li>
                        <li>Zero overhead, flexible engagement</li>
                    </ul>
                    <a href="/hire-talents">
                        <HbButtons text="Hire Talents →" type="primary" />
                    </a>
                    
                    </div>
            </div>
        </main>
    )
}