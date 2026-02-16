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


export default function Navbar() {



  const [loginStatus, setLoginStatus] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/api/get-user-profile/'); // Adjust the endpoint as needed
        //console.log("Response from get-user-profile:", response.data);
        if (response.data && response.status == 200 || response.status == 201) {
          setLoginStatus(true)
          
        } else {
          setLoginStatus(false);
          //console.error("N");
          
        }
      } catch (error) {
        setLoginStatus(false);
          //console.error("N");
      }
    };

    fetchUserProfile();
  }, []);
  
  return (
    <main className='w-full fixed top-0 left-0 bg-white shadow-md z-50 pb-2'>
       <Banner />
    <div className="hidden md:flex md:max-w-5xl bg md:m-auto md:items-center pt-5 md:justify-between">
        <Link href='/' className='flex flex-row gap-3 items-center'> 
          <Image src={hb_logo} alt='hb_log' width={35} height={35} /> 
          <p className='font-bold hover:text-hb-green text-lg'>HackBio</p>
        </Link>
        <div className='flex flex-row gap-10'>
          
          {/** Our Programs */}
          <NavigationMenu>
            <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger className='text-base'>Our Programs</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-75 gap-4">
                <li>

                  <NavigationMenuLink asChild>
                    <Link href="/internship">
                      <div className="font-bold">Our Internships</div>
                      <div className="text-muted-foreground ">
                        Explore our mentored, project-based, professional internships
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/learning">
                      <div className="font-bold">Career based learning</div>
                      <div className="text-muted-foreground">
                        Build your career in bioinformatics in a structured way, one skill at a time.
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/hire-talents">
                      <div className="font-bold">Hire Talents</div>
                      <div className="text-muted-foreground">
                        Build your career in bioinformatics in a structured way, one skill at a time.
                      </div>
                    </Link>
                  </NavigationMenuLink>

                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>

        {/** Resources */}
          <NavigationMenu>
            <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger className='text-base'>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-75 gap-4">
                <li>

                  {/* <NavigationMenuLink asChild>
                    <Link href="/pricing">
                      <div className="font-bold">Pricing</div>
                      <div className="text-muted-foreground ">
                        See how to pay for what matters to you
                      </div>
                    </Link>
                  </NavigationMenuLink> */}

                  <NavigationMenuLink asChild>
                    <Link href="/blog">
                      <div className="font-bold">Blog</div>
                      <div className="text-muted-foreground ">
                        Interesting articles and musings on Bioinformatics, AI and Data Science at HackBio
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/opportunities-in-bfx">
                      <div className="font-bold">External Opportunities</div>
                      <div className="text-muted-foreground ">
                        External opportunities in bioinformatics
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/job-report">
                      <div className="font-bold">Bioinformatics Job Reports</div>
                      <div className="text-muted-foreground ">
                        Read our report on Job opportunities in Bioinformatics (2024)
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/faqs">
                      <div className="font-bold">FAQs</div>
                      <div className="text-muted-foreground ">
                        Frequently asked questions about HackBio
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/testimonial">
                      <div className="font-bold">Testimonials</div>
                      <div className="text-muted-foreground ">
                        Stories from learners who completed HackBio programs
                      </div>
                    </Link>
                  </NavigationMenuLink>

                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>

        </div>
        {loginStatus ?
          <Link href="/dashboard">
            <HbButton text='Dashboard' type='primary'/>
          </Link> :
          <Link href="/dashboard">
            <HbButton text='Sign In/Up' type='primary'/>
          </Link>
        }

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
            <Link href='/internship'>Internships</Link>
            <Link href='/learning'>Explore Careers Tracks</Link>
            <Link href='/hire-talents'>Hire Talents</Link>
            <Link href='/blog'>Blog</Link>
            <Link href='/testimonial'>Testimonials</Link>
            {/* <Link href='/learning' className="text-lg font-medium text-black">Career Paths</Link> */}
            {loginStatus ?
              <Link href="/dashboard">
                <HbButton text='My Dashboard' type='primary'/>
              </Link> :
              <Link href="/dashboard">
                <HbButton text='Sign In/Up' type='primary'/>
              </Link>
            }
          </div>
        )}
      </div>

    </main>
  )
}
