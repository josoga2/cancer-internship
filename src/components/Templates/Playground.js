import PlatformNavBar from "./PlatformNavBar";
import { useContext } from "react";
import { PlaygroundContext } from "../../Context/PlaygroundContext";
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
import LoadingIndicator from "../LoadingIndicator";
import { FiGrid, FiTerminal } from "react-icons/fi";




const Playground = () => {
    const [ markingStatus, setMarkingStatus ] = useState("")
    const navigate = useNavigate();

    const [code, setCode] = useState("");
    const [codingLanguage, setCodingLanguage] = useState("r");
    const [output, setOutput] = useState("");
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [plot, setPlot] = useState(null);
    const [task, setTask] = useState("");
    const [fileUrl, setFileUrl] = useState("")
    const { playgroundData } = useContext(PlaygroundContext)


    const randomNum = Math.floor(Math.random() * playgroundData.length)

    console.log(task)
    
    const handleMarkAsComplete = async () => {
        setIsLoading(true)
      try {
          setMarkingStatus('Completed, 2 XP earned! Reload to update XP')
          const audio = new Audio(soundFile)
          audio.play();

          setTimeout(() => {
            navigate(`/internships/playground`); // Adjust this to your next page's route
          }, 1000);
      }catch (error) {
          console.log(error.response?.data?.error || "An error occurred");
      }
        setIsLoading(false)
    }

    if (playgroundData && playgroundData.length === 0) {
        return <div>Loading123...</div>; 
    }

    const handleEditorChange = (value) => {
        setCode(value);
        setTask(task.task);
    }

    const handleRunPythonCode = async() => {
        setIsLoading(true)
        //console.log(code);
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const response = await axios.post(`${SERVER_URL}/api/run-code/`, 
                { code },
                { headers: { 'Authorization': `Bearer ${token}` }}
            );
            setOutput(response.data.output || "No output");
            setFileUrl(`${SERVER_URL}/api/outputs/output.txt`)
            setPlot(response.data.plot || null);
        } catch (error) {
            setOutput(error.response?.data?.error || "An error occurred");
        }
        setIsLoading(false)

    }

    const handleRunRCode = async() => {
        //console.log(code);
        setIsLoading(true)
        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            const response = await axios.post(`${SERVER_URL}/api/run-r-code/`, { code }, { headers: { 'Authorization': `Bearer ${token}` }});
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
        }catch (error) {
            setOutput(error.response?.data?.error || "An error occurred");
        }
        setIsLoading(false)

    }
    //console.log(score)

    const handleSubmit = async () => {
        
        // Run the first function to generate the certificate
        await handleCodingSubmission();
        //console.log(score)
        // Run the second function to update certification
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
                  
                  <div className="pt-10 px-5 flex flex-row gap-10 items-start justify-start w-full h-full">
                    <div className="flex flex-col gap-5 bg-white p-10 h-fit w-fit rounded-md">
                        <Link to={'/dashboard'}> <div className="flex flex-row gap-5 font-bold items-center text-lg"> <FiGrid /> Dashboard </div></Link>
                        <div className="flex flex-row gap-5 font-bold items-center text-lg"> <FiTerminal /> Playground  </div>
                    </div>
                      
                      
                      <div className="w-full flex flex-col gap-5 border border-hackbio-green-light max-h-fit h-fit rounded-md bg-white p-5">
                        <div className="flex flex-row items-center justify-between pr-20">
                            <p className="font-bold text-lg pb-5"> Playground {task.id} </p>
                        </div>
                        <div className="rounded-md p-5 w-full border border-hackbio-green-light h-full grid grid-cols-2 gap-5">
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
                                        <button className="bg-hackbio-green text-white px-4 py-1 rounded-md hover:text-hackbio-green hover:bg-white text-sm" onClick={codingLanguage === "python" ? handleRunPythonCode : handleRunRCode}>{isLoading? <LoadingIndicator />: 'Run Code'}</button>
                                    </div>
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
                                { console.log(playgroundData[randomNum].task) }
                                {// eslint-disable-next-line 
                                }
                                <p className="text-sm leading-5 text-justify prose prose-lg max-w-none px-5"> <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>  `String(randomNum)` </Markdown> </p>
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
                        <p className="font-bold text-lg "> Playground Task: {task.id} </p>
                    </div>
                    <p className="text-red-500 text-sm">⚠️ For optimal rendering, please use a PC.</p>
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
                                    <button className="bg-hackbio-green text-white px-4 py-1 rounded-md hover:text-hackbio-green hover:bg-white text-sm" onClick={codingLanguage === "python" ? handleRunPythonCode : handleRunRCode}>{isLoading? <LoadingIndicator />: 'Run Code'}</button>
                                </div>
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
                            <p className="text-sm leading-5 text-justify prose prose-lg max-w-none px-5"> <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}> task.task </Markdown> </p>
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

export default Playground;
