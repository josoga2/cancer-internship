import { EnrollLiteDialog } from "@/components/enroll/enrollLite";
import HbButtons from "../hb-buttons";
import { Check} from "lucide-react";



// Props: upcoming, coursesList, internshipStatus
export default function PremiumPrice() {

  return (
    <main>
      <div className="hidden w-full py-10 text-sm h-full md:flex flex-col gap-5 px-10  items-center justify-center pb-10">
        {/*desktop*/}
        <div className="flex flex-col gap-5 max-w-full rounded border-2 p-5 px-10 border-hb-green items-start justify-start ">
          <div className=" -top-4 left-1/2 -translate-x-1/2 
                    px-4 py-1 rounded-md text-white text-sm font-semibold
                    bg-linear-to-r from-pink-500 to-blue-600">
              Best Value
          </div>
          <span className="flex flex-col items-start font-bold text-4xl gap-2 py-5"> <p>Premium Learning</p>  </span>
          <ul className="flex flex-col gap-5 items-start justify-start list-decimal">
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> Complete Access to Eligible Courses </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> AI-Assisted Training and Mentorship </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> Teamwork and Projects </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> Graded Certification </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> Weekly Graded Tasks + Feedback </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> 1-on-1 troubleshooting meetings </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> Weekly mentorship calls </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> Unlimited access to Bioinformatics servers* </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> Complete All 8 stages </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> Unlimited access to final project phase </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> Support for first draft manuscript </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-base"> No Eviction from the internship </span></li>
          </ul>

          <EnrollLiteDialog />

        </div>
      </div>

      <div className="flex flex-col w-full md:hidden gap-5 p-2  rounded-xl">
          <div className="flex flex-col gap-5 max-w-full rounded border-2 p-2 px-5 border-hb-green items-start justify-start ">
          <div className=" -top-4 left-1/2 -translate-x-1/2 
                    px-4 py-1 rounded-md text-white text-sm font-semibold
                    bg-linear-to-r from-pink-500 to-blue-600">
              Best Value
          </div>
          <span className="flex flex-col items-start font-bold text-2xl gap-2 py-2"> <p>Premium Learning</p>  </span>
          <ul className="flex flex-col gap-2 items-start justify-start list-decimal">
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> Complete Access to Eligible Courses </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> AI-Assisted Training and Mentorship </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> Teamwork and Projects </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> Graded Certification </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> Weekly Graded Tasks + Feedback </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> 1-on-1 troubleshooting meetings </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> Weekly mentorship calls </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> Unlimited access to Bioinformatics servers* </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> Complete All 8 stages </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> Unlimited access to final project phase </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> Support for first draft manuscript </span></li>
              <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start text-sm"> No Eviction from the internship </span></li>
          </ul>

          <EnrollLiteDialog />

        </div>
      </div>
    </main>
    
  );
}
