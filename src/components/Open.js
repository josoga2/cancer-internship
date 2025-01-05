
import { useContext } from "react";
import { InternshipContext } from '../Context/InternshipContext';
import { Link } from "react-router-dom";

const Open = () => {
  const { internshipData } = useContext(InternshipContext);
  //console.log(internshipData)
  //internshipData.map((internship)=>(console.log(internship.id)))

  return (
    <main>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-5" id="open_internships">
              <div className="w-full items-center justify-center mx-10">
                <div className='flex flex-col items-center justify-center w-full p-5'>
                <p className='text-xl font-bold text-center w-full'> Internship Calendar</p>
                    <div className='flex flex-row pt-10  rounded-md w-full  p-5 gap-10 items-center justify-center '>
                       
                       {internshipData.filter((internship)=>internship.open_status).map((internship)=>(
                        <Link to={`internships/${internship.id}`} key={internship.id} className="rounded-md border border-hackbio-green max-w-64  shadow-md min-h-72 p-3 space-y-2 relative">
                          <div> <img alt="hackbio-course" className="rounded-t-md w-full" src="https://png.pngtree.com/thumb_back/fw800/background/20240924/pngtree-fascinating-abstract-background-with-backlit-green-liquid-perfect-for-science-and-image_16248041.jpg" /> </div>
                          <div> <p className="text-base font-bold">{internship.internship_title }</p> </div>
                          <div> <p className="text-sm ">{internship.summary}</p> </div>
                          <div> <p className="text-sm font-bold text-hackbio-green">{internship.internship_date}</p> </div>
                          <button className='font-semibold border-2 w-fit text-white text-xs absolute bottom-2  bg-hackbio-green border-hackbio-green px-2 py-2 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green'> Preview Module </button> 
                        </Link>
                        
                       ))}
                        
                    </div>
                </div>
              </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full' id="open_internships">
              <div className='items-center justify-center flex flex-col gap-5'>
                <p className='font-bold text-xl'>Open Internships</p>
                <div className=' p-2 flex flex-col items-start gap-5'>
                {internshipData.filter((internship)=>internship.open_status).map((internship)=>(
                        <Link to={`internships/${internship.id}`} key={internship.id} className="rounded-md border border-hackbio-green max-w-56 shadow-md min-h-64 p-2 space-y-2 relative">
                          <div> <img alt="hackbio-coding-course" className="rounded-t-md w-full" src="https://png.pngtree.com/thumb_back/fw800/background/20240924/pngtree-fascinating-abstract-background-with-backlit-green-liquid-perfect-for-science-and-image_16248041.jpg" /> </div>
                          <div> <p className="text-sm font-bold">{internship.internship_title }</p> </div>
                          <div> <p className="text-xs ">{internship.summary}</p> </div>
                          <button className='font-semibold border-2 w-fit text-white text-xs absolute bottom-2 bg-hackbio-green border-hackbio-green px-2 py-2 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green'> Preview Module </button> 
                        </Link>
                        
                       ))}
                </div>
                
              </div>
          </section>
        
  
      </main>
  );
}

export default Open;
