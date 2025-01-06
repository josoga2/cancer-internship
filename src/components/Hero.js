import sideImage from './../Assets/coffee_disp.svg'
import proof from './../Assets/proof.svg';


const Hero = () => {
    //const { internshipData } = useContext(InternshipContext);
    //console.log(internshipData)

  return (
    <main className=' bg-hb-bg-green py-5'>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between px-5">
            <div>
                <div className='flex flex-row justify-between items-center w-full p-5'>
                    <div className='flex flex-col gap-10 max-w-1/2'>
                        <span className='flex flex-row gap-2 bg-yellow-200 px-2 py-1 rounded-sm font-thin text-sm max-w-fit'> <span className='text-yellow-500'> ▸ </span>  <p>Internships</p> </span>
                        <span className='text-4xl'> <p className='font-thin pb-2'>The fastest way to learn </p> <p className='font-bold'>Bioinformatics</p> </span>
                        <p className='w-full'>Learn cutting-edge skills that can immediately transform your life science career.</p>
                        <div className='flex flex-row gap-5'>
                        <a href={'#open_internships'} className='font-semibold border-2 text-white bg-hackbio-green border-hackbio-green px-5 py-2 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green'> Get Started </a> 
                        <a href={'https://cal.com/hackbio-office-neg2ef/15min'} className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white'> Talk to a Mentor </a> 
               </div>
                </div>
                <div className='flex flex-col items-center'>
                    <img src={sideImage} alt='sideImage' className='w-full items-end' />
                    <p className='text-xs'>(c) Nature 2022</p>
                </div>
            
            </div>
            <div className='flex flex-col gap-5 items-center justify-center'>
                <p className='text-sm font-thin'>📍 Organisations who love to hire our learners</p>
                {/**Import */}
                <img src={proof} className='h-1/2 w-2/3' alt='hackbio-proofs' />
            </div>
            </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
              <div className='flex flex-col gap-5'>
                <span className='flex flex-row gap-2 bg-yellow-200 px-2 py-1 rounded-sm font-thin text-sm max-w-fit'> <span className='text-yellow-500'> ▸ </span>  <p>Internships</p> </span>
                <p className='font-thin '> 🔴 Starts 19 November, 2024</p>
                <span className='text-2xl'> <p className='font-thin '>The fastest way to learn </p> <p className='font-bold'>Bioinformatics</p> </span>
                <p className='w-full'>Learn cutting-edge skills that can immediately transform your life science career.</p>
                <div className='flex flex-row gap-5'>
                    <a href={'#open_internships'} className='font-semibold border-2 text-white bg-hackbio-green border-hackbio-green px-5 py-2 rounded-md hover:bg-hackbio-green-light hover:text-hackbio-green'> Get Started </a> 
                    <a href={'https://cal.com/hackbio-office-neg2ef/15min'} className='font-semibold border-2 border-hackbio-green bg-hackbio-green-light px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white'> Talk to a Mentor </a> 
                </div>
                <div className='flex flex-col gap-5 items-center justify-center'>
                    <p className='text-sm font-thin'>📍 Organisations who love to hire our learners</p>
                    {/**Import */}
                    <img src={proof} className='h-full w-full' alt='hackbio-proofs' />
                </div>
              </div>
          </section>
        
  
      </main>
  );
}

export default Hero;
