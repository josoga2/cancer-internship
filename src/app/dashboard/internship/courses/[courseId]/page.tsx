"use client"
import { useParams, useRouter } from "next/navigation";
import hb_logo from "@/../public/hb_logo.png";
import { Progress } from "@/components/ui/progress"
import Image from "next/image";


import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import api from "@/api";
import { useState, useEffect } from "react";
import withAuth from "@/components/withAuth";
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
    isActive: false,
    iconImage: BiDna
  },
  {
    id: 3,
    name: "Courses",
    link: "/dashboard/internship/courses/",
    isActive: true,
    iconImage: LuNotebook
  }
]




function Page() {

  const params = useParams()
  const courseId = Number(params.courseId)
  const router = useRouter()

  const [username, setUsername] = useState("");
  const [userXP, setUserXP] = useState("");
  const [title, setTitle] = useState("");
  const [userClicks, setUserClicks] = useState<number>(1);
  const [uniqueContentId, setUniqueContentId] = useState<number>(0);
  const [totalContent, setTotalContent] = useState<number>(0);
   const [completedContent, setCompletedContent] = useState<string>('');
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

  const [modulesList, setModulesList] = useState<Array<{
    id: number | string
    title: string
    description: string
    course?: number | string
  }>>([]);

  const [contentList, setContentList] = useState<Array<{
    id: number | string
    title: string
    content_type: string
    module?: number | string
  }>>([]);

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
          setUserXP(userProfile.total_xp.toString());
          setUserClicks(userProfile.no_clicks );
          setCompletedContent(userProfile.no_completed_contents ? userProfile.no_completed_contents : ""); 
          const uniqItems = new Set(userProfile.no_completed_contents.split(","))
          setUniqueContentId(uniqItems.size )
          
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
                //make the modules list
                const modulesResponse = await api.get('/api/modules/');
                if (modulesResponse.status === 200) {
                    const modules = modulesResponse.data.filter((module: {
                        course(course: any): unknown; id: number | string }) =>
                        courseId === Number(module.course)
                    );
                    //console.log("Modules List:", modules);
                    setModulesList(modules);

                    //make content list
                    const contentResponse = await api.get('/api/contents/');
                    if (contentResponse.status === 200) {
                        setTotalContent(contentResponse.data.length);
                        // Assuming you want to filter contents based on the courseId
                        const contents = contentResponse.data.filter((content: { id: number | string; course?: number | string }) =>
                            courseId === Number(content.course) 
                        );
                        setContentList(contents);
                        //console.log("Contents List:", contents);
                        // You can set the contents to a state if needed
                    } else {
                        console.error("Failed to fetch contents.");
                    }
                }
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


const scientistAdjectives = [
    "Brilliant",
    "Curious",
    "Innovative",
    "Sharp",
    "Ingenious",
    "Diligent",
    "Methodical",
    "Precise",
    "Wise",
    "Thoughtful",
    "Rational",
    "Logical",
    "Intuitive",
    "Insightful",
    "Meticulous",
    "Visionary",
    "Analytical",
    "Clever",
    "Astute",
    "Persistent"
    ];
    
    function getRandomAdjective() {
        return scientistAdjectives[Math.floor(Math.random() * scientistAdjectives.length)];
    }
    useEffect(() => {
        const adjective = getRandomAdjective();
        setTitle(`${adjective} ${username}`);
    }, [username]);

  

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
        <div className="w-full bg-hb-lightgreen flex flex-col gap-10 overflow-y-auto h-screen pb-10">
          <div className="flex flex-row gap-10 pl-10 pt-7 bg-white w-full pb-5 border-b text-base text-gray-600 justify-between pr-10 items-center">
              <div className="flex flex-row gap-10 items-center">
              <a href="/internship" className="hover:underline font-bold">Internships</a>
              <a href="/learning" className="hover:underline font-bold">Courses</a>
              </div>

              <div className="flex flex-row gap-10 items-center text-black text-xl">
                  <p className="font-bold"> 🎖️ {Math.ceil(Number(userXP))} XP</p>
                  <p className="font-bold"> {title}</p>
                  <Logout />
              </div>
          </div>
          
          <div className="px-10 pt-10">
            
              {coursesList
                  .filter((c) => Number(c.id) === courseId)
                  .map((course) => (
                  <div key={course.id}>
                  {course.image && (
                      <div className="flex flex-row items-end gap-5 mb-10 max-w-[800px]">    
                          <img src={course.image} alt="course image" className="w-48 h-48 border-2 rounded-md border-neutral-400" />
                              <div className="flex flex-col gap-5 w-full">
                                  <p className="font-bold text-3xl ">{course.title}</p>
                                  <div className="flex flex-row gap-10 items-center border w-full rounded-md border-hb-green px-5 py-3">
                                      <Progress value={Math.ceil((Number(uniqueContentId)/Number(totalContent))*100)} className="" />
                                      <p className="font-bold text-2xl rounded-full">{Math.ceil((Number(uniqueContentId)/Number(totalContent))*100)}%</p>
                                  </div>
                              </div>
                          </div>
                  )}
              
              {modulesList.map((module) => (
                <div key={module.id} className="flex flex-col gap-5 pb-5">
                  <div>
                      <div className="flex flex-col gap-5 items-center justify-start max-w-[800px] rounded-lg border border-hb-green px-7 py-3 bg-white">
                      <Accordion type="multiple" className="w-full flex flex-col gap-5 ">
                      <AccordionItem value={module.id.toString()}>
                          <AccordionTrigger className="text-2xl font-bold">
                              {module.title}
                          </AccordionTrigger>
                          <AccordionContent className="text-xl">
                          <div className="flex flex-col gap-5 text-gray-600 text-xl pl-5">
                              {contentList
                                  .filter((content) => Number(content.module) === Number(module.id))
                                  .map((content) => (
                                      <div key={content.id} className="flex flex-col gap-2">
                                          <ul className="list-disc pl-5 text-lg" key={content.id}>
                                              <a href={`/dashboard/internship/courses/${courseId}/module/${module.id}/content/${content.id}`} className="hover:underline">
                                                  <li>{content.title}</li>
                                              </a>
                                          </ul>
                                      </div>
                              ))}
                          </div>
                          </AccordionContent>
                      </AccordionItem>
                      </Accordion>
                      </div>
                  </div>
                </div>
              ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/**MOBILE */}
      <div className="flex flex-col w-full md:hidden bg-hb-lightgreen pb-20 min-h-[100svh]">

        {/* Header */}
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
          
        <div className="flex w-full flex-col gap-3  px-10 py-4 border-b mx-auto items-center ">

          {/* Bottom Row: XP + Title */}
          <div className="flex items-center text-center justify-center gap-5 w-full  text-sm text-green-900 pt-2">
            <p className="font-bold">🎖️ {Math.ceil(Number(userXP))} XP</p>
            <p className="font-bold">{title}</p>
          </div>
        </div>

        {/* Main Scrollable Content */}
        <div className="flex-1 pb-20 min-h-[100svh] px-4 pt-6 ">

          {/* Course Preview Block */}
          {coursesList
            .filter((c) => Number(c.id) === courseId)
            .map((course) => (
              <div key={course.id} className="flex flex-col gap-6">
                {course.image && (
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={course.image}
                      alt="course image"
                      className="w-32 h-32 border-2 rounded-md border-neutral-400"
                    />
                    <p className="font-bold text-xl text-center">{course.title}</p>

                    <div className="w-full border border-hb-green px-4 py-2 rounded-md bg-white flex items-center justify-between">
                      <Progress value={Math.ceil((Number(uniqueContentId) / Number(totalContent)) * 100)} />
                      <p className="font-bold text-lg">
                        {Math.ceil((Number(uniqueContentId) / Number(totalContent)) * 100)}%
                      </p>
                    </div>
                  </div>
                )}

                {/* Modules Accordion */}
                {modulesList.map((module) => (
                  <div key={module.id} className="w-full border border-hb-green rounded-lg bg-white px-4 py-3 ">
                    <Accordion type="multiple">
                      <AccordionItem value={module.id.toString()}>
                        <AccordionTrigger className="text-lg font-bold">
                          {module.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-3 text-base text-gray-600 pl-2">
                            {contentList
                              .filter((content) => Number(content.module) === Number(module.id))
                              .map((content) => (
                                <ul className="list-disc pl-5" key={content.id}>
                                  <a
                                    href={`/dashboard/internship/courses/${courseId}/module/${module.id}/content/${content.id}`}
                                    className="hover:underline"
                                  >
                                    <li>{content.title}</li>
                                  </a>
                                </ul>
                              ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

    </main>
  )
}

const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });
