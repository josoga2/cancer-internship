'use client'
import publicApi from "@/publicApi";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function CheckStatus() {


    

    

   
    return (
        <main>
            <div className="hidden py-10  h-screen w-screen md:flex flex-col gap-5  items-center justify-center ">
                <img src={'https://cdn-icons-png.flaticon.com/512/16208/16208195.png'} height={50} width={50} />
                <p className="text-lg font-bold">Payment Confirmed! Welcome to HackBio.</p>
                <p>Your payment was successful.</p>
                <p>Thank you for entrusting your career development in HackBio. You did not just enroll in a course. </p>
                <p> You invested in a skill stack that the biotech and data industry is actively paying for. </p>
                    
                <p>A confirmation email will be sent to your email. If you have any questions, please email <a href="mailto:contact@thehackbio.com">contact@thehackbio.com</a>.</p>
                <p>Welcome once again.</p>

                
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 p-5  rounded-xl">
                <div className="grid grid-cols-2 items-start gap-2 w-200 justify-between text-base">
                    <p className="text-lg font-bold">Payment Confirmed! Welcome to HackBio.</p>
                    <p>Your payment was successful.</p>
                    <p>Thank you for entrusting your career development in HackBio. You did not just enroll in a course. </p>
                    <p> You invested in a skill stack that the biotech and data industry is actively paying for. </p>
                        
                    <p>A confirmation email will be sent to your email. If you have any questions, please email <a href="mailto:contact@thehackbio.com">contact@thehackbio.com</a>.</p>
                    <p>Welcome once again.</p>
                </div>
            </div>
        </main>
    )

    
}