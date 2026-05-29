const CAREER_STRATEGY_URL = "https://hackbio.notion.site/363d745e4346807e98cce621350bf078?pvs=105";
const CAREER_CLARITY_IMAGE = "https://images.pexels.com/photos/7690094/pexels-photo-7690094.jpeg";

export default function CareerClaritySection() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <h2 className="text-3xl font-bold text-[#1f1f24] dark:text-white">Need career clarity ?</h2>
      </div>

      <div className="mt-8 bg-[linear-gradient(90deg,#dff5fd_0%,#eaf9ee_50%,#fbf3f7_100%)] dark:bg-[linear-gradient(90deg,#102738_0%,#113023_52%,#261a24_100%)]">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] md:px-10 lg:py-0">
          <div className="max-w-[520px] py-4 md:py-12">
            <p className="text-base leading-9 text-black dark:text-slate-100">
              Are you unsure about the right decisions and steps you need to take to move your education and career to the
              next level? Looking for the right portfolio project ideas? or Want to assess your readiness for Academic or
              Industry jobs in Bioinformatics? Then apply for a consultation session with one of our mentors at HackBio
            </p>

            <a
              href={CAREER_STRATEGY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-sm bg-hb-green px-6 text-base font-bold text-white transition hover:bg-hb-green-dark"
            >
              Request a career strategy session
            </a>
          </div>

          <div className="overflow-hidden rounded-[18px] border-2 border-yellow-400 md:-my-12">
            <img
              src={CAREER_CLARITY_IMAGE}
              alt="Career strategy consultation"
              className="aspect-[1.15/1] h-full w-full object-cover md:aspect-[1/1.25]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
