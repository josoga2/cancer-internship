'use client'
import Image from 'next/image'
import hb_logo from '../../../public/hb_logo.png'
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react'
import Link from 'next/link';
import HbButton from '../widgets/hb-buttons';
import api from '@/api';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
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
    <main className='fixed left-0 top-0 z-50 w-full bg-white pb-2 text-[#1f1f24] shadow-md dark:bg-[#0f172a] dark:text-white dark:shadow-black/30'>
    <div className="hidden md:flex md:max-w-7xl bg md:m-auto md:items-center pt-5 md:justify-between">
        <Link href='/' className='flex flex-row gap-3 items-center'> 
          <Image src={hb_logo} alt='hb_log' width={35} height={35} /> 
          <p className='text-lg font-bold hover:text-hb-green'>HackBio</p>
        </Link>
        <div className='flex flex-row gap-10'>
          
          {/** Our Programs */}
          <NavigationMenu>
            <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger className='text-base bg-transparent text-[#1f1f24] hover:bg-neutral-100 dark:text-white dark:hover:bg-slate-800'>Our Programs</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-75 gap-4 bg-white text-[#1f1f24] dark:bg-[#111827] dark:text-white">
                <li>

                  <NavigationMenuLink asChild>
                    <Link href="/internship">
                      <div className="font-bold">Our Internships</div>
                      <div className="text-muted-foreground dark:text-slate-300">
                        Explore our mentored, project-based, professional internships
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/learning">
                      <div className="font-bold">Career based learning</div>
                      <div className="text-muted-foreground dark:text-slate-300">
                        Build your career in bioinformatics in a structured way, one skill at a time.
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/hire-talents">
                      <div className="font-bold">Hire Talents</div>
                      <div className="text-muted-foreground dark:text-slate-300">
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
            <NavigationMenuTrigger className='text-base bg-transparent text-[#1f1f24] hover:bg-neutral-100 dark:text-white dark:hover:bg-slate-800'>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-75 gap-4 bg-white text-[#1f1f24] dark:bg-[#111827] dark:text-white">
                <li>

                  {/* <NavigationMenuLink asChild>
                    <Link href="/pricing">
                      <div className="font-bold">Pricing</div>
                      <div className="text-muted-foreground dark:text-slate-300">
                        See how to pay for what matters to you
                      </div>
                    </Link>
                  </NavigationMenuLink> */}

                  <NavigationMenuLink asChild>
                    <Link href="/pricing">
                      <div className="font-bold">Enrollment Plan</div>
                      <div className="text-muted-foreground dark:text-slate-300">
                        Compare plans and choose how you want to enroll
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/blog">
                      <div className="font-bold">Blog</div>
                      <div className="text-muted-foreground dark:text-slate-300">
                        Interesting articles and musings on Bioinformatics, AI and Data Science at HackBio
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/opportunities-in-bfx">
                      <div className="font-bold">External Opportunities</div>
                      <div className="text-muted-foreground dark:text-slate-300">
                        External opportunities in bioinformatics
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/job-report">
                      <div className="font-bold">Bioinformatics Job Reports</div>
                      <div className="text-muted-foreground dark:text-slate-300">
                        Read our report on Job opportunities in Bioinformatics (2024)
                      </div>
                    </Link>
                  </NavigationMenuLink>

                  <NavigationMenuLink asChild>
                    <Link href="/faqs">
                      <div className="font-bold">FAQs</div>
                      <div className="text-muted-foreground dark:text-slate-300">
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
    <div className="relative z-0 flex w-full max-w-full items-center justify-between overflow-x-hidden box-border bg-white px-4 pt-4 dark:bg-[#0f172a] md:hidden">
      {/* Logo */}
        <Link href="/">
          <Image src={hb_logo} alt="hb_logo" width={35} height={35} />
        </Link>

        {/* Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-black dark:text-white">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Drawer */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-40 flex w-full max-w-full flex-col gap-4 overflow-x-hidden box-border bg-white px-6 py-6 shadow-lg transition-all dark:bg-[#111827] dark:text-white dark:shadow-black/30">
            <Link href='/internship'>Internships</Link>
            <Link href='/learning'>Explore Careers Tracks</Link>
            <Link href='/hire-talents'>Hire Talents</Link>
            <Link href='/pricing'>Enrollment Plan</Link>
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
