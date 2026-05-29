const resources = [
  {
    title: "Frequently asked questions",
    description: "Check it out, we probably answered the question on your mind already.",
    letter: "F",
    href: "/faqs",
    color: "text-hb-green",
    background: "bg-hb-lightgreen",
  },
  {
    title: "Apply for a clarity session",
    description: "Talk to one of our mentors and get clarity on career and learning goals",
    letter: "C",
    href: "https://hackbio.notion.site/363d745e4346807e98cce621350bf078?pvs=105",
    color: "text-sky-600",
    background: "bg-sky-100",
  },
  {
    title: "Career path test",
    description: "See potential paths you can take in bioinformatics.",
    letter: "P",
    href: "/bioinformatics-readiness-assessment",
    color: "text-red-600",
    background: "bg-red-100",
  },
  {
    title: "Bioinformatics readiness",
    description: "Know how much you are really ready to start learning bioinformatics",
    letter: "R",
    href: "/bioinformatics-readiness-assessment",
    color: "text-yellow-500",
    background: "bg-yellow-50",
  },
  {
    title: "Attend our events",
    description: "Register to attend our monthly webinars or technical meetings",
    letter: "E",
    href: "https://forms.gle/XVeyCtzFLKmDPmbF7",
    color: "text-fuchsia-500",
    background: "bg-fuchsia-100",
  },
  {
    title: "Read our blog",
    description: "Read technical and opinion articles on different advances in bioinformatics",
    letter: "B",
    href: "/blog",
    color: "text-amber-800",
    background: "bg-stone-100",
  },
];

export default function GettingStartedResources() {
  return (
    <section className="w-full py-12 px-5 md:py-16">
      <div className="mx-auto w-full max-w-5xl rounded-sm bg-[#eef4f1] px-5 py-10 md:px-10 md:py-11">
        <h2 className="text-3xl font-medium tracking-normal text-hb-green">
          Resources for getting started
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-x-24 md:gap-y-10">
          {resources.map((resource) => {
            const isExternal = resource.href.startsWith("http");
            return (
              <a
                key={resource.title}
                href={resource.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group grid min-h-[110px] grid-cols-[80px_1fr] items-center gap-4 rounded-sm bg-white p-3 shadow-[0_2px_7px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
              >
                <span className={`flex h-20 w-20 items-center justify-center rounded-sm text-5xl font-medium ${resource.background} ${resource.color}`}>
                  {resource.letter}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-xl font-medium leading-tight text-black group-hover:text-hb-green">
                    {resource.title}
                  </span>
                  <span className="mt-3 text-base leading-snug text-gray-600">
                    {resource.description}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
