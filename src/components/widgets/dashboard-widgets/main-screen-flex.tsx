import UpcomingCourseCard from "@/components/course-card";
import Logout from "@/components/logout";
import HbButtons from "@/components/widgets/hb-buttons";
import internship from '@/../public/internships.jpg'
import learning_pathway from '@/../public/learning_path.jpg'

const course_list = [
  {
    id: 1,
    title: "Internships",
    desc: "Access all your internships (their learning contents, tasks and projects) here.",
    image: internship,
    directTo: "/dashboard/internship",
    lessons: 34,
    weeks: 4,
    sub: true,
  },
  {
    id: 2,
    title: "Career Paths",
    desc: "Access all your structured learning paths for defined careers in life science here.",
    image: learning_pathway,
    directTo: "/dashboard/pathway",
    lessons: 34,
    weeks: 4,
    sub: true,
  },
  /* {
    id: 3,
    title: "Playground",
    desc: "New Challenges, New Projects, New Skills. Complete Short Interesting Projects, Every Month.",
    image: playground,
    directTo: "/dashboard/playground",
    lessons: 34,
    weeks: 4,
    sub: true,
  } */
]



export default function MainScreenFlex({ username, mini_desc }: { username: string, mini_desc: string }) {
    return (
        <main className="w-full">
            <div className="hidden w-full md:flex flex-col gap-5 items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="w-full bg-green-50 flex flex-col gap-10 overflow-y-auto ">
                    <div className="flex flex-row gap-10 pl-10 pt-7 bg-white w-full pb-5 border-b text-base text-gray-600 items-center justify-between pr-10">
                        <div className="flex flex-row items-center gap-10">
                            <a href="/internship" className="hover:underline font-bold">Upcoming Internships</a>
                            <a href="/learning" className="hover:underline font-bold">Explore Career Paths</a>
                        </div>
                        <Logout />
                    </div>
                    <div className="px-10 ">
                        <p className="font-bold text-2xl"> 👋 Welcome back,  {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()} </p>
                        <p className="py-5 text-xs text-gray-500">-- {mini_desc} </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 rounded-xl bg-hb-lightgreen">
                <div className="flex flex-col items-start gap-8 ">
                    <p className="font-bold text-lg">
                        
                    </p>
                </div>
            </div>
        </main>
    )
}