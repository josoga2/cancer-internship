'use client'
import Image from 'next/image'
import hb_logo from '../../../public/hb_logo.png'
import { useState } from 'react';
import { Menu, X } from 'lucide-react'
import Link from 'next/link';


export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <main className='w-full  bottom-0 left-0 bg-white pb-2 px-5 border-t-2 border-gray-200'>
    <div className="hidden md:flex md:max-w-screen-lg bg md:m-auto md:items-start py-10  gap-20">
        <Link href='/' className='flex flex-row gap-3 items-center'> 
          <Image src={hb_logo} alt='hb_log' width={35} height={35} /> 
          <p className='font-bold hover:text-hb-green text-lg'>HackBio</p>
        </Link>
        <div className='flex flex-row gap-10'>
          <div className='flex flex-col gap-2'> 
            <Link href='/internship'>Internships</Link>
            <Link href='/'>Hire our graduates</Link>
          </div>
          <div className='flex flex-col gap-2'> 
            <Link href='/learning'>Career Pathways</Link>
            <Link href='/learning'>Courses</Link>
          </div>
          <div className='flex flex-col gap-2'> 
            <Link href='/blog'>Blog and articles</Link>
            <Link href='/'>Genomics</Link>
            <Link href='/'>Biomedical AI</Link>
            <Link href='/'>Drug Development</Link>
          </div>
          <div className='flex flex-col gap-2'> 
            <Link href='/'>About Us</Link>
            <Link href='/faqs'>FAQs</Link>
            <Link href='/scholarships'>Scholarships</Link>
            <Link href='/'>Partners and Sponsors</Link>
            <Link href='/'>Contact Us</Link>
          </div>
          
          
          
          {/* <a href='/learning'>Career Paths</a> */}
        </div>
    </div>
    
    
    {/***MOBILE */}
    <div className="w-full bottom-0 pt-4 px-4 flex flex-col items-start justify-between md:hidden relative bg-white">
      {/* Logo */}
        <Link href='/' className='flex flex-row gap-3 items-center'> 
          <Image src={hb_logo} alt='hb_log' width={35} height={35} /> 
          <p className='font-bold hover:text-hb-green text-lg'>HackBio</p>
        </Link>
        <div className='flex flex-col  pt-5 text-sm w-full'>
          <div className='flex flex-col gap-2'> 
            <Link href='/internship'>Internships</Link>
            <Link href='/'>Hire our graduates</Link>
          </div>
          <div className='flex flex-col gap-2 pt-3'>
            <hr /> 
            <Link href='/learning'>Career Pathways</Link>
            <Link href='/learning'>Courses</Link>
          </div>
          <div className='flex flex-col gap-2 pt-3'>
            <hr />  
            <Link href='/blog'>Blog and articles</Link>
            <Link href='/'>Genomics</Link>
            <Link href='/'>Biomedical AI</Link>
            <Link href='/'>Drug Development</Link>
          </div>
          <div className='flex flex-col gap-2 pt-3'>
            <hr />  
            <Link href='/'>About Us</Link>
            <Link href='/'>Partners and Sponsors</Link>
            <Link href='/'>Contact Us</Link>
          </div>
      </div>
      </div>

    </main>
  )
}
