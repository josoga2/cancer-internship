import PlatformNavBar from "./PlatformNavBar";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { InternshipModulesContext } from "../../Context/InternshipModulesContext";
import { InternshipContext } from "../../Context/InternshipContext";
import { InternshipContentContext } from "../../Context/InternshipContentContext";
import { XPContext } from "../../Context/XPContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN, SERVER_URL } from "../../constants/constants";
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



const CertificateContent = () => {

    const [ officialName, setOfficialName ] = useState("")
    const [ internshipTitle, setInternshipTitle ] = useState("")
    const [ certificate, setCertificate] = useState('')
    const { internshipContentData } = useContext(InternshipContentContext)
    const { internshipModulesData } = useContext(InternshipModulesContext)
    const { internshipData } = useContext(InternshipContext)
    const { XPData } = useContext(XPContext)
    const { internshipId, moduleID, contentId } = useParams()
    const [ isLoading, setIsLoading ] = useState(false)
    //console.log(XPData.xp_earned)

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
    //console.log(thisInternship.internship_title)
    //console.log(XPData.is_completed)
    

    const handleTextEditorChange = (event) => {
      setOfficialName(event.target.value); // Get value from the input field
      setInternshipTitle(thisInternship.internship_title); // Update internship title as before
    };

    const certificateGenerationHandler = async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      console.log('Form submitted'); // Add your API request logic here
    
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
    
        // Make the API call to generate the certificate
        const response = await axios.post(
          `${SERVER_URL}/api/generate-certificate/`, 
          { name: officialName, course_title: internshipTitle }, 
          { 
            headers: { 
              'Authorization': `Bearer ${token}` 
            },
            responseType: 'blob' // Specify the response type as 'blob' to handle the PDF file
          }
        );
    
        // Create a link element to trigger the download
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(response.data); // Create a URL for the PDF Blob
        link.href = url;
        link.download = `${officialName}_certificate.pdf`; // Set the filename for the download
    
        // Trigger the download by clicking the link programmatically
        link.click();
    
        // Clean up the created object URL
        window.URL.revokeObjectURL(url);
    
        console.log('Certificate generated and download initiated');
      } catch (error) {
        console.error('Error generating certificate:', error);
        setCertificate(error.response?.data?.error || "An error occurred");
      }

      
    };
    
    const updateCertification = async() => {
      //console.log(code);
      try {
          const token = localStorage.getItem(ACCESS_TOKEN);
          const response = await axios.post(`${SERVER_URL}/api/progress/certification/`, 
              { internship_id: internshipId, content_id: contentId },
              { headers: { 'Authorization': `Bearer ${token}` }}
          );
          console.log(response.data)
      } catch (error) {
          console.log(error.response?.data?.error || "An error occurred");
      }

    }

    const handleSubmit = async (event) => {
      setIsLoading(true)
      event.preventDefault(); // Prevent the default form submission behavior
      
      // Run the first function to generate the certificate
      await certificateGenerationHandler(event);
    
      // Run the second function to update certification
      await updateCertification();
      setIsLoading(false)
    };
    

    //console.log(officialName)

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
          <section className="hidden md:flex md:flex-col md:max-w-full md:m-auto md:items-center md:justify-between">
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
                                <Link to={`/internships/${content.internship}/TOC/${content.module}/${content.content_type}/${content.id}`}> <li className="font-medium text-sm w-full hover:font-medium pl-2 flex flex-row items-center gap-3 py-1 "> {<ContentRenderer contentType={content.content_type} />}{content.order}. {content.title} </li></Link>
                            ))}
                            </div>
                        ))}
                        <Link to={'/dashboard'}> <div className="flex flex-row gap-5 font-bold items-center text-lg">  Dashboard </div></Link>
                    </div>
                    <div className="w-full flex flex-col gap-5 border border-hackbio-green-light max-h-fit h-fit rounded-md bg-white p-5">
                        <p className="font-bold text-lg"> {currContent[0].order}: {currContent[0].title} </p>
                        <p className="text-red-600">⚠️You can only generate your certificate once. Please enter your details carefully</p>
                        <p className="text-red-600">⚠️Once you generate the certificate, please save it to your local computer. </p>
                        <div className="rounded-md p-5 w-full border border-hackbio-green-light h-full">
                          <form className="flex flex-col gap-5" onSubmit={XPData.is_completed? `#`: handleSubmit}>
                            <label for="fname" className="font-semibold">Full Official Name:</label>
                            <input type="text" id="fname" name="fname" className="border-2  rounded-md px-3 py-1 w-full" onChange={handleTextEditorChange}/>
                            <button
                              className={`font-bold border rounded px-3 py-2 bg-gray-400 ${
                                XPData.is_completed ? 'hover:bg-gray-400' : 'hover:bg-hackbio-green'
                              }`}
                              type="button" // Use "button" to prevent form submission by default
                              onClick={(e) => {
                                if (!XPData.is_completed) {
                                  e.preventDefault(); // Only allow the action if `is_completed` is false
                                  console.log('Submit action triggered'); // Replace with actual submission logic
                                } else {
                                  console.log('Button disabled, no action performed');
                                }
                              }}
                            >
                              {isLoading? <LoadingIndicator />: 'Submit'}
                            </button>
                          </form>
                        </div>
                        <Link to={'/internships/ThankYou/'} className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white w-fit'> Finish Your Internship 🏆 </Link> 
                    </div>
                </div>
                </div>
              
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
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
                        <p className="font-bold text-lg"> {currContent[0].order}: {currContent[0].title} </p>
                        <p className="text-red-600">⚠️You can only generate your certificate once. Please enter your details carefully</p>
                        <p className="text-red-600">⚠️Once you generate the certificate, please save it to your local computer. </p>
                        <div className="rounded-md  w-full  h-full">
                          <form className="flex flex-col gap-5" onSubmit={XPData.is_completed? `#`: handleSubmit}>
                            <label for="fname" className="font-semibold">Full Official Name:</label>
                            <input type="text" id="fname" name="fname" className="border-2  rounded-md px-3 py-1 w-full" onChange={handleTextEditorChange}/>
                            <button
                              className={`font-bold border rounded px-3 py-2 bg-gray-400 ${
                                XPData.is_completed ? 'hover:bg-gray-400' : 'hover:bg-hackbio-green'
                              }`}
                              type="button" // Use "button" to prevent form submission by default
                              onClick={(e) => {
                                if (!XPData.is_completed) {
                                  e.preventDefault(); // Only allow the action if `is_completed` is false
                                  console.log('Submit action triggered'); // Replace with actual submission logic
                                } else {
                                  console.log('Button disabled, no action performed');
                                }
                              }}
                            >
                              {isLoading? <LoadingIndicator />: 'Submit'}
                            </button>
                          </form>
                        </div>
                        <Link to={'/internships/ThankYou/'} className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white w-fit'> Finish Your Internship 🏆 </Link> 
                    </div>
                </div>

          </section>
        
  
      </main>
  );
}

export default CertificateContent;
