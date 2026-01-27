import { EnrollLiteDialog } from "@/components/enroll/enrollLite";
import { Check, X } from "lucide-react";
import Link from "next/link";
import HbButton from "../widgets/hb-buttons";

const plans = {
  "plans": [
    {
      "name": "Preview",
      "cost": 0,
      "currency": "USD",
      "frequency": 'month',
      "billing": "free",
      "seats": 1,
      "validity": "forever",
      "side_tag": 'Limited Access',
      "access": "Limited to a few courses",
      "features": {
        "tasks": true,
        "task_feedback": "AI",
        "projects": false,
        "slack_access": false,
        "mentorship": false,
        "manuscript_support": false,
        "teamwork": false,
        "one_on_one_troubleshooting": false,
        "hb_club_invite": false,
        "career_program_invite": false
      }
    },
    {
      "name": "Course Access",
      "cost": 30,
      "currency": "USD",
      "billing": "per_year_per_course",
       "frequency": 'year',
      "seats": 1,
      "validity": "1 year, 1 course",
      "side_tag": '1 year, 1 course',
      "access": "1 course",
      "features": {
        "tasks": true,
        "task_feedback": "AI",
        "projects": true,
        "slack_access": false,
        "mentorship": false,
        "manuscript_support": false,
        "teamwork": false,
        "one_on_one_troubleshooting": false,
        "hb_club_invite": false,
        "career_program_invite": false
      }
    },
    {
      "name": "Internship Access",
      "cost": 100,
      "currency": "USD",
      "billing": "per_cohort",
       "frequency": '1 year',
      "seats": 1,
      "validity": "1 cohort (2 months)",
      "side_tag": 'Cohort based',
      "access": "1 internship",
      "features": {
        "tasks": true,
        "task_feedback": "AI + Human",
        "projects": true,
        "slack_access": true,
        "mentorship": true,
        "manuscript_support": false,
        "teamwork": true,
        "one_on_one_troubleshooting": true,
        "hb_club_invite": false,
        "career_program_invite": false
      }
    },
    {
      "name": "Career Pathway",
      "cost": 60, //make sure each pathway contains at least 3 courses
      "currency": "USD",
      "billing": "per_cohort",
       "frequency": '1 year',
      "seats": 1,
      "validity": "Access for 1 year",
      "side_tag": 'Cohort',
      "access": "Access all courses in this pathway",
      "features": {
        "tasks": true,
        "task_feedback": "AI",
        "projects": true,
        "slack_access": false,
        "mentorship": false,
        "manuscript_support": false,
        "teamwork": false,
        "one_on_one_troubleshooting": true,
        "hb_club_invite": false,
        "career_program_invite": false
      }
    },
    {
      "name": "Become a Pro",
      "cost": 400,
      "currency": "USD",
      "billing": "per_year",
       "frequency": 'year',
      "seats": 1,
      "validity": "1 year",
      "side_tag": 'Full Access',
      "access": "All courses and internships",
      "features": {
        "tasks": true,
        "task_feedback": "AI + Human",
        "projects": true,
        "slack_access": true,
        "mentorship": true,
        "manuscript_support": true,
        "teamwork": true,
        "one_on_one_troubleshooting": true,
        "hb_club_invite": true,
        "career_program_invite": true
      }
    },
    {
      "name": "Lab",
      "cost": 1200,
      "currency": "USD",
      "billing": "per_year",
       "frequency": 'year',
      "seats": "5-10",
      "validity": "1 year",
      "side_tag": 'Full Access',
      "access": "All courses and internships",
      "features": {
        "tasks": true,
        "task_feedback": "AI + Human",
        "projects": true,
        "slack_access": true,
        "mentorship": true,
        "manuscript_support": true,
        "teamwork": true,
        "one_on_one_troubleshooting": true,
        "hb_club_invite": true,
        "career_program_invite": true
      }
    },
    {
      "name": "Institutional Access",
      "cost": 'Contact us',
      "currency": "USD",
      "billing": "contact_us",
       "frequency": '',
      "seats": "custom",
      "validity": "1 year",
      "side_tag": 'Full Access',
      "access": "All courses and internships",
      "features": {
        "tasks": true,
        "task_feedback": "AI + Human",
        "projects": true,
        "slack_access": true,
        "mentorship": true,
        "manuscript_support": true,
        "teamwork": true,
        "one_on_one_troubleshooting": true,
        "hb_club_invite": true,
        "career_program_invite": true
      }
    }
  ]
}


// Props: upcoming, coursesList, internshipStatus
export default function HbPrices({plan, discount, prog, progId}:{plan: string; discount: number; prog:string; progId:string}) {

  return (
    <main>
      <div className="hidden w-full py-10 text-sm h-full md:flex flex-col gap-5 px-10  items-center justify-center pb-10">
        {/*desktop*/}
        <div className="flex flex-col gap-5 max-w-full rounded border-2 p-5 px-5 border-hb-green items-start justify-start  ">
          
          {
            plans.plans.filter(selected_plan => selected_plan.name === plan).map((sp, idx) => (
                <div className="flex flex-col text-base w-60" key={idx}>
                    <div className={`-top-4 left-1/2 -translate-x-1/2 
                        px-4  rounded-md text-white text-sm font-semibold w-fit
                        ${sp.name === 'Become a Pro' ?  'py-2 bg-linear-to-r from-pink-500 to-blue-600' : 'bg-linear-to-r from-gray-300 to-gray-600'}`}>
                        {sp.name === 'Become a Pro' && <p>Best Value</p>}
                    </div>
                    <span className="flex flex-col items-start font-bold  gap-2 py-2"> <p> {sp.name} </p> </span>
                    <ul className="flex flex-col gap-2 items-start justify-start text-sm list-decimal">
                        <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start"> ${Number(sp.cost) - (discount * Number(sp.cost))}/{sp.frequency} </span></li>
                        <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start"> {sp.access} </span></li>
                        <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start"> {sp.seats} person(s) </span></li>
                        <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start"> Valid for {sp.validity}  </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.tasks ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Graded Tasks and Feedbacks </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.projects ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Final Projects </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.slack_access ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Workspace Access </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.mentorship ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Guided Mentorship </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.manuscript_support ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Support for draft Manuscript </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.teamwork ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Teamwork </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.one_on_one_troubleshooting ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> One on one troubleshooting </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.hb_club_invite ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Exclusive Invite to HackBio Clubs </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.career_program_invite ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Exclusive Invite to Career Invites </span></li>

                        <Link href={{ pathname: "/dashboard/checkout", query: { prog:prog, id:progId } }} className="pt-5" > <HbButton text="Enroll" type="primary" /> </Link>
                    </ul>
                </div>
            ))
          }


          

        </div>
      </div>

      <div className="flex flex-col w-full md:hidden gap-5 p-2  rounded-xl">
          {/*mobile*/}
        <div className="flex flex-col gap-5 max-w-full rounded border-2 p-5 px-5 border-hb-green items-start justify-start  ">
          
          {
            plans.plans.filter(selected_plan => selected_plan.name === plan).map((sp, idx) => (
                <div className="flex flex-col text-base w-60" key={idx}>
                    <div className={`-top-4 left-1/2 -translate-x-1/2 
                        px-4  rounded-md text-white text-sm font-semibold w-fit
                        ${sp.name === 'Become a Pro' ?  'py-2 bg-linear-to-r from-pink-500 to-blue-600' : 'bg-linear-to-r from-gray-300 to-gray-600'}`}>
                        {sp.name === 'Become a Pro' && <p>Best Value</p>}
                    </div>
                    <span className="flex flex-col items-start font-bold  gap-2 py-2"> <p> {sp.name} </p> </span>
                    <ul className="flex flex-col gap-2 items-start justify-start text-sm list-decimal">
                        <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start"> ${Number(sp.cost) - (discount * Number(sp.cost))}/{sp.frequency} </span></li>
                        <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start"> {sp.access} </span></li>
                        <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start"> ${sp.seats} person(s) </span></li>
                        <li className="flex flex-row items-center gap-2"> <Check className="w-5 h-5 shrink-0 text-green-600" /> <span className=" gap-2 items-start justify-start"> Valid for {sp.validity}  </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.tasks ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Graded Tasks and Feedbacks </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.projects ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Final Projects </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.slack_access ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Workspace Access </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.mentorship ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Guided Mentorship </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.manuscript_support ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Support for draft Manuscript </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.teamwork ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Teamwork </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.one_on_one_troubleshooting ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> One on one troubleshooting </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.hb_club_invite ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Exclusive Invite to HackBio Clubs </span></li>
                        <li className="flex flex-row items-center gap-2"> {sp.features.career_program_invite ? <Check className="w-5 h-5 shrink-0 text-green-600" /> : <X className="w-5 h-5 shrink-0 text-red-600" />} <span className=" gap-2 items-start justify-start"> Exclusive Invite to Career Invites </span></li>

                        <Link href={{ pathname: "/dashboard/checkout", query: { prog:prog, id:progId } }} className="pt-5" > <HbButton text="Enroll" type="primary" /> </Link>
                    </ul>
                </div>
            ))
          }
        </div>
      </div>
    </main>
    
  );
}
