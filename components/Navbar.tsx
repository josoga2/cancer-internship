import { IoArrowBackCircle } from "react-icons/io5";

export default function Navbar(){

    return(
        
        <main>
            <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between pt-10 px-10">
                <div className="">
                    <a href="https://thehackbio.com/" className="flex flex-row gap-5 items-center font-bold text-lg ">
                        <IoArrowBackCircle className="text-6xl text-hbblue-3" />
                        <p className=" hover:underline">Back to HackBio</p>
                    </a>
                    
                </div>
            </section>

            <section className="md:hidden p-5">
                <div className="">
                    <a href="https://thehackbio.com/" className="flex flex-row gap-5 items-center font-bold text-lg ">
                        <IoArrowBackCircle className="text-3xl text-hbblue-3" />
                        <p className="">Back to HackBio</p>
                    </a>
                    
                </div>

            </section>
        </main>
    )
}