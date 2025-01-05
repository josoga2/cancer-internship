const Testimonials = [
    {
      "title": "Halimat Chisom Atanda",
      "index": 1,
      "description": "Learn to write code for biological data analysis, including working with DNA sequences, protein structures, and more.",
      "url": 'https://thehackbio.com/stories/halimat.svg',
      'now': 'Now in University of Queensland, Australia'
    },
    {
      "title": "Bello Ridwan",
      "index": 2,
      "description": "Explore the computational approaches to drug discovery, including target identification, molecular docking, and simulations.",
      "url": 'https://thehackbio.com/stories/bello.svg',
      'now': 'Now in University of Derby'
    },
    {
      "title": "Aanuoluwa E.A.",
      "index": 3,
      "description": "Unlock insights from genomics, transcriptomics, proteomics, and metabolomics data to understand complex biological systems.",
      "url": 'https://thehackbio.com/stories/aanuoluwa.svg',
      'now': 'Now in University of Oklahoma, USA'
    },
  ];

const Stories = () => {
  return (
    <main className=' bg-hb-bg-green pb-5'>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between px-5 ">
              <div className='py-5'>
                <p className='font-bold text-2xl w-full text-center'>What our previous learners have to say</p>
                <div className='grid grid-cols-3 gap-2 mx-20'>
                    {Testimonials.map((testimonial)=>(
                        <div className='px-2 py-5'>
                        <div className='border-hackbio-green border p-2 rounded-t-md font-bold text-base bg-green-50 flex flex-row h-16 items-center justify-start gap-5 w-full'> <img src={testimonial.url} alt='hackbio-success' className='rounded-full w-10 h-10 ' /> <p className='text-start flex flex-col '>{testimonial.title}</p></div>
                        <div className='border-hackbio-green border p-2 rounded-b-md font-bold text-sm bg-hackbio-green-light h-40'>
                            <p className='text-start flex flex-col font-normal'>{testimonial.description}</p>
                            <p className='text-start flex flex-col py-2'>{testimonial.now}</p>
                        </div>
                        
                    </div>
                    ))}
                </div>
              </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
            <div className='py-5'>
                <p className='font-bold text-2xl w-full text-center'>What our previous learners have to say</p>
                <div className='grid grid-cols-1 gap-2 '>
                    {Testimonials.map((testimonial)=>(
                        <div className='px-2 py-5'>
                        <div className='border-hackbio-green border p-2 rounded-t-md font-bold text-base bg-green-50 flex flex-row items-center justify-start gap-5 w-full'> <img src={testimonial.url} alt='hackbio-success' className='rounded-full w-10 h-10 ' /> <p className='text-start flex flex-col '>{testimonial.title}</p></div>
                        <div className='border-hackbio-green border p-2 rounded-b-md font-bold text-sm bg-hackbio-green-light'>
                            <p className='text-start flex flex-col font-normal'>{testimonial.description}</p>
                            <p className='text-start flex flex-col py-2'>{testimonial.now}</p>
                        </div>
                        
                    </div>
                    ))} 
                </div>
              </div>
          </section>
        
  
      </main>
  );
}

export default Stories;
