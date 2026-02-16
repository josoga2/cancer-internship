import Navbar from "@/components/Nav/navbar";
import Footer from "@/components/Nav/footer";
import Image from "next/image";

const testimonials = [
  
  {
    id: 2,
    quote:
      "Hackbio gave me my first full bioinformatics internship. Before hackbio, I was only working on other forms of data analyses tasks like finance, marketing, and public health. However, I kept my eye out for pure genomics programs, and that's exactly what what Hackbio provided. I built my first pipeline, learnt about slurm and HPC kind of coding, and got real-life experience with how messy bioinformatics collaborations can be, especially in terms of version control.",
    name: "Atanda A.",
    role: "Bioinformatician",
    company: "University of Queensland",
    avatar: "/atanda.jpeg",
  },
  {
    id: 11,
    quote:
      "This HackBio internship taught me it's really about how you think under complexity (shifting from a traditional, linear, cause-and-effect mindset to a framework that embraces uncertainty, ambiguity). What this experience gave me wasn’t just technical confidence, but intellectual grounding. I learned to value clarity over speed, discipline over motivation, and understanding over output. Real learning happens when you stay with uncertainty long enough for patterns to emerge. I'm grateful to HackBio for the pressure and standards and equally grateful that I stayed when progress felt slow and uncomfortable.",
    name: "Abane Louis",
    role: "Bioinformatician",
    company: "Machine Learning Group ULB",
    avatar: "/abane.jpeg",
  },
  
  {
    id: 4,
    quote:
      "[I] started without a programming background. HackBio played a crucial role in my growth in bioinformatics by giving me hands-on experince in metagenomics analysis, team collaboration and leadership. The internship was structured in multiple stages with a final project.",
    name: "Barve Isha.",
    role: "PhD Researcher",
    company: "University of Lubeck",
    avatar: "/barve.jpeg",
  },
  {
    id: 5,
    quote:
      "This internship was indeed a game-changer! This wasn't just another online course; it was a project-based, hands-on experience that got me working with real-world life science dataset from day one! Instead of just learning Python, I was using it to solve problems.",
    name: "Ogunbemi Damilola.",
    role: "Data Scientist",
    company: "Leeds Institute of Data Analytics",
    avatar: "/ogungbemi.jpeg",
  },
  {
    id: 6,
    quote:
      "Something changed during my internship at HackBio. Instead of cramming endless syntax, I focused on what mattered mini-projects. Rather than struggling with abstract programming concepts, I’m learning R by applying it directly to analyse cancer data. One of those projects was analysing Glioblastoma data, where I had to use R to process the data, identify differentially expressed genes, and create visualisations.",
    name: "Chioma Onyido.",
    role: "Researcher and Mentor",
    company: "Outreachy",
    avatar: "/onyido.jpeg",
  },
  {
    id: 7,
    quote:
      "I got admitted to two other programs in France, msc biobanks data management and msc computational biology 😁 but I'll be going be with the drug design program (the first one I told you about). I appreciate your assistance and thank you for creating the Hackbio platform, it helped build my profile and opened my eyes to the opportunities out there 🙏🏽.",
    name: "Shittu Titilola.",
    role: "Drug Developer",
    company: "Université Bourgogne",
    avatar: "/shittu.jpeg",
  },
  {
    id: 8,
    quote:
      "I thankfully graduated with honors in Biotechnology and Biomolecular chemistry last month and I landed a master's internship in Bioinformatics in France! So I wanted to thank you for all the good your internship helped me achieve and I wanted to ask if there are any available positions in your company that I could help fill and continue to learn and grow besides your welcoming team as my first job 😊.",
    name: "Zeyad M.",
    role: "Bioinformatics Scientist",
    company: "Université d'Angers",
    avatar: "/zeyad.jpeg",
  },
  {
    id: 1,
    quote:
      "HackBio provided me with my first real-world bioinformatics project, allowing me to apply the skills I had been learning in a meaningful way. The experience bridged the gap between theory and practice, and completing the project gave me a huge confidence boost. The training phase at HackBio was also highly motivating, with constant help from mentors. It reinforced the importance of community and mentorship in learning technical skills.",
    name: "Adekoya O.",
    role: "Bioinformatics Analyst",
    company: "Research Lab",
    avatar: "/adekoya.jpeg",
  },
  {
    id: 3,
    quote:
      "Through the [internship], I was introduced to the world of genomics and bioinformatics, gaining hands-on experience with tools and pipeline development that gave me a strong foundation. That single event helped me clarify my interests and set me on the data-driven biomedica path I walk today. I will always be grateful to the access, exposure and direction that came from that one LinkedIn post.",
    name: "Ayano I.",
    role: "Computational Biologist",
    company: "GFA Tech",
    avatar: "/ayano.jpeg",
  },
  {
    id: 9,
    quote:
      "I love the course format; it truly allows us to progress at our pace and fit the learning into our schedules. I highly recommend HackBio to my fellow PhD students in bioinformatics who don’t necessarily have a strong background in programming. ",
    name: "Mame S.D",
    role: "PhD Student",
    company: "CHU St-Justine",
    avatar: "/mame.jpeg",
  },
  {
    id: 10,
    quote:
      "My HackBio experience (and preprint) was my leverage for an interesting conversation with my interview with my Graduate School Admission Team.",
    name: "Winfred Gatua",
    role: "Bioinformatician",
    company: "University of Bristol",
    avatar: "/winfred.svg",
  },
];

export default function TestimonialPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-hb-lightgreen border-b border-hb-lightgreen">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold pt-4">
            What Learners Say About HackBio
          </h1>
          <p className="text-base md:text-base text-gray-700 pt-4 max-w-3xl mx-auto">
            We are honored to train thousands of learners in bioinformatics,
            data science, and computational biology. Here are real stories from
            those who have completed our courses and internships.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  “{item.quote}”
                </p>
                <div className="flex items-center gap-4 pt-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-gray-600">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
