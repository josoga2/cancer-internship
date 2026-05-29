const cards = [
  {
    title: "WEEKLY PROJECTS SPRINTS",
    body: "Build and complete projects under deadlines, feedbacks, mentorship and iteration cycles.",
    illustration: "/svgs/illustrations/image_25.png",
    background: "/gradients/Rectangle_2.png",
    className: "md:row-span-2 md:min-h-[360px] md:max-h-[360px]",
    imageClassName: "mt-auto w-[62%] max-w-[190px] self-end",
    accent: "border-hb-green",
  },
  {
    title: "RESEARCH GRADE WORKFLOWS",
    body: "RNA-Seq, scRNA-seq, AI agents, ML, Data analytics and visualization",
    illustration: "/svgs/illustrations/image_26.png",
    background: "/gradients/Rectangle_3.png",
    className: "md:h-full md:min-h-0 md:max-h-none",
    imageClassName: "mt-auto w-[42%] max-w-[104px] self-end",
    accent: "border-gray-300",
  },
  {
    title: "COMMUNITY + MENTORSHIP",
    body: "Learn together with builders and mentors",
    illustration: "/svgs/illustrations/image_27.png",
    background: "/gradients/Rectangle_5.png",
    className: "md:h-full md:min-h-0 md:max-h-none",
    imageClassName: "mt-auto w-[42%] max-w-[104px] self-end",
    accent: "border-sky-400",
  },
];

function GlossyCard({
  title,
  body,
  illustration,
  background,
  className,
  imageClassName,
  accent,
}: (typeof cards)[number]) {
  return (
    <article
      className={`group relative flex min-h-[240px] overflow-hidden rounded-sm border bg-white/85 bg-cover bg-center p-4 shadow-[0_10px_28px_rgba(18,39,32,0.08)] md:min-h-0 ${accent} ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <span className="pointer-events-none absolute inset-y-[-35%] -left-[80%] z-10 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/75 to-transparent opacity-0 blur-sm transition-all duration-700 ease-out group-hover:translate-x-[390%] group-hover:opacity-100" />
      <div className="relative z-20 flex h-full w-full flex-col">
        <h3 className="text-xl font-medium leading-tight text-gray-900">{title}</h3>
        <p className="mt-5 max-w-[20rem] text-base leading-snug text-gray-900">{body}</p>
        <img src={illustration} alt="" className={`object-contain ${imageClassName}`} />
      </div>
    </article>
  );
}

export default function ComputationalBiologistsSection() {
  return (
    <section className="w-full px-5 py-8 md:px-0">
      <div className="mx-auto grid w-full max-w-5xl gap-3 rounded-sm border border-gray-900 bg-[linear-gradient(100deg,#d7edf5_0%,#e9f7ee_47%,#f7f2f5_100%)] p-5 md:grid-cols-[1.05fr_1fr_1fr] md:grid-rows-[174px_174px_auto] md:gap-3 md:p-12">
        <div className="flex min-h-[320px] flex-col justify-center px-2 py-8 md:row-span-2 md:min-h-[360px] md:px-5 md:py-0">
          <h2 className="max-w-[18rem] text-3xl font-medium leading-snug tracking-normal text-gray-900">
            We build <span className="text-hb-green">Computational Biologists</span>!
          </h2>
          <p className="mt-9 max-w-[19rem] text-base leading-snug text-gray-900">
            HackBio is a high-intensity, project-driven environment where learners build real genomics and AI workflows using research-grade tools, datasets, and execution systems.
          </p>
          <a
            href="/learning"
            className="mt-7 inline-flex h-10 w-fit items-center justify-center rounded-sm bg-hb-green px-7 text-base font-medium text-white transition hover:bg-hb-green-dark focus:outline-none focus:ring-2 focus:ring-hb-green focus:ring-offset-2"
          >
            Become One
          </a>
        </div>

        <GlossyCard {...cards[0]} />
        <div className="grid gap-3 md:row-span-2 md:h-[360px] md:grid-rows-[174px_174px]">
          <GlossyCard {...cards[1]} />
          <GlossyCard {...cards[2]} />
        </div>

        <p className="pt-8 text-center text-base font-medium uppercase tracking-normal text-gray-900 md:col-span-3 md:pt-6">
          Build pipelines → Analyze data → Ship real work
        </p>
      </div>
    </section>
  );
}
