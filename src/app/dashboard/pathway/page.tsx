'use client';
import UpcomingCourseCard from "@/components/course-card";
import hb_logo from "../../../../public/hb_logo.png";
import Image from "next/image";
import withAuth from "@/components/withAuth";
import api from "@/api";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";
import { BiDna, BiAtom } from "react-icons/bi";
import { LuNotebook } from "react-icons/lu";
import Logout from "@/components/logout";


const tab_items = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard/",
    isActive: false,
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
    isActive: true,
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
function Page() {

  const router = useRouter()
  const [username, setUsername] = useState("");
  const [userPathwayId, setUserPathwayId] = useState<number[]>([]);
  const [pathwayList, setPathwayList] = useState<Array<{
        id?: string
        title?: string
        description?: string
        published?: boolean
        free?: boolean
        start_date?: string
        overview?: string
        lenght_in_weeks?: number
        int_image?: string
        courses?: Array<{
            id?: number | string
        }>
    }>>([
        {
            id: "",
            title: "",
            description: "",
            published: false,
            free: false,
            start_date: "",
            overview: "",
            lenght_in_weeks: 0,
            int_image: "/",
            courses: [{ id: "" }]
        }
    ]);

    //get username
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

  //get user internship id
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/get-user-profile/'); // Adjust the endpoint as needed
        //console.log("Response from get-user-profile:", response.data);
        if (response.data && response.status == 200 || response.status == 201) {
          //console.log("User profile data:", response.data[0].Internships);
          const userProfile = response.data; // Assuming you want the first profile
          setUserPathwayId(
            Array.isArray(userProfile.Pathways)
              ? userProfile.Pathways.map((id: any) => Number(id))
              : userProfile.Pathways
                ? [Number(userProfile.Pathways)]
                : []
          ); // Set the internships array if it exists

          //make the internship list
          const pathwayResponse = await api.get('/api/pathways/');

          if (pathwayResponse.status === 200) {
            //console.log("Pathway Response Data:", pathwayResponse.data);
            const pathways = pathwayResponse.data.filter((pathway: { id: string, free: boolean }) => 
              userProfile.Pathways.includes(Number(pathway.id)) && pathway.free
            );
            setPathwayList(pathways);
          }
          
        } else {
          console.error("No user profile found.");
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
        console.error("Error fetching user profile:", error);
        
      }
    };

    fetchUserProfile();
  }, []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  //console.log("User Internship IDs:", internshipList);

  //console.log("Internship List:", internshipList);

  return (
    <main className="w-full">
    <div className="hidden md:flex flex-row w-full pl-5">
      {/**LEFT SIDE BAR */}
      <div className="flex flex-col gap-5 text-base h-screen bg-white items-start w-[200px] border-r">
        <div className="flex flex-row items-center gap-2 px-2 py-5">
          <Image src={hb_logo} alt="logo" width={40} height={40} />
          <p className="font-bold">HackBio</p>
        </div>
        <div className="flex flex-col gap-7 w-full items-start">
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
          <div className="flex flex-row gap-10 pl-10 pt-7 bg-white w-full pb-5 border-b text-base text-gray-600 justify-between pr-10">
            <div className="flex flex-row items-center gap-10">
              <a href="/internship" className="hover:underline font-bold">Internships</a>
              <a href="/learning" className="hover:underline font-bold">Courses</a>
            </div>
            <Logout />
          </div>
          <div className="">
        <p className="px-10 font-bold text-2xl"> {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()}'s Career Pathways </p>
        <div className="flex flex-col gap-10 w-full px-10 pt-10">
          {pathwayList.map((pathway) => (
            <div key={pathway.id}>
              <UpcomingCourseCard
                desc={pathway.overview ?? ""}
                image={pathway.int_image ?? "/"}
                directTo={'/dashboard/pathway/courses'}
                title={pathway.title ?? ""}
                weeks={pathway.lenght_in_weeks ?? 0} lessons={0} />
            </div>
          ))}
        </div>

          </div>
      </div>
    </div>

    {/**MOBILE */}
    <div className="flex flex-col w-full pb-20 min-h-[100svh] md:hidden">

      {/* Top Navigation */}
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

      {/* Main Scrollable Content */}
      <div className="flex-1 items-center bg-green-50 px-4 py-6">
        <p className="font-bold text-xl mb-6">
          {username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}'s Learning Pathways
        </p>

        <div className="flex flex-col gap-6 items-center pb-20 min-h-[100svh]">
          {pathwayList.map((pathway) => (
            <UpcomingCourseCard
              key={pathway.id}
              desc={pathway.overview ?? ""}
              image={pathway.int_image ?? "/"}
              directTo="/dashboard/pathway/courses"
              title={pathway.title ?? ""}
              weeks={pathway.lenght_in_weeks ?? 0}
              lessons={0}
            />
          ))}
        </div>
      </div>

      {/* Logout (Bottom) */}
      
    </div>

    </main>
  )
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });