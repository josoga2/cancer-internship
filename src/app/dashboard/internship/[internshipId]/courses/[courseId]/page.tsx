"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import api from "@/api";
import { useState, useEffect } from "react";
import withAuth from "@/components/withAuth";
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import MainScreenFlexIntXP from "@/components/widgets/dashboard-widgets/main-screen-intxp";
import Link from "next/dist/client/link";


function Page() {

  const params = useParams()
  const courseId = Number(params.courseId)
  const globalInternshipId = Number(params.internshipId)
  const router = useRouter()

  const searchParams = useSearchParams();
  const progType = searchParams.get("type");

  const [username, setUsername] = useState("");
  const [subscriptionIntStatus, setSubscriptionIntStatus] = useState(false);
  const [userXP, setUserXP] = useState("");
  const [title, setTitle] = useState("");
  const [userClicks, setUserClicks] = useState<number>(1);
  const [uniqueContentId, setUniqueContentId] = useState<number>(0);
  const [totalContent, setTotalContent] = useState<number>(0);
  const [totalXP, setTotalXP] = useState<number>(1);
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

  //console.log('program type:', progType);
  //console.log('global internship id:', globalInternshipId);

  //get user progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        let response;
        if(progType === "single" && globalInternshipId === 0){ 
          response = await api.post('/api/user-course-progress/', {'courseid': courseId}); // Adjust the endpoint as needed
        }else{
          response = await api.post('/api/get-user-progress/', {'internshipid': globalInternshipId}); // Adjust the endpoint as needed
        }
        //console.log("Response from get-user-profile:", response.data);
        if (response.data && response.status == 200 || response.status == 201) {
          //console.log("User progress data:", response.data);
          const userProgress = response.data; 
          setUserClicks(userProgress.no_clicks );
          setCompletedContent(userProgress.completed_contents ? userProgress.completed_contents : ""); 
          const subscriptionEnd = new Date(userProgress.current_period_end)
          const now = new Date()
          const msLeft = subscriptionEnd.getTime() - now.getTime()
          const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24))
          const isActive = daysLeft > 0
          setSubscriptionIntStatus(isActive );

          const uniqItems = new Set(userProgress.completed_contents.split(","))
          const allItemslength = userProgress.completed_contents.split(",").length
          setUniqueContentId(uniqItems.size ) 
          //console.log(allItemslength)
          setUserXP(Math.ceil(userProgress.total_xp_earned * (uniqItems.size / allItemslength)).toString());

          let totalXPResponse;
          if(progType === "single" && globalInternshipId === 0){ 
            totalXPResponse = await api.post('/api/get-total-course-xp/', {'courseid': courseId});
          }else{
            totalXPResponse = await api.post('/api/get-total-xp/', {'internshipid': globalInternshipId});
          }
          
          if (totalXPResponse.status === 200) {
              setTotalXP(totalXPResponse.data.total_xp);
          } else {
              console.error("Failed to fetch total XP.");
          }
          
        } else {
          router.push("/login");
          console.error("No user profile found.");
          
        }
      } catch (error) {
        router.push("/login");
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProgress();
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
          //console.log("Internship Response:", internshipResponse);

          let internships: number[] = [];
          if (internshipResponse.status === 200 ) {
            
            if(progType === "single" && globalInternshipId === 0){
              internships = [];

            }else{
              internships = internshipResponse.data.filter((internship: { id: string }) => 
              userProfile.Internships.includes(Number(internship.id)));
            }
            
            //setInternshipList(internships);

            //make the courses list
            const coursesResponse = await api.get('/api/courses/');
            if (coursesResponse.status === 200) {
                
              //make a let here
              let allCourseIds: number[] = [];
              if(progType === "single" && globalInternshipId === 0){
                allCourseIds = [courseId];
                //console.log("Single Course Mode - Course IDs:", allCourseIds);
              } else{
                allCourseIds = internships
                .flatMap((internship: any) => 
                    Array.isArray(internship.courses)
                    ? internship.courses.map((c: any) => Number(c)) // each c is already an ID
                    : []
                );
              } 
              
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
                        const allCourseContents = contentResponse.data.filter(
                            (content: { id: number | string; course?: number | string }) =>
                                [1, 2, 3].includes(Number(content.course))
                        );
                        setTotalContent(allCourseContents.length);
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
        <LeftSideBar />
        {/** MAIN */}
        <div className="w-full bg-hb-lightgreen flex flex-col gap-10 overflow-y-auto h-screen ">
          <div className="flex flex-row gap-10 bg-white w-full border-b text-base text-gray-600 justify-between  items-center">
            <MainScreenFlexIntXP username={username} mini_desc="Your Internship Courses" userXP={userXP} title={title} />
          </div>
          
          <div className="px-10 ">
            
              {coursesList
                  .filter((c) => Number(c.id) === courseId)
                  .map((course) => (
                  <div key={course.id}>
                  {course.image && (
                    <div className="flex flex-row items-end gap-5 mb-10 max-w-200">    
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

                  {/**Subscription Notice */}
                  <p className="mb-10 text-sm text-red-600">{subscriptionIntStatus ? "" : <span> <p>"Your subscription to this program has expired."  <Link className="font-bold hover:underline" href={`/dashboard/checkout?prog=internship&id=${globalInternshipId}`}> Click here to subscribe Now</Link> </p> </span>}</p>
                  {/* Modules Accordion */}
              
              {modulesList.map((module) => (
                <div key={module.id} className="flex flex-col gap-5 pb-5">
                  <div>
                      <div className="flex flex-col gap-5 items-center justify-start max-w-200 rounded-lg border border-hb-green px-7 py-3 bg-white">
                      <Accordion type="multiple" className="w-full flex flex-col gap-5 ">
                      <AccordionItem value={module.id.toString()}>
                          <AccordionTrigger className="text-xl font-bold">
                              {module.title}
                          </AccordionTrigger> 
                          <AccordionContent className="text-sm">
                          <div className="flex flex-col gap-5 text-gray-600 text-base pl-5">
                              {contentList
                              .filter((content) => Number(content.module) === Number(module.id))
                              .map((content) => (
                                <div key={content.id} className="flex flex-col gap-2">
                                    <ul className="list-disc pl-5 text-base" key={content.id}>
                                        <Link href={subscriptionIntStatus ? `/dashboard/internship/${globalInternshipId}/courses/${courseId}/module/${module.id}/content/${content.id}?type=single` : `/dashboard/checkout?prog=${Number(globalInternshipId) > 0 ? `internship` : `course`}&id=${Number(globalInternshipId) > 0 ? globalInternshipId : courseId}`} className="hover:underline">
                                            <li>{content.title}</li>
                                        </Link>
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
      <div className="flex flex-col w-full md:hidden bg-hb-lightgreen pb-20 min-h-svh">

        {/* Header */}
        <LeftSideBar />
                    
          
        <div className="flex w-full flex-col gap-3  px-10 py-4 border-b mx-auto items-center ">
          <MainScreenFlexIntXP username={username} mini_desc="Your Internship Courses" userXP={userXP} title={title} />

          {/* Bottom Row: XP + Title */}
          
        </div>

        {/* Main Scrollable Content */}
        <div className="flex-1 pb-20 min-h-svh px-4 pt-6 ">

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
                
                {/**Subscription Notice */}
                <p className="mb-10 text-sm text-red-600">{subscriptionIntStatus ? "" : <span> <p>"Your subscription to this program has expired."  <Link className="font-bold hover:underline" href={`/dashboard/checkout?prog=internship&id=${globalInternshipId}`}> Click here to subscribe Now</Link> </p> </span>}</p>
                {/* Modules Accordion */}
                {modulesList.map((module) => (
                  <div key={module.id} className="w-full border border-hb-green rounded-lg bg-white px-4 py-3 ">
                    <Accordion type="multiple">
                      <AccordionItem value={module.id.toString()}>
                        <AccordionTrigger className="text-lg font-bold">
                          {module.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-3 text-sm text-gray-600 pl-2">
                            {contentList
                              .filter((content) => Number(content.module) === Number(module.id))
                              .map((content) => (
                                <ul className="list-disc pl-5" key={content.id}>
                                  <Link
                                    href={subscriptionIntStatus ? `/dashboard/internship/${globalInternshipId}/courses/${courseId}/module/${module.id}/content/${content.id}?type=single` : `/dashboard/checkout?prog=internship&id=${globalInternshipId}`}
                                    className="hover:underline"
                                  >
                                    <li>{content.title}</li>
                                  </Link>
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
