import Transform from './../Assets/Transform.svg'

const Transformation = () => {
  return (
    <main className='  py-10'>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between   px-5">
              <div className='flex flex-col gap-10 w-full items-center'>
                <p className='font-bold text-2xl'>Our Transformation Plan</p>
                <img className='w-2/5 h-2/5' src={Transform} alt='Transform' />
              </div>
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
            <div className='flex flex-col gap-10 w-full items-center'>
                <p className='font-bold text-2xl'>Our Transformation Plan</p>
                <img className='w-3/4 h-3/4' src={Transform} alt='Transform' />
              </div>
          </section>
        
  
      </main>
  );
}

export default Transformation;
