'use client'
import Image from 'next/image'
import hb_logo from '../../../public/hb_logo.png'
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react'
import Link from 'next/link';
import Banner from './Banner';
import HbButton from '../widgets/hb-buttons';
import api from '@/api';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


export default function NavbarPay() {
  
  return (
    <main className='fixed left-0 top-0 z-50 w-full bg-white pb-2 text-[#1f1f24] shadow-md dark:bg-[#0f172a] dark:text-white dark:shadow-black/30'>
       <Banner />
    <div className="hidden md:flex md:max-w-5xl bg md:m-auto md:items-center pt-5 md:justify-between">
        <Link href='/' className='flex flex-row gap-3 items-center'> 
          <Image src={hb_logo} alt='hb_log' width={35} height={35} /> 
          <p className='text-lg font-bold hover:text-hb-green'>HackBio</p>
        </Link>
        

    </div>
    
    
    {/***MOBILE */}
    <div className="relative z-50 flex w-full items-center justify-between bg-white px-4 pt-4 dark:bg-[#0f172a] md:hidden">
      {/* Logo */}
        <Link href="/" className='flex flex-row gap-2 items-center'>
          <Image src={hb_logo} alt="hb_logo" width={35} height={35} />
          <p className='text-base font-bold'>HackBio</p>
        </Link>

        
      </div>

    </main>
  )
}
