import { ArrowRight } from "lucide-react";
import Link from "next/link";


// Props: upcoming, coursesList, internshipStatus
export default function UpcomingCourseDetails({ id, n, title }: { id: string; n: number; title: string; }) {

  return (
    <main>
      <div key={id} className="hidden w-full  h-full md:flex flex-col gap-5  items-center justify-center">
        <div className="flex flex-col gap-5 items-start justify-center overflow-y-auto ">                          
          <div key={id} className="flex flex-col items-start  justify-start">
              <div className="flex flex-col  items-start justify-start ">
                  <Link href={`/learning/course/${id}`} className="flex flex-row gap-5 items-center justify-start  rounded-lg w-125 border border-hb-green px-7 py-5 min-h-24 hover:bg-green-50">
                      <p className="text-lg font-bold">{n+1}. </p>
                      <p className="text-lg font-bold">{title}</p>
                      <ArrowRight className="ml-auto text-hb-green" />
                  </Link>
              </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full md:hidden gap-5  rounded-xl">
        <Link key={id} href={`/learning/course/${id}`} className="flex flex-row items-center min-h-24 gap-3 border border-hb-green rounded-lg px-5 py-4 hover:bg-green-50">
          <p className="text-base font-bold">{n+1}. {title}  </p>
        </Link>
      </div>
    </main>
  );
}
