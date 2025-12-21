import HbButtons from "@/components/widgets/hb-buttons";
import learners from '@/../public/learners.png'

export default function ForLearners() {
    return (
        <main>
            {/* Desktop View */}
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="py-5 bg-hb-lightgreen w-full h-full  flex flex-col gap-5 px-10">
          
                    <div className="grid grid-cols-2 gap-10 items-center justify-center">
                        <div className="flex flex-col gap-3 w-4/5">
                            <p className="text-start font-semibold text-hb-green text-lg"> {`>_ For Learners`}</p>
                            <p className="font-bold">Turn skills into career ready projects </p>
                            <p className="">Join project-based internships and courses and get top-tier bioinformatics education in weeks. Build real data pipelines and applications for life science, not just theories.</p>
                            <ul className="pl-10 flex flex-col gap-2">
                                <li className="list-disc">  Cover Fundamental Biology and Maths </li>
                                <li className="list-disc">  Master programming for data and software applications in life science</li>
                                <li className="list-disc">  Complete real world projects in in-demand topics </li>
                            </ul>
                            <div className="flex flex-row gap-5 py-5">
                                <a href="/learning"> <HbButtons text="Explore Career Paths →" type="primary"/> </a>
                                {/*<a href="/learning"><HbButtons text="Self paced learning" type="primary"/> </a>*/}
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 py-10 items-center justify-center">
                            <img src={learners.src} alt="biology" className="w-800" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="flex flex-col w-full md:hidden gap-5   rounded-xl">
                <div className="flex flex-col gap-5 bg-hb-lightgreen p-5 rounded-xl">
                    <img src={learners.src} alt="biology" className="w-full rounded-lg" />
                    <p className="font-semibold text-hb-green text-base">{`>_ For Learners`}</p>
                    <p className="font-bold text-lg">Turn skills into career ready projects</p>
                    <p className="text-sm">
                        Join project-based internships and courses and get top-tier bioinformatics
                        education in weeks. Build real data pipelines and applications for life
                        science, not just theories.
                    </p>
                    <ul className="pl-5 list-disc text-sm space-y-2">
                        <li>Cover Fundamental Biology and Maths</li>
                        <li>Master programming for data and software applications</li>
                        <li>Complete real world projects in in-demand topics</li>
                    </ul>
                    <div className="flex flex-col gap-3 pt-3">
                        <a href="/internship">
                            <HbButtons text="Join the Next Internship" type="primary" />
                        </a>
                        <a href="/learning">
                            <HbButtons text="Self-paced learning" type="primary" />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}