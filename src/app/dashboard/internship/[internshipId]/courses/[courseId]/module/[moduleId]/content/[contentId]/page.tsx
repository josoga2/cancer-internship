"use client"
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import NotebookViewer from "@/components/nbc/notebook";
import QuestionBlock from "@/components/qc/questionBlock";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import api from "@/api";
import { useState, useEffect } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import withAuth from "@/components/withAuth";
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css'; // or another theme
// remark plugins
import { toast } from "sonner"
import dynamic from "next/dynamic";

// rehype plugins
import LeftSideBar from "@/components/widgets/dashboard-widgets/left-sidebar";
import TocLink from "@/components/widgets/dashboard-widgets/toc-link";
import Previous from "@/components/widgets/dashboard-widgets/previous";
import TocList from "@/components/widgets/dashboard-widgets/toc-list";
import Next from "@/components/widgets/dashboard-widgets/next";
import MainScreenFlexIntXP from "@/components/widgets/dashboard-widgets/main-screen-intxp";
import HbButton from "@/components/widgets/hb-buttons";
import Video from "@/components/widgets/course-props-widgets/video";
import TextContent from "@/components/widgets/course-props-widgets/text";
import WebRPy from "@/components/widgets/course-props-widgets/webrpy";
import JupyterContent from "@/components/widgets/course-props-widgets/jupyter-notebook";



function Page() {

  const params = useParams()
  const courseId = Number(params.courseId);
  const moduleId = Number(params.moduleId);
  const globalInternshipId = Number(params.internshipId);
  const contentId = Number(params.contentId);
  const router = useRouter()

  const [username, setUsername] = useState("");
  const [cert, setCert] = useState(false);
  const [userXP, setUserXP] = useState("");
  const [userClicks, setUserClicks] = useState<number>(1);
  const [completedContent, setCompletedContent] = useState<string>('');
  const [uniqCContent, setUniqCContent] = useState<Set<string>>(new Set());
  const [uniqueContentId, setUniqueContentId] = useState<number>(0);
  const [totalContent, setTotalContent] = useState<number>(0);
  const [mcqGraded, setMcqGraded] = useState(false);
  const [userInternshipId, setUserInternshipId] = useState<number[]>([]);
  const [improve, setImprove] = useState<string>("waiting for review...");
  const [userCoursesId, setUserCoursesId] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState("none");
  const [hintClicked, setHintClicked] = useState<boolean>(false);
  const [totalXP, setTotalXP] = useState<number>(1);
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
    const [title, setTitle] = useState("");

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
    video_url: string
    text_content: string
    quiz_question: string
    quiz_answer_a: string
    quiz_answer_b: string
    quiz_answer_c: string
    actual_answer: string
    project_data: string
    project_promote_channel: string
    project_rubric: string
    jupyter_url: string
    course: number | string
    finished: boolean
  }>>([]);

  const [filteredContentList, setFilteredContentList] = useState<Array<{
        id: number | string
        title: string
        content_type: string
        module?: number | string
        video_url: string
        text_content: string
        quiz_question: string
        quiz_answer_a: string
        quiz_answer_b: string
        quiz_answer_c: string
        actual_answer: string
        project_data: string
        project_promote_channel : string
        project_rubric : string
        jupyter_url: string
        course: number | string
        finished: boolean
    }>>([]);

  const [previousModuleId, setPreviousModuleId] = useState<number>(0);
  const [nextModuleId, setNextModuleId] = useState<number>(0);
  const [previousContentId, setPreviousContentId] = useState<number>(0);
  const [nextContentId, setNextContentId] = useState<number>(0);
  const [solution, setSolution] = useState<string>("");
  const [grade, setGrade] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);


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

  //get user progress
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await api.post('/api/get-user-progress/', {'internshipid': globalInternshipId}); // Adjust the endpoint as needed
        //console.log("Response from get-user-profile:", response.data);
        if (response.data && response.status == 200 || response.status == 201) {
          //console.log("User progress data:", response.data);
          const userProgress = response.data; 
          setUserClicks(userProgress.no_clicks );
          setCert(userProgress.certified)
          setCompletedContent(userProgress.completed_contents ? userProgress.completed_contents : ""); 
          const uniqItems = new Set(userProgress.completed_contents.split(","))
          const allItemslength = userProgress.completed_contents.split(",").length
          setUniqueContentId(uniqItems.size ) 
          setUniqCContent(new Set(userProgress.completed_contents.split(",")))
          //console.log(allItemslength)
          setUserXP(Math.ceil(userProgress.total_xp_earned * (uniqItems.size / allItemslength)).toString());

          const totalXPResponse = await api.post('/api/get-total-xp/', {'internshipid': globalInternshipId});
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

  //console.log(uniqCContent)

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
                    const modules = modulesResponse.data.filter((module: { course?: number | string; id?: number | string }) =>
                        Number(module.course) === courseId && Number(module.id) === moduleId
                    );
                    const allModules = modulesResponse.data.filter((module: { course?: number | string;  }) =>
                        Number(module.course) === courseId 
                    );
                    const getPreviousModuleId = () => {
                        //console.log(allModules)
                        if (!allModules || allModules.length === 0) return 0;
                        // Sort modules by id (assuming numeric ids)
                        const sortedModules = [...allModules].sort((a, b) => Number(a.id) - Number(b.id));
                        const currentIndex = sortedModules.findIndex(m => Number(m.id) === moduleId);
                        if (currentIndex > 0) {
                            return Number(sortedModules[currentIndex - 1].id);
                        }
                        return 0;
                    };

                    const getNextModuleId = () => {
                        if (!allModules || allModules.length === 0) return 0;
                        // Sort modules by id (assuming numeric ids)
                        const sortedModules = [...allModules].sort((a, b) => Number(a.id) - Number(b.id));
                        const currentIndex = sortedModules.findIndex(m => Number(m.id) === moduleId);
                        if (currentIndex !== -1 && currentIndex < sortedModules.length - 1) {
                            return Number(sortedModules[currentIndex + 1].id);
                        }
                        return 0;
                    };
                    //console.log("prev mod:", getPreviousModuleId());
                    //console.log("next mod:", getNextModuleId());
                    setPreviousModuleId(getPreviousModuleId());
                    setNextModuleId(getNextModuleId());
                    setModulesList(modules);

                    //make content list
                    const contentResponse = await api.get('/api/contents/');
                    if (contentResponse.status === 200) {
                        //setTotalContent(contentResponse.data.length);

                        const allCourseContents = contentResponse.data;
                        setTotalContent(allCourseContents.length);

                        const contents = contentResponse.data.filter((content: { id: number | string; module?: number | string }) =>
                            Number(content.module) === moduleId
                        );
                        
                        if (contents.length > 0) {
                            setFilteredContentList(
                                contents.filter((content: { id: any; }) => Number(content.id) === contentId)
                            );
                        }
                        setContentList(contents);
                        
                        
                        //console.log("Contents List:", contents);
                        const getFirstContentIdOfPreviousModule = () => {
                            if (getPreviousModuleId() <= 0) return 0;
                            //console.log("Previous Module ID:", getPreviousModuleId() );
                            const prevModuleContents = contentResponse.data.filter(
                                (content: { module?: number | string }) => Number(content.module) === getPreviousModuleId()
                            );
                            if (prevModuleContents.length > 0) {
                                return Number(prevModuleContents[0].id);
                            }
                            return 0;
                        };

                        const getFirstContentIdOfNextModule = () => {
                            if (getNextModuleId() <= 0) return 0;
                            //console.log("Next Module ID:", getNextModuleId() );
                            const nextModuleContents = contentResponse.data.filter(
                                (content: { module?: number | string }) => Number(content.module) === getNextModuleId()
                            );
                            if (nextModuleContents.length > 0) {
                                return Number(nextModuleContents[0].id);
                            }
                            return 0;
                        };
                        setPreviousContentId(getFirstContentIdOfPreviousModule());
                        setNextContentId(getFirstContentIdOfNextModule());
                        //console.log("First content ID of next module:", getFirstContentIdOfNextModule());


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
  
  //console.log("Internship List:", moduleId, contentId, courseId);
  //console.log("Content List:", contentList);
  //console.log("user clicks:", userClicks);
  //console.log("total Content:", totalContent);
  //console.log("unique Content:", uniqueContentId);


// Filter contentList to only include the content matching contentId from params
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

    //console.log("userInternshipId:", userInternshipId);

    const handleMarkCompleted = async () => {
        try {
            const response = await api.post('/api/mark-completed/', {
                user: username,
                internshipid: globalInternshipId,
                content: contentId,
                course: courseId,
                module: moduleId
            });
            if (response.status === 200) {
                //console.log("Content marked as completed successfully.");
                //setUserXP(prevXP => prevXP + 10); // Increment user XP by 10 or any desired value
                //setUserClicks(prevClicks => prevClicks + 1); // Increment user clicks by 1
                setCompletedContent(prevCompleted => prevCompleted.concat(',',String(contentId))); // Increment completed content count
                toast.success("Marked as complete. 2 XP gained! Proceed to next content.");

            } else {
                console.error("Failed to mark content as completed.");
            }
        } catch (error) {
            console.error("Error marking content as completed:", error);
        }
    }

    const handleSolutionSubmit = async () => {
        //e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/api/submit-solution/', {
                content: filteredContentList[0].project_data, // Assuming the content is in the first item of filteredContentList
                solution: solution,
                internshipid: globalInternshipId,
                channel: filteredContentList[0].project_promote_channel || "C09A477A43E", // Default channel if not provided
                minimal_rubric: filteredContentList[0].project_rubric || "Use your best judgment to grade the solution based on the content provided." // Default minimal rubric if not provided
            });
            if (response.status === 200) {
                //console.log("Solution submitted successfully.: ", response.data);
                setGrade(Number(response.data.grade_response)); // Assuming the response contains a grade field
                setLoading(false);
                // Handle success, e.g., show a success message or redirect
            } else {
                console.error("Failed to submit solution.");
            }
        } catch (error) {
            console.error("Error submitting solution:", error);
        }
    }

    const handleCodeTaskSubmit = async () => {
        //e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/api/submit-codetask/', {
                content: filteredContentList[0].text_content, // Assuming the content is in the first item of filteredContentList
                solution: solution,
                internshipid: globalInternshipId
            });
            if (response.status === 200) {
                //console.log("Solution submitted successfully.: ", response.data.grade_response.grade);
                setGrade(response.data.grade_response); // Assuming the response contains a grade field
                setImprove(response.data.suggestions);
                setLoading(false);
                // Handle success, e.g., show a success message or redirect
            } else {
                console.error("Failed to submit solution.");
            }
        } catch (error) {
            console.error("Error submitting solution:", error);
        }
    }

    const handleMCQSubmit = async () => {
        //e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/api/submit-mcq/', {
                actual_answer: filteredContentList[0].actual_answer, 
                user_answer: selectedAnswer,
                internshipid: globalInternshipId
            });
            if (response.status === 200) {
                //console.log("Solution submitted successfully.: ", response.data.grade_response.grade);
                setGrade(response.data.xp_earned); // Assuming the response contains a grade field
                setLoading(false);
                setMcqGraded(true);
                toast.success(`Great! You earned ${response.data.xp_earned} XP 🎉`)
                // Handle success, e.g., show a success message or redirect
            } else {
                console.error("Failed to submit solution.");
            }
        } catch (error) {
            console.error("Error submitting solution:", error);
        }
    }

    const [officialName, setOfficialName] = useState<string>("");
    
    // State for toggling Jupyter and WebR widgets
    const [showJupyter, setShowJupyter] = useState(false);
    const [showWebR, setShowWebR] = useState(false);


    const handleGenCertificate = async () => {
        //e.preventDefault()
        try {
            const response = await api.post('/api/generate-certificate/', {
                name: officialName,
                xp: (Math.min(Math.ceil((Number(userXP) / Number(totalXP)) * 120), 100)).toString(),
                internship_title: 'Next Generation Sequencing 2025 Internship',
                internshipid: globalInternshipId,
            },
            {responseType: 'blob'} // Ensure the response is treated as a blob for file download
        );
            if (response.status === 200) {
                //console.log("Certificate generated successfully.");
                // Handle success, e.g., show a success message or redirect
                const link = document.createElement('a');
                const url = window.URL.createObjectURL(response.data); // Create a URL for the PDF Blob
                link.href = url;
                link.download = 'gen_certificate.pdf';
                link.click()
                window.URL.revokeObjectURL(url);
            } else {
                console.error("Failed to generate certificate.");
            }
        } catch (error) {
            console.error("Error generating certificate:", error);
        }
    }


return (
    <main className="w-full">
    <div className="hidden md:flex flex-row w-full pl-2">
        {/**LEFT SIDE BAR */}
        <LeftSideBar />

        {/** MAIN */}
        <div className="w-full bg-hb-lightgreen flex flex-col gap-10 text-lg overflow-y-auto h-screen pb-10">
            <MainScreenFlexIntXP  username={username} mini_desc="Your Internship Courses" userXP={userXP} title={title}/>
            
            <div className="px-10 pt-10 w-200  flex flex-col gap-5">
                {filteredContentList.length >0? (filteredContentList.map((content) => (
                    <div className="flex flex-col gap-10" key={content.id}>
                        <div className="flex flex-row w-full justify-between">
                            <p className=" text-2xl "> {content.title} </p> 
                            {content.content_type !== 'quiz' && content.content_type !== 'project' && content.content_type !== 'codeTask' && (
                                <HbButton type="primary" text="Mark Completed"  onClick={handleMarkCompleted}/>
                            )}
                        </div>
                        <div className=" w-full p-3 text-lg border rounded-md border-hb-green"> 
                            {uniqueContentId >0 && totalContent>0 ? (<div className="flex flex-row gap-10 items-center max-w-full"> 
                                <Progress value={(Math.min(Math.ceil((Number(userXP) / Number(totalXP)) * 120), 100))} className=""/> 
                                <p className=" text-lg rounded-full"> {(Math.min(Math.ceil((Number(userXP) / Number(totalXP)) * 120), 100))}% </p> 
                            </div>) : <div className="h-3 w-10"></div>}
                            <p className="text-xs text-gray-500">🎖️XP and progress are computed from the entire internship/pathway content.</p>
                        </div>
                        
                        {/* Video */}
                    {content.content_type === 'video' && (
                        <Video video_url={content.video_url} text_content={content.text_content} />
                    )}

                    {content.content_type === 'codeTask' && (
                        <div className="w-full flex flex-col text-sm">
                            <div className="rounded-md  flex flex-col w-full prose gap-5">
                                <TextContent text_content={content.text_content} />
                                
                                <textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="Type your solution here. We accept code & text..." required  className='bg-green-950 text-white text-xs placeholder:text-xs p-5 w-full  h-100 rounded-md font-mono border border-neutral-200'/>
                                <div className="flex flex-row gap-5 items-center justify-start ">
                                    <HbButton onClick={() => {handleCodeTaskSubmit(); }} type="primary" text="Submit" />
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                        </svg>
                                    ): (<div className="text-sm">  </div>)}
                                </div>
                                <div>
                                    {loading ? (
                                        <div className="text-sm"> <p>Your grade is: {grade} XP</p> <p className="leading-7 text-sm">Suggested Improvements: {improve} </p> </div>
                                    ): (<div className="text-sm"> <p>Your grade is: {grade} XP</p> <p className="leading-7 text-sm">Suggested Improvements: {improve} </p> </div>)}
                                </div>
                                
                            </div>

                            {/* Floating action buttons */}
                            <WebRPy />
                        </div>
                    )}
                    {/**Text */}
                    {content.content_type === 'text' && (
                        <TextContent text_content={content.text_content} />
                    )}
                    {/**Jupyter */}
                    {content.content_type === 'jupyter' && (
                        <JupyterContent text_content={content.text_content} jupyter_url={content.jupyter_url} />
                    )}
                    {/**Test */}
                    {/**Test */}
                    {content.content_type === 'quiz' && (
                        <div className="w-full flex flex-row gap-10">
                            <div className="border-2 rounded-md border-hb-green p-10 flex flex-col gap-2 w-full">
                                <QuestionBlock 
                                    question={content.quiz_question || "No question provided"}
                                    answer1={content.quiz_answer_a || "No answer provided"} 
                                    answer2={content.quiz_answer_b || "No answer provided"} 
                                    answer3={content.quiz_answer_c || "No answer provided"} 
                                    selectedAnswer={selectedAnswer}
                                    onanswerSelect={setSelectedAnswer}
                                />
                                { content.video_url && 
                                    <Image src={content.video_url} alt="Schematic" width={300} height={300} className="rounded-md border-2 w-full max-w-3/5" /> 
                                }
                                <div className="flex flex-col gap-5 items-start justify-start pt-5">
                                    <HbButton text="SUBMIT" type="primary"  onClick={() => {handleMCQSubmit() }} />
                                    <HbButton type="outline" onClick={() => {setHintClicked(true) }} text="HINT" />
                                </div>
                                {!loading && mcqGraded && (
                                    <div>
                                        <p>Grade: {grade}</p>
                                    </div>
                                )}
                                
                                {hintClicked && (
                                    <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                                        <h3 className="font-bold">Hint:</h3>
                                        <p className="text-sm">{content.project_rubric || `No hint here 🤡`}</p>
                                    </div>
                                )}
                            </div>
                            <WebRPy />
                        </div>
                    )}
                    {/**Project */}
                    {content.content_type === 'project' && (
                        <div className="w-full flex flex-row gap-10">
                            <div className="border-2 rounded-md border-hb-green prose prose-base p-5 flex flex-col leading-tight w-full">
                                <p className="font-bold text-lg">
                                    Project Details: Submit markdown or code solution to the project below
                                </p>
                                <TextContent text_content={content.project_data} />
                                <div className="grid gap-2">
                                    <Label htmlFor="solution" className='text-lg font-bold pt-5'>Your Solution</Label>
                                    <textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="type your solution..." required  className='bg-green-950 text-white text-xs placeholder:text-xs p-3 h-screen font-mono border border-neutral-200'/>
                                    <p className="text-sm text-gray-500">Note: Please ensure your solution is well documented and clear. We accept text and code!</p>
                                    <div className="flex flex-row gap-5 items-center justify-start pt-5">
                                        <Button onClick={() => {handleSolutionSubmit()}} className='w-fit bg-green-500 text-white text-xl py-6 hover:bg-green-600'>
                                            SUBMIT
                                        </Button>
                                        {loading ? (
                                            <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                            </svg>
                                        ): (<p>Your grade is: {grade}</p>)}

                                    </div>
                                </div>

                            </div>
                            <WebRPy />
                        </div>
                    )}
                    
                    {/**Submit */}
                    {content.content_type === 'submit' && (
                        <div className="w-full flex flex-row gap-5">
                            <div className="border-2 rounded-md border-hb-green p-10 flex flex-col gap-10 w-full">
                                <p className="font-bold text-lg">A Quick Summary</p>
                                <Card className='w-full border-none shadow-none'>
                                    <CardHeader className='text-center'>
                                        {/* <CardTitle className="text-base">Login</CardTitle> */}
                                    </CardHeader>
                                    <CardContent>
                                        <form className="space-y-5">
                                                        
                                            <div className="grid gap-2">
                                                <Label htmlFor="projectId" className='text-xl'>Project Code</Label>
                                                <Input id="projectId" type="text" placeholder="Project Code" required className='bg-blue-50 text-xl placeholder:text-xl py-6' />
                                            </div>
                                            
                                            <div className="grid gap-2">
                                                <Label htmlFor="solution" className='text-xl'>Your Solution</Label>
                                                <Input id="solution" type="text" placeholder="Your Solution" required  className='bg-blue-50 text-xl placeholder:text-xl py-6'/>
                                            </div>
                                                        
                                            <a onClick={handleSolutionSubmit}>
                                                <Button className='w-fit bg-green-600 text-white text-xl py-6 hover:bg-green-700' >
                                                    SUBMIT
                                                </Button>
                                            </a>
                                        </form>
                                    </CardContent>
                                </Card>
                        </div>
                        <div className="border-2 p-5 rounded-md border-hb-green prose prose-base flex flex-col gap-2 ">
                            <p className="font-bold text-xl">Guideline for Submissions </p>
                            <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{content.text_content}</Markdown>
                        </div>
                    </div>
                )}
                {/**Certificate */}
                {content.content_type === 'certificate' && (
                    <div className="w-full flex flex-row gap-5">
                        <div className="border-2 rounded-md border-hb-green p-5 flex flex-col gap-2 w-375">
                            <p className="font-bold text-base">
                                Process Your Certificates
                            </p>
                            <Card className='w-full border-none shadow-none text-sm'>
                                <CardHeader className='text-center'>
                                    {/* <CardTitle className="text-base">Login</CardTitle> */}
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-3" onSubmit={(e) => {e.preventDefault()}}>
                                            
                                        <div className="grid gap-2">
                                            <Label htmlFor="name" className=''>Your Full Name {`(Official order and Preference)`}</Label>
                                            <Input id="name" type="text" placeholder="Your Name" required value={officialName} onChange={(e)=> setOfficialName(e.target.value)} className='bg-blue-50 text-base placeholder:text-base py-6' />
                                        </div>
                                        
                                        <p>Your Total XP: {userXP}XP</p>
                                        <p>Your Total Internship Grade: {(Math.min(Math.ceil((Number(userXP) / Number(totalXP)) * 120), 100))}%</p>
                                            
                                        
                                            {cert ? <Button disabled>Generate</Button>:
                                 (<Button className='w-fit bg-green-600 text-white text-xl py-6 hover:bg-green-700' onClick={handleGenCertificate}>
                                                GENERATE
                                            </Button>) }
                                            <p className="font-bold text-red-500">Can only be generated once!</p>

                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="border-2 p-5 rounded-md border-hb-green flex flex-col text-justify-start prose prose-base">
                            <p className="font-bold text-lg">Guideline for Submissions </p>
                            <p className="text-sm">You can only generate your certificate once. Please note that “Your Internship Grade - in percentage -  will be recorded on your certificate. </p>
                            <p className="text-sm"> Please ensure you have attained enough points before requesting for your certificate. Once you process, it cannot be generated again.</p>
                        </div>
                    </div>
                )}
                </div>
            ))) : (<p>Loading content...</p>)}
            </div>
        </div>

        {/** Content Navigation */}
        <div className="flex flex-col text-base h-screen bg-white items-start w-100 border-r overflow-auto">
            
            <TocLink tocHref={`/dashboard/internship/${globalInternshipId}/courses/${courseId}`} />
            <Previous previous={previousModuleId > 0} PREVIOUSLINK={`/dashboard/internship/${globalInternshipId}/courses/${courseId}/module/${previousModuleId}/content/${previousContentId}`} /> 
            <p className="text-xs text-gray-500 p-5 ">CONTENT</p>
            <div className="flex flex-col gap-2">
                {contentList.map((content) => {
                    const isActive = Number(content.id) === Number(contentId);
                    const isCompleted = uniqCContent.has(String(content.id))
                    //console.log(content.id ,'is completed', isCompleted)
                    //console.log('active content id:', uniqCContent)

                    return (
                        <TocList isCompleted={isCompleted} COURSELINK={`/dashboard/internship/${globalInternshipId}/courses/${courseId}/module/${moduleId}/content/${content.id}`} id={String(content.id)} isActive={isActive} title={content.title} />  
                    );
                })}
            </div>
            
            <Next NEXTLINK={`/dashboard/internship/${globalInternshipId}/courses/${courseId}/module/${nextModuleId}/content/${nextContentId}`} nextModuleId={nextModuleId} />
            
        </div>
    </div>     

    {/**MOBILE */}

    <div className="md:hidden w-full flex flex-col px-2 py-5 min-h-svh bg-hb-lightgreen">
            {/* Header */}

            {/* Navigation Links */}
            {/* <div className="flex flex-row gap-5 overflow-x-auto p-5 px-2">
                <TocLink tocHref={`/dashboard/internship/${globalInternshipId}/courses/${courseId}`} />
            </div> */}
            <LeftSideBar />
            
            {/* Main Content */}
            <div className="flex flex-col gap-5 px-2 py-5 w-full ">
                {filteredContentList.length > 0 ? filteredContentList.map((content) => (
                    <div key={content.id} className="flex flex-col gap-5 overflow-auto">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-base">{content.title}</p>
                        </div>
                        {content.content_type !== 'project' &&  (
                            <div className="flex flex-row gap-5 items-center w-full justify-between">
                                <Button className=" w-fit font-semibold text-sm py-2 border-2 border-black bg-hb-green px-5" onClick={handleMarkCompleted}>
                                    Mark Completed
                                </Button>
                                {uniqueContentId > 0 && totalContent > 0 && (
                                    <div className="h-fit rounded-full border-hb-green p-1.5 text-base font-bold border-2 w-fit"> {(Math.min(Math.ceil((Number(userXP) / Number(totalXP)) * 120), 100))}%</div>
                                )}
                            </div>
                        )}

                        {/* Video */}
                        {content.content_type === 'video' && (
                            <div>
                                <Video video_url={content.video_url} text_content={content.text_content} />
                            </div>
                            
                        )}

                        {/* Text */}
                        {content.content_type === 'text' && (
                            <TextContent text_content={content.text_content} />
                        )}

                        {/**Code Task */}
                        {content.content_type === 'codeTask' && (
                            <div className="w-full flex flex-col text-sm">
                                <div className="rounded-md flex flex-col w-full prose gap-5">
                                    <TextContent text_content={content.text_content} />
                                    <textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="type your solution..." required  className='bg-green-950 text-white text-xs placeholder:text-xs p-3 h-100 rounded-md font-mono border border-neutral-200'/>
                                    <div className="flex flex-col gap-5 items-start justify-start pt-5">
                                        <HbButton onClick={() => {handleCodeTaskSubmit(); }} type="primary" text="SUBMIT" />
                                        {loading ? (
                                            <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                            </svg>
                                        ): (<div> <p>Your grade is: {grade} XP</p> <p className="leading-7 text-sm">Suggested Improvements: {improve} </p> </div>)}
    
                                    </div>
                                    
                                </div>
                            </div>
                        )}
                        

                        {/* Jupyter */}
                        {content.content_type === 'jupyter' && (
                            <div className="flex flex-col pb-24 gap-2 text-xs max-w-full overflow-auto prose prose-base leading-tight">
                                <a href="#" target="_blank">
                                    <Button className="bg-hb-green text-white">Notebook on HackBio</Button>
                                </a>
                                <a href={content.jupyter_url} target="_blank">
                                    <Button className="bg-amber-500 text-white">Notebook on Colab</Button>
                                </a>
                                {typeof content.text_content === 'string' && <NotebookViewer url={content.jupyter_url} />}
                            </div>
                        )}

                        {/* Quiz */}
                        {/**Test */}
                        {content.content_type === 'quiz' && (
                            <div className="w-full flex flex-row ">
                                <div className="border-2 rounded-md border-hb-green flex flex-col gap-2 w-full">
                                    <QuestionBlock 
                                        question={content.quiz_question || "No question provided"}
                                        answer1={content.quiz_answer_a || "No answer provided"} 
                                        answer2={content.quiz_answer_b || "No answer provided"} 
                                        answer3={content.quiz_answer_c || "No answer provided"} 
                                        selectedAnswer={selectedAnswer}
                                        onanswerSelect={setSelectedAnswer}
                                    />
                                    { content.video_url && 
                                        <Image src={content.video_url} alt="Schematic" width={300} height={300} className="rounded-md border-2 w-full max-w-3/5" /> 
                                    }
                                    <div className="flex flex-col gap-5 items-start justify-start p-5">
                                        <HbButton onClick={() => {handleMCQSubmit(); }} text="SUBMIT" type="primary"/>
                                    </div>
                                    {!loading && (
                                        <div className="px-5 pb-5">
                                            <p>Grade: {grade}</p>
                                            <p>Great! You earned 2 XP 🎉</p>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        )}

                        {/* Project */}
                        {content.content_type === 'project' && (
                            <div className="flex flex-col prose leading-tight gap-3 ">
                                <TextContent text_content={content.project_data} />
                                <Label htmlFor="solution" className="text-sm font-bold">Your Solution</Label>
                                <textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} className="text-xs font-mono h-75 p-2 bg-green-900 text-white" />
                                <Button onClick={() => {handleSolutionSubmit(); }} className="bg-hb-green text-white">SUBMIT</Button>
                                {loading ? (<p>Loading grade...</p>) : (<p>Your score is: {grade}</p>)}
                            </div>
                        )}

                        {/* Submit */}
                        {content.content_type === 'submit' && (
                            <form className="flex flex-col gap-3">
                                <Label htmlFor="projectId">Project Code</Label>
                                <Input id="projectId" placeholder="Project Code" />
                                <Label htmlFor="solution">Your Solution</Label>
                                <Input id="solution" placeholder="Your Solution" />
                                <Button onClick={handleSolutionSubmit} className="bg-green-600 text-white">SUBMIT</Button>
                            </form>
                        )}

                        {/* Certificate */}
                        {content.content_type === 'certificate' && (
                            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                                <Label htmlFor="name">Your Full Name</Label>
                                <Input id="name" value={officialName} onChange={(e) => setOfficialName(e.target.value)} />
                                <p>Total XP: {userXP}</p>
                                <p>Grade: {(Math.min(Math.ceil((Number(userXP) / Number(totalXP)) * 120), 100))}%</p>
                                {cert ? <Button disabled>Generate</Button>:
                                 (<Button className='w-fit bg-green-600 text-white text-xl py-6 hover:bg-green-700' onClick={handleGenCertificate}>
                                                GENERATE
                                            </Button>) }
                                <p className="text-red-500">Can only be generated once!</p>
                            </form>
                        )}
                    </div>
                )) : <p className="text-center">Loading content...</p>}
            </div>
            {/* Content List */}
            <div className="text-sm flex flex-col  border rounded-lg bg-white p-5 w-full max-h-1/3">
                <div className="flex flex-row gap-5 overflow-x-auto pb-5">
                    <TocLink tocHref={`/dashboard/internship/${globalInternshipId}/courses/${courseId}`} />
                </div>
                <div className="flex flex-row items-center justify-between ">
                    <Previous previous={previousModuleId > 0} PREVIOUSLINK={`/dashboard/internship/${globalInternshipId}/courses/${courseId}/module/${previousModuleId}/content/${previousContentId}`} />
                </div>
                <p className="font-bold text-base">CONTENT </p>
                <ul className="flex flex-col  overflow-x-auto list-inside w-full items-start">
                    {contentList.map((content, idx) => {
                        const isActive = Number(content.id) === contentId;
                        const isCompleted = uniqCContent.has(String(contentId))
                        return (
                        <li key={content.id} className="text-sm w-full rounded-md flex flex-col items-start justify-start">
                            <TocList isCompleted={isCompleted} COURSELINK={`/dashboard/internship/${globalInternshipId}/courses/${courseId}/module/${moduleId}/content/${content.id}`} id={String(content.id)} isActive={isActive} title={content.title} /> 
                        </li>
                        );
                    })}
                </ul>
                <div className="flex flex-row items-center justify-between ">
                    <Next NEXTLINK={`/dashboard/internship/${globalInternshipId}/courses/${courseId}/module/${nextModuleId}/content/${nextContentId}`} nextModuleId={nextModuleId} />
                </div>
                
            </div>
        </div>         
    </main>
)
}


const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });