'use client';
import UpcomingCourseCard from "@/components/course-card";
import hb_logo from "../../../../../public/hb_logo.png";
import Image from "next/image";
import withAuth from "@/components/withAuth";
import api from "@/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";
import { BiAtom, BiDna } from "react-icons/bi";
import { LuNotebook } from "react-icons/lu";
import { all } from "axios";
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
    isActive: true,
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


function Page() {

  const router = useRouter()
  const [username, setUsername] = useState("");
  const [userInternshipId, setUserInternshipId] = useState<number[]>([]);
  const [userCoursesId, setUserCoursesId] = useState<number[]>([]);
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

  const [coursesList, setCoursesList] = useState<Array<{
    id?: number | string
    title?: string
    overview?: string
    description?: string
    published?: boolean
    image?: string
  }>>([
      {
        id: "",
        title: "",
        overview: "",
        description: "",
        published: false,
        image: "/"
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

            //make the courses list
            const coursesResponse = await api.get('/api/courses/');
            if (coursesResponse.status === 200) {
              
              const allCourseIds = internships
              .flatMap((internship: any) => 
                Array.isArray(internship.courses)
                  ? internship.courses.map((c: any) => Number(c)) // each c is already an ID
                  : []
              );
              //console.log("filtered internships:", internships);
              const courses = coursesResponse.data.filter((course: { id: number | string }) =>
              allCourseIds.includes(Number(course.id))
              );
              //console.log("Courses List:", courses);
              setCoursesList(courses)
            }
          }

          
          
        } else {
          console.error("No user profile found.");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        router.push("/login");
      }
    };

    fetchUserProfile();
  }, []);
  //console.log("User Internship IDs:", internshipList);

  //console.log("Internship List:", internshipList);

  return (
    <main className="w-full ">
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
              <div key={tab_item.id} className= {` w-[200px]  pl-5 py-2.5 hover:underline flex flex-row items-center gap-2 ${tab_item.isActive ? "text-hb-green rounded-l-md bg-green-100 font-bold" : "text-gray-600"}`}>
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
        <p className="px-10 font-bold text-2xl"> {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()}'s Courses </p>
        <div className="flex flex-col gap-10 w-full px-10 pt-10">
          {coursesList.length !== 0 ? (
            coursesList.map((course) => (
              <div key={course.id}>
                <UpcomingCourseCard
                  desc={course.overview ?? ""}
                  image={course.image ?? "/"}
                  directTo={'/dashboard/internship/courses/' + course.id + '/'}
                  title={course.title ?? ""}
                  weeks={0}
                  lessons={0}
                />
              </div>
            ))
          ) : (
            <div>
            <UpcomingCourseCard
                  desc={`If you are enrolled for an internship or a course and this is still empty after 24 hours, please write to contact@thehackbio.com. We would fix it 😊.`}
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
      </div>
    </div>

          {/** MOBILE */}
    <div className="block md:hidden w-full pb-20 min-h-[100svh]">

      {/* Header */}
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

      {/* Main Content */}
      <div className="flex-1  bg-green-50 pb-20 min-h-[100svh] px-4 py-6">
        <p className="text-xl font-bold mb-6">
          {username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}'s Courses
        </p>

        <div className="flex flex-col gap-6 pb-20 min-h-[100svh] items-center">
          {coursesList.length !== 0 ? (
            coursesList.map((course) => (
              <div key={course.id}>
                <UpcomingCourseCard
                  desc={course.overview ?? ""}
                  image={course.image ?? "/"}
                  directTo={'/dashboard/internship/courses/' + course.id + '/'}
                  title={course.title ?? ""}
                  weeks={0}
                  lessons={0}
                />
              </div>
            ))
          ) : (
            <div>
            <UpcomingCourseCard
                  desc={`If you are enrolled for an internship or a course and this is still empty after 24 hours, please write to contact@thehackbio.com. We would fix it 😊.`}
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

    </div>

    </main>
  )
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });