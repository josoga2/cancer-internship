import HBLOGO from  './../Assets/logo-top.svg'

const Footer = () => {
  return (
    <main className=' bg-hb-bg-green py-10'>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-5">
              <div className='items-start flex flex-row gap-10 justify-between w-full  px-20'>
                <img src={HBLOGO} className='h-10' alt='footer-logo-hackbio' />
                <div>
                    <p className='font-bold'>Company</p>
                    <p>About Us</p>
                    <p>Team</p>
                    <p>Contact Us</p>
                </div>
                <div>
                    <p className='font-bold'>Company</p>
                    <p>About Us</p>
                    <p>Team</p>
                    <p>Contact Us</p>
                </div>
                <div>
                    <p className='font-bold'>Company</p>
                    <p>About Us</p>
                    <p>Team</p>
                    <p>Contact Us</p>
                </div>
              </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
          <img src={HBLOGO} className='h-10 w-full' alt='footer-logo-hackbio' />
            <div className='items-center grid grid-cols-2 gap-10 justify-between w-full  px-10 py-5'>
                
                <div>
                    <p className='font-bold'>Company</p>
                    <p>About Us</p>
                    <p>Team</p>
                    <p>Contact Us</p>
                </div>
                <div>
                    <p className='font-bold'>Company</p>
                    <p>About Us</p>
                    <p>Team</p>
                    <p>Contact Us</p>
                </div>
                <div>
                    <p className='font-bold'>Company</p>
                    <p>About Us</p>
                    <p>Team</p>
                    <p>Contact Us</p>
                </div>
              </div>
          </section>
        
  
      </main>
  );
}

export default Footer;
