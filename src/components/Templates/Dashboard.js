import PlatformNavBar from "./PlatformNavBar";
import { InternshipContext } from '../../Context/InternshipContext';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import Sequencer from './../../Assets/Sequencer.png'
import { UserContext } from "../../Context/UserContext";

const Dashboard = () => {

    const { internshipData } = useContext(InternshipContext);
    const openInternships = internshipData.filter((internshipData)=>(internshipData.open_status === true))
    const closeInternships = internshipData.filter((internshipData)=>(internshipData.open_status === false))
    const { UserData } = useContext(UserContext);
    //console.log(UserData)
    //console.log(openInternships)

  return (
    
    <main>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-full md:m-auto md:items-center md:justify-between ">
              <div className="w-full ">
                <div className="w-full py-2 bg-hackbio-green-light px-5">
                    <PlatformNavBar /> 
                </div>
                <div className="flex flex-col gap-5 w-full  items-center justify-center">
                    <div className="flex flex-col justify-start gap-5 w-5/6">
                        <p className="px-5 pt-5 text-2xl font-bold">👋 Welcome, </p>
                        <p className="px-5 font-bold"> ▷ Internship Dashboard </p>
                    </div>

                    <div className="flex flex-col items-center gap-10 py-10 w-full">
                        {openInternships.map((internship)=>(
                            <div className="p-10 rounded-md shadow-xl border border-hackbio-green-light flex flex-row max-w-4xl w-4/6 gap-10">
                                <img src={Sequencer} className="w-48" alt="hackbio-ngs-Sequencer" />
                                <div className="flex flex-col items-start">
                                    <p className="font-semibold text-lg"> { internship.internship_title } </p>
                                    <div className="pt-5"> { internship.key_takeaways.callables.map((kt)=>(
                                        <div> <li className="text-base"> {kt.description} </li> </div>
                                    )) } </div>
                                    <p className="py-5 font-semibold"> Starts on { internship.internship_date } </p>
                                    <Link to={internship.open_status? `/internships/${internship.id}/TOC/` : '/dashboard' } className="px-5 py-2 rounded-md bg-hackbio-green text-white font-bold"> { internship.open_status? 'Launch' : 'Coming Soon' } </Link>
                                </div>
                            </div>
                        ))}
                        {closeInternships.map((internship)=>(
                            <div className="p-10 rounded-md shadow-xl border border-hackbio-green-light flex flex-row max-w-4xl w-4/6 gap-10">
                                <img src={Sequencer} className="w-48" alt="hackbio-ngs-Sequencer" />
                                <div className="flex flex-col items-start">
                                    <p className="font-semibold text-lg"> { internship.internship_title } </p>
                                    <div className="pt-5"> { internship.key_takeaways.callables.map((kt)=>(
                                        <div> <li className="text-base"> {kt.description} </li> </div>
                                    )) } </div>
                                    <p className="py-5 font-semibold"> Starts on { internship.internship_date } </p>
                                    <Link to={internship.open_status? '/dashboard' : '/dashboard' } className="px-5 py-2 rounded-md bg-zinc-500 text-white font-bold"> { internship.open_status? 'Launch' : 'Coming Soon' } </Link>
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
                    {<PlatformNavBar /> } 
                </div>
                <div>
                    <div className="flex flex-col justify-start gap-5 w-full">
                        <p className="pt-5 text-2xl font-bold">👋 Welcome </p>
                        <p className=" font-bold"> ▷ Internship Dashboard </p>
                    </div>

                    <div className="flex flex-col items-center gap-10 py-10 w-full">
                        {openInternships.map((internship)=>(
                            <div className="p-10 rounded-md shadow-xl border border-hackbio-green-light flex flex-col w-full gap-10 items-center">
                                <img src={Sequencer} className="max-w-52" alt="hackbio-ngs-Sequencer" />
                                <div className="flex flex-col items-start">
                                    <p className="font-semibold text-lg"> { internship.internship_title } </p>
                                    <div className="pt-2"> { internship.key_takeaways.callables.map((kt)=>(
                                        <div> <li className="text-sm"> {kt.description} </li> </div>
                                    )) } </div>
                                    <p className="py-5 font-semibold"> Starts on { internship.internship_date } </p>
                                    <Link to={internship.open_status? `/internships/${internship.id}/TOC/` : '/dashboard' } className="px-5 py-2 rounded-md bg-hackbio-green text-white font-bold"> { internship.open_status? 'Launch' : 'Coming Soon' } </Link>
                                </div>
                            </div>
                        ))}
                        {closeInternships.map((internship)=>(
                            <div className="p-10 rounded-md shadow-xl border border-hackbio-green-light flex flex-col w-full gap-10 items-center">
                                <img src={Sequencer} className="w-48" alt="hackbio-ngs-Sequencer" />
                                <div className="flex flex-col items-start">
                                    <p className="font-semibold text-lg"> { internship.internship_title } </p>
                                    <div className="pt-2"> { internship.key_takeaways.callables.map((kt)=>(
                                        <div> <li className="text-sm"> {kt.description} </li> </div>
                                    )) } </div>
                                    <p className="py-5 font-semibold"> Starts on { internship.internship_date } </p>
                                    <Link to={internship.open_status? '/#' : '/dashboard' } className='px-5 py-2 rounded-md bg-zinc-500 text-white font-bold'> { internship.open_status? 'Launch' : 'Coming Soon' } </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
          </section>
        
  
      </main>
  );
}

export default Dashboard;
