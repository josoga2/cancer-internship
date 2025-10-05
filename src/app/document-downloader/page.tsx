'use client';
import Footer from "@/components/Nav/footer";
import Navbar from "@/components/Nav/navbar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import publicApi from "@/publicApi";

export default function DocumentDownloader() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const submitResponse = await publicApi.post("/api/attempted-payment/", {
                    name: name,
                    email: email,
                    payment_method: "job-report",
                });
            if (submitResponse.status === 200 || submitResponse.status === 201) {
                // Handle successful registration, e.g., redirect to login page
                setError('You are successfully registered.');
                
                
                router.replace('https://zenodo.org/records/13944541/files/BFX_2024.pdf.pdf?download=1');
            } else {
                setError('You are successfully registered. Please check your email to verify your registeration.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Either a User with the same credentials exist or Invalid Email or Password.');
        }
    };



  return (
    <div>
        <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#27AE60] to-green-300 text-white py-16 pt-40 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Bioinformatics Jobs 2024 Report</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Trends, Top Locations and In-Demand Skills in Bioinformatics.
        </p>
        <p className="text-base max-w-2xl mx-auto py-2 text-black font-bold">
          Authors: Flora Oladipupo, Paschal Ugwu, Zion Oluwasegun, HackBio Team
        </p>
      </section>

      {/* Scholarship Listings */}
      
      <section className="grid grid-cols-2 gap-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-4">
        <div className="pr-10">
            <p className=" font-bold text-xl">Foreword</p>
            <p className="mt-2 text-justify">This report provides a comprehensive analysis of the bioinformatics job market in 2024. It offers insights into job trends, industry diversity, skill demand, and the qualifications needed to succeed in this competitive field.</p>
            <p className=" font-bold text-xl mt-4">Executive Summary</p>
            <p className="mt-2 text-justify">The bioinformatics sector is experiencing rapid growth, with significant demand for both computational and research-focused roles. AI and machine learning technologies, alongside analytical tools such as R and Python, are key drivers in the job market. Advanced degrees, especially Doctorates and Masters, are highly preferred for mid to senior-level positions.</p>
            <p className=" font-bold text-xl mt-4">How to Read This Report</p>
            <p className="mt-2 text-justify">The report is structured into logical sections, making it easy to navigate through global market insights, job trends, and skill requirements. Each section includes detailed data to help job seekers, recruiters, and organizations understand the current bioinformatics landscape.</p>
        </div>

        <div className="pr-10 flex flex-col items-start gap-3">
            <img src="https://github.com/HackBio-Internship/2025_project_collection/blob/main/RoGsdCGIeXV.png?raw=true" alt="Bioinformatics Jobs 2024 Report Cover" className=" rounded-lg w-full h-full" />
            <label className="font-bold text-lg mb-2">Download the Full Report</label>
            <input type="email" placeholder="Enter your email" className="w-full p-2 px-5 border border-gray-300 rounded-md mb-4" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} required />
            <input type="text" placeholder="Enter your name" className="w-full p-2 px-5 border border-gray-300 rounded-md mb-4" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} required />
            <Button className="w-full bg-hb-green hover:bg-green-700 text-white py-6 text-lg rounded-md flex items-center justify-center" onClick={handleLogin} >
                Download Report <ExternalLink className="ml-2" />
            </Button>
            <p className="text-xs text-gray-500 mt-2">By providing your email, you agree to receive communications from HackBio. You can unsubscribe at any time.</p>

        </div>
        
        
      </section>
        {/* Closed Scholarships Section */}
      
      <Footer />
    </div>
  );
}
