export default function OrganizationsTestimonials() {
    return (
        <section className="w-full">
            <div className="hidden w-full py-6 md:flex flex-col items-center justify-center">
                <div className="flex w-full max-w-5xl flex-col items-center gap-5">
                    <p className="py-10 text-center text-2xl font-medium leading-tight text-gray-900 dark:text-slate-100">
                        Trusted by scientists working in over 100+ organizations around the world
                    </p>
                    <img
                        src="/Testimonials.svg"
                        alt="organizations-that-trust-hackbio"
                        className="h-auto w-full max-w-[980px] object-contain"
                    />
                </div>
            </div>

            <div className="flex w-full flex-col gap-4 py-4 px-5 md:hidden">
                <div className="flex flex-col items-center gap-4">
                    <p className="max-w-sm pb-5 text-center text-base font-medium leading-snug text-gray-900 dark:text-slate-100">
                        Trusted by scientists working in over 100+ organizations around the world
                    </p>
                    <img
                        src="/sm_testimonial.svg"
                        alt="organizations-that-trust-hackbio"
                        className="h-auto w-full object-contain"
                    />
                </div>
            </div>

        </section>
    )
}
