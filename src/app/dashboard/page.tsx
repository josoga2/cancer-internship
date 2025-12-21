"use client";
import { useEffect, useState } from "react";
import api from "../../api";
import withAuth from "@/components/withAuth";
import { useRouter } from "next/navigation";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import MainScreen from "@/components/widgets/dashboard-widgets/main-screen";


function Page() {

  const [username, setUsername] = useState("");
  const router = useRouter()

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
    <div className="hidden md:flex flex-row w-full pl-2">
      {/**LEFT SIDE BAR */}
      <LeftSideBar />
      
      {/** MAIN */}
      <MainScreen username={username} />
    </div>

    {/** Mobile */}
      <div className="block md:hidden w-full min-h-[100svh]">

          <LeftSideBar />

          {/* Main Content */}
          <MainScreen username={username} />
          
      </div>
    </main>
  )
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });