import Footer from "@/components/Nav/footer";
import Navbar from "@/components/Nav/navbar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const scholarships = [
  {
    id: 1,
    title: "PhD in Data Science: Program Overview",
    sponsor: "New York University Center for Data Science",
    type: "PhD",
    location: "Global",
    status: "Open",
    link: "https://cds.nyu.edu/phd-program-overview/",
  },
  {
    id: 2,
    title: "2026-2027 Graduate Scholarships (MHSc Master of Health Informatics)",
    sponsor: "University of Toronto",
    type: "MSc",
    location: "Global",
    status: "Open",
    link: "https://africahealthcollaborative.org/2025/10/01/2026-2027-graduate-scholarships-open-at-the-university-of-toronto/",
  },
  {
    id: 3,
    title: "Sciences Po and the Mastercard Foundation Scholars Program",
    sponsor: "Multiple Schools in France",
    type: "MSc",
    location: "Global",
    status: "Open",
    link: "https://www.sciencespo.fr/students/en/fees-funding/bursaries-financial-aid/mastercard-foundation-scholarships/graduate-study/",
  },
  {
    id: 4,
    title: "Bioinformatician (PhD) ",
    sponsor: "The Institute of Medical Informatics, Munster, Germany",
    type: "PhD",
    location: "Global",
    status: "Open",
    link: "https://jobs-sf.ukmuenster.de/job/Universit%C3%A4t-M%C3%BCnster-Bioinformatiker-%28gn%29-Initiativbewerbung-im-Institut-f%C3%BCr-Medizinische-Informatik/1248432801/",
  },
  {
    id: 5,
    title: "PhD position in the field of plant sciences/transcriptome analyses ",
    sponsor: "Forschungszentrum Jülich GmbH, Germany",
    type: "PhD",
    location: "Global",
    status: "Open",
    link: "https://www.fz-juelich.de/en/careers/jobs/2025D-118",
  },
  {
    id: 6,
    title: "Bioinformatician ",
    sponsor: "National Research Centre, Egypt",
    type: "Job",
    location: "Egypt",
    status: "Open",
    link: "https://www.linkedin.com/posts/heba-abdelmegeed-62930358_im-looking-for-a-bioinformatician-who-would-activity-7383126156998418432-6dAD?utm_source=share&utm_medium=member_ios&rcm=ACoAABHW2ewB7z0YF8sawzQa7InBaBqrAzDXPUE",
  },
  {
    id: 7,
    title: "Multiple Positions in Microbiology ",
    sponsor: "National Centre of Competence in Research, AntiResist, Switzerland",
    type: "PhD, Postdoc, MD-PhD, Job",
    location: "Switzerland",
    status: "Open",
    link: "https://www.nccr-antiresist.ch/join-us/",
  },
  {
    id: 8,
    title: "Government of Ireland Postgraduate Scholarship Programme",
    sponsor: "Government of Ireland ",
    type: "MSc, PhD",
    location: "Ireland",
    status: "Open",
    link: "https://www.researchireland.ie/funding/government-ireland-postgraduate/",
  },
  {
    id: 9,
    title: "Understanding How Anaerobic Bacteria Cause Prostate Cancer",
    sponsor: "Understanding How Anaerobic Bacteria Cause Prostate Cancer",
    type: "PhD",
    location: "UK",
    status: "Open",
    link: "https://www.uea.ac.uk/course/phd-doctorate/phd-from-microbiome-to-medicine-understanding-how-anaerobic-bacteria-cause-prostate-cancer-coopercu26medbcct-",
  },
  {
    id: 10,
    title: "Call for poster abstracts and applications for the start-up pitch",
    sponsor: "INCATE, AMR Conference",
    type: "Poster Award",
    location: "UK",
    status: "Open",
    link: "https://amr-conference.com/call-for-abstracts/",
  },
  {
    id: 11,
    title: "Microbiota, gut-neuron signalling and ageing",
    sponsor: "University of Glasgow",
    type: "PhD",
    location: "Scotland",
    status: "Open",
    link: "https://www.linkedin.com/posts/adam-dobson-4a05242b8_microbiota-ageing-activity-7383630481772281856-dXem?utm_source=share&utm_medium=member_desktop&rcm=ACoAABHW2ewB7z0YF8sawzQa7InBaBqrAzDXPUE",
  },
  {
    id: 12,
    title: "Mastercard Foundation Scholars Program at the University of Edinburgh",
    sponsor: "MasterCard",
    type: "MSc",
    location: "UK",
    status: "Open",
    link: "https://www.linkedin.com/posts/mcfscholarsed_mastercard-foundation-scholars-program-edinburgh-ugcPost-7383574511922872320-HD15?utm_source=share&utm_medium=member_desktop&rcm=ACoAABHW2ewB7z0YF8sawzQa7InBaBqrAzDXPUE",
  },
  {
    id: 13,
    title: "Upsurge Grants",
    sponsor: "Upsurge",
    type: "Grant",
    location: "Global",
    status: "Open",
    link: "https://grants.upsurge.io",
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
        <h1 className="text-4xl font-bold mb-4">Opportunties</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Browse opportunities in bioinformatics, AI, data science and more.
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
      {/* <p className="px-6 font-bold text-xl">Closed</p>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-4">
        {sortedScholarships.filter((s) => s.status === "Closed").map((s) => (
          <div
            key={s.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border rounded-md p-4 hover:shadow-md transition"
          >
            
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

            
            <Button asChild className="w-full sm:w-auto bg-gray-300 text-black hover:bg-gray-400 cursor-not-allowed">
              <a href={s.link} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center">
                Application Closed <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        ))}
      </section> */}
      <Footer />
    </div>
  );
}
