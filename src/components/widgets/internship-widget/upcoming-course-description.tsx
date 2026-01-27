
import { EnrollDialog } from "@/components/enroll/enroll";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import HbButton from "../hb-buttons";
import { Button } from "@/components/ui/button";
import Link from "next/link";




// Props: upcoming, coursesList, internshipStatus
export default function UpcomingCourseDescription({ description, internshipStatus, status, id }: { description: string; internshipStatus: string, status:boolean, id:string }) {

  return (
    <main>
      <div className="hidden w-full  h-full md:flex flex-col gap-5  items-center justify-center">
        <div className="flex flex-col gap-5 items-start justify-center w-full overflow-y-auto">
                                    
          <div  className="py-5 flex flex-col  items-start justify-start w-full gap-5">
              <p className="text-2xl font-bold">Description</p>
            <div className="prose">
              <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{description}</Markdown>
            </div>
            {status? <Link href="/dashboard"><Button className="px-10 py-6 text-white font-bold text-xl bg-green-600" >Enroll Now</Button></Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'career', id:id } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }

          </div>
        </div>
      </div>

      <div className="flex flex-col w-full md:hidden gap-5  rounded-xl">
        <div  className="py-5 flex flex-col gap-5 items-start justify-start w-full">
          <p className="text-2xl font-bold">Description</p>
          <div className="prose">
            <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{description}</Markdown>
          </div>
          {status? <Link href="/dashboard"><Button className="px-10 py-6 text-white font-bold text-xl bg-green-600" >Enroll Now</Button></Link> : <Link href={{ pathname: "/dashboard/checkout", query: { prog:'career', id:id } }} className="pt-5" > <HbButton text="Enroll Now" type="primary" /> </Link> }


        </div>
      </div>
    </main>
  );
}
