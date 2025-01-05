import { Link } from 'react-router-dom';
import hbLogo from './../../Assets/logo-top.svg'


const PlatformNavBar = () => {
  return (
    <main>
        {/*  Desktop */}
        <section className="hidden md:flex md:max-w-screen-2xl md:m-auto md:items-center md:justify-between  ">
            <div className='flex flex-row justify-between w-full items-center '>
              <div> <img src={hbLogo} className='h-10' alt='hbLogo' /> </div>
              <div> <Link to={'/logout'} className=' border-2 border-hackbio-green px-3 py-2 text-xl rounded-md hover:bg-white hover:text-hb-black bg-hackbio-green text-white font-bold'> ⏻ </Link> </div>
            </div>
        </section>

        {/*  Mobiles */}
        <section className='md:hidden '>
            
            <div className='flex flex-row items-center justify-between w-full'> 
              <div> <img src={hbLogo} className='h-10' alt='hbLogo' /> </div>

              <button 
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-hackbio-green"
              >
                <div> <Link to={'/logout'} className=' border-2 border-hackbio-green px-3 py-3 text-xl rounded-md hover:bg-white hover:text-hb-black bg-hackbio-green text-white font-bold'> ⏻ </Link> </div>
              </button>
            </div>
        </section>
      

    </main>
  );
}

export default PlatformNavBar;
