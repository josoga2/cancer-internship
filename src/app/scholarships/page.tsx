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

export default function ScholarshipPage() {
  // Sort scholarships in descending order by ID
  const sortedScholarships = [...scholarships].sort((a, b) => b.id - a.id);

  return (
    <div>
        <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#27AE60] to-green-300 text-white py-16 pt-40 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">HackBio Scholarships</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Browse scholarships from our partners and sponsors. Apply today to support your HackBio internship journey.
        </p>
      </section>

      {/* Scholarship Listings */}
      
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-4">
        <p className=" font-bold text-xl">Currently Open</p>
        {sortedScholarships.filter((s) => s.status === "Open").map((s) => (
          <div
            key={s.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border rounded-md p-4 hover:shadow-md transition"
          >
            {/* Left: Logo and Info */}
            <div className="flex items-start sm:items-center space-x-4 mb-4 sm:mb-0">
              <img
                src={s.logo}
                alt={`${s.sponsor} logo`}
                className="h-12 w-12 object-contain rounded-md border"
              />
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">{s.title}</h2>
                <p className="text-sm text-gray-500">{s.sponsor} · {s.location}</p>
                <div className="flex space-x-2 mt-1">
                  <span className="text-xs px-2 py-1 rounded-full  bg-hb-lightgreen text-hb-green font-medium">
                    {s.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Button */}
            <Button asChild className="w-full sm:w-auto bg-hb-green hover:bg-hb-green-[80%] text-white">
              <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center">
                Apply Now <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        ))}
      </section>
        {/* Closed Scholarships Section */}
      <p className="px-6 font-bold text-xl">Closed</p>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-4">
        {sortedScholarships.filter((s) => s.status === "Closed").map((s) => (
          <div
            key={s.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border rounded-md p-4 hover:shadow-md transition"
          >
            {/* Left: Logo and Info */}
            <div className="flex items-start sm:items-center space-x-4 mb-4 sm:mb-0">
              <img
                src={s.logo}
                alt={`${s.sponsor} logo`}
                className="h-12 w-12 object-contain rounded-md border"
              />
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">{s.title}</h2>
                <p className="text-sm text-gray-500">{s.sponsor} · {s.location}</p>
                <div className="flex space-x-2 mt-1">
                  <span className="text-xs px-2 py-1 rounded-full bg-hb-lightgreen text-hb-green font-medium">
                    {s.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Button */}
            <Button asChild className="w-full sm:w-auto bg-gray-300 text-black hover:bg-gray-400 cursor-not-allowed">
              <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center">
                Application Closed <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}
