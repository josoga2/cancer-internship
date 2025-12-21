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
import { BiAtom, BiDna } from "react-icons/bi";
import Logout from "@/components/logout";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import MainScreenFlex from "@/components/widgets/dashboard-widgets/main-screen-flex";



function Page() {

  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  return (
    <main className="w-full">
    <div className="hidden md:flex flex-row w-full pl-5">
      {/**LEFT SIDE BAR */}
      <LeftSideBar />
      
      {/** MAIN */}
      <div className="w-full bg-green-50 flex flex-col gap-10 overflow-y-auto h-screen ">
        <MainScreenFlex username={username} mini_desc="Your Internships"/>
        
        <div className="flex flex-col gap-10 w-full px-10 ">
          {internshipList.length !== 0 ? (
            internshipList.map((internship) => (
              <div key={internship.id}>
                <UpcomingCourseCard
                  desc={internship.overview ?? ""}
                  image={internship.int_image ?? "/"}
                  directTo={`/dashboard/internship/${internship.id}/courses`}
                  title={internship.title ?? ""}
                  weeks={internship.lenght_in_weeks ?? 0}
                  lessons={0}
                />
              </div>
            ))
          ) : (
            <div>
              <UpcomingCourseCard
                  desc={`If you are enrolled for an internship and this is still empty after 24 hours, please write to contact@thehackbio.com. We would fix it 😊.`}
                  image={hb_logo.src}
                  directTo={'/dashboard/internship'}
                  title={`Nothing to show here yet`}
                  weeks={0}
                  lessons={0}
                />
            </div>
            
          )}
        </div>
        


      </div>
    </div>

    {/**MOBILE */}
    <div className="flex flex-col w-full pb-20  md:hidden">

      {/* Top Navigation */}
      <LeftSideBar />

      {/* Main Scrollable Content */}
      <div className="flex-1 items-center bg-green-50  p-5">
        <p className="font-bold text-xl mb-6">
          {username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}'s Internships
        </p>

        <div className="flex flex-col gap-6 items-start pb-20 min-h-svh">
          {internshipList.length !== 0 ? (
            internshipList.map((internship) => (
              <div key={internship.id}>
                <UpcomingCourseCard
                  desc={internship.overview ?? ""}
                  image={internship.int_image ?? "/"}
                  directTo={`/dashboard/internship/${internship.id}/courses`}
                  title={internship.title ?? ""}
                  weeks={internship.lenght_in_weeks ?? 0}
                  lessons={0}
                />
              </div>
            ))
          ) : (
            <div>
              <UpcomingCourseCard
                  desc={`If you are enrolled for an internship and this is still empty after 24 hours, please write to contact@thehackbio.com. We would fix it 😊.`}
                  image={"https://internship.thehackbio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhb_logo.a812b2f6.png&w=96&q=75"}
                  directTo={'/dashboard/internship'}
                  title={`Nothing to show here yet`}
                  weeks={0}
                  lessons={0}
                />
            </div>
            
          )}
        </div>
      </div>

      {/* Logout (Bottom) */}
      
    </div>

    </main>
  )
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });