import { BsCodeSlash } from "react-icons/bs";
import { BsCapsulePill } from "react-icons/bs";
import { BsBarChartLine } from "react-icons/bs";
import { BsBuildingAdd } from "react-icons/bs";
import { FaDna } from "react-icons/fa";



const LearningTracks = [
    {
      "title": "Coding",
      "index": 1,
      "description": "Learn to write code for biological data analysis, including working with DNA sequences, protein structures, and more.",
      "svg": (
        <BsCodeSlash/>

      )
    },
    {
      "title": "Drug Development",
      "index": 2,
      "description": "Explore the computational approaches to drug discovery, including target identification, molecular docking, and simulations.",
      "svg": (
        <BsCapsulePill/>
      )
    },
    {
      "title": "Omics",
      "index": 3,
      "description": "Unlock insights from genomics, transcriptomics, proteomics, and metabolomics data to understand complex biological systems.",
      "svg": (
        <FaDna />

      )
    },
    {
      "title": "Data/AI",
      "index": 4,
      "description": "Apply data science and artificial intelligence to solve biological problems, from image analysis to predictive modeling.",
      "svg": (
        <BsBarChartLine />
      )
    },
    {
      "title": "Public Health",
      "index": 5,
      "description": "Learn to analyze and interpret public health data, develop interventions, and model disease outbreaks.",
      "svg": (
        <BsBuildingAdd />
      )
    }
  ];
  

const Features = () => {
    
  return (
    <main className=' bg-hb-bg-green py-10'>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  px-5">
              <div className='flex flex-col gap-5 items-center w-full'>
                <p className='font-bold text-xl'>Featured Biostacks</p>
                <p>Leave disjointed tutorial videos, follow a pathway that works in 5 stages</p>
                <div className='grid grid-cols-3 max-w-full mx-10 justify-between items-center px-5'>
                    {LearningTracks.map((lt)=>(
                        <div className='px-10 py-5' key={lt.index}>
                            <div className='border-hackbio-green border p-3 rounded-t-md font-bold text-2xl text-hackbio-green bg-green-50 h-12'> {lt.svg} </div>
                            <div className='border-hackbio-green border p-2 rounded-b-md font-bold text-sm bg-hackbio-green-light h-48'>
                                <p className='text-start flex flex-col py-2'>{lt.title}</p>
                                <p className='text-start flex flex-col font-normal'>{lt.description}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>

              </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
            <div className='flex flex-col gap-5 items-center w-full'>
                <p className='font-bold text-xl'>Featured Learning Track</p>
                <p className='text-center'>Leave disjointed tutorial videos, follow a pathway that works in 5 stages</p>
                <div className='grid grid-cols-1 max-w-full mx-2 justify-between items-center px-5'>
                    {LearningTracks.map((lt)=>(
                            <div className='px-10 py-5' key={lt.index}>
                                <div className='border-hackbio-green border p-3 rounded-t-md font-bold text-xl bg-green-50 text-hackbio-green'> {lt.svg} </div>
                                <div className='border-hackbio-green border p-2 rounded-b-md font-bold text-sm bg-hackbio-green-light'>
                                    <p className='text-start flex flex-col py-2'>{lt.title}</p>
                                    <p className='text-start flex flex-col font-normal'>{lt.description}</p>
                                </div>
                                
                            </div>
                        ))}
                </div>

              </div>
          </section>
        
  
      </main>
  );
}

export default Features;
