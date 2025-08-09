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
import { BiDna } from "react-icons/bi";
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
    isActive: true,
    iconImage: BiDna
  },
  {
    id: 3,
    name: "Courses",
    link: "/dashboard/internship/courses/",
    isActive: false,
    iconImage: LuNotebook
  }
]

function Page() {

  const router = useRouter()
  const [username, setUsername] = useState("");
  const [userInternshipId, setUserInternshipId] = useState<number[]>([]);
  const [internshipList, setInternshipList] = useState<Array<{
        id?: string
        title?: string
        description?: string
        published?: boolean
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
          setUserInternshipId(
            Array.isArray(userProfile.Internships)
              ? userProfile.Internships.map((id: any) => Number(id))
              : userProfile.Internships
                ? [Number(userProfile.Internships)]
                : []
          ); // Set the internships array if it exists

          //make the internship list
          const internshipResponse = await api.get('/api/internships/');

          if (internshipResponse.status === 200) {
            const internships = internshipResponse.data.filter((internship: { id: string }) => 
              userProfile.Internships.includes(Number(internship.id))
            );
            setInternshipList(internships);
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
              <div key={tab_item.id} className= {`bg-white w-full px-3 py-2.5 hover:underline flex flex-row items-center gap-2 ${tab_item.isActive ? "text-hb-green rounded-md border-gray-200 border-2 font-bold" : "text-gray-600"}`}>
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
        <p className="px-10 font-bold text-2xl"> {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()}'s Internships </p>
        <div className="flex flex-col gap-10 w-full px-10 pt-10">
          {internshipList.map((internship) => (
            <div key={internship.id}>
              <UpcomingCourseCard
                desc={internship.overview ?? ""}
                image={internship.int_image ?? "/"}
                directTo={'/dashboard/internship/courses'}
                title={internship.title ?? ""}
                weeks={internship.lenght_in_weeks ?? 0} lessons={0} />
            </div>
          ))}
        </div>

          </div>
      </div>
    </div>

    {/**MOBILE */}
    <div className="flex flex-col w-full h-screen overflow-hidden md:hidden">

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
          <div className="flex flex-row w-full bg-white border-b gap-3 justify-center px-4 py-4 space-y-2">
            {tab_items.map((tab_item) => (
              <a key={tab_item.id} href={tab_item.link}>
                <div className="flex flex-row items-center gap-1 py-2 border w-fit px-3 rounded-full text-green-900">
                  <tab_item.iconImage />
                  <p className="text-sm">{tab_item.name}</p>
                </div>
              </a>
            ))}
          </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-green-50 px-4 py-6">
        <p className="font-bold text-xl mb-6">
          {username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}'s Internships
        </p>

        <div className="flex flex-col gap-6">
          {internshipList.map((internship) => (
            <UpcomingCourseCard
              key={internship.id}
              desc={internship.overview ?? ""}
              image={internship.int_image ?? "/"}
              directTo="/dashboard/internship/courses"
              title={internship.title ?? ""}
              weeks={internship.lenght_in_weeks ?? 0}
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