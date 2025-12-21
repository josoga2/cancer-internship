'use client';

import Image, { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button'; // Adjust this import if you're using another UI lib
import Link from 'next/dist/client/link';
import HbButton from './widgets/hb-buttons';

type UpcomingCourseCardProps = {
  image: StaticImageData|string; // Accepts both StaticImageData and string for image source
  title: string;
  desc: string;
  lessons: number;
  weeks: number;
  directTo?: string; // Optional prop for navigation
};

const UpcomingCourseCard = ({ image, title, desc, lessons, weeks, directTo }: UpcomingCourseCardProps) => {
  return (
    <main className='md:max-w-1/3'>
      <div className="hidden md:flex flex-row gap-10 items-start justify-start  border-2 border-green-600 rounded-md px-5 py-5 w-112.5 h-fit bg-white">
        <img
          src={typeof image === 'string' ? image : image.src}
          alt={title}
          width={50}
          height={50}
          className="border-2 rounded-md max-w-37.5 max-h-37.5 object-contain"
        />
        <div className='flex flex-col gap-5 w-full'>
          <p className="text-base font-bold">{title}</p>
          <p className="text-sm text-gray-500">{desc}</p>
          {directTo && <Link href={directTo}> <HbButton type='primary' text='Proceed' /> </Link>}
        </div>
      </div>

      {/**MOBILE */}
      <div className=" md:hidden w-full flex flex-col justify-start items-start">
        <div className="flex flex-col gap-2 items-start justify-start relative border-2 border-green-600 rounded-md px-4 py-5 max-w-62.5 bg-white">
          
          {/* Course image */}
          <img
            src={typeof image === 'string' ? image : image.src}
            alt={title}
            width={55}
            height={55}
            className="border-2 rounded-md max-w-full object-cover"
          />

          {/* Text content */}
          <div className="flex flex-col gap-3 w-full">
            <p className="text-base font-bold text-start">{title}</p>
            <p className="text-sm text-start text-gray-500">{desc}</p>

            {/* Button */}
            {directTo && <a href={directTo}>
              {directTo && <Link href={directTo}> <HbButton type='primary' text='Proceed' /> </Link>}
            </a>}
          </div>
        </div>
      </div>

    </main>
  );
};

export default UpcomingCourseCard;
