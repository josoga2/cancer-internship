import Footer from "@/components/Nav/footer";
import Navbar from "@/components/Nav/navbar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const scholarships = [
  {
    id: 1,
    title: "CMESBAHF Scholarship",
    sponsor: "CMESBAHF",
    logo: "https://cmesbahf.ng/wp-content/uploads/2024/10/Untitled-design-4.png",
    type: "Full Funding",
    location: "For Nigerian Students",
    status: "Closed",
    description:
      "Covers full HackBio program fees for 10 interns focused on genomics and sequencing analytics.",
    link: "https://cmesbahf.ng/",
  },
  {
    id: 2,
    title: "FolaChen Data Science in Biology Grant",
    sponsor: "FolaChen Foundation",
    logo: "https://scontent-fra3-1.xx.fbcdn.net/v/t39.30808-1/300222898_152954100677650_3786152531385876809_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=103&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=uuWnlXACIvsQ7kNvwGue062&_nc_oc=Adns4352dDTjvlqOotuDd5IfwnjvjAn1yLLJfWA3wqc82u769WkBJKGEsPQ3rU0asfk&_nc_zt=24&_nc_ht=scontent-fra3-1.xx&_nc_gid=tidCiE1HVZSq9WBd7FpVzw&oh=00_AffOAsYOx8s2m7hTWaLNswfquNgZopAGbDJri6pzcUaIKA&oe=68E60FED",
    type: "Full Funding",
    location: "Global",
    status: "Closed",
    description:"",
    link: "https://www.linkedin.com/posts/folachen-foundation_weve-got-10-scholarship-slots-open-the-activity-7362043086966788097-0w8X?utm_source=share&utm_medium=member_desktop&rcm=ACoAABHW2ewB7z0YF8sawzQa7InBaBqrAzDXPUE",
  },
  {
    id: 3,
    title: "Akinjide Anifowose Grant",
    sponsor: "Akinjide Anifowose",
    logo: "https://media.licdn.com/dms/image/v2/D4E03AQFzPvI6NiHoow/profile-displayphoto-scale_200_200/B4EZg3RNBpGwAc-/0/1753273914632?e=1762387200&v=beta&t=73Akv96kaK43O2tLvhqHcrKy4k-WW-sgNamyjSZ1ym8",
    type: "Full Funding",
    location: "Global",
    status: "Closed",
    description:"",
    link: "https://www.linkedin.com/posts/folachen-foundation_weve-got-10-scholarship-slots-open-the-activity-7362043086966788097-0w8X?utm_source=share&utm_medium=member_desktop&rcm=ACoAABHW2ewB7z0YF8sawzQa7InBaBqrAzDXPUE",
  },
];

export default function DocumentDownloader() {
  // Sort scholarships in descending order by ID
  const sortedScholarships = [...scholarships].sort((a, b) => b.id - a.id);

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
          Authors: Flora Oladipupo, Paschal Ugwu, Zion Oluwasegun, HackBio
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
            <input type="email" placeholder="Enter your email" className="w-full p-2 px-5 border border-gray-300 rounded-md mb-4" />
            <input type="text" placeholder="Enter your name" className="w-full p-2 px-5 border border-gray-300 rounded-md mb-4" />
            <Button className="w-full bg-hb-green hover:bg-green-700 text-white py-6 text-lg rounded-md flex items-center justify-center">
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
