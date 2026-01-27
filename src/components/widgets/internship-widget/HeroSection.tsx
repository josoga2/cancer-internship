import HbButtons from "../hb-buttons";
import { EnrollDialog } from "@/components/enroll/enroll";
import Image from "next/image";
import keywords from "@/../public/keywords.svg"
import testimonials from "@/../public/Testimonials.svg"
import sm_testimonial from "@/../public/sm_testimonial.svg"
import Link from "next/link";
import HbButton from "../hb-buttons";
import { Button } from "@/components/ui/button";



// Props: upcoming, coursesList, internshipStatus
export default function HeroSection({ id, internshipStatus }: { id: string, internshipStatus: string}) {

  return (
    <main>
      <div key={id} className="hidden w-full py-10  h-full md:flex flex-col gap-5 px-10  items-center justify-center  pb-10">
        {/*desktop*/}
        <div className="py-5 h-full w-full flex flex-row  pt-10 justify-between items-center">
          <div className="flex flex-col gap-5">
            <p className="text-3xl font-bold text-start">{`Open Internship (Currently open)`}</p>
            <p className="text-lg">Comprehensive Bioinformatics Training</p>
            <Link href={{ pathname: "/dashboard/checkout", query: { prog:'internship', id:id } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> 
            
          </div>
          <Image src={keywords} alt="biology" className="w-2/5" />
        </div>
        <div className="flex flex-col py-10 items-center gap-5">
          <p className="text-lg font-bold text-center">
              100+ Organizations have hired our graduates
          </p>
          <img
              src={testimonials.src}
              alt="organizations-that-trust-hackbio"
              className="w-full"
          />
        </div>

      </div>

      {/** Mobile */}
      <div className="flex flex-col w-full md:hidden gap-5  rounded-xl">
        <Image src={keywords} alt="biology" className="w-full" />
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-bold text-start">Open Internships</p>
          <p className="text-base">Comprehensive Bioinformatics Training</p>
          <Link href={{ pathname: "/dashboard/checkout", query: { prog:'internship', id:id } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> 
        </div>

        <div className="flex flex-col items-center gap-5 py-5">
            <p className="text-lg font-bold text-center">
                100+ Organizations have hired our graduates
            </p>
            <img
                src={sm_testimonial.src}
                alt="organizations-that-trust-hackbio"
                className="w-full"
            />
        </div>
      </div>
    </main>
    
  );
}
