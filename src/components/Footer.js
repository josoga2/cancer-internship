import HBLOGO from  './../Assets/logo-top.svg'

const Footer = () => {
  return (
    <main className=' bg-hb-bg-green py-10'>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-5">
              <div className='items-center flex flex-row gap-2 justify-center w-full  px-10'>
                
                <p>Built with mutations 💚 by </p>
                <img src={HBLOGO} className='h-10' alt='footer-logo-hackbio' />
              </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden text-sm w-full'>
                <div className='items-center flex flex-col gap-2 justify-center w-full  px-10'>
                
                    <p>Built with mutations 💚 by </p>
                    <img src={HBLOGO} className='h-10' alt='footer-logo-hackbio' />
              </div>

          </section>
        
  
      </main>
  );
}

export default Footer;
