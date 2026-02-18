import UpcomingCourseCard from "@/components/course-card";
import Logout from "@/components/logout";
import internship from '@/../public/internships.jpg'
import InternshipCourseCard from "@/components/internship-course-card";

const course_list = [
  {
    id: 1,
    title: "All Programs",
    desc: "Access all your internships, career paths and their courses here.",
    image: internship,
    directTo: "/dashboard/internship",
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



export default function MainScreen({ username }: { username: string }) {
    return (
        <main className="w-full">
            <div className="hidden w-full h-full md:flex flex-col gap-5 items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="w-full bg-green-50 flex flex-col gap-10 overflow-y-auto h-screen pb-10">
                    <div className="flex flex-row gap-10 pl-10 pt-7 bg-white w-full pb-5 border-b text-base text-gray-600 items-center justify-between pr-10">
                        <div className="flex flex-row items-center gap-10">
                            <a href="/internship" className="hover:underline font-bold">Upcoming Internships</a>
                        </div>
                        <Logout />
                    </div>
                    <div className="px-10 ">
                        <p className="font-bold text-2xl"> 👋 Welcome back,  {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()} </p>
                        <p className="py-5 text-xs text-gray-500">-- Your dashboard </p>
                        <div className="flex flex-row gap-10 w-full  pt-5">
                            {course_list.filter(course_item => course_item.sub).map((course_item) => (
                                <div key={course_item.id}>
                                <InternshipCourseCard desc={course_item.desc} image={course_item.image} directTo={course_item.directTo} title={course_item.title} lessons={course_item.lessons} weeks={course_item.weeks}/>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 rounded-xl bg-hb-lightgreen h-full">
                <div className="flex flex-col  gap-8 h-screen px-4 min-h-svh">
                    <p className="font-bold text-lg">
                        👋 Welcome back, {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()}
                    </p>

                    <div className="flex flex-col gap-6 items-center min-h-svh ">
                        {course_list.filter(course_item => course_item.sub).map((course_item) => (
                            <InternshipCourseCard
                            key={course_item.id}
                            desc={course_item.desc}
                            image={course_item.image}
                            directTo={course_item.directTo}
                            title={course_item.title}
                            lessons={course_item.lessons}
                            weeks={course_item.weeks}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
