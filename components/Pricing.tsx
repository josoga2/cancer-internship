import { IoIosCheckmarkCircle } from "react-icons/io";
import Buttons from "./Buttons";
import Whitebutton from "./Whitebutton";
import { MdCancel } from "react-icons/md";


export default function Pricing(){

    return(
        
        <main>
            <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pb-10 px-10 bg-figma-grey">
            <div className="w-full ">
                <p className="font-bold text-2xl py-10">Begin your journey, decide your path!</p>

                <div className="flex flex-row gap-10">

                    {/**Free */}

                    <div className="flex flex-col py-10 px-5 bg-figma-grey border rounded-lg max-w-full gap-2 h-max">
                        <span className="font-bold text-3xl flex flex-row items-end gap-2">Free  </span>
                        <span className="flex gap-5 items-center">  <p className="font-semibold text-lg">$0.00</p> </span>
                        <hr className="h-px bg-gray-200" />
                        <ul className="font-medium text-sm leading-10 pb-5" >
                            <li className="flex flex-row items-center gap-3"> <IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Complete Stages 0-5</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Graded Team Tasks Weekly</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> Weekly Mentoship Call</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> 1-on-1 troubleshooting meetings</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> Unlimited Access to Bioinformatics Servers</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> Complete All 8 Stages</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> Graded Solutions </li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel  className="text-red-500 text-2xl"/> Unlimited Access to Final Project Phase</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> Support for first draft manuscript</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel  className="text-red-500 text-2xl"/> Graded Certification</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> No Eviction from the internship</li>
                        </ul>
                        {Buttons('Free (Now Open)','https://forms.gle/D8G4RWwNyzkfq7x37')}
                    </div>
                    

                    {/**Full certification */}
                    <div className="flex flex-col py-10 px-5 bg-figma-grey border rounded-lg max-w-full gap-2 h-max">
                        <span className="font-bold text-3xl flex flex-row items-end gap-2">Pro  <p className="bg-gradient-to-tr from-hbblue-3 to-pink-500 text-xs w-min rounded-full py-0.5 px-2 text-white">Recommended</p> </span>
                        <span className="flex gap-5 items-center"> <p className="font-semibold text-base line-through text-red-500"></p><p className="font-semibold text-lg">$30.00</p> </span>
                        <hr className="h-px bg-gray-200" />
                        <ul className="font-medium text-sm leading-10 pb-5" >
                            <li className="flex flex-row items-center gap-3"> <IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Complete Training Resource Pack</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Weekly Mentorship Call</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Graded Team Tasks Weekly</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> 1-on-1 troubleshooting meetings</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Unlimited Access to Bioinformatics Servers</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Complete All 8 Stages </li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Graded Solutions </li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle  className="text-hbgreen-1 text-2xl"/> Unlimited Access to Final Project Phase</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Support for first draft manuscript</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle  className="text-hbgreen-1 text-2xl"/> Graded Certification</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> No Eviction from the internship</li>
                        </ul>

                        {Buttons("Sign Up Now!", "?modal=true")}
                    </div>

                </div>
                </div>
            </section>

            <section className="md:hidden p-5">
                    <div className="flex flex-col py-10 px-5 bg-figma-grey border rounded-lg max-w-full gap-2 h-max mb-10">
                        <span className="font-bold text-3xl flex flex-row items-end gap-2">Pro  <p className="bg-gradient-to-tr from-hbblue-3 to-pink-500 text-xs w-min rounded-full py-0.5 px-2 text-white">Recommended</p> </span>
                        <span className="flex gap-5 items-center"> <p className="font-semibold text-base line-through text-red-500"></p> <p className="font-semibold text-lg">$30</p> </span>
                        <hr className="h-px bg-gray-200" />
                        <ul className="font-medium text-sm leading-10 pb-5" >
                            <li className="flex flex-row items-center gap-3"> <IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Complete Training Resource Pack</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Weekly Mentorship Call</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Graded Team Tasks Weekly</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> 1-on-1 troubleshooting meetings</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Unlimited Access to Bioinformatics Servers</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Complete All 8 Stages </li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Graded Solutions </li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle  className="text-hbgreen-1 text-2xl"/> Unlimited Access to Final Project Phase</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Support for first draft manuscript</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle  className="text-hbgreen-1 text-2xl"/> Graded Certification</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> No Eviction from the internship</li>
                        </ul>

                        {Buttons("Sign Up Now!", "?modal=true")}
                    </div>

                    <div className="flex flex-col py-10 px-5 bg-figma-grey border rounded-lg max-w-full gap-2 h-max">
                        <span className="font-bold text-3xl flex flex-row items-end gap-2">Free  </span>
                        <span className="flex gap-5 items-center">  <p className="font-semibold text-lg">$0.00</p> </span>
                        <hr className="h-px bg-gray-200" />
                        <ul className="font-medium text-sm leading-10 pb-5" >
                            <li className="flex flex-row items-center gap-3"> <IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Complete Stages 0-5</li>
                            <li className="flex flex-row items-center gap-3"><IoIosCheckmarkCircle className="text-hbgreen-1 text-2xl" /> Graded Team Tasks Weekly</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> Weekly Mentoship Call</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> 1-on-1 troubleshooting meetings</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> Unlimited Access to Bioinformatics Servers</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> Complete All 8 Stages</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> Graded Solutions </li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel  className="text-red-500 text-2xl"/> Unlimited Access to Final Project Phase</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> Support for first draft manuscript</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel  className="text-red-500 text-2xl"/> Graded Certification</li>
                            <li className="flex flex-row items-center gap-3 text-gray-500 line-through"><MdCancel className="text-red-500 text-2xl" /> No Eviction from the internship</li>
                        </ul>

                        {Buttons('Free (Now Open)','https://forms.gle/D8G4RWwNyzkfq7x37')}
                    </div>

            </section>
        </main>
    )
}