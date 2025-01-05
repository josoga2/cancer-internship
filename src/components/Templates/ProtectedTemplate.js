import PlatformNavBar from "./PlatformNavBar";


const ProtectedTemplate = () => {
  return (
    <main>
          {/*  Desktop */}
          <section className="hidden md:flex md:max-w-full md:m-auto md:items-center md:justify-between">
            <div className="w-full ">
                    <PlatformNavBar /> 
                </div>
              
          </section>
  
          {/*  Mobiles */}
          <section className='md:hidden p-5 text-sm w-full'>
          <div className="w-full">
                <PlatformNavBar />  
              </div>
          </section>
        
  
      </main>
  );
}

export default ProtectedTemplate;
