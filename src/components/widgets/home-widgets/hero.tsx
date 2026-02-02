import HbButtons from "../hb-buttons";

export default function Hero() {
    return (
        <main>
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="w-full flex flex-row items-center justify-start py-20 relative bg-hb-lightgreen">
                    <div className="w-2/3 h-full items-start text-start flex flex-col gap-5 px-10 ">
                        <p className= 'text-5xl font-bold leading-16'>We train the next generation of bioinformatics talent </p>
                        <p className=" text-xl w-2/3 text-gray-700">... and connect them to the organizations that need them.</p>
                        <div className="flex flex-row gap-5 py-5">
                            <a href="/learning"> <HbButtons type="primary" text="Start your career journey"/> </a>
                            {/* <a href="/hire-talents"> <HbButtons type="outline" text="Hire Talents"/> </a> */}
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 p-2 rounded-xl">
                <div className="flex flex-col gap-5 text-start">
                    <p className="text-3xl font-bold leading-tight">
                        We train the next generation of bioinformatics talent
                    </p>
                    <p className="text-base text-gray-700">
                        ... and connect them to the organizations that need them.
                    </p>
                    <div className="flex flex-col gap-3">
                        <a href="/learning"> <HbButtons type="primary" text="Start your career journey"/> </a>
                        {/* <a href="/hire-talents"> <HbButtons type="outline" text="Hire Talents"/> </a> */}
                    </div>
                </div>
            </div>
        </main>
    )
}