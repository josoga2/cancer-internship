import PlatformNavBar from "./PlatformNavBar";
import { FiGrid, FiTerminal } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { InternshipModulesContext } from "../../Context/InternshipModulesContext";
import { InternshipContext } from "../../Context/InternshipContext";
import { InternshipContentContext } from "../../Context/InternshipContentContext";


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

const TOC = () => {

    const { internshipContentData } = useContext(InternshipContentContext)
    const { internshipModulesData } = useContext(InternshipModulesContext)
    const { internshipData } = useContext(InternshipContext)
    const { internshipId } = useParams()
    const INT_ID = parseInt(internshipId, 10);
    //console.log()
    const currInternship = internshipData[INT_ID-1]
    const currModule = internshipModulesData.filter((thisModule)=>(thisModule.internship === INT_ID))
    //console.log(currInternship)
    const currContent = internshipContentData.filter((thisContent)=>(thisContent.internship === INT_ID ))
    //console.log(currContent)

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
          <section className="hidden md:flex md:max-w-full md:m-auto md:items-center md:justify-between ">

                <div className="w-full bg-zinc-100 h-full pb-24">
                    <div className="w-full py-2 bg-hackbio-green-light px-5">
                        <PlatformNavBar />
                    </div>
                    <div className="pt-10 px-5 flex flex-row gap-10">
                        <div className="flex flex-col gap-5 bg-white p-10 h-fit w-fit rounded-md">
                            <Link to={'/dashboard'}> <div className="flex flex-row gap-5 font-bold items-center text-lg"> <FiGrid /> Dashboard </div></Link>
                            <div className="flex flex-row gap-5 font-bold items-center text-lg"> <FiTerminal /> Playground </div>
                        </div>
                        <div className="w-full flex flex-col gap-5">
                            <p className="font-bold py-2 text-lg">{currInternship.internship_title}</p>
                            {currModule.map((mod)=>(
                                <div key={mod.id} className="rounded-md border border-hackbio-green-light w-full p-5 bg-white shadow-sm">
                                    <p className="font-semibold pb-3"> {mod.title} </p>
                                    <hr className="border-hackbio-green-light pb-3"/>
                                    <div>
                                        {(currContent.filter((content_mod)=>(content_mod.module === mod.id))).map((content)=>(
                                            <Link to={`/internships/${content.internship}/TOC/${content.module}/${content.content_type}/${content.id}`}> <li className="font-medium text-base w-full hover:font-medium pl-2 flex flex-row items-center gap-3 pb-2 "> {<ContentRenderer contentType={content.content_type} />} {content.title} </li></Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            
                            
                        </div>
                    </div>
                </div>
              
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
            <div className="w-full">
                <PlatformNavBar />  
            </div>
            <div className="pt-10 px-5 flex flex-col gap-10">
                        <div className="flex flex-row gap-5 bg-white  h-fit w-fit rounded-md">
                            <Link to={'/dashboard'}> <div className="flex flex-row gap-5 font-bold items-center text-lg rounded-md border border-hb-black px-3 py-2"> <span className="text-hackbio-green"> <FiGrid /> </span> Dashboard </div></Link>
                            <div className="flex flex-row font-bold items-center text-lg rounded-md border border-hb-black px-3 py-2"> <span className="text-hackbio-green"> <FiTerminal /> </span> Playground </div>
                        </div>
                        <div className="w-full flex flex-col gap-5">
                            <p className="font-bold py-2 text-lg">{currInternship.internship_title}</p>
                            {currModule.map((mod)=>(
                                <div key={mod.id} className="rounded-md border border-hackbio-green-light w-full p-5 bg-white shadow-sm">
                                    <p className="font-semibold pb-3"> {mod.title} </p>
                                    <hr className="border-hackbio-green-light pb-3"/>
                                    <div>
                                        {(currContent.filter((content_mod)=>(content_mod.module === mod.id))).map((content)=>(
                                            <Link to={`/internships/${content.internship}/TOC/${content.module}/${content.content_type}/${content.id}`}> <li className="font-medium text-base w-full hover:font-medium pl-2 flex flex-row items-center gap-3 pb-2 "> {<ContentRenderer contentType={content.content_type} />} {content.title} </li></Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            
                            
                        </div>
                    </div>
          </section>

          
        
  
      </main>
  );
}

export default TOC;
