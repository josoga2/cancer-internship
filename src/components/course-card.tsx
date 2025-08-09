'use client';

import Image, { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button'; // Adjust this import if you're using another UI lib

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
    <main className='max-w-1/2'>
      <div className="hidden md:flex flex-row gap-10 items-start justify-start  border-2 border-green-600 rounded-md px-5 py-5 w-1/2 h-fit bg-white">
        <img
          src={typeof image === 'string' ? image : image.src}
          alt={title}
          width={75}
          height={75}
          className="border-2 rounded-md max-w-[150px] max-h-[150px] object-contain"
        />
        <div className='flex flex-col gap-5 w-full'>
          <p className="text-lg font-bold">{title}</p>
          <p className="text-base text-gray-500">{desc}</p>
          <a href={directTo}> <Button className="bg-hb-green text-lg py-5 px-5 font-bold w-fit border-2 border-zinc-700  bottom-5">Proceed </Button></a>
        </div>
      </div>

      {/**MOBILE */}
      <div className=" md:hidden w-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-4 items-center justify-center relative border-2 border-green-600 rounded-md px-4 py-5 w-[250px] bg-white">
          
          {/* Course image */}
          <img
            src={typeof image === 'string' ? image : image.src}
            alt={title}
            width={50}
            height={50}
            className="border-2 rounded-md w-1/2 max-w-full object-cover"
          />

          {/* Text content */}
          <div className="flex flex-col gap-3 w-full">
            <p className="text-lg font-bold text-center">{title}</p>
            <p className="text-base text-center text-gray-500">{desc}</p>

            {/* Button */}
            <a href={directTo}>
              <Button className="bg-hb-green text-base py-3 px-4 font-bold w-full border-2 border-zinc-700 mt-2">
                Proceed
              </Button>
            </a>
          </div>
        </div>
      </div>

    </main>
  );
};

export default UpcomingCourseCard;
