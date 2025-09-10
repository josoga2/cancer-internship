"use client";
import UpcomingCourseCard from "@/components/course-card";
import hb_logo from "../../../public/hb_logo.png";
import internship from '../../../public/internships.jpg'
import playground from '../../../public/playground.jpg'
import learning_pathway from '../../../public/learning_path.jpg'
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "../../api";
import withAuth from "@/components/withAuth";
import { MdOutlineDashboard } from "react-icons/md";
import { BiAtom, BiDna } from "react-icons/bi";
import Logout from "@/components/logout";
import { useRouter } from "next/navigation";


const tab_items = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard/",
    isActive: true,
    iconImage: MdOutlineDashboard
  },
  {
    id: 2,
    name: "Internships",
    link: "/dashboard/internship/",
    isActive: false,
    iconImage: BiDna
  },
  {
    id: 3,
    name: "Internship Courses",
    link: "/dashboard/internship/courses/",
    isActive: false,
    iconImage: BiDna
  },
  {
    id: 4,
    name: "Career Paths",
    link: "/dashboard/pathway/",
    isActive: false,
    iconImage: BiAtom
  },
  {
    id: 5,
    name: "CP Courses",
    link: "/dashboard/pathway/courses/",
    isActive: false,
    iconImage: BiAtom
  }
]


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
    desc: "Access all your enrolled structured learning paths for defined careers in life science and biotech here.",
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

function Page() {

  const [username, setUsername] = useState("");
  const router = useRouter()

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/get-user-profile/'); // Adjust the endpoint as needed
        //console.log("Response from get-user-profile:", response.data);
        if (response.data && response.status == 200 || response.status == 201) {
          //console.log("User profile data:", response.data);
          const userProfile = response.data; 
          setUsername(userProfile.username);
          
        } else {
          router.push("/login");
          console.error("No user profile found.");
          
        }
      } catch (error) {
        router.push("/login");
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);


  return (
    <main className=" w-full">
    <div className="hidden md:flex flex-row w-full pl-5">
      {/**LEFT SIDE BAR */}
      <div className="flex flex-col gap-5 text-base h-screen bg-white items-start w-[200px] border-r">
        <div className="flex flex-row items-center gap-2 px-2 py-5">
          <Image src={hb_logo} alt="logo" width={40} height={40} />
          <p className="font-bold">HackBio</p>
        </div>
        <div className="flex flex-col gap-5 w-full items-start">
          {tab_items.map((tab_item) => (
            <a href={tab_item.link} key={tab_item.id}>
              <div key={tab_item.id} className= {` w-[200px] px-2 pl-5 py-2.5 hover:underline flex flex-row items-center gap-2 ${tab_item.isActive ? "text-hb-green rounded-l-md bg-green-100 font-bold" : "text-gray-600"}`}>
                {<tab_item.iconImage />} <p>{tab_item.name}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/** MAIN */}
      <div className="w-full bg-green-50 flex flex-col gap-10 overflow-y-auto h-screen pb-10">
          <div className="flex flex-row gap-10 pl-10 pt-7 bg-white w-full pb-5 border-b text-base text-gray-600 items-center justify-between pr-10">
            <div className="flex flex-row items-center gap-10">
              <a href="/internship" className="hover:underline font-bold">Internships</a>
              <a href="/learning" className="hover:underline font-bold">Courses</a>
            </div>
            <Logout />
          </div>
          <div className="">
        <p className="px-10 font-bold text-2xl"> 👋 Welcome back,  {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()} </p>
        <div className="flex flex-col gap-10 w-full px-10 pt-10">
          {course_list.filter(course_item => course_item.sub).map((course_item) => (
            <div key={course_item.id}>
              <UpcomingCourseCard desc={course_item.desc} image={course_item.image} directTo={course_item.directTo} title={course_item.title} lessons={course_item.lessons} weeks={course_item.weeks}/>
            </div>
          ))}
        </div>

          </div>
      </div>
    </div>

    {/** Mobile */}
    <div className="block md:hidden w-full pb-28 min-h-[100svh]">

          {/* Top Navbar - Logo + Menu */}
          <div className="flex flex-row items-center justify-between px-4 py-4 border-b bg-white">
            <div className="flex flex-row items-center gap-2">
              <Image src={hb_logo} alt="HackBio logo" width={32} height={32} />
              <p className="font-bold text-lg">HackBio</p>
            </div>

            {/* Simple hamburger or nav toggle — can be replaced with mobile menu logic */}
            <div className="flex flex-row gap-4 text-sm font-bold">
              
              <Logout />
            </div>
          </div>

          {/* Navigation Tabs (from sidebar) */}
          {/* Navigation Tabs (from sidebar) */}
          {/* Drawer Toggle Button */}
          <div className="flex items-center py-4 px-4">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
              className="p-2 rounded-md border border-gray-300 bg-white shadow-sm"
            >
              {/* Hamburger Icon */}
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Drawer Overlay */}
          {drawerOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-30"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation overlay"
            />
          )}

          {/* Drawer Panel */}
          <div
            className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
              drawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ willChange: "transform" }}
          >
            <div className="flex flex-row items-center justify-between px-4 py-4 border-b">
              <div className="flex flex-row items-center gap-2">
                <Image src={hb_logo} alt="HackBio logo" width={32} height={32} />
                <p className="font-bold text-lg">HackBio</p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation"
                className="p-2 rounded-md"
              >
                {/* Close Icon */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-2 px-4 py-4">
              {tab_items.map((tab_item) => (
                <a key={tab_item.id} href={tab_item.link} onClick={() => setDrawerOpen(false)}>
                  <div className={`flex flex-row items-center gap-2 py-2 px-3 rounded-md ${tab_item.isActive ? "bg-green-100 text-hb-green font-bold" : "text-green-900"}`}>
                    <tab_item.iconImage />
                    <p className="text-sm">{tab_item.name}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col bg-green-50 gap-8 h-screen px-4 py-6  min-h-[100svh]">
            <p className="font-bold text-xl">
              👋 Welcome back, {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()}
            </p>

            <div className="flex flex-col gap-6 items-center min-h-[100svh] ">
              {course_list.filter(course_item => course_item.sub).map((course_item) => (
                <UpcomingCourseCard
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

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });