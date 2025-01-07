
import { useContext } from "react";
import { InternshipContext } from '../Context/InternshipContext';
import { InternshipModulesContext } from "../Context/InternshipModulesContext";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const InternshipModules = () => {


  const { internshipId } = useParams();
  //console.log(internshipId)
  const INT_ID = parseInt(internshipId, 10);
  //const navigate = useNavigate();
  const { internshipData } = useContext(InternshipContext);
  const { internshipModulesData } = useContext(InternshipModulesContext)
  //console.log(internshipModulesData[1])
  const filteredInternshipModuleData = internshipModulesData.filter((modulesData)=> (modulesData.internship === INT_ID) )
  console.log(filteredInternshipModuleData)
  //console.log(internshipData[internshipId-1])
  if (!internshipData || internshipData.length === 0) {
    return <div>Loading...</div>; 
  }
  if (!internshipModulesData || internshipModulesData.length === 0) {
    return <div>Loading...</div>; 
  }


  return (
    <div>
      <main>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-5">
              <div>
                <div className='flex flex-col items-center justify-center w-full p-5'>
                <p className='text-xl font-bold text-center w-full'>Overview</p>
                    <div className='flex flex-col rounded-md w-full p-5 items-center justify-center '>
                    
                        <div className='flex flex-col items-start justify-start gap-5 w-2/3'>
                        {/*<iframe width="200" height="350" title='sequencer' className="rounded-lg border-hackbio-yellow border-4 w-full " src={ internshipData[internshipId-1].preview_video_url } ></iframe>*/}
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className="flex flex-col gap-10 items-center">
                                <div className="flex flex-col gap-5">
                                    <p className='text-justify'>{ internshipData[internshipId-1].overview }</p>
                                    <p>🔴 Starts on { internshipData[internshipId-1].internship_date }</p>

                                </div>
                                <div className="flex flex-col gap-2 w-1/2">
                                    {filteredInternshipModuleData.map((ind)=>(
                                        <div key={ind.id} className="flex flex-row items-center justify-between rounded-md border px-5 min-w-48 border-hackbio-yellow py-3 bg-yellow-100 font-extrabold"> <span>{ind.order}. {ind.title}</span> <span className="rounded-full border-gray-700 text-4xl w-fit">  </span> </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
          <div>
                <div className='flex flex-col items-center justify-center w-full p-5'>
                <p className='text-xl font-bold text-center w-full'>Overview</p>
                    <div className='flex flex-col rounded-md w-full gap-10 items-center justify-center '>
                    
                        <div className='flex flex-col  w-full'>
                            {/*<iframe  height="250" title='sequencer' className="rounded-lg border-hackbio-yellow border-4" src={ internshipData[internshipId-1].preview_video_url }  ></iframe>*/}
                        </div>
                        <div className='flex flex-col gap-5'>
                            <p className='font-semibold text-lg'>Overview</p>
                            <div className="gap-10 items-center w-full">
                                <div className="flex flex-col gap-5">
                                    <p className='text-justify w-full'>{ internshipData[internshipId-1].overview } </p>
                                    <p>🔴 Starts on { internshipData[internshipId-1].internship_date }</p>

                                </div>
                                <div className="flex flex-col gap-2 py-5">
                                    {filteredInternshipModuleData.map((ind)=>(
                                        <div key={ind.id} className="flex flex-row items-center justify-between rounded-md border px-5 py-2 border-hackbio-yellow bg-yellow-100 font-extrabold"> <span>{ind.order}. {ind.title}</span> <span className="rounded-full border-gray-700 text-4xl w-fit"> ⊕ </span> </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          </section>
        
  
      </main>
    </div>
  );
}

export default InternshipModules;
