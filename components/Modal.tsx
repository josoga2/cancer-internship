"use client"
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Buttons from "./Buttons";
import { FaCcStripe } from "react-icons/fa";
import { PiButterflyBold } from "react-icons/pi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";





export default function Modal(){

    const searchParams = useSearchParams();
    const modal = searchParams.get("modal");
    const pathname = usePathname();

    return(
        
        <main>
            
            <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  px-10 relative">
            {modal &&    
                <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex items-start">
                    <div className="bg-white m-auto p-8 w-1/4 rounded-lg  border-4 shadow-md border-hbgreen-1">
                        <div className="flex flex-col items-start gap-2">
                            <Link href={pathname} className="absolute right-5 top-5">
                                <IoMdCloseCircleOutline className="text-5xl text-white" />
                            </Link>
                            <h3 className="font-bold">Choose your enrollment type</h3>
                            <p className="text-xs">50% Early bird discount closes August 8th</p>
                            <div className="flex flex-col gap-4 pt-5">
                                <div className="p-4 border-2 border-hbblue-1 rounded-md">
                                    <span className="flex flex-row items-center gap-2"> <p className="font-bold"> Premium</p> <p className="font-bold"> $15</p> <p className="line-through text-xs text-red-400"> $30</p> </span>
                                    <span className="flex flex-row items-center gap-2 text-xs"> <p className="font-light"> 100% Access to learning and mentorship</p>  </span>

                                    <div className="flex flex-col  gap-3 pt-5">
                                        <Link href={'https://buy.stripe.com/00g163dLw2Ol9pe28d'}> <span className="text-xs flex flex-row gap-2 items-center"> <FaArrowRight /> Register with <FaCcStripe className="text-xl" /> </span> </Link>
                                        <Link href={'https://flutterwave.com/pay/xncny83hyjjf'}> <span className="text-xs flex flex-row gap-2 items-center"> <FaArrowRight /> Register with <PiButterflyBold className="text-xl" /> (Works well in Africa)</span> </Link>
                                    </div>
                                </div>
                               
                                <div className="p-4 border-2 border-hbblue-1 rounded-md">
                                    <p className="font-bold">Free</p>
                                    <Link href={''}> <span className="text-xs flex flex-row gap-2 items-center"> <FaArrowRight />  Register (Opens in August) </span> </Link>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </dialog>
            }
            </section>

            <section className="md:hidden p-5">
                {modal &&    
                    <dialog className="fixed left-0 top-20 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex items-start">
                        <div className="bg-white p-8 w-full rounded-lg  border-4 shadow-md border-hbgreen-1">
                            <div className="flex flex-col items-start gap-2">
                                <Link href={pathname} className="absolute right-5 top-5">
                                    <IoMdCloseCircleOutline className="text-5xl text-white" />
                                </Link>
                                <h3 className="font-bold">Choose your enrollment type</h3>
                                <p className="text-xs">50% Early bird discount closes August 8th</p>
                                <div className="flex flex-col gap-4 pt-5">
                                    <div className="p-4 border-2 border-hbblue-1 rounded-md">
                                        <span className="flex flex-row items-center gap-2"> <p className="font-bold"> Premium</p> <p className="font-bold"> $15</p> <p className="line-through text-xs text-red-400"> $30</p> </span>
                                        <span className="flex flex-row items-center gap-2 text-xs"> <p className="font-light"> 100% Access to learning and mentorship</p>  </span>

                                        <div className="flex flex-col  gap-3 pt-5">
                                            <Link href={'https://buy.stripe.com/00g163dLw2Ol9pe28d'}> <span className="text-xs flex flex-row gap-2 items-center"> <FaArrowRight /> Register with <FaCcStripe className="text-xl" /> </span> </Link>
                                            <Link href={'https://flutterwave.com/pay/xncny83hyjjf'}> <span className="text-xs flex flex-row gap-2 items-center"> <FaArrowRight /> Register with <PiButterflyBold className="text-xl" /> (Works well in Africa)</span> </Link>
                                        </div>
                                    </div>
                                
                                    <div className="p-4 border-2 border-hbblue-1 rounded-md">
                                        <p className="font-bold">Free</p>
                                        <Link href={''}> <span className="text-xs flex flex-row gap-2 items-center"> <FaArrowRight />  Register (Opens in August) </span> </Link>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </dialog>
                }
            </section>
            
        </main>
    )
}