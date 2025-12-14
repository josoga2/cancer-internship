import lg_testimonial from '@/../public/Testimonials.svg'
import sm_testimonial from '@/../public/sm_testimonial.svg'

export default function OrganizationsTestimonials() {
    return (
        <main>
            <div className="hidden w-full py-10  h-full md:flex flex-col gap-5 px-10  items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="flex flex-col items-center gap-5">
                    <p className="text-lg font-bold text-center">
                        100+ Organizations have hired our graduates
                    </p>
                    <img
                        src={lg_testimonial.src}
                        alt="organizations-that-trust-hackbio"
                        className="w-full"
                    />
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 p-2  rounded-xl">
                <div className="flex flex-col items-center gap-5">
                    <p className="text-lg font-bold text-center">
                        100+ Organizations have hired our graduates
                    </p>
                    <img
                        src={sm_testimonial.src}
                        alt="organizations-that-trust-hackbio"
                        className="w-full"
                    />
                </div>
            </div>

        </main>
    )
}