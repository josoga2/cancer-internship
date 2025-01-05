
const Webinar = () => {
  return (
    <main className=' py-10'>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-5">
              <div className='flex flex-col gap-10 w-full items-center'>
                <p className='font-bold text-2xl'>Our Transformation Plan</p>
                <iframe width="200" height="400" title='sequencer' className="rounded-lg border-hackbio-green border-4 w-2/3 shadow-lg" src="https://www.youtube.com/embed/TmtWXHQaLWg?si=tbdZ8eBiA5pGs87R" ></iframe>
              </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
            <div className='flex flex-col gap-10 w-full items-center'>
                <p className='font-bold text-2xl'>Our Transformation Plan</p>
                <iframe width="200" height="250" title='sequencer' className="rounded-lg border-hackbio-green border-4 w-full " src="https://www.youtube.com/embed/TmtWXHQaLWg?si=tbdZ8eBiA5pGs87R" ></iframe>
              </div>
          </section>
        
  
      </main>
  );
}

export default Webinar;
