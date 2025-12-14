import HbButtons from "@/components/widgets/hb-buttons";
import Image from "next/image";
import microbe from "@/../public/microbe.webp"
import molmed from "@/../public/molmed.webp"
import plantAnim from "@/../public/plants.webp"
import cancers from "@/../public/cancer.webp"
import phealth from "@/../public/phealth.jpg"
import animals from "@/../public/animals.webp"

export default function LearningTracks() {
    return (
        <main>
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5 px-10  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="w-full pt-10">
                    <p className="w-full pb-10 text-center text-4xl font-bold">Learning Tracks</p>
                    <div className="grid grid-cols-3 gap-10 items-start justify-start w-full">
                        <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                            <Image src={microbe.src} alt="microbe" width={50} height={50} />
                            <p className="font-bold">Microbes and Viruses</p>
                        </div>
                        <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                            <Image src={molmed.src} alt="microbe" width={50} height={50} />
                            <p className="font-bold">Molecular Medicine</p>
                        </div>
                        <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                            <Image src={plantAnim.src} alt="microbe" width={50} height={50} />
                            <p className="font-bold">Plant Health and Physiology</p>
                        </div>
                        <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                            <Image src={cancers.src} alt="microbe" width={50} height={50} />
                            <p className="font-bold">Cancers Biomarker Discovery </p>
                        </div>
                        <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                            <Image src={phealth.src} alt="microbe" width={50} height={50} />
                            <p className="font-bold">Public Health & Genomic Epid. </p>
                        </div>
                        <div className=" flex flex-col w-56 p-5 justify-start items-start gap-5 min-h-40 border-2 border-hb-green rounded-md ">
                            <Image src={animals.src} alt="microbe" width={50} height={50} />
                            <p className="font-bold">Animal Health and Physiology</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 p-5  rounded-xl">
                <div>Insert Mobile Code Here</div>
                <HbButtons type="primary" text="HackBio"/>
            </div>
        </main>
    )
}