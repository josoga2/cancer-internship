import PlatformNavBar from "./PlatformNavBar";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { InternshipModulesContext } from "../../Context/InternshipModulesContext";
import { InternshipContext } from "../../Context/InternshipContext";
import { InternshipContentContext } from "../../Context/InternshipContentContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN, SERVER_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import soundFile from './../../Assets/level_up.mp3';
import { XPContext } from "../../Context/XPContext";




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



const VideoContent = () => {
    const [ markingStatus, setMarkingStatus ] = useState("")
    const { internshipContentData } = useContext(InternshipContentContext)
    const { internshipModulesData } = useContext(InternshipModulesContext)
    const { internshipData } = useContext(InternshipContext)
    const { internshipId, moduleID, contentId } = useParams()
    const navigate = useNavigate();
    const { XPData } = useContext(XPContext)

    //convert values to integers
    const INT_ID = parseInt(internshipId, 10);
    const MOD_ID = parseInt(moduleID, 10);
    const CON_ID = parseInt(contentId, 10);
    //console.log(contentId)
    const currInternship = internshipContentData.filter((thisInternship)=>(thisInternship.internship === INT_ID))
    //console.log(internshipContentData)
    const currModule = currInternship.filter((thisModule)=>(thisModule.module === MOD_ID))
    const currContent = currModule.filter((thisContent)=>(thisContent.id === CON_ID))
    //console.log(currContent[0].xp)
    const thisInternship = internshipData[INT_ID-1]
    const allModules = internshipModulesData.filter((thisModule)=>(thisModule.internship === INT_ID))
    const allContents = internshipContentData.filter((thisContent)=>(thisContent.internship === INT_ID ))

    //find the next internship
    const currIndex = allContents.findIndex((item) => (item.id === CON_ID));
    const nextContent = currIndex + 1 < allContents.length ? allContents[currIndex + 1] : null;
    console.log(nextContent)
    
    const handleMarkAsSubmit = async () => {
     
      try {
          const token = localStorage.getItem(ACCESS_TOKEN);
          await axios.post(`${SERVER_URL}/api/progress/mark-complete/`, { internship_id:INT_ID, content_id:CON_ID }, { headers: { 'Authorization': `Bearer ${token}` }});
          setMarkingStatus('Completed, 2 XP earned! Unto the next')
          const audio = new Audio(soundFile)
          audio.play();

          setTimeout(() => {
            navigate(`/internships/${nextContent.internship}/TOC/${nextContent.module}/${nextContent.content_type}/${nextContent.id}`); // Adjust this to your next page's route
          }, 2000);

      }catch (error) {
          console.log(error.response?.data?.error || "An error occurred");
      }

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

  return (
    <main>
          {/*  Desktop */}
          <section className="hidden md:flex flex-col md:max-w-full md:m-auto md:items-center md:justify-between">
            <div className="w-full bg-zinc-100 min-h-full">
                  <div className="w-full py-2 bg-hackbio-green-light px-5">
                      <PlatformNavBar /> 
                  </div>
                  
                  <div className="pt-10 px-5 flex flex-row gap-10 items-start justify-start w-full h-full">
                      <div className="flex flex-col gap-5 bg-white p-10 h-fit w-fit rounded-md max-h-screen overflow-scroll">
                          <p>Table of Contents</p>
                          {allModules.map((mod)=>(
                              <div className="w-full max-h-screen">
                              <p className="font-semibold pb-2"> {mod.title} </p>
                              {(allContents.filter((content_mod)=>(content_mod.module === mod.id))).map((content)=>(
                                  <Link to={`/internships/${content.internship}/TOC/${content.module}/${content.content_type}/${content.id}`}> <li className="font-medium text-sm w-full hover:font-medium pl-2 flex flex-row items-center gap-3 py-1 "> {<ContentRenderer contentType={content.content_type} />} {content.order}. {content.title} </li></Link>
                              ))}
                              </div>
                          ))}
                          <Link to={'/dashboard'}> <div className="flex flex-row gap-5 font-bold items-center text-lg">  Dashboard </div></Link>
                      </div>

                      <div className="w-full flex flex-col gap-5 border border-hackbio-green-light max-h-fit h-fit rounded-md bg-white p-5">
                        
                        <div className="w-full border-hackbio-green-light h-full">
                          <div className="flex flex-row items-center justify-between pr-20">
                            <p className="font-bold text-lg pb-5"> {currContent[0].order}: {currContent[0].title} </p>
                            <p className="font-bold text-lg pb-5"> <span className="text-purple-600"> {XPData.xp_earned} </span> /{thisInternship.total_xp_available} XP </p>
                          </div>

                          <iframe  height="250" title='sequencer' className="rounded-lg min-h-96 border-hackbio-yellow border-4 w-2/3" src={ currContent[0].video_url }  ></iframe>
                        </div>
                        <button className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white w-fit' onClick={handleMarkAsSubmit}> Mark as Completed  ✅ </button> 
                        <p className="font-mono animate-bounce"> { markingStatus } </p>
                      </div>
                      
                  </div>
              </div>
              
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full bg-zinc-100'>
            

            <div className="w-full bg-zinc-100 min-h-full">
                  <div className="w-full py-2 bg-hackbio-green-light px-5">
                      <PlatformNavBar /> 
                  </div>
                  
                  <div className="pt-10 flex flex-col gap-10 items-start justify-start w-full h-full">
                      <div className="flex flex-row  w-full items-center justify-center">
                        <div className="flex flex-row  w-full items-center justify-center">
                          <div className="px-5 py-2 border h-full font-bold text-xl bg-white">🔙</div>
                          <Link to={'/dashboard'}> <div className="flex gap-5 border px-3 py-2  bg-white font-bold items-center text-lg">  Table of content </div></Link>
                          <div className="px-5 py-2 border h-full font-bold text-xl bg-white">→</div>
                        </div>
                      </div>

                      <div className="w-full flex flex-col gap-5 border border-hackbio-green-light max-h-fit h-fit rounded-md bg-white p-5">
                        
                        <div className="w-full border-hackbio-green-light h-full">
                          <div className="flex flex-row items-center justify-between pb-5">
                            <p className="font-bold text-lg "> {currContent[0].order}: {currContent[0].title} </p>
                            <p className="font-bold text-lg "> <span className="text-purple-600"> {XPData.xp_earned} </span> /{thisInternship.total_xp_available} XP </p>
                          </div>
                          <iframe  height="250" title='sequencer' className="rounded-lg  w-full" src={ currContent[0].video_url }  ></iframe>
                        </div>
                        <button className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white w-fit' onClick={handleMarkAsSubmit}> Mark as Completed  ✅ </button> 
                        <p className="font-mono animate-bounce"> { markingStatus } </p>
                      </div>
                      
                  </div>
              </div>
          </section>
        
  
      </main>
  );
}

export default VideoContent;
