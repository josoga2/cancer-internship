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
    <main className='w-full fixed top-0 left-0 bg-white shadow-md z-50 pb-2'>
       <Banner />
    <div className="hidden md:flex md:max-w-5xl bg md:m-auto md:items-center pt-5 md:justify-between">
        <Link href='/' className='flex flex-row gap-3 items-center'> 
          <Image src={hb_logo} alt='hb_log' width={35} height={35} /> 
          <p className='font-bold hover:text-hb-green text-lg'>HackBio</p>
        </Link>
        

    </div>
    
    
    {/***MOBILE */}
    <div className="w-full pt-4 px-4 flex items-center justify-between md:hidden relative z-50 bg-white">
      {/* Logo */}
        <Link href="/" className='flex flex-row gap-2 items-center'>
          <Image src={hb_logo} alt="hb_logo" width={35} height={35} />
          <p className='text-base font-bold'>HackBio</p>
        </Link>

        
      </div>

    </main>
  )
}
