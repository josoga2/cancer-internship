import React from "react";
import HbButtons from "../hb-buttons";
import HbButton from "../hb-buttons";
import { EnrollDialog } from "@/components/enroll/enroll";
import { Blocks, Bubbles, ChartPie, Gift, Hammer } from "lucide-react";



// Props: upcoming, coursesList, internshipStatus
export default function LearningExperience({ internshipStatus }: { internshipStatus: string }) {

  return (
    <main>
      <div key={internshipStatus} className="hidden w-full py-10  h-full md:flex flex-col gap-5 px-10  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen pb-10">
        {/*desktop*/}
        <div className="w-full flex flex-col bg-hb-lightgreen rounded-lg p-10 gap-5 mb-10 border">
          <span className="text-3xl font-bold  px-10 flex flex-row items-center gap-2"> <Gift/> <p>  The HackBio Experience </p> </span>
          <p className="px-10 text-justify">HackBio was modelled after real-world bioinformatics and data science projects. The experience is fully hands-on and practical not passive tutorials. Every module is task-driven, focused on mastering a tool, and designed to mirror how work is done in actual research and industry settings.</p>
          
          <div className="grid grid-cols-2 px-10 gap-10">
            <div className=" flex flex-col p-5 justify-start items-start gap-5 w-full bg-yellow-50 border rounded-md ">
              <Blocks className="text-hb-green"/>
              <p className="font-bold">Learn Bioinformatics by Doing with Structure</p>
            </div>

            <div className=" flex flex-col p-5 justify-start items-start gap-5 w-full border bg-purple-50 rounded-md ">
              <Hammer className="text-hb-green"/>
              <p className="font-bold">Train With Tools Employers and Labs Actually Use</p>
            </div>

            <div className=" flex flex-col p-5 justify-start items-start gap-5 w-full border bg-red-50 rounded-md ">
              <Bubbles className="text-hb-green"/>
              <p className="font-bold">Get Mentorship and Direction Most Programs Avoid</p>
            </div>

            <div className=" flex flex-col p-5 justify-start items-start gap-5 w-full border bg-cyan-50 rounded-md ">
              <ChartPie className="text-hb-green"/>
              <p className="font-bold">Build Proof of Skill, Not Certificates of Attendance</p>
            </div>


          </div>
        </div>
       

        <div className="w-full flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-center px-10">Who is this internship for?</p>
        </div>

        <div className="flex flex-row gap-24 items-start justify-center w-full mx-auto px-5">
          <div className="flex flex-col gap-5 max-w-2/5 rounded border-2 p-10  border-hb-green  shadow-hb-green items-start justify-start  ">
          <span className="flex flex-row items-start font-bold text-2xl gap-2 flex-wrap"> <p>You are a</p> <p className="text-hb-green underline">great</p> <p className="">fit if:</p> </span>
          <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
            <li className="text-base"> Self-taught learners who are tired of piecing together YouTube videos and random tutorials, and want <strong>  a structured, real-world learning experience.</strong> </li>
            <li className="text-base"> Ambitious beginners in bioinformatics, data science, or computational biology who are ready to roll up their sleeves and <strong> get hands-on.</strong> </li>
            <li className="text-base"> Researchers or postgrads who want to learn how to analyze biological data, <strong> build pipelines, or publish with confidence.</strong> </li>
            <li className="text-base"> Anyone ready to put in the work, follow the roadmap, and build a real portfolio they can proudly show <strong> employers or grad schools.</strong> </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 max-w-2/5 rounded border-2 p-10 border-zinc-500 shadow-2xl shadow-zinc-300 items-start justify-start ">
          <div className="flex flex-row items-start font-bold text-2xl gap-2 flex-wrap"> <p>You are</p> <p className="text-red-600 underline">not </p> <p>a fit if:</p> </div>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
              <li className="text-base"> Those looking for a  <strong> “watch-and-passively-consume”</strong> experience — this is hands-on, project-based learning. </li>
              <li className="text-base"> People expecting <strong> instant results. </strong> - We believe growth is earned, not gifted </li>
              <li className="text-base"> Folks <strong> unwilling to collaborate</strong> — HackBio thrives on peer-to-peer support, team challenges, and real-world interactions. </li>
              <li className="text-base"> Advanced experts looking for deep academic theory — we focus on practical skills, tools, and industry application.</li>
            </ul>
          </div>
        </div>

        
      </div>

      {/*mobile*/}

      <div className="flex flex-col w-full md:hidden gap-5 rounded-xl text-sm">
        <div className="w-full flex flex-col bg-hb-lightgreen rounded-lg p-2 gap-5 mb-2 border">
          <span className="text-2xl font-bold p-2 pt-5 items-center gap-2"> <Gift/> <p>  The HackBio Experience </p> </span>
          <p className="px-2 text-justify">HackBio was modelled after real-world bioinformatics and data science projects. The experience is fully hands-on and practical not passive tutorials. Every module is task-driven, focused on mastering a tool, and designed to mirror how work is done in actual research and industry settings.</p>
          
          <div className="flex flex-col px-2 gap-2">
            <div className=" flex flex-col p-5 justify-start items-start gap-5 w-full bg-yellow-50 border rounded-md ">
              <Blocks className="text-hb-green"/>
              <p className="font-bold">Learn Bioinformatics by Doing with Structure</p>
            </div>

            <div className=" flex flex-col p-5 justify-start items-start gap-5 w-full border bg-purple-50 rounded-md ">
              <Hammer className="text-hb-green"/>
              <p className="font-bold">Train With Tools Employers and Labs Actually Use</p>
            </div>

            <div className=" flex flex-col p-5 justify-start items-start gap-5 w-full border bg-red-50 rounded-md ">
              <Bubbles className="text-hb-green"/>
              <p className="font-bold">Get Mentorship and Direction Most Programs Avoid</p>
            </div>

            <div className=" flex flex-col p-5 justify-start items-start gap-5 w-full border bg-cyan-50 rounded-md ">
              <ChartPie className="text-hb-green"/>
              <p className="font-bold">Build Proof of Skill, Not Certificates of Attendance</p>
            </div>


          </div>
        </div>
       
        <div className="w-full flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-start px-2">Who is this internship for?</p>
        </div>

        <div className="flex flex-col gap-5 items-start justify-center w-full px-2">
          <div className="flex flex-col gap-5 w-full rounded border-2 p-2 pt-5  border-hb-green  shadow-hb-green items-start justify-start  ">
            <span className="flex flex-row items-start font-bold text-2xl gap-2 flex-wrap"> <p>You are a</p> <p className="text-hb-green underline">great</p> <p className="">fit if:</p> </span>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
              <li className="text-sm"> Self-taught learners who are tired of piecing together YouTube videos and random tutorials, and want <strong>  a structured, real-world learning experience.</strong> </li>
              <li className="text-sm"> Ambitious beginners in bioinformatics, data science, or computational biology who are ready to roll up their sleeves and <strong> get hands-on.</strong> </li>
              <li className="text-sm"> Researchers or postgrads who want to learn how to analyze biological data, <strong> build pipelines, or publish with confidence.</strong> </li>
              <li className="text-sm"> Anyone ready to put in the work, follow the roadmap, and build a real portfolio they can proudly show <strong> employers or grad schools.</strong> </li>
            </ul>
          </div>
        <div className="flex flex-col gap-5 w-full rounded border-2 p-2 pt-5 border-zinc-500 shadow-2xl shadow-zinc-300 items-start justify-start ">
          <div className="flex flex-row items-start font-bold text-2xl gap-2 flex-wrap"> <p>You are</p> <p className="text-red-600 underline">not </p> <p>a fit if:</p> </div>
            <ul className="flex flex-col gap-5 items-start justify-start w-full list-disc pl-5">
              <li className="text-sm"> Those looking for a  <strong> “watch-and-passively-consume”</strong> experience — this is hands-on, project-based learning. </li>
              <li className="text-sm"> People expecting <strong> instant results. </strong> - We believe growth is earned, not gifted </li>
              <li className="text-sm"> Folks <strong> unwilling to collaborate</strong> — HackBio thrives on peer-to-peer support, team challenges, and real-world interactions. </li>
              <li className="text-sm"> Advanced experts looking for deep academic theory — we focus on practical skills, tools, and industry application.</li>
            </ul>
          </div>
        </div>

      </div>
    </main>
    
  );
}
