'use client'
import Image from 'next/image'
import hb_logo from '../../../public/hb_logo.png'
import { useState } from 'react';
import { Menu, X } from 'lucide-react'
import Link from 'next/link';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <main className='w-full'>
    <div className="hidden w-full max-w-6xl pt-5 pb-1 md:flex flex-row justify-between items-center mx-auto ">
        <Link href='/'><Image src={hb_logo} alt='hb_log' width={50} height={50} /></Link>
        <div className='flex flex-row gap-10'>
          <a href='/internship'>Internships</a>
          <a href='https://thehackbio.com/'>Courses</a>
        </div>
        <a href='/login'><button className='border-2 border-black bg-hb-green rounded-lg px-5 text-white text-xl font-semibold py-2'>Get Started</button></a>
    </div>
    
    
    {/***MOBILE */}
    <div className="w-full pt-4 px-5 flex items-center justify-between md:hidden relative z-50 bg-white">
      {/* Logo */}
        <Link href="/">
          <Image src={hb_logo} alt="hb_logo" width={50} height={50} />
        </Link>

        {/* Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-black">
          {isOpen ? <X size={50} /> : <Menu size={50} />}
        </button>

        {/* Drawer */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg px-6 py-6 flex flex-col gap-4 z-40 transition-all">
            <a href="/internship" className="text-lg font-medium text-black">Internships</a>
            <a href="https://thehackbio.com/" className="text-lg font-medium text-black">Courses</a>
            <a href="/login">
              <button className="border-2 border-black bg-hb-green rounded-lg px-6 text-white text-lg font-semibold py-2 w-full">
                Get Started
              </button>
            </a>
          </div>
        )}
      </div>

    </main>
  )
}
