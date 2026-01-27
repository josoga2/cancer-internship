import HbButtons from "../hb-buttons";



// Props: upcoming, coursesList, internshipStatus
export default function ComplexityLevel({ id }: { id: string }) {

  return (
    <main>
      <div key={id} className="hidden w-full py-10  h-full md:flex flex-col gap-5 px-10  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen pb-10">
        {/*desktop*/}
        
        
      </div>

      <div className="flex flex-col w-full md:hidden gap-5 p-5  rounded-xl">
          <div>Insert Mobile Code Here</div>
          <HbButtons type="primary" text="HackBio"/>
      </div>
    </main>
    
  );
}
