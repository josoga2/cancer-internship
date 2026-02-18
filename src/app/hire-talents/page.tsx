import React from "react";
import { Button } from "@/components/ui/button"
import winfred from "../../../public/winfred.svg"
import testimonials from '../../../public/Testimonials.svg'
import sm_testimonial from '../../../public/sm_testimonial.svg'
import hire_process from '../../../public/hire_process.svg'
import sm_hire_process from '../../../public/sm_hire_process.svg'
import talent_map from '../../../public/wolrd-map.png'
import ayano from '../../../public/ayano.jpeg'
import adekoya from '../../../public/adekoya.jpeg'
import barve from '../../../public/barve.jpeg'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import Image from "next/image";
import Navbar from "@/components/Nav/navbar";
import { BookOpenCheck, BrainCircuit, Cable, Pill, Tablets } from "lucide-react";
import Footer from "@/components/Nav/footer";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkDeflist from "remark-deflist";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";


const job_types = `| **Genomics (Bulk & Single-Cell)** | **Biomedical AI** | **Drug Development** |
| --- | --- | --- |
| Genomics Data Scientist | Biomedical Data Scientist (AI/ML) | Computational Chemoinformatician |
| Next-Generation Sequencing (NGS) Analyst | Medical Imaging AI Specialist (omics + imaging fusion) | Pharmacogenomics Data Scientist |
| Single-Cell Bioinformatician | Computational Biologist (Deep Learning) | Bioinformatics Scientist (Drug Discovery) |
| Population Genomics Scientist | AI Scientist – Drug Response Prediction | Drug Hunter |
| Clinical Genomic Data Analyst | Machine Learning Engineer (Biomedical Applications) | Clinical Bioinformatics Analyst |
| Epigenomics Data Scientist | Predictive Modeling Scientist (Disease Risk & Progression) | Computational Systems Pharmacologist |
| Transcriptomics Bioinformatician (bulk & single-cell RNA-seq) | Clinical Data AI Scientist | Target Discovery Bioinformatician |
| Variant Interpretation Scientist (WGS/WES) |  | Biomarker Discovery Scientist (Omics Data) |
| Multi-omics Integration Bioinformatician |  | Computational Toxicologist |
|  |  | Precision Medicine Data Scientist |`


const sm_job_type = `### **Drug Development**

1. Computational Chemoinformatician
2. Pharmacogenomics Data Scientist
3. Bioinformatics Scientist (Drug Discovery)
4. Translational Bioinformatician
5. Clinical Bioinformatics Analyst
6. Computational Systems Pharmacologist
7. Target Discovery Bioinformatician
8. Biomarker Discovery Scientist (Omics Data)
9. Computational Toxicologist
10. Precision Medicine Data Scientist

---

### **Genomics (Bulk & Single-Cell)**

1. Genomics Data Scientist
2. Next-Generation Sequencing (NGS) Analyst
3. Single-Cell Bioinformatician
4. Population Genomics Scientist
5. Clinical Genomic Data Analyst
6. Epigenomics Data Scientist
7. Transcriptomics Bioinformatician (bulk & single-cell RNA-seq)
8. Variant Interpretation Scientist (WGS/WES)
9. Multi-omics Integration Bioinformatician
10. Computational Geneticist

---

### **Biomedical AI**

1. Biomedical Data Scientist (AI/ML)
2. Computational Biologist (Deep Learning)
3. AI Scientist – Drug Response Prediction
4. Machine Learning Engineer (Biomedical Applications)
5. Medical Imaging AI Specialist (omics + imaging fusion)
6. Clinical Data AI Scientist
7. NLP Scientist (Biomedical Text Mining)
8. Multi-Modal AI Researcher (omics, EHR, imaging)
9. Predictive Modeling Scientist (Disease Risk & Progression)
10. Computational Health Data Scientist
`
export default function Home() {
  return (
    <main>
      <Navbar />
    <div className="w-full">
      <div className="hidden md:flex w-full flex-col md:max-w-screen-lg bg md:m-auto md:items-center pt-10 md:justify-between">
        <div 
          className="w-full flex flex-row items-center justify-start py-20 relative bg-hb-lightgreen"
        >
          <div className="w-1/2 h-full items-start text-start flex flex-col gap-5 px-10 ">
            <p className= 'text-4xl font-bold leading-12'>Access the Top 1% of HackBio graduates</p>
            <p className="text-base w-2/3 text-gray-700">Job-ready bioinformaticians and computational data scientists for your scientific teams. Top labs and companies hire our graduates on freelance, full time and PhD roles for mission critical projects  </p>
            {/* <img src={hb_flow.src} alt="hb_flow" className="w-[550px] h-full py-5"/> */}
            <div className="flex flex-row gap-5 pt-5">
              <a href="/internship"><Button className="bg-white border-2 border-hb-green text-hb-green hover:text-white text-base py-6 px-7 font-bold">Hire a Top Bioinformatician</Button></a>              
            </div>
            <p className="text-xs font-bold">Risk free, Pay only if satisfied</p>
          </div>
          <div className="flex flex-row gap-5 py-10 items-center w-1/2 justify-center">
            <img src={talent_map.src} alt="biology" className="w-[900px] h-full" /> 
          </div>
        </div>

        <div className="py-10 w-full flex flex-col gap-5 px-10 border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
          <p className="text-xl font-bold text-center"> 100+ Organizations have hired our graduates </p>
          <div className="flex flex-row gap-10 py-5 items-center justify-center">
            <img src={testimonials.src} alt="organizations-that-trust-hackbio" className="w-[800px]" />
            
          </div>
        </div>

            {/**for companies */}
        <div className="pt-10 pb-10  w-full h-full  flex flex-col gap-5 px-1 bg-hb-lightgreen border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen ">
          
          <div className="grid grid-cols-2 gap-10 items-center justify-center">
          
          <div className="flex flex-row gap-5 py-10 items-center justify-center">
            <img src={talent_map.src} alt="biology" className="w-[900px] h-full" /> 
          </div>

          <div className="flex flex-col gap-3 w-full">
            <p className="text-start font-semibold text-hb-green text-base"> {`>_ Why Choose HackBio Talents`}</p>
            <p className="text-base font-bold">Vetted bioinformatics talent at your fingertips.</p>
            <p className="">Stop gambling with resumes. HackBio talent is filtered through hands-on pipelines and real datasets.</p>
            <p className="text-base font-bold">Right fit guaranteed!</p>
            <ul className="pl-10 flex flex-col gap-2">
              <li className="list-disc"> <span className="font-bold underline">Real world projects: </span> Every graduate has executed WGS, RNA-seq, and ML workflows.</li>
              <li className="list-disc"> <span className="font-bold underline">Domain expertise: </span> The right background knowledge for the right job specification.</li>
              <li className="list-disc">  <span className="font-bold underline">Portfolio Proof: </span> GitHub repositories, writing samples, reports, and Dockerized pipelines. </li>
              <li className="list-disc">  <span className="font-bold underline">Bi-Weekly Assessment: </span> Continuous performance scoring ensures readiness. </li>
              <li className="list-disc">  <span className="font-bold underline">Flexible Engagements: </span> Hire interns, PhD students, contractors, or full-time staff. </li>

            </ul>
            {/* <div className="flex flex-row gap-5 py-5">
              <a href="/internship"><Button className="bg-green-600 text-lg py-6 px-7 font-bold">Hire Talents →</Button></a>

            </div> */}

          </div>
          </div>
        </div>

        <div className="py-5 bg-white  border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen w-full h-full  flex flex-col gap-5 px-10">
          
          <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex flex-col gap-3 w-full items-center justify-center">
                    <p className="text-start font-semibold text-hb-green text-2xl"> Simple and effective hiring process </p>
                    <div className="flex flex-row gap-5 py-10 items-center justify-center">
                        <img src={hire_process.src} alt="biology" className="w-[900px]" />
                    </div>
                    
                    <div className="flex flex-row gap-5 py-5">
                        <a href="/internship"><Button className="bg-green-600 text-base py-6 px-7 font-bold"> Request Talents Now</Button></a>
                    </div>

                </div>
            
                
            </div>
        </div>

        <div className="py-10 w-full h-full flex flex-col gap-5 px-10 bg-hb-lightgreen items-center justify-center ">
          <p className="text-xl font-bold text-center"> Who we serve</p>
          <div className="flex flex-row gap-10 py-5 items-start justify-start">

            <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] border-hb-green border-2 p-5 rounded-md">
              <BookOpenCheck className="text-red-400 bg-amber-100" size={30} />
              <p className="text-base font-bold pt-2 text-start">Industry Teams</p>
              <p className="text-base text-gray-700 text-start">Agile bioinformatics talent for startups, CROs, and pharma. Scale projects without lengthy hiring cycles.</p>
            </div>

            <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] border-hb-green border-2 p-5 rounded-md">
              <BrainCircuit className="text-blue-500 bg-amber-100" size={30} />
              <p className="text-base font-bold pt-2 text-start">Academic Teams</p>
              <p className="text-base text-gray-700 text-start">Get technical excellence and experience in the next PhD student for your research group. </p>
            </div>
            
          </div>
          
        </div>

        <div className="py-10 w-full h-full flex flex-col gap-5 px-10  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
          <p className="text-xl font-bold text-center">Core Specializations</p>
          <p className="text-center text-base">Top-tier, high demand specializations across industry and academia </p>
          <div className="flex flex-row gap-10 py-5 items-start justify-start">

            <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] bg-white shadow-2xl p-5 border-gray-200 border-2 rounded-md">
              <Tablets className="text-red-400 bg-amber-100" size={30} />
              <p className="text-base font-bold pt-2 text-start">Genomics</p>
              <p className="text-base text-gray-700 text-start">Develop competence in bulk and single cell genomics across multi-omics modalities</p>
              
              <p className="text-base font-bold hover:underline">Learn More → </p>

            </div>

            <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] bg-white shadow-2xl p-5 border-gray-200 border-2 rounded-md">
              <BrainCircuit className="text-blue-500 bg-amber-100" size={30} />
              <p className="text-base font-bold pt-2 text-start">Biomedical AI </p>
              <p className="text-base text-gray-700 text-start">Learn to train and deploy AI models for informing decisions in healthcare and pharma. </p>

              {/**Biomedical AI */}
              <p className="text-base font-bold hover:underline">Learn More → </p>

            </div>

            <div className="flex flex-col gap-3 items-start justify-start text-center w-[250px] bg-white shadow-2xl p-5 border-gray-200 border-2 rounded-md">
              <Pill className="text-hb-green bg-amber-100" size={30} />
              <p className="text-base font-bold pt-2 text-start">Drug Development</p>
              <p className="text-base text-gray-700 text-start">Learn to combine AI with structure and ligand based drug development </p>

              <p className="text-base font-bold hover:underline">Learn More → </p>

              
            </div>
            
          </div>

          <div className="w-4/5 border-2 rounded-md border-hb-green p-5 bg-white prose prose-base leading-tight ">
                <p className="text-base font-bold">Available Job Titles</p>
                <article> <Markdown
                    remarkPlugins={[
                        remarkGfm,
                        remarkMath,
                        remarkDeflist
                    ]}
                    rehypePlugins={[
                        rehypeRaw,
                        rehypeKatex,
                        rehypeHighlight
                    ]}
                    >
                    {job_types}
                </Markdown>
                </article>
            </div>

          
        </div>

        <div className="py-5 w-full h-full bg-hb-lightgreen flex flex-col gap-5 px-10">
          <p className="text-xl font-bold text-center">Here from our Alums and Graduates</p>


          <Carousel>
            <CarouselContent>
              <CarouselItem>
                {/**1 */}
                <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
                  <Image src={winfred} alt="biology" className="rounded-full w-[100px]" />
                  <div className="flex flex-col gap-2 ">
                    <p className="text-base text-gray-700">{`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}</p>
                    <p className="text-base font-bold pt-5">{`Winfred Gatua (Now a bioinformatician at in University of Bristol, UK)`}</p>
                  </div>
                </div>

              </CarouselItem>

              <CarouselItem>
                {/**2 */}
                <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
                  <Image src={ayano} alt="biology" className="rounded-full w-[100px]" />
                  <div className="flex flex-col gap-2 ">
                    <p className="text-base text-gray-700">{`"Through the [internship], I was introduced to the world of genomics and bioinformatics, gaining hands-on experience with tools and pipeline development that gave me a strong foundation. That single event helped me clarify my interests and set me on the data-driven biomedica path I walk today. I will always be grateful to the access, exposure and direction that came from that one LinkedIn post."`}</p>
                    <p className="text-base font-bold pt-5">{`Temitope Ayano (Now a Data Analyst at GFA Tech, Nigeria)`}</p>
                  </div>
                </div>

              </CarouselItem>
              <CarouselItem>
                {/**3 */}
                <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
                  <Image src={adekoya} alt="adekoya" className="rounded-full w-[100px]" />
                  <div className="flex flex-col gap-2 ">
                    <p className="text-base text-gray-700">{`"HackBio provided me with my first real-world bioinformatics project, allowing me to apply the skills I had been learning in a meaningful way. The experience bridged the gap between theory and practice, and completing the project gave me a huge confidence boost. The training phase at HackBio was also highly motivating, with constant help from mentors. It reinforced the importance of community and mentorship in learning technical skills."`}</p>
                    <p className="text-base font-bold pt-5">{`Aanuoluwa Adekoya (Now a bioinformatician at in University of Tennessee, Knoxville, USA.)`}</p>
                  </div>
                </div>

              </CarouselItem>

              <CarouselItem>
                {/**4 */}
                <div className="flex flex-row gap-10 items-center justify-center max-w-3/5 mx-auto py-5">
                  <Image src={barve} alt="barve" className="rounded-full w-[100px]" />
                  <div className="flex flex-col gap-2 ">
                    <p className="text-base text-gray-700">{`"[I] started without a programming background. HackBio played a crucial role in my growth in bioinformatics by giving me hands-on experince in metagenomics analysis, team collaboration and leadership. The internship was structured in multiple stages with a final project."`}</p>
                    <p className="text-base font-bold pt-5">{`Isha Barve (Now a bioinformatician at Lubeck University, Germany)`}</p>
                  </div>
                </div>

              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-hb-green text-white h-[75px] w-[75px] text-4xl" />
            <CarouselNext className="bg-hb-green text-white h-[75px] w-[75px] text-4xl" />
          </Carousel>

          
            <div className="flex items-start justify-center">
            <Button className="bg-green-600 text-base py-6 px-10 font-bold w-fit">Start Learning</Button>
            </div>
        </div>


      </div>
      {/**Mobile */}
      <div className="flex flex-col w-full md:hidden bg pt-20 px-5 gap-10">

        {/* Hero Section */}
        <div className="flex flex-col gap-5 text-start">
          <p className="text-3xl font-bold leading-tight">
            Access the Top 1% of HackBio graduates
          </p>
          <p className="text-base text-gray-700">
            Job-ready bioinformaticians and computational data scientists for your scientific teams. Top labs and companies hire our graduates on freelance, full time and PhD roles for mission critical projects.
          </p>
          <div className="flex flex-col gap-3">
            
            <a href="/internship">
              <Button className="bg-white border-2 border-hb-green text-hb-green hover:text-white text-base py-4 px-6 font-bold w-full">
                Hire a Top Bioinformatician
              </Button>
            </a>
          </div>
        </div>

        {/* Organizations */}
        <div className="flex flex-col items-center gap-5">
          <p className="text-base font-bold text-center">
            100+ Organizations hire our graduates
          </p>
          <img
            src={sm_testimonial.src}
            alt="organizations-that-trust-hackbio"
            className="w-full"
          />
        </div>


        <div className="flex flex-col gap-5 p-5 border border-hb-lightgreen bg-hb-lightgreen rounded-xl">
          <img src={talent_map.src} alt="hackbio talent map" className="w-full rounded-lg" />
          <p className="font-semibold text-hb-green text-base">{`>_ Why Choose HackBio Talents`}</p>
          <p className="text-base font-bold">Vetted bioinformatics talent at your fingertips.</p>
          <p className="text-base">
            Stop gambling with resumes. HackBio talent is filtered through hands-on
          </p>
          <p className="text-base font-bold"> Right fit guaranteed! </p>
        <ul className="pl-5 list-disc text-base space-y-2">
            <li className="list-disc"> <span className="font-bold underline">Real world projects: </span> Every graduate has executed WGS, RNA-seq, and ML workflows.</li>
              <li className="list-disc"> <span className="font-bold underline">Domain expertise: </span> The right background knowledge for the right job specification.</li>
              <li className="list-disc">  <span className="font-bold underline">Portfolio Proof: </span> GitHub repositories, writing samples, reports, and Dockerized pipelines. </li>
              <li className="list-disc">  <span className="font-bold underline">Frequent Assessment: </span> Continuous performance scoring ensures readiness. </li>
              <li className="list-disc">  <span className="font-bold underline">Flexible Engagements: </span> Hire interns, PhD students, contractors, or full-time staff. </li>
        </ul>
          <a href="#">
            <Button className="bg-green-600 text-base py-4 px-6 font-bold w-full">
              Hire Talents →
            </Button>
          </a>
          
        </div>

        <div className="flex flex-col gap-5 bg-white p-5 rounded-xl">
          <img src={sm_hire_process.src} alt="biology" className="w-full rounded-lg" />
          <a href="#">
            <Button className="bg-green-600 text-base py-4 px-6 font-bold w-full">
              Hire Talents →
            </Button>
          </a>
          
        </div>


        {/* Why HackBio Works */}
        <div className="flex flex-col gap-5 p-5 bg-hb-lightgreen rounded-xl">
          <p className="text-base font-bold text-center"> Who we serve</p>
          <div className="flex flex-col gap-5">
            <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
              <BrainCircuit className="text-red-400 bg-amber-100" size={30} />
              <p className="font-bold">Industry Teams</p>
              <p className="text-base text-gray-700">
                We break down complex topics into manageable projects and tasks, with clear milestones and deliverables.              
              </p>
            </div>
            <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
              <BookOpenCheck className="text-blue-500 bg-amber-100" size={30} />
              <p className="font-bold">Academic Teams</p>
              <p className="text-base text-gray-700">
                All training are embedded with MCQ, frequent code tasks and actual projects with real world datasets.
              </p>
            </div>
            
          </div>
        </div>

        {/* Core Specializations */}
        <div className="flex flex-col gap-5 p-5  rounded-xl">
          <p className="text-base font-bold text-center">Core Specializations</p>
          <p className="text-base text-center">
            Top-tier, high demand specializations across industry and academia 
          </p>
          <div className="flex flex-col gap-5">
            <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
              <Tablets className="text-red-400 bg-amber-100" size={30} />
              <p className="font-bold">Genomics</p>
              <p className="text-base text-gray-700">
                Develop competence in bulk and single cell genomics across multi-omics modalities              
              </p>
              <a href="#" className="text-base font-bold hover:underline">Learn More → </a>
            </div>
            <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
              <BrainCircuit className="text-blue-500 bg-amber-100" size={30} />
              <p className="font-bold">Biomedical AI</p>
              <p className="text-base text-gray-700">
                Learn to train and deploy AI models for informing decisions in healthcare and pharma.
              </p>
            </div>
            <div className="p-4 border-2 border-hb-green rounded-lg flex flex-col gap-2">
              <Cable className="text-hb-green bg-amber-100" size={30} />
              <p className="font-bold">Drug Development</p>
              <p className="text-base text-gray-700">
                Learn to combine AI with structure and ligand based drug development
              </p>
            </div>
          </div>
        </div>


        <div className="w-full border-2 rounded-md border-hb-green p-5 bg-white prose prose-xs text-base leading-tight ">
           <p className="text-base font-bold">Available Job Titles</p>
            <Markdown
                remarkPlugins={[
                    remarkGfm,
                    remarkMath,
                    remarkDeflist
                ]}
                rehypePlugins={[
                    rehypeRaw,
                    rehypeKatex,
                    rehypeHighlight
                ]}
                >
                {sm_job_type}
            </Markdown>
        </div>
        {/* Learners Testimonials */}
        <div className="flex flex-col gap-5 items-center p-5  rounded-xl">
          <p className="text-base font-bold text-center">Here from our Alums and Graduates</p>
          
          
          
          <div className="flex flex-col gap-5 py-5 items-center justify-start w-full">
            {/**1 */}
            <div className="flex flex-col gap-10 items-center bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
              <Image src={winfred} alt="biology" className="rounded-full w-[100px]" />
              <div className="flex flex-col gap-2 items-center justify-center">
                <p className="text-base text-gray-700">{`"My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team."`}</p>
                <p className="text-base font-bold pt-5  text-center">{`Winfred Gatua (Now a bioinformatician at in University of Bristol, UK)`}</p>
              </div>
            </div>


         
            {/**2 */}
            <div className="flex flex-col gap-10 items-center bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
              <Image src={ayano} alt="biology" className="rounded-full w-[100px]" />
              <div className="flex flex-col gap-2 items-center justify-center">
                <p className="text-base text-gray-700">{`"Through the [internship], I was introduced to the world of genomics and bioinformatics, gaining hands-on experience with tools and pipeline development that gave me a strong foundation. That single event helped me clarify my interests and set me on the data-driven biomedica path I walk today. I will always be grateful to the access, exposure and direction that came from that one LinkedIn post."`}</p>
                <p className="text-base font-bold pt-5  text-center">{`Temitope Ayano (Now a Data Analyst at GFA Tech, Nigeria)`}</p>
              </div>

            </div>
          
            {/**3 */}
            <div className="flex flex-col gap-10 items-center bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
              <Image src={adekoya} alt="adekoya" className="rounded-full w-[100px]" />
              <div className="flex flex-col gap-2 items-center justify-center">
                <p className="text-base text-gray-700">{`"HackBio provided me with my first real-world bioinformatics project, allowing me to apply the skills I had been learning in a meaningful way. The experience bridged the gap between theory and practice, and completing the project gave me a huge confidence boost. The training phase at HackBio was also highly motivating, with constant help from mentors. It reinforced the importance of community and mentorship in learning technical skills."`}</p>
                <p className="text-base font-bold pt-5  text-center">{`Aanuoluwa Adekoya (Now a bioinformatician at in University of Tennessee, Knoxville, USA.)`}</p>
              </div>
            </div>

            {/**4 */}
            <div className="flex flex-col gap-10 items-center bg-hb-lightgreen justify-center w-full mx-auto py-5 px-5">
              <Image src={barve} alt="barve" className="rounded-full w-[100px]" />
              <div className="flex flex-col gap-2 items-center justify-center ">
                <p className="text-base text-gray-700">{`"[I] started without a programming background. HackBio played a crucial role in my growth in bioinformatics by giving me hands-on experince in metagenomics analysis, team collaboration and leadership. The internship was structured in multiple stages with a final project."`}</p>
                <p className="text-base font-bold pt-5 text-center">{`Isha Barve (Now a bioinformatician at Lubeck University, Germany)`}</p>
              </div>
          </div>
              
            {/* <CarouselPrevious className="bg-hb-green text-white h-[75px] w-[75px] text-4xl" />
            <CarouselNext className="bg-hb-green text-white h-[75px] w-[75px] text-4xl" /> */}
        </div>

          <Button className="bg-green-600 text-base py-4 px-8 font-bold w-fit">
            Start Learning
          </Button>
        </div>
      </div>


    </div>
    <Footer />
    </main>
  );
}
