const paths = [
    {
        "path_number": 1,
        "path_title": "Theoretical Foundations",
        "path_description": "Catch up on the basics including cell and molecular biology as well as chemistry (optional) that frame key research questions."
    },
    {
        "path_number": 2,
        "path_title": "Literature Review",
        "path_description": "Conduct a deep dive and breakdown of a peer reviewed bioinformatics paper from a critical thinking perspective"
    },
    {
        "path_number": 3,
        "path_title": "Coding and Visualization",
        "path_description": "Dive into core coding, algorithm development, functions, analytics and visualization."
    },
    {
        "path_number": 4,
        "path_title": "Pipeline Implementation",
        "path_description": "Start developing full end to end pipelines that solve analytical problems just like a pro."
    },
    {
        "path_number": 5,
        "path_title": "Capstone Projects",
        "path_description": "Cap it off with a solid publication worthy project. Complete analysis, from start to finish on a real biology case study project."
    }
]

// Subset the first 4 items
const firstFourPaths = paths.slice(0, 4);

const LearningPathway = () => {
  return (
    <main className=' bg-hb-bg-green py-10'>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-5">
              <div className='flex flex-col gap-5 items-center w-full'>
                <p className='font-bold text-xl'>Your Learning Pathways</p>
                <p>Leave disjointed tutorial videos, follow a pathway that works in 5 stages</p>
                <div className="w-fit flex flex-row items-center justify-around mx-40">
                    <div className='grid grid-cols-2 w-2/3 '> {/* Reduced horizontal margin */}
                        {firstFourPaths.map((path)=>(
                            <div className='px-5 py-2'> {/* Reduced horizontal and vertical padding */}
                                <div className='border-hackbio-green border p-2 rounded-t-md font-bold text-xl bg-green-50'><p className='text-start flex flex-col '>Path {path.path_number}</p></div>
                                <div className='border-hackbio-green border p-2 rounded-b-md font-bold text-sm bg-hackbio-green-light'>
                                    <p className='text-start flex flex-col py-1'>{ path.path_title }</p>
                                    <p className='text-start flex flex-col font-normal'>{ path.path_description }</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='px-5 py-2 w-1/3 h-fit '> {/* Reduced horizontal and vertical padding */}
                        <div className='border-hackbio-green border p-2 rounded-t-md font-bold text-xl bg-green-50'><p className='text-start flex flex-col '>{'Path 5'}</p></div>
                        <div className='border-hackbio-green border p-2 rounded-b-md font-bold text-sm bg-hackbio-green-light'>
                            <p className='text-start flex flex-col py-1'>Capstone Project</p>
                            <p className='text-start flex flex-col font-normal'>Cap it off with a solid publication worthy project. Complete analysis, from start to finish on a real biology case study project.</p>
                        </div>
                    </div>
                </div>

              </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
            <div className='flex flex-col gap-5 items-center w-full'>
                <p className='font-bold text-xl'>Your Learning Pathway</p>
                <p className='text-center'>Leave disjointed tutorial videos, follow a pathway that works in 5 stages</p>
                <div className='grid grid-cols-1 max-w-full mx-2 justify-between items-center px-5'>
                    {paths.map((path)=>(
                            <div className='px-5 py-2'> {/* Reduced horizontal and vertical padding */}
                                <div className='border-hackbio-green border p-2 rounded-t-md font-bold text-xl bg-green-50'><p className='text-start flex flex-col '>{path.path_number}</p></div>
                                <div className='border-hackbio-green border p-2 rounded-b-md font-bold text-sm bg-hackbio-green-light'>
                                    <p className='text-start flex flex-col py-1'>{ path.path_title }</p>
                                    <p className='text-start flex flex-col font-normal'>{ path.path_description }</p>
                                </div>
                            </div>
                        ))}
                </div>

              </div>
          </section>
        
  
      </main>
  );
}

export default LearningPathway;
