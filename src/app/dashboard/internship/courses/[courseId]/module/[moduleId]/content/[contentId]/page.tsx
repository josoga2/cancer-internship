"use client"
import { Button } from "@/components/ui/button";
import hb_logo from "../../../../../../../../../../public/hb_logo.png";
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
import rehypeRaw from 'rehype-raw'
import withAuth from "@/components/withAuth";
import { CiViewList } from "react-icons/ci";
import Logout from "@/components/logout";
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css'; // or another theme
// remark plugins
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import remarkFootnotes from "remark-footnotes";
import remarkDeflist from "remark-deflist";
import { toast } from "sonner"

// rehype plugins
import rehypeHighlight from "rehype-highlight";
import rehypeToc from "rehype-toc";
import { channel } from "diagnostics_channel";



function Page() {

  const params = useParams()
  const courseId = Number(params.courseId);
  const moduleId = Number(params.moduleId);
  const contentId = Number(params.contentId);
  const router = useRouter()

  const [username, setUsername] = useState("");
  const [cert, setCert] = useState(false);
  const [userXP, setUserXP] = useState("");
  const [userClicks, setUserClicks] = useState<number>(1);
  const [completedContent, setCompletedContent] = useState<string>('');
  const [uniqueContentId, setUniqueContentId] = useState<number>(0);
  const [totalContent, setTotalContent] = useState<number>(0);
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
          setUserXP(userProfile.total_xp.toString());
          setUserClicks(userProfile.no_clicks );
          setCert(userProfile.certified)
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
                        // Assuming you want to filter contents based on the courseId
                        const allCourseContents = contentResponse.data.filter(
                            (content: { id: number | string; course?: number | string }) =>
                                [1, 2, 3].includes(Number(content.course))
                        );
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

    const handleMarkCompleted = async () => {
        try {
            const response = await api.post('/api/mark-completed/', {
                user: username,
                content: contentId,
                course: courseId,
                module: moduleId
            });
            if (response.status === 200) {
                console.log("Content marked as completed successfully.");
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
                channel: filteredContentList[0].project_promote_channel || "C09A477A43E", // Default channel if not provided
                minimal_rubric: filteredContentList[0].project_rubric || "Use your best judgment to grade the solution based on the content provided." // Default minimal rubric if not provided
            });
            if (response.status === 200) {
                console.log("Solution submitted successfully.: ", response.data.grade_response.grade);
                setGrade(response.data.grade_response.grade); // Assuming the response contains a grade field
                setLoading(false);
                // Handle success, e.g., show a success message or redirect
            } else {
                console.error("Failed to submit solution.");
            }
        } catch (error) {
            console.error("Error submitting solution:", error);
        }
    }

    const [officialName, setOfficialName] = useState<string>("");


    const handleGenCertificate = async () => {
        //e.preventDefault()
        try {
            const response = await api.post('/api/generate-certificate/', {
                name: officialName,
                xp: (Math.ceil((Number(uniqueContentId)/Number(totalContent))*100)).toString(),
                internship_title: 'The Current Internship Course',
            },
            {responseType: 'blob'} // Ensure the response is treated as a blob for file download
        );
            if (response.status === 200) {
                console.log("Certificate generated successfully.");
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
    <div className="hidden md:flex flex-row w-full pl-5">
        {/**LEFT SIDE BAR */}
        <div className="flex flex-col gap-10 text-base h-screen bg-white items-start w-[250px] border-r">
            <div className="flex flex-row items-center gap-2 px-2 py-5">
                <Image src={hb_logo} alt="logo" width={40} height={40} />
                <p className="font-bold">HackBio</p>
            </div>
            <div className="flex flex-col gap-2 w-full items-start text-sm">
            
                <a href={`/dashboard/internship/courses/${courseId}`} className="font-bold text-base py-2 hover:underline flex flex-row items-center gap-2"> <CiViewList /> <p> Table of Content </p></a>
                
                {previousModuleId > 0 ? (
                    <a 
                        href={`/dashboard/internship/courses/${courseId}/module/${previousModuleId}/content/${previousContentId}`} 
                        className="font-bold text-base py-5 hover:underline"
                    >
                        ← Previous Module
                    </a>
                ) : (
                    <p className="font-bold text-base py-5 text-gray-400"> ← Previous Module</p>
                )}

                    <p className="font-bold text-base py-3">Module Content </p>
                {contentList
                    .map((content) => (
                        <div key={content.id} className={`w-full px-5 py-2 hover:underline ${Number(content.id) === contentId ? 'bg-hb-lightgreen text-hb-green font-bold rounded-l-md' : ''}`}>
                            <li className="list-disc"> <a href={`/dashboard/internship/courses/${courseId}/module/${moduleId}/content/${content.id}`}> {content.title} </a> </li>
                        </div>
                ))}
                {nextModuleId > 0 ? (
                    <a 
                        href={`/dashboard/internship/courses/${courseId}/module/${nextModuleId}/content/${nextContentId}`} 
                        className="font-bold text-base  py-5 hover:underline"
                    >
                        Next Module →
                    </a>
                ) : (
                    <p className="font-bold text-base  py-5 text-gray-400">Next Module →</p>
                )}
            </div>
        </div>
        {/** MAIN */}
        <div className="w-full bg-hb-lightgreen flex flex-col gap-10 text-lg overflow-y-auto h-screen pb-10">
            <div className="flex flex-row gap-10 pl-10 pt-7 bg-white w-full pb-5 border-b text-base text-gray-600  items-center justify-between pr-10">
                    <div className="flex flex-row gap-10 items-center">
                        <a href="/internship" className="hover:underline font-bold">Internships</a>
                        <a href="/learning" className="hover:underline font-bold">Courses</a>
                    </div>
                    <div className="flex flex-row gap-10 items-center text-black text-xl">
                        <p className="font-bold"> 🎖️ {Number(userXP)} XP</p>
                        <p className="font-bold"> {title}</p>
                        <Logout />
                    </div>
            </div>
            <div className="px-10 pt-10 w-[800px]  flex flex-col gap-5">
                {filteredContentList.length >0? (filteredContentList.map((content) => (
                    <div className="flex flex-col gap-10" key={content.id}>
                        <div className="flex flex-row w-full justify-between"><p className="font-bold text-3xl "> {content.title} 
                            </p> <Button className="font-bold text-xl py-5 border-2 border-black bg-hb-green px-5" onClick={handleMarkCompleted}>Mark Completed</Button>
                        </div>
                        <div className="font-bold w-full p-3 text-lg border rounded-md border-hb-green"> 
                            {uniqueContentId >0 && totalContent>0 ? (<div className="flex flex-row gap-10 items-center max-w-full"> 
                                <Progress value={Math.ceil((Number(uniqueContentId)/Number(totalContent))*100)} className=""/> 
                                <p className="font-bold text-2xl rounded-full"> {Math.ceil((Number(uniqueContentId)/Number(totalContent))*100)}% </p> 
                            </div>) : <div className="h-3 w-10"></div>}
                        </div>
                        
                    {content.content_type === 'video' && (
                        
                        <div className="w-full flex flex-row gap-10">
                            <div className="w-full flex flex-col gap-5">
                                <iframe height={400} src={content.video_url} className="rounded-md w-full border-2 border-hb-green" />
                                <p className="text-lg pt-5 font-bold">⛭ Remember to Use the gear icon to select your desired video quality</p>
                                <p className="text-lg pt-5 font-bold">{`</> Source Code`}</p>
                                <div className=" bg-white p-5 border border-gray-200 rounded-md text-sm prose prose-base leading-tight">
                                    <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{content.text_content}</Markdown>
                                </div>
                            </div>
                            {/* Floating JupyterLite widget */}
                            {/* <div
                                className="fixed top-1/2 right-10 -translate-y-1/2 z-50 shadow-lg rounded-xl bg-white p-1"
                            >
                                <iframe
                                    src="https://josoga2.github.io/jpuyterlite-hb-dev/repl/index.html?showBanner=0&kernel=python&toolbar=1"
                                    height={300}
                                    width={300}
                                    className="rounded-lg border border-gray-200"
                                />
                            </div> */}
                        </div>
                    )}
                    {/**Text */}
                    {content.content_type === 'text' && (
                        <div className="w-full flex flex-row gap-10">
                            <div className="w-full border-2 rounded-md border-hb-green p-5 bg-white prose prose-base leading-tight ">
                                <p className="font-bold text-lg"></p>
                                <article> <Markdown
                                    remarkPlugins={[
                                        remarkGfm,
                                        remarkMath,
                                        remarkDeflist
                                    ]}
                                    rehypePlugins={[
                                        rehypeRaw,
                                        rehypeKatex,
                                        rehypeHighlight
                                    ]}
                                    >
                                    {content.text_content}
                                </Markdown>
                                </article>
                            </div>
                        </div>
                    )}
                    {/**Jupyter */}
                    {content.content_type === 'jupyter' && (
                        <div className="w-full flex flex-row gap-10">
                            <div className="w-full min-h-screen over border-2 rounded-md border-hb-green p-10 flex flex-col gap-2">
                                <div className="flex flex-row gap-10 items-center ">
                                    <a href="http://192.168.42.99/"  target="_blank"> 
                                        <Button className="bg-hb-green text-white text-xl font-bold border-black border-2"> 
                                            Notebook on HackBio 
                                        </Button> 
                                    </a>
                                    <a href={content.jupyter_url}  target="_blank"> 
                                        <Button className="bg-amber-500 text-white text-xl font-bold border-black border-2"> 
                                            Notebook on Colab 
                                        </Button> 
                                    </a>
                                </div>
                                <p className="font-bold">
                                    If you need an account to run python on HackBio, you can request for access from your HackBio Manager on Slack
                                </p>
                                {typeof content.text_content === 'string' && <NotebookViewer url={content.jupyter_url} />}
                            </div>
                        </div>
                    )}
                    {/**Test */}
                    {content.content_type === 'quiz' && (
                        <div className="w-full flex flex-row gap-10">
                            <div className="border-2 rounded-md border-hb-green p-10 flex flex-row gap-2 w-full">
                                <QuestionBlock 
                                    question={content.quiz_question || "No question provided"} 
                                    answer1={content.quiz_answer_a || "No answer provided"} 
                                    answer2={content.quiz_answer_b || "No answer provided"} 
                                    answer3={content.quiz_answer_c || "No answer provided"} 
                                />
                                { content.text_content && 
                                    <Image src={content.text_content} alt="Schematic" width={300} height={300} className="rounded-md border-2 w-full max-w-3/5" /> }
                            </div>
                        </div>
                    )}
                    {/**Project */}
                    {content.content_type === 'project' && (
                        <div className="w-full flex flex-row gap-10">
                            <div className="border-2 rounded-md border-hb-green prose prose-base p-5 flex flex-col leading-tight w-full">
                                <p className="font-bold text-lg">
                                    Project Details: Submit markdown or code solution to the project below
                                </p>
                                <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{content.project_data}</Markdown>
                                <div className="grid gap-2">
                                    <Label htmlFor="solution" className='text-lg font-bold pt-5'>Your Solution</Label>
                                    <textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="type your solution..." required  className='bg-green-950 text-white text-xs placeholder:text-xs p-3 h-screen font-mono border border-neutral-200'/>
                                    <p className="text-sm text-gray-500">Note: Please ensure your solution is well documented and clear. We accept text and code!</p>
                                    <div className="flex flex-row gap-5 items-center justify-start pt-5">
                                        <Button onClick={() => {handleSolutionSubmit(); handleMarkCompleted()}} className='w-fit bg-green-500 text-white text-xl py-6 hover:bg-green-600'>
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
                        </div>
                    )}
                    {/**Carousel3 */}
                    {/*content.content_type === 'Carousel3' && (
                        <div className="w-full flex flex-row gap-10">
                            <div className="border-2 rounded-md border-hb-green p-10 flex flex-col gap-2 w-fit">
                                <p className="font-bold text-lg">A Quick Summary</p>
                                <Carousel className="w-fit max-w-2/5 px-10">
                                    <CarouselContent>
                                        <CarouselCard content={content.carousel1 || ""} />
                                        <CarouselCard content={content.carousel2 || ""} />
                                        <CarouselCard content={content.carousel3 || ""} />
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                        </div>
                    )*/}
                    {/**Carousel5 */}
                    {/*content.content_type === 'Carousel5' && (
                        <div className="w-full flex flex-row ">
                            <div className="border-2 rounded-md border-hb-green p-10 flex flex-col gap-10 w-fit">
                                <p className="font-bold text-lg">A Quick Summary</p>
                                <Carousel className="w-fit max-w-2/5 px-10">
                                    <CarouselContent>
                                        <CarouselCard content={content.carousel1 || ""} />
                                        <CarouselCard content={content.carousel2 || ""} />
                                        <CarouselCard content={content.carousel3 || ""} />
                                        <CarouselCard content={content.carousel4 || ""} />
                                        <CarouselCard content={content.carousel5 || ""} />
                                    </CarouselContent>
                                    <CarouselPrevious className="w-20 h-20"/>
                                    <CarouselNext  className="w-20 h-20"/>
                                </Carousel>
                            </div>
                        </div>
                    )*/}
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
                        <div className="border-2 rounded-md border-hb-green p-10 flex flex-col gap-2 w-full">
                            <p className="font-bold text-lg">
                                Process Your Certificates
                            </p>
                            <Card className='w-full border-none shadow-none'>
                                <CardHeader className='text-center'>
                                    {/* <CardTitle className="text-base">Login</CardTitle> */}
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-5" onSubmit={(e) => {e.preventDefault()}}>
                                            
                                        <div className="grid gap-2">
                                            <Label htmlFor="name" className='text-xl'>Your Full Name {`(Official order and Preference)`}</Label>
                                            <Input id="name" type="text" placeholder="Your Name" required value={officialName} onChange={(e)=> setOfficialName(e.target.value)} className='bg-blue-50 text-xl placeholder:text-xl py-6' />
                                        </div>
                                        
                                        <p>Your Total XP: {userXP}XP</p>
                                        <p>Your Total Internship Grade: {Math.ceil((Number(uniqueContentId)/Number(totalContent))*100)}%</p>
                                            
                                        
                                            {cert ? <Button disabled>Generate</Button>:
                                 (<Button className='w-fit bg-green-600 text-white text-xl py-6 hover:bg-green-700' onClick={handleGenCertificate}>
                                                GENERATE
                                            </Button>) }
                                            <p className="font-bold text-red-500">Can only be generated once!</p>

                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="border-2 p-5 rounded-md border-hb-green flex flex-col gap-2 ">
                            <p className="font-bold text-xl">Guideline for Submissions </p>
                            <p>You can only generate your certificate once. Please note that “Your Internship Grade - in percentage -  will be recorded on your certificate. </p>
                            <p> Please ensure you have attained enough points before requesting for your certificate. Once you process, it cannot be generated again.</p>
                        </div>
                    </div>
                )}
                </div>
            ))) : (<p>Loading content...</p>)}
            </div>
        </div>
    </div>     

    {/**MOBILE */}

    <div className="md:hidden w-full flex flex-col pb-20 min-h-[100svh] ">
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

            {/* Navigation Links */}
            <div className="flex flex-col p-5 text-sm gap-3 ">
                <a href={`/dashboard/internship/courses/${courseId}`} className="flex items-center gap-2 font-bold text-xl hover:underline"> <CiViewList className="text-3xl font-bold" /> Table of Content</a>
            </div>

            {/* Module Navigation */}
            <div className="px-10 py-5 text-sm text-gray-700 text-center w-full items-center justify-between flex flex-row gap-5">
                {previousModuleId > 0 ? (
                    <a href={`/dashboard/internship/courses/${courseId}/module/${previousModuleId}/content/${previousContentId}`} className="font-bold text-base hover:underline border border-green-800 rounded-full px-2 py-2 ">← Previous Module</a>
                ) : (
                    <p className="text-gray-400 font-bold border border-zinc-500 rounded-full px-3 py-2">← Previous Module</p>
                )}

                {nextModuleId > 0 ? (
                    <a href={`/dashboard/internship/courses/${courseId}/module/${nextModuleId}/content/${nextContentId}`} className="font-bold hover:underline border text-green-900 border-green-800 rounded-full px-2 py-2 ">Next Module →</a>
                ) : (
                    <p className="text-gray-400 font-bold border-zinc-500 rounded-full px-3 py-2">Next Module →</p>
                )}
            </div>

            

            {/* Main Content */}
            <div className="flex flex-col gap-5 px-4  bg-green-50 py-10 w-full pb-20 ">
                {filteredContentList.length > 0 ? filteredContentList.map((content) => (
                    <div key={content.id} className="flex flex-col gap-5  scroll-pb-20 overflow-auto">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-lg">{content.title}</p>
                        </div>
                        <Button onClick={handleMarkCompleted} className="text-base bg-hb-green border border-black">Mark Completed</Button>

                        {/* Progress */}
                        {uniqueContentId > 0 && totalContent > 0 && (
                            <div className="flex items-center gap-4 border-2 border-green-600 p-5 rounded-md">
                                <Progress value={Math.ceil((Number(uniqueContentId)/Number(totalContent))*100)} />
                                <p className="text-xs font-bold">{Math.ceil((Number(uniqueContentId)/Number(totalContent))*100)}%</p>
                            </div>
                        )}

                        {/* Video */}
                        {content.content_type === 'video' && (
                            <>
                                <div>
                                    <div className="flex flex-col gap-5">
                                        <iframe height={200} src={content.video_url} className="rounded-md w-full border border-hb-green" />
                                        <p className="text-xs pt-2">⛭ Use the gear icon to set video quality</p>
                                        <div className=" border-hb-green border-2 p-7  pb-24 rounded-md text-sm prose prose-base leading-tight">
                                            <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{content.text_content}</Markdown>
                                        </div>
                                        <iframe src="https://jupyterlite.github.io/demo/repl/index.html?showBanner=0&kernel=python&toolbar=1" height={150} width={150} />
                                    </div>
                                    <div>
                                        <iframe src="https://jupyterlite.github.io/demo/repl/index.html?showBanner=0&kernel=python&toolbar=1" height={150} width={150} />
                                    </div>
                                </div>
                                
                            </>
                        )}

                        {/* Text */}
                        {content.content_type === 'text' && (
                            <div className=" border-hb-green border-2 p-7  pb-24 rounded-md text-sm prose prose-base leading-tight">
                                <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{content.text_content}</Markdown>
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
                        {content.content_type === 'quiz' && (
                            <div className="border p-3  pb-24 rounded-md">
                                <QuestionBlock question={content.quiz_question} answer1={content.quiz_answer_a} answer2={content.quiz_answer_b} answer3={content.quiz_answer_c} />
                                {content.text_content && <Image src={content.text_content} alt="Schematic" width={300} height={300} className="rounded-md w-full" />}
                            </div>
                        )}

                        {/* Project */}
                        {content.content_type === 'project' && (
                            <div className="flex flex-col prose leading-tight gap-3 pb-24">
                                <Markdown  remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>{content.project_data}</Markdown>
                                <Label htmlFor="solution">Your Solution</Label>
                                <textarea id="solution" value={solution} onChange={(e) => setSolution(e.target.value)} className="text-xs font-mono h-[300px] p-2 bg-green-900 text-white" />
                                <Button onClick={() => {handleSolutionSubmit(); handleMarkCompleted();}} className="bg-hb-green text-white">SUBMIT</Button>
                                {loading ? (<p>Loading grade...</p>) : (<p>Your grade is: {grade}</p>)}
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
                                <p>Grade: {Math.ceil((Number(uniqueContentId)/Number(totalContent))*100)}%</p>
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
            <div className="px-5 py-2 text-sm flex flex-col gap-5 border-t bottom-0 pb-20  bg-white w-full fixed">
                <p className="font-bold text-xl">Module Content </p>
                <ul className="flex flex-row gap-3 overflow-x-auto list-inside w-full">
                    {contentList.map((content, idx) => (
                        <li key={content.id} className="py-3 hover:underline border border-green-900 w-full rounded-md px-3 flex flex-row items-center  justify-center">
                            <a href={`/dashboard/internship/courses/${courseId}/module/${moduleId}/content/${content.id}`} className="flex min-w-24 items-center justify-center flex-row"> <p>✻</p> <p>Content </p> <p>{ idx+1} </p></a>
                        </li>
                    ))}
                </ul>
                
            </div>
        </div>         
    </main>
)
}


const PageWrapper = () => <Page />;

export default withAuth({ children: <PageWrapper /> });