import sideImage from './../Assets/Sequencer.png'
import proof from './../Assets/proof.svg'
import { useContext } from "react";
import { InternshipContext } from '../Context/InternshipContext';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ACCESS_TOKEN } from './../constants/constants'
import PaymentModal from './PaymentModal';
import { useNavigate } from "react-router-dom"; // For redirection
import { useState } from 'react';


const InternshipHero = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  

  const { internshipId } = useParams();
  //console.log(internshipId)
  //const navigate = useNavigate();
  const { internshipData } = useContext(InternshipContext);
  const token = localStorage.getItem(ACCESS_TOKEN)
  //console.log(internshipData[internshipId-1])
  if (!internshipData || internshipData.length === 0) {
    return <div>Loading...</div>; 
  }

  const openModal = () => {
    const authToken = localStorage.getItem(ACCESS_TOKEN);

    if (authToken) {
      // Redirect to dashboard if the user is authenticated
      navigate("/dashboard");
    } else {
      // Open the payment modal
      setModalOpen(true);
    }
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <main className=' bg-hb-bg-green py-10'>
          {/*  Desktop */}
          <section className="hidden md:flex md:flex-col md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-5">
            <div>
                <div className='grid grid-cols-2 justify-between items-center w-full p-5'>
                    <div className='flex flex-col gap-10 max-w-1/2'>
                        <span className='flex flex-row  gap-3 items-center '> <span className='flex flex-row gap-2 px-2 py-1 rounded-sm font-thin text-sm max-w-fit bg-yellow-200'> <span className='text-yellow-500'> ▸ </span>  <p>{ internshipData[internshipId-1].internship_type }</p>  </span> <span className='bg-white'>🔴 Starts on { internshipData[internshipId-1].internship_date }</span></span>
                        <span className='text-4xl'> <p className='font-thin pb-2'>{ internshipData[internshipId-1].internship_title }</p> </span>
                        <p className='w-full'> { internshipData[internshipId-1].summary } </p>
                        <div className='flex flex-row gap-5 items-center '>
                            {
                              token && token.trim().length > 0? <Link to={token && token.trim().length > 0? '/dashboard': '/login' } onClick={openModal} className='font-semibold border-2 text-white bg-hackbio-green border-hackbio-green px-4 py-3 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green'> {token && token.trim().length > 0? 'Continue Learning': 'Enroll'} </Link> : <PaymentModal isOpen={isModalOpen} onClose={closeModal} />
                            }
                            {/**<Link to={token && token.trim().length > 0? '/dashboard': '/login' } onClick={openModal} className='font-semibold border-2 text-white bg-hackbio-green border-hackbio-green px-5 py-2 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green'> {token && token.trim().length > 0? 'Continue Learning': 'Enroll'} </Link> 
                            <PaymentModal isOpen={isModalOpen} onClose={closeModal} />
                            **/}
                    <a href={'https://cal.com/hackbio-office-neg2ef/15min'} className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white'> Talk to a Mentor </a> 
                                           
                        </div>
                    </div>
                    <div>
                        <img src={sideImage} alt='sideImage' className='w-full items-end' />
                    </div>
                </div>
                
            </div>
            <div className='flex flex-col gap-5 items-center justify-center'>
                <p className='text-sm font-thin'>📍 Organisations who love to hire our learners</p>
                {/**Import */}
                <img src={proof} className='h-1/2 w-2/3' alt='prrofs' />
            </div>

          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-row items-center gap-5'>
                <span className='flex flex-row gap-2 px-2 bg-yellow-100 py-0 rounded-sm font-thin text-sm max-w-fit items-center'><span className='text-yellow-500 text-3xl'>▸ </span>  <p>{ internshipData[internshipId-1].internship_type }</p> </span>
                <p className='font-thin  '> 🔴 { internshipData[internshipId-1].internship_date }</p>
                </div>
                <span className='text-2xl'> <p className='font-thin '>{ internshipData[internshipId-1].internship_title }</p> </span>
                <p className='w-full'>{ internshipData[internshipId-1].summary }</p>
                <div className='flex flex-row gap-5 items-start'>
                  {
                    token && token.trim().length > 0? <Link to={token && token.trim().length > 0? '/dashboard': '/login' } onClick={openModal} className='font-semibold border-2 text-white bg-hackbio-green border-hackbio-green px-4 py-3 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green'> {token && token.trim().length > 0? 'Continue Learning': 'Enroll'} </Link> : <PaymentModal isOpen={isModalOpen} onClose={closeModal} />
                  }
                  {/**<Link to={token && token.trim().length > 0? '/dashboard': '/login' } onClick={openModal} className='font-semibold border-2 text-white bg-hackbio-green border-hackbio-green px-5 py-2 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green'> {token && token.trim().length > 0? 'Continue Learning': 'Enroll'} </Link> 
                  <PaymentModal isOpen={isModalOpen} onClose={closeModal} />
                  **/}
                    <a href={'https://cal.com/hackbio-office-neg2ef/15min'} className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white'> Talk to a Mentor </a> 
                            
                </div>
                <div className='flex flex-col gap-5 items-center justify-center'>
                    <p className='text-sm font-thin'>📍 Organisations who love to hire our learners</p>
                    {/**Import */}
                    <img src={proof} className='h-full w-full' alt='proofs' />
                </div>
              </div>
          </section>
        
  
      </main>
    </div>
  );
}

export default InternshipHero;
