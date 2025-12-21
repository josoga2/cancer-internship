'use client';
import UpcomingCourseCard from "@/components/course-card";
import hb_logo from "../../../../../../public/hb_logo.png";
import Image from "next/image";
import withAuth from "@/components/withAuth";
import api from "@/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";
import { BiAtom, BiDna } from "react-icons/bi";
import Logout from "@/components/logout";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import MainScreenFlex from "@/components/widgets/dashboard-widgets/main-screen-flex";


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
    link: "/dashboard/internship/1/courses/",
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
  const [userXP, setUserXP] = useState("");
  const [title, setTitle] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  console.log("Course List:", coursesList);

  return (
    <main className="w-full ">
    <div className="hidden md:flex flex-row w-full pl-5">
      {/**LEFT SIDE BAR */}
      <LeftSideBar />
      {/** MAIN */}
      <div className="w-full bg-green-50 flex flex-col gap-10 overflow-y-auto h-screen pb-10">
        <MainScreenFlex username={username} mini_desc="Your Internship Courses"/>
        <div className="flex flex-col gap-10 w-full px-10 ">

          {internshipList.length !== 0 && internshipList[0].id !== "" ? (
            internshipList.map((internship) => {
              // Get course IDs for this internship
              const internshipCourseIds = internship.courses?.map((c) => Number(c.id ?? c)) ?? [];
              // Filter courses that belong to this internship
              const coursesForInternship = coursesList.filter((course) =>
                internshipCourseIds.includes(Number(course.id))
              );
              return (
                <div key={internship.id} className="mb-10">
                  <p className="font-bold text-lg mb-4">{internship.title}</p>
                  {coursesForInternship.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {coursesForInternship.map((course) => (
                        <UpcomingCourseCard
                          key={course.id}
                          desc={course.overview ?? ""}
                          image={course.image ?? "/"}
                          directTo={`/dashboard/internship/${internship.id}/courses/${course.id}/`}
                          title={course.title ?? ""}
                          weeks={0}
                          lessons={0}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>
                      <UpcomingCourseCard
                        desc="No courses found for this internship."
                        image="https://internship.thehackbio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhb_logo.a812b2f6.png&w=96&q=75"
                        directTo="/dashboard/internship"
                        title="Nothing to show here yet"
                        weeks={0}
                        lessons={0}
                      />
                    </div>
                  )}
                </div>
              );
            })
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

    {/** MOBILE */}
    <div className="block md:hidden w-full pb-20 ">

      {/* Header */}
      <LeftSideBar />

      {/* Main Content */}
      <MainScreenFlex username={username} mini_desc="Your Internship Courses"/>

        <div className="flex flex-col gap-6  items-center">
          {internshipList.length !== 0 && internshipList[0].id !== "" ? (
            internshipList.map((internship) => {
              // Get course IDs for this internship
              const internshipCourseIds = internship.courses?.map((c) => Number(c.id ?? c)) ?? [];
              // Filter courses that belong to this internship
              const coursesForInternship = coursesList.filter((course) =>
                internshipCourseIds.includes(Number(course.id))
              );
              return (
                <div key={internship.id} className="mb-10">
                  <p className="font-bold text-lg mb-4">{internship.title}</p>
                  {coursesForInternship.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {coursesForInternship.map((course) => (
                        <UpcomingCourseCard
                          key={course.id}
                          desc={course.overview ?? ""}
                          image={course.image ?? "/"}
                          directTo={`/dashboard/internship/${internship.id}/courses/${course.id}/`}
                          title={course.title ?? ""}
                          weeks={0}
                          lessons={0}
                        />
                      ))}
                    </div>
                  ) : (
                    <div>
                      <UpcomingCourseCard
                        desc="No courses found for this internship."
                        image="https://internship.thehackbio.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhb_logo.a812b2f6.png&w=96&q=75"
                        directTo="/dashboard/internship"
                        title="Nothing to show here yet"
                        weeks={0}
                        lessons={0}
                      />
                    </div>
                  )}
                </div>
              );
            })
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

    </main>
  )
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });