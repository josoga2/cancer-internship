import { Link } from 'react-router-dom';
import hbLogo from './../Assets/logo-top.svg'

const Navbar = () => {
  return (
    <main>
        {/*  Desktop */}
        <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between py-5 px-5">
            <div className='flex flex-row justify-between w-full items-center '>
              <a href={'/'} > <div> <img src={hbLogo} className='h-10' alt='hbLogo' /> </div></a>
              <div className='flex flex-row justify-evenly min-w-px gap-10'>

                  <ul>Courses</ul>
                  <ul>Internships</ul>
                  <ul>Resources</ul>

              </div>
              <div> <Link to={'/dashboard'} className='font-semibold border-2 border-hackbio-green px-5 py-2 rounded-md hover:bg-hackbio-green hover:text-white'> Get Started </Link> </div>
            </div>
        </section>

        {/*  Mobiles */}
        <section className='md:hidden p-5'>
            
            <div className='flex flex-row items-center justify-between w-full'> 
              <div> <img src={hbLogo} className='h-10' alt='hbLogo' /> </div>

              <button 
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-hackbio-green"
              >
                <svg className="h-7 w-7" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
        </section>
      

    </main>
  );
}

export default Navbar;
