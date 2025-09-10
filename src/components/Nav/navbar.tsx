'use client'
import Image from 'next/image'
import hb_logo from '../../../public/hb_logo.png'
import { useState } from 'react';
import { Menu, X } from 'lucide-react'
import Link from 'next/link';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <main className='w-full fixed top-0 left-0 bg-white shadow-md z-50 pb-2'>
    <div className="hidden md:flex md:max-w-screen-lg bg md:m-auto md:items-center pt-5 md:justify-between">
        <Link href='/' className='flex flex-row gap-3 items-center'> 
          <Image src={hb_logo} alt='hb_log' width={35} height={35} /> 
          <p className='font-bold hover:text-hb-green text-lg'>HackBio</p>
        </Link>
        <div className='flex flex-row gap-10'>
          <Link href='/internship'>Internships</Link>
          <Link href='/learning'>Career Paths</Link>
          <Link href='/blog'>Blog</Link>
          {/* <Link href='/learning'>Career Paths</Link> */}
        </div>
        <Link href='/login'><button className='border-2  bg-hb-green rounded-lg px-5 text-white text-base font-semibold py-2'>Sign In/Up</button></Link>
    </div>
    
    
    {/***MOBILE */}
    <div className="w-full pt-4 px-4 flex items-center justify-between md:hidden relative z-50 bg-white">
      {/* Logo */}
        <Link href="/">
          <Image src={hb_logo} alt="hb_logo" width={35} height={35} />
        </Link>

        {/* Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-black">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Drawer */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg px-6 py-6 flex flex-col gap-4 z-40 transition-all">
            <Link href="/internship" className="text-lg font-medium text-black">Internships</Link>
            <Link href="/learning" className="text-lg font-medium text-black">Courses</Link>
            <Link href="/blog" className="text-lg font-medium text-black">Blog</Link>
            {/* <Link href='/learning' className="text-lg font-medium text-black">Career Paths</Link> */}
            <Link href="/login">
              <button className="border-2 border-black bg-hb-green rounded-lg px-6 text-white text-lg font-semibold py-2 w-full">
                Sign In/Up
              </button>
            </Link>
          </div>
        )}
      </div>

    </main>
  )
}
