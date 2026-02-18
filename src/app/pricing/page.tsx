'use client'
import HbPrices from "@/components/all-pricings/preview";
import PricingSelector from "@/components/enroll/pricing-structure";
import Footer from "@/components/Nav/footer";
import Navbar from "@/components/Nav/navbar";
import HbButton from "@/components/widgets/hb-buttons";

export default function PricingPage() {
  return (
    <section>
        <Navbar />
        <div className="hidden md:flex md:max-w-5xl bg md:m-auto md:items-center md:justify-between border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">

            <div className="w-full">
                <div className="p-5 h-96 w-full flex flex-row justify-between items-center  pt-24 bg-linear-to-r from-hb-green to-green-300 text-white">
                    <div className="flex flex-col gap-5 text-center w-full items-center">
                        <p className="text-3xl font-bold max-w-1/2 ">Stay at the forefront of AI, Data and Bioinformatics with a HackBio membership</p>
                        <p className="text-lg">Build your career, Step by step, one skill at a time</p>
                    </div>
                </div>

               
                

                <div className="flex flex-row gap-2 items-center justify-center">
                    <HbPrices plan="Preview" discount={0.5} prog="" progId=""/>
                    <HbPrices plan="Become a Pro" discount={0.5} prog="" progId=""/>
                    <HbPrices plan="Course Access" discount={0.5} prog="" progId=""/>
                </div>

                <div className="flex flex-row gap-2 items-center justify-center">
                    <HbPrices plan="Internship Access" discount={0.5} prog="" progId=""/>
                    <HbPrices plan="Career Pathway" discount={0.5} prog="" progId=""/>
                    <HbPrices plan="Lab" discount={0.5} prog="" progId=""/>
                </div>


                <div className="flex flex-row gap-2 p-10 max-w-4/5">
                    <div className="flex flex-col gap-5 text-start w-full ">
                        <p className="text-3xl font-bold  ">Are you a University or Large Institution looking to partner with us for custom access and training?</p>
                        <HbButton text="Partner with us" type="primary" />
                    </div>
                </div>
            </div>
        </div>
            

        {/* Mobile View */}
        <div className="block md:hidden px-4 py-20 space-y-8">
            <div className="w-full">
                <div className="p-5 h-full w-full flex flex-row justify-between items-center  bg-hb-green-dark text-white">
                    <div className="flex flex-col gap-5 text-center w-full">
                        <p className="text-2xl font-bold w-full ">Stay at the forefront of AI, Data and Bioinformatics with a HackBio membership</p>
                        <p className="text-base">Build your career, Step by step, one skill at a time</p>
                    </div>
                </div>

                <div className="py-5">
                    <p className="text-base font-bold text-center w-full">Explore pricing model that fits your learning style</p>
                    <PricingSelector />
                </div>

                <div className="py-5">
                    <p className="text-base font-bold text-center w-full">Or See Full Pricing Table</p>
                </div>

                <div className="flex flex-col gap-2 items-center justify-center">
                    
                    <HbPrices plan="Become a Pro" discount={0.5} prog="" progId=""/>
                    <HbPrices plan="Course Access" discount={0.5} prog="" progId=""/>
                    <HbPrices plan="Preview" discount={0.5} prog="" progId=""/>
                </div>
                <div className="flex flex-col gap-2 p-10 max-w-4/5">
                    <div className="flex flex-col gap-5 text-start w-full ">
                        <p className="text-2xl font-bold  ">Are you a University or Large Institution looking to partner with us for custom access and training?</p>
                        <HbButton text="Partner with us" type="primary" />
                    </div>
                </div>
            </div>
        </div>
        <Footer />

    </section>
  );
}
