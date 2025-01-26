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
import Editor from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ACCESS_TOKEN, SERVER_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import soundFile from './../../Assets/level_up.mp3'
import { XPContext } from "../../Context/XPContext";
import LoadingIndicator from "../LoadingIndicator";
import { useRef } from "react";


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



const BootcampContent = () => {
    const [ markingStatus, setMarkingStatus ] = useState("")
    const navigate = useNavigate();
    const [fileExplorer, setFileExplorer] = useState("");
    const [code, setCode] = useState("");
    const [codingLanguage, setCodingLanguage] = useState("r");
    const [output, setOutput] = useState("");
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [plot, setPlot] = useState(null);
    const [task, setTask] = useState("");
    const [fileUrl, setFileUrl] = useState("")
    const { XPData } = useContext(XPContext)
    const socketRef = useRef(null);
    const [activeTab, setActiveTab] = useState("terminal");

    useEffect(() => {
        // Connect to WebSocket
        socketRef.current = new WebSocket('ws://localhost:8001/ws/bash/');

        socketRef.current.onmessage = (event) => {
            // Append received output to the output state
            setOutput((prev) => prev + event.data);
        };

        return () => {
            // Close WebSocket when component unmounts
            socketRef.current.close();
        };
    }, []);

    const { internshipContentData } = useContext(InternshipContentContext)
    const { internshipModulesData } = useContext(InternshipModulesContext)
    const { internshipData } = useContext(InternshipContext)
    const { internshipId, moduleID, contentId } = useParams()

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
    //console.log(nextContent)
    
    const handleMarkAsComplete = async () => {
        setIsLoading(true)
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


    const handleEditorChange = (value) => {
        setCode(value);
        setTask(currContent[0].coding_content);
    }

    const handleRunPythonCode = async() => {
        setIsLoading(true)
        //console.log(code);
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const response = await axios.post(`${SERVER_URL}/api/run-code/`, 
                { code:code },
                { headers: { 'Authorization': `Bearer ${token}` }}
            );
            setOutput(response.data.output || "No output");
            console.log(output)
            setFileUrl(`${SERVER_URL}/api/outputs/output.txt`)
            setPlot(response.data.plot || null);
        } catch (error) {
            setOutput(error.response?.data?.error || "An error occurred");
        }
        setIsLoading(false)

    }

    const handleRunBashCode = () => {
        if (socketRef.current && code.trim()) {
            // Send the Bash command to the backend
            socketRef.current.send(code);
            setOutput(''); // Clear previous output
        }
    };


        // Send the Bash command to the backend
        // Clear previous output
    

    
    
    /* const handleRunBashCode = async () => {
        setOutput(""); // Clear previous output
        setIsStreaming(true);

        try {
            const token = localStorage.getItem("ACCESS_TOKEN");

            // First send the Bash code to the server (to start processing)
            await axios.post(
                `${SERVER_URL}/api/run-bash/`,
                { code },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Now, set up the EventSource for real-time streaming
            const eventSource = new EventSource(
                `${SERVER_URL}/run-bash/stream/`
            );

            eventSource.onmessage = (event) => {
                // Append new output as it's streamed
                setOutput((prevOutput) => prevOutput + event.data + "\n");
            };

            eventSource.onerror = () => {
                console.error("Error occurred during streaming.");
                eventSource.close();
                setIsStreaming(false);
            };

            // When the stream ends, close it
            eventSource.addEventListener("close", () => {
                eventSource.close();
                setIsStreaming(false);
            });
        } catch (error) {
            setOutput(error.response?.data?.error || "An error occurred");
            setIsStreaming(false);
        }
    }; */

    

    const handleRunRCode = async() => {
        //console.log(code);
        setIsLoading(true)
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const response = await axios.post(`${SERVER_URL}/api/run-r-code/`, { code:code }, { headers: { 'Authorization': `Bearer ${token}` }});
            setOutput(response.data.output || "No output");
            setFileUrl(`${SERVER_URL}/api/outputs/output.txt`)
            setPlot(response.data.plot || null);
        } catch (error) {
            setOutput(error.response?.data?.error || "An error occurred");
        }
        setIsLoading(false)
    }

    const handleCodingHint = async () => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const response = await axios.post(`${SERVER_URL}/api/get-coding-hint/`, { question:task, language:codingLanguage, usercode:code }, { headers: { 'Authorization': `Bearer ${token}` }});
            setOutput(response.data.hint)
            setFileUrl(`${SERVER_URL}/api/outputs/output.txt`)
            await axios.post(`${SERVER_URL}/api/progress/ai-call/`, {internship_id: INT_ID, content_id: CON_ID}, { headers: { 'Authorization': `Bearer ${token}` }})
        }catch (error) {
            setOutput(error.response?.data?.error || "An error occurred");
        }
        setIsLoading(false)
    }

    const handleCodingSubmission = async () => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const response = await axios.post(`${SERVER_URL}/api/get-code-feedback/`, { code:code, language:codingLanguage, task:task }, { headers: { 'Authorization': `Bearer ${token}` }});
            setOutput(response.data.feedbackText)
            setFileUrl(`${SERVER_URL}/api/outputs/output.txt`)
            //console.log(response.data.feedback.score)
            setScore(response.data.feedback.score)
            //await axios.post('http://localhost:8000/api/progress/add-xp/',  { internship_id:INT_ID, content_id:CON_ID, xp_to_add:score }, { headers: { 'Authorization': `Bearer ${token}` }})
        }catch (error) {
            setOutput(error.response?.data?.error || "An error occurred");
        }
        setIsLoading(false)

    }
    //console.log(score)

    const handleReturnXP = async () => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const response = await axios.post(`${SERVER_URL}/api/progress/add-xp/`,  { internship_id:INT_ID, content_id:CON_ID, xp_to_add:score }, { headers: { 'Authorization': `Bearer ${token}` }});
            //
        }catch (error) {
            setOutput(error.response?.data?.error || "An error occurred");
        }
        setIsLoading(false)

    }

    const handleSubmit = async () => {
        
        // Run the first function to generate the certificate
        await handleCodingSubmission();
        //console.log(score)
        // Run the second function to update certification
        await handleReturnXP();
        setIsLoading(false)
    };

    
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
        
        //console.log(fileUrl)

        
        return (

            <pre className="text-white text-xs h-full overflow-auto font-mono whitespace-pre-wrap">
              {content}
            </pre>

        );
      };
      //console.log(codingLanguage)
    
  return (
    <main>
          {/*  Desktop */}
          <section className="hidden md:flex md:flex-col md:max-w-full md:m-auto md:items-center md:justify-between">
                <div className="w-full bg-zinc-100 min-h-full">
                  <div className="w-full py-2 bg-hackbio-green-light px-5">
                      <PlatformNavBar /> 
                  </div>
                  
                  <div className="pt-10 px-5 flex flex-row gap-5 items-start justify-start w-full h-fit">
                      <div className="flex flex-col gap-5 bg-white p-5 h-fit w-fit rounded-md max-h-screen overflow-scroll">
                          <p>Table of Contents</p>
                          {allModules.map((mod)=>(
                              <div className="max-w-40">
                              <p className="font-semibold pb-2"> {mod.title} </p>
                              {(allContents.filter((content_mod)=>(content_mod.module === mod.id))).map((content)=>(
                                  <Link to={`/internships/${content.internship}/TOC/${content.module}/${content.content_type}/${content.id}`}> <li className="font-medium text-xs w-full hover:font-medium pl-2 flex flex-row items-center gap-3 py-1 "> {<ContentRenderer contentType={content.content_type} />} {content.order}. {content.title} </li></Link>
                              ))}
                              </div>
                          ))}
                          <Link to={'/dashboard'}> <div className="flex flex-row gap-5 font-bold items-center text-lg">  Dashboard </div></Link>
                      </div>
                      
                      
                      <div className="w-full flex flex-col  border border-hackbio-green-light max-h-fit h-fit rounded-md bg-white p-3">
                        <div className="flex flex-row items-center justify-between pr-20">
                            <p className="font-bold text-lg pb-5"> {currContent[0].order}: {currContent[0].title} </p>
                            <p className="font-bold text-lg pb-5"> <span className="text-purple-600"> {XPData.xp_earned} </span>  XP </p>
                        </div>
                        <div className="rounded-md p-1 w-full border border-hackbio-green-light h-full grid grid-cols-2 gap-5">
                            {/**Editor */}
                            <div className="w-full items-center border">
                                <div className="rounded-t-md border border-hackbio-green-light p-2 bg-zinc-700 flex flex-row w-full justify-between">
                                    <select 
                                        value={codingLanguage}
                                        onChange={(e) => setCodingLanguage(e.target.value)}
                                        className="px-2 border border-zinc-300 rounded-md focus:outline-none ring-1 ring-hackbio-green focus:ring-2 text-sm focus:ring-hackbio-green font-bold"
                                    >
                                        <option value="python">Python</option>
                                        <option value="r">R</option>
                                        <option value="bash">Bash</option>
                                    </select>
                                    <div>
                                        <button className="bg-hackbio-green text-white px-4 py-1 rounded-md hover:text-hackbio-green hover:bg-white text-sm" 
                                            onClick={() => {
                                                if (codingLanguage === "python") {
                                                    handleRunPythonCode();
                                                } else if (codingLanguage === "r") {
                                                    handleRunRCode();
                                                } else if (codingLanguage === "bash") {
                                                    handleRunBashCode();
                                                }
                                            }}>
                                                {isLoading? <LoadingIndicator />: 'Run Code'}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                <Editor className="w-full h-[300px] border-hackbio-green-light border rounded" defaultLanguage={codingLanguage} theme='hc-black' defaultValue="#start coding... " onChange={handleEditorChange} />
                                </div>
                                <div className=" flex flex-row w-full items-center justify-between text-sm">
                                    <div className=""> <button className="bg-hackbio-green text-white px-4 py-2 rounded-md hover:bg-green-200 hover:text-hackbio-green " onClick={handleCodingHint}> {isLoading? <LoadingIndicator/>: `🧠 Ask AI`}</button> </div> 
                                    <div className=""> <button className="bg-hackbio-green text-white px-4 py-2 rounded-md hover:bg-green-200 hover:text-hackbio-green " onClick={handleSubmit}> {isLoading? <LoadingIndicator/>:`🚀 Submit `}</button> </div> 
                                </div>
                            </div>
                            {/**Task */}
                            <div className="rounded-sm border border-hackbio-green-light overflow-auto max-h-96 ">
                                <p className="font-bold text-sm px-5 py-2">Tasks Description</p>
                                <p className="text-sm leading-5 text-justify prose prose-lg max-w-none px-5"> <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{currContent[0].coding_content}</Markdown> </p>
                            </div>
                            {/**Terminal */}
                            <div className="h-full">
                                <div className="font-mono text-sm bg-gray-900 border h-full rounded-md">
                                    {/* Tabs */}
                                    <div className="flex w-full bg-zinc-700 text-white rounded-t-md">
                                        <button
                                            className={`px-4 py-2 font-bold font-mono ${
                                                activeTab === "terminal"
                                                    ? "bg-gray-900"
                                                    : "bg-zinc-700 hover:bg-gray-800"
                                            }`}
                                            onClick={() => setActiveTab("terminal")}
                                        >
                                            Terminal Output
                                        </button>
                                        <button
                                            className={`px-4 py-2 font-bold font-mono ${
                                                activeTab === "console"
                                                    ? "bg-gray-900"
                                                    : "bg-zinc-700 hover:bg-gray-800"
                                            }`}
                                            onClick={() => setActiveTab("console")}
                                        >
                                            BASh Output
                                        </button>
                                        <button
                                            className={`px-4 py-2 font-bold font-mono ${
                                                activeTab === "explorer"
                                                    ? "bg-gray-900"
                                                    : "bg-zinc-700 hover:bg-gray-800"
                                            }`}
                                            onClick={() => setActiveTab("explorer")}
                                        >
                                            File Explorer
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="w-full bg-gray-900 text-white p-3 overflow-x-auto">
                                        {activeTab === "terminal" && (
                                            <div>
                                                {fileUrl === "" ? (
                                                    <p>No terminal output available.</p>
                                                ) : (
                                                    <TextFileViewer fileUrl={fileUrl} />
                                                )}
                                            </div>
                                        )}
                                        {activeTab === "console" && (
                                            <div>
                                                
                                                <pre className="text-white text-xs h-full overflow-auto font-mono whitespace-pre-wrap">
                                                    {output}
                                                </pre>
                                            </div>

                                        )}
                                        {activeTab === "explorer" && (
                                            <div>
                                                
                                                <pre className="text-white text-xs h-full overflow-auto font-mono whitespace-pre-wrap">
                                                    
                                                </pre>
                                            </div>

                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/**Plot output */}
                            <div className=" h-full"> 
                                <div className="font-mono text-sm bg-white  border h-full rounded-md"> <p className="w-full pt-5 font-bold font-mono bg-zinc-700 text-white rounded-t-md px-3">Plot Output</p> {plot && <img src={`data:image/png;base64,${plot}`} alt="Plot" className="w-full object-contain" />} </div>
                            </div>
                            

                        </div>
                        <button className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white w-fit' onClick={handleMarkAsComplete}> Mark as Completed  ✅ </button> 
                        <p className="font-mono animate-bounce"> { markingStatus } </p>
                      </div>
                      
                  </div>
              </div>
              
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full bg-zinc-100'>
            <div className="w-full">
                <PlatformNavBar />  
            </div>

            <div className="pt-10 flex flex-col gap-10 items-start justify-start w-full h-full">
                <div className="flex flex-row  w-full items-center justify-center">
                    <div className="px-5 py-2 border h-full font-bold text-xl bg-white">🔙</div>
                    <Link to={'/dashboard'}> <div className="flex gap-5 border px-3 py-2  bg-white font-bold items-center text-lg">  Table of content </div></Link>
                    <div className="px-5 py-2 border h-full font-bold text-xl bg-white">→</div>
                </div>
                      
                      
                <div className="w-full flex flex-col gap-5 border border-hackbio-green-light max-h-fit h-fit rounded-md bg-white p-5">
                    <div className="flex flex-row items-center justify-between w-full">
                        <p className="font-bold text-lg "> {currContent[0].order}: {currContent[0].title} </p>
                        <p className="font-bold text-lg "> <span className="text-purple-600"> {XPData.xp_earned} </span> XP </p>
                    </div>
                    <p className="text-red-500 text-sm">⚠️ For optimal experience, please use a PC.</p>
                    <div className="rounded-md w-full border border-hackbio-green-light h-full grid grid-cols-1 gap-10">
                        {/**Editor */}
                        <div className="w-full items-center border">
                            <div className="rounded-t-md border border-hackbio-green-light p-2 bg-zinc-700 flex flex-row w-full justify-between">
                                <select 
                                    value={codingLanguage}
                                    onChange={(e) => setCodingLanguage(e.target.value)}
                                    className="px-2 border border-zinc-300 rounded-md focus:outline-none ring-1 ring-hackbio-green focus:ring-2 text-sm focus:ring-hackbio-green font-bold"
                                >
                                    <option value="python">Python</option>
                                    <option value="r">R</option>
                                </select>
                                <div>
                                    <button className="bg-hackbio-green text-white px-4 py-1 rounded-md hover:text-hackbio-green hover:bg-white text-sm" 
                                            onClick={() => {
                                                if (codingLanguage === "python") {
                                                    handleRunPythonCode();
                                                } else if (codingLanguage === "r") {
                                                    handleRunRCode();
                                                } else if (codingLanguage === "bash") {
                                                    handleRunBashCode();
                                                }
                                            }}>
                                                {isLoading? <LoadingIndicator />: 'Run Code'}
                                        </button>                                </div>
                            </div>
                            <div>
                            <Editor className="w-full h-[400px] border-hackbio-green-light border rounded" defaultLanguage={codingLanguage} theme='hc-black' defaultValue="#start coding... " onChange={handleEditorChange} />
                            </div>
                            <div className=" flex flex-row w-full items-center justify-between text-sm">
                                <div className=""> <button className="bg-hackbio-green text-white px-4 py-2 rounded-md hover:bg-green-200 hover:text-hackbio-green " onClick={handleCodingHint}> {isLoading? <LoadingIndicator/>: `🧠 Ask AI`}</button> </div> 
                                <div className=""> <button className="bg-hackbio-green text-white px-4 py-2 rounded-md hover:bg-green-200 hover:text-hackbio-green " onClick={handleSubmit}> {isLoading? <LoadingIndicator/>:`🚀 Submit `}</button> </div> 
                            </div>
                        </div>
                        {/**Plot output */}
                        <div className=" h-full"> 
                            <div className="font-mono text-sm bg-white  border h-full rounded-md"> <p className="w-full pt-5 font-bold font-mono bg-zinc-700 text-white rounded-t-md px-3">Plot Output</p> {plot && <img src={`data:image/png;base64,${plot}`} alt="Plot" className="w-full h-full object-contain" />} </div>
                        </div>
                        {/**Terminal */}
                        <div className="h-full">
                            <div className="font-mono text-sm bg-gray-900 border h-full rounded-md overflow-auto">
                                <p className="w-full pt-5 font-bold font-mono bg-zinc-700 text-white rounded-t-md px-3">
                                    Terminal Output
                                </p>
                                <div className="w-full bg-gray-900 text-white h-full p-3  overflow-x-auto">
                                    {fileUrl === "" ? "" : <TextFileViewer fileUrl={fileUrl} />}
                                </div>
                            </div>
                        </div>
                        {/**Task */}
                        <div className="rounded-sm border border-hackbio-green-light overflow-hidden max-h-1/3">
                            <p className="font-bold text-sm px-5 py-2">Tasks Description</p>
                            <p className="text-sm leading-5 text-justify prose prose-lg max-w-none px-5"> <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{currContent[0].coding_content}</Markdown> </p>
                        </div>

                    </div>
                    <button className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white w-fit' onClick={handleMarkAsComplete}> Mark as Completed  ✅ </button> 
                    <p className="font-mono animate-bounce"> { markingStatus } </p>
                    </div>
                      
                </div>
          </section>
        
  
      </main>
  );
}

export default BootcampContent;
