"use client"

import Image from 'next/image';
import hb_logo from '../../../public/hb_logo.png';
import confirmed from '../../../public/payment_confirmed.png'

export default function Login() {

    

    return (
        <main className='max-w-full w-full py-10   flex flex-col  items-center justify-center'>
            <div className='hidden md:flex max-w-full w-[1000px] py-2  flex-col gap-5 items-center justify-center'>
                
                <div className='w-full flex justify-center flex-row items-end'> 
                    <Image src={hb_logo} alt='jisender-logo' height={35} width={35} /> 
                </div>
                
                <div className='w-full flex justify-center items-center'>
                    <a href='https://thehackbio.com/'><p className='text-base font-bold'> HackBio </p></a>
                </div>

                <div className='w-full flex justify-center flex-row items-end'> 
                    <Image src={confirmed} alt='payment_confirmed-logo' height={200} width={200} /> 
                </div>
                
                <div className='w-full flex justify-center flex-col gap-10 items-center'>
                    <p className='text-3xl font-bold text-hb-green'> You are enrolled! Please proceed to register with the link below! </p>
                    <a href='/register' className='text-base underline hover:text-neutral-500 font-bold'> Proceed to Register Here </a>
                </div>


            </div>

            <div className="md:hidden w-full max-w-md px-4 py-10 mx-auto flex flex-col gap-10 items-center justify-center">
                
            </div>
        </main>
    )
}
