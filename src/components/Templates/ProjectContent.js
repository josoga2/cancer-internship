import PlatformNavBar from "./PlatformNavBar";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { InternshipModulesContext } from "../../Context/InternshipModulesContext";
import { InternshipContext } from "../../Context/InternshipContext";
import { InternshipContentContext } from "../../Context/InternshipContentContext";
import { Link } from "react-router-dom";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import WYSIWYGEditor from "./WYSIWYGEditor";
import { useState, useEffect } from "react";
import axios from "axios";
import { ACCESS_TOKEN, SERVER_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import soundFile from './../../Assets/level_up.mp3'
import { XPContext } from "../../Context/XPContext";
import LoadingIndicator from "../LoadingIndicator";




const ContentRenderer = ({ contentType }) => {
    const renderContent = (type) => {
      switch (type) {
        case "text":
          return "📄 ";
        case "video":
          return "🎥 ";
        case "test":
          return "📝 ";
        case "coding":
          return "💻 ";
        case "jupyter":
          return "📗 ";
        default:
          return "📗 ";
      }
    };
  
    return (
      <div className="content-renderer">
        <p>{renderContent(contentType)}</p>
      </div>
    );
  };



const ProjectContent = () => {
    const [ markingStatus, setMarkingStatus ] = useState("")
    const { internshipContentData } = useContext(InternshipContentContext)
    const { internshipModulesData } = useContext(InternshipModulesContext)
    const { internshipData } = useContext(InternshipContext)
    const { internshipId, moduleID, contentId } = useParams()
    const [fileUrl, setFileUrl] = useState("")
    const [solution, setSolution] = useState("");
    const [review, setReview] = useState("");
    const navigate = useNavigate();
    const { XPData } = useContext(XPContext)
    const [isLoading, setIsLoading] = useState(false)

    //convert values to integers
    const INT_ID = parseInt(internshipId, 10);
    const MOD_ID = parseInt(moduleID, 10);
    const CON_ID = parseInt(contentId, 10);
    //console.log(contentId)
    const currInternship = internshipContentData.filter((thisInternship)=>(thisInternship.internship === INT_ID))
    //console.log(internshipContentData)
    const currModule = currInternship.filter((thisModule)=>(thisModule.module === MOD_ID))
    const currContent = currModule.filter((thisContent)=>(thisContent.id === CON_ID))
    //console.log(currContent)
    const thisInternship = internshipData[INT_ID-1]
    const allModules = internshipModulesData.filter((thisModule)=>(thisModule.internship === INT_ID))
    const allContents = internshipContentData.filter((thisContent)=>(thisContent.internship === INT_ID ))


    //find the next internship
    const currIndex = allContents.findIndex((item) => (item.id === CON_ID));
    const nextContent = currIndex + 1 < allContents.length ? allContents[currIndex + 1] : null;
    
    const handleMarkAsSubmit = async () => {
     
      try {
          const token = localStorage.getItem(ACCESS_TOKEN);
          await axios.post(`${SERVER_URL}/api/progress/mark-complete/`, { internship_id:INT_ID, content_id:CON_ID }, { headers: { 'Authorization': `Bearer ${token}` }});
          setMarkingStatus('Completed, 2 XP earned! Reload to update XP')
          const audio = new Audio(soundFile)
          audio.play();

          setTimeout(() => {
            navigate(`/internships/${nextContent.internship}/TOC/${nextContent.module}/${nextContent.content_type}/${nextContent.id}`); // Adjust this to your next page's route
          }, 2000);

      }catch (error) {
          console.log(error.response?.data?.error || "An error occurred");
      }

    }


    const handleProjectSubmission = async () => {
      setIsLoading(true)
      try {
          const token = localStorage.getItem(ACCESS_TOKEN);
          const response = await axios.post(`${SERVER_URL}/api/review-project/`, { project_text:solution, task_description:currContent[0].project_content }, { headers: { 'Authorization': `Bearer ${token}` }});
          setReview(response.data.feedback)
          console.log(response.data.score )
          setFileUrl(`${SERVER_URL}/api/outputs/output.txt`)
          await axios.post(`${SERVER_URL}/api/progress/add-xp/`,  { internship_id:INT_ID, content_id:CON_ID, xp_to_add:response.data.score }, { headers: { 'Authorization': `Bearer ${token}` }});
      }catch (error) {
          setReview(error.response?.data?.error || "An error occurred");
      }
      setIsLoading(false)
    }


    if (!internshipModulesData || internshipModulesData.length === 0) {
        return <div>Loading...</div>; 
    }
    if (!internshipData || internshipData.length === 0) {
        return <div>Loading...</div>; 
    }
    if (!internshipContentData || internshipContentData.length === 0) {
      return <div>Loading...</div>; 
    }

    const handleTextEditorChange = (value) => {
      setSolution(value);
    }

    const TextFileViewer = ({ fileUrl }) => {
      const [content, setContent] = useState("");
   
   
      useEffect(() => {
          //console.log("Fetching file from URL:", fileUrl); 
        // Fetch the text file
        fetch(fileUrl)
          .then((response) => response.text())
          .then((data) => setContent(data))
          .catch((error) => console.error("Error loading file:", error));
      }, [fileUrl]);
      
      console.log(fileUrl)

      
      return (

          <pre className="text-white text-xs h-full overflow-auto font-mono whitespace-pre-wrap">
            {content}
          </pre>

      );
    };

  return (
    <main>
          {/*  Desktop */}
          <section className="hidden md:flex md:flex-col md:max-w-full md:m-auto md:items-center md:justify-between">
                <div className="w-full bg-zinc-100 min-h-full">
                <div className="w-full py-2 bg-hackbio-green-light px-5">
                    <PlatformNavBar /> 
                </div>
                
                <div className="pt-10 px-5 flex flex-row gap-10 items-start justify-start w-full h-full">
                    <div className="flex flex-col gap-5 bg-white p-10 h-fit w-fit rounded-md max-h-screen overflow-scroll">
                        <p>Table of Contents</p>
                        {allModules.map((mod)=>(
                            <div className="w-full ">
                            <p className="font-semibold pb-2"> {mod.title} </p>
                            {(allContents.filter((content_mod)=>(content_mod.module === mod.id))).map((content)=>(
                                <Link to={`/internships/${content.internship}/TOC/${content.module}/${content.content_type}/${content.id}`}> <li className="font-medium text-sm w-full hover:font-medium pl-2 flex flex-row items-center gap-3 py-1 "> {<ContentRenderer contentType={content.content_type} />}{content.order}. {content.title} </li></Link>
                            ))}
                            </div>
                        ))}
                        <Link to={'/dashboard'}> <div className="flex flex-row gap-5 font-bold items-center text-lg">  Dashboard </div></Link>
                    </div>
                    <div className="w-full flex flex-col gap-5 border border-hackbio-green-light max-h-fit h-fit rounded-md bg-white p-5">
                        <div className="flex flex-row items-center justify-between ">
                        <div className="flex flex-row items-center justify-between pr-20 w-2/3">
                            <p className="font-bold text-lg pb-5"> {currContent[0].order}: {currContent[0].title} </p>
                            <p className="font-bold text-lg pb-5"> <span className="text-purple-600"> {XPData.xp_earned} </span>  XP </p>
                          </div>
                          <div className=""> <button className="bg-hackbio-green text-white px-4 py-2 rounded-md hover:bg-green-200 hover:text-hackbio-green " onClick={handleProjectSubmission}> { isLoading? <LoadingIndicator/>:  '🚀 Submit'} </button> </div> 
                        </div>
                        <div className="flex flex-row w-full gap-5">
                          <div className="w-3/5 min-h-52">
                            <WYSIWYGEditor onChange={handleTextEditorChange}  />
                          </div>
                          <div className="w-1/3 min-h-52">
                            <div className="h-full">
                                  <div className="font-mono text-sm bg-gray-900 border h-full rounded-md overflow-auto">
                                      <p className="w-full pt-5 font-bold font-mono bg-zinc-700 text-white rounded-t-md px-3">
                                          Project Review (Automated)
                                      </p>
                                      <div className="w-full bg-gray-900 text-white h-full p-3  overflow-x-auto">
                                          {fileUrl === "" ? "" : <TextFileViewer fileUrl={fileUrl} />}
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                        <div className="h-full">
                                <div className="font-mono text-sm bg-gray-900 border h-full rounded-md overflow-auto">
                                    <p className="w-full pt-5 font-bold font-mono bg-zinc-700 text-white rounded-t-md px-3">
                                        Project Description
                                    </p>
                                    <div className="w-full bg-white text-white h-full p-3  overflow-x-auto">
                                    <p className="text-sm leading-5 text-justify prose prose-lg max-w-none px-5"> <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{currContent[0].project_content}</Markdown> </p>
                                    </div>
                                </div>
                            </div>
                        <button className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white w-fit' onClick={handleMarkAsSubmit}> Mark as Completed  ✅ </button> 
                        <p className="font-mono animate-bounce"> { markingStatus } </p>
                    </div>
                </div>
                </div>
              
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 bg-zinc-100 text-sm w-full'>
              <div className="w-full">
                <PlatformNavBar />  
              </div>

              <div className="pt-10 flex flex-col gap-10 items-start justify-start w-full h-full">
                    <div className="flex flex-row  w-full items-center justify-center">
                        <div className="px-5 py-2 border h-full font-bold text-xl bg-white">🔙</div>
                        <Link to={'/dashboard'}> <div className="flex gap-5 border px-3 py-2  bg-white font-bold items-center text-lg">  Table of content </div></Link>
                        <div className="px-5 py-2 border h-full font-bold text-xl bg-white">→</div>
                    </div>
                    <div className="w-full flex flex-col gap-5 border border-hackbio-green-light  rounded-md bg-white p-5">
                        <div className="flex flex-row items-center justify-between w-full gap-5">
                          <p className="font-bold text-lg py-2 pb-5"> {currContent[0].order}: {currContent[0].title} </p>
                          <button className="bg-hackbio-green text-white px-4 py-2 rounded-md hover:bg-green-200 hover:text-hackbio-green " onClick={handleProjectSubmission}> { isLoading? <LoadingIndicator/>:  '🚀 Submit'} </button> 
                        </div>
                        <div className="flex flex-col w-full gap-5">
                          <div className=" min-h-52">
                            <WYSIWYGEditor onChange={handleTextEditorChange}  />
                          </div>
                          <div className="min-h-52">
                            <div className=" min-h-52">
                                  <div className="font-mono text-sm bg-gray-900 border min-h-52 rounded-md overflow-auto">
                                      <p className="w-full pt-5 font-bold font-mono bg-zinc-700 text-white rounded-t-md px-3">
                                          Project Review (Automated)
                                      </p>
                                      <div className="w-full bg-gray-900 text-white min-h-52  overflow-y-auto">
                                          {fileUrl === "" ? "" : <TextFileViewer fileUrl={fileUrl} />}
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                        <div className="h-full">
                                <div className="font-mono text-sm bg-gray-900 border h-full rounded-md ">
                                    <p className="w-full pt-5 font-bold font-mono bg-zinc-700 text-white rounded-t-md px-3">
                                        Project Description
                                    </p>
                                    <div className="w-full bg-white text-white h-full p-3 ">
                                    <p className="text-sm leading-5 text-justify prose prose-lg max-w-none "> <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{currContent[0].project_content}</Markdown> </p>
                                    </div>
                                </div>
                            </div>
                        <button className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white w-fit' onClick={handleMarkAsSubmit}> Mark as Completed  ✅ </button> 
                        <p className="font-mono animate-bounce"> { markingStatus } </p>
                    </div>
                </div>
          </section>
        
  
      </main>
  );
}

export default ProjectContent;
