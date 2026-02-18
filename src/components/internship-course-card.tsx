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
  progressPercent?: number; // 0 - 100
  directTo?: string; // Optional prop for navigation
};

const InternshipCourseCard = ({ image, title, desc, lessons, weeks, directTo, progressPercent }: UpcomingCourseCardProps) => {
  const pct = Math.max(0, Math.min(100, Number(progressPercent) || 0));

  const CircleProgress = ({ value, size = 44, stroke = 5 }: { value: number; size?: number; stroke?: number }) => {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - value / 100);

    return (
      <div className="flex items-center justify-center" aria-label={`Progress ${Math.round(value)}%`}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className="text-gray-200"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className="text-green-600"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-gray-700 text-[11px] font-semibold"
          >
            {`${Math.round(value)}%`}
          </text>
        </svg>
      </div>
    );
  };

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
          <div className='flex flex-row items-center justify-between'>
            {directTo && <Link href={directTo}> <HbButton type='primary' text='Proceed' /> </Link>}
            {/* <CircleProgress value={pct} /> */}
          </div>
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

            {/* Button + Progress */}
            <div className="flex items-center justify-between w-full">
              {directTo && (
                <a href={directTo}>
                  {directTo && <Link href={directTo}> <HbButton type='primary' text='Proceed' /> </Link>}
                </a>
              )}
              {/* <CircleProgress value={pct} size={40} stroke={5} /> */}
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default InternshipCourseCard;
