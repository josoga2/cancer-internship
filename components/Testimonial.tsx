import Image from "next/image";
import sanger from "../public/wellcomesanger.png"
import oklahoma from "../public/okhlahoma.png"
import ubristol from "../public/ubristol.png"
import umass from "../public/umass.png"
import havard from "../public/havard.png"
import iowa from "../public/iowa.png"
import Buttons from "./Buttons";

function Testimonial(){
    return(
        <section>
            {/**Desktop */}
            <main className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-10 pb-10">
                <div className="flex flex-col items-center justify-center w-full gap-5">
                <div className="text-2xl font-bold ">Where HackBio interns work!</div>
                <div className="grid scroll-smooth grid-cols-3 items-center justify-between w-full gap-10">
                    <div className="flex flex-col items-center ">
                        <Image src={sanger} height={150} width={150} alt="icons" />
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src={oklahoma} height={150} width={150} alt="icons" />
                    </div>
                    <div className="flex flex-col  items-center">
                        <Image src={ubristol} height={150} width={150} alt="icons" />
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src={umass} height={150} width={150} alt="icons" />
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src={havard} height={150} width={150} alt="icons" />
                    </div>
                    <div className="flex flex-col items-center">
                        <Image src={iowa} height={150} width={150} alt="icons" />
                    </div>

                    
                </div>
                
                {Buttons("Read their Stories →", "https://thehackbio.com/stories")}
                </div>
            </main>

            {/**Mobile */}
            <main className="md:hidden flex flex-col p-10 text-center justify-center items-center gap-10 w-full ">
                <div className="text-4xl font-bold ">Where HackBio Interns Work!</div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-10 items-center ">
                    <div className="flex flex-col gap-2 items-center ">
                        <Image src={sanger} height={150} width={150} alt="icons" />
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                            <Image src={umass} height={150} width={150} alt="icons" />
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <Image src={ubristol} height={150} width={150} alt="icons" />
                    </div> 
                    <div className="flex flex-col gap-2 items-center">
                        <Image src={havard} height={150} width={150} alt="icons" />
                    </div>      
                    <div className="flex flex-col gap-2 items-center">
                        <Image src={iowa} height={150} width={150} alt="icons" />
                    </div> 
                    <div className="flex flex-col gap-2 items-center">
                        <Image src={oklahoma} height={150} width={150} alt="icons" />
                    </div> 
                </div>

                

                {Buttons("Read their Stories →", "https://thehackbio.com/stories")}

            </main>
        </section>
    )
};

export default Testimonial;