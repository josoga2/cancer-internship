import Link from "next/link"
import Buttons from "./Buttons"
import Whitebutton from "./Whitebutton"

export default function About(){

    return(
        
        <main>
            <hr className=" w-full hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between" />
            <section className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between  pt-10 px-10">
                <div className="text-2xl">
                    <p className="font-light text-center text-pretty py-5">Laser-focused, Practical and Intensive 8-week program designed to take you from student to expert</p>
                    <div className="grid grid-cols-2 px-5 ">
                        <div className="flex flex-col gap-5 ">
                            <p className="font-medium ">You <Link href={"#"} className="font-semibold underline text-hbgreen-1">SHOULD</Link> apply if...</p>
                            <div className="font-normal text-sm max-w-xs mr-auto pl-5">
                                <ol className="list-disc flex flex-col gap-2">
                                    <li> <p>You are an <Link href={"#"} className="font-semibold underline text-hbblue-3">Undergraduate</Link>  looking to gain hands-on bioinformatics experience </p> </li>
                                    <li>You are a <Link href={"#"} className="font-semibold underline text-hbblue-3">Graduate</Link>  student looking to build portfolio that will help you land graduate school scholarships and research grants.</li>
                                    <li>You are ready to hit the ground running and put in <Link href={""} className="font-semibold underline text-hbblue-3">8hours of work</Link>  per week to excel in this program</li>
                                    <li>You are looking for expert <Link href={"#"} className="font-semibold underline text-hbblue-3">guidiance and mentorship</Link>  while learning</li>
                                    <li>You want to complete an actual <Link href={"#"} className="font-semibold underline text-hbblue-3">bioinformatics project</Link>  with real life impact</li>
                                    <li>You are motivated to help solve <Link href={"#"} className="font-semibold underline text-hbblue-3">cancer</Link>  using modern tech skills</li>
                                    <li>You are ready to push the project into a <Link href={"#"} className="font-semibold underline text-hbblue-3">Journal publication</Link> </li>
                                </ol>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 ">
                            <p className="font-medium ">You should <Link href={"#"} className="font-semibold underline text-red-500">NOT</Link>  apply if...</p>
                            <div className="font-normal text-sm max-w-xs pl-5">
                                <ul className="list-disc flex flex-col gap-2">
                                    <li>You are not a team player and do not like working with others.</li>
                                    <li>You are a graduate student who is just coasting and have no desire to land graduate school scholarships.</li>
                                    <li>You are too lazy and want to be spoon-fed</li>
                                    <li>You do not like peer review and afraid of constructive criticism of your work</li>
                                    <li>You are not ready to be an expert and master the usage of over 100 bioinformatics tools</li>
                                    <li>You have tried coding and given up that its not for you </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center flex-row gap-10 justify-center py-10"> 
                        {Buttons('Free (Now Open)','https://forms.gle/D8G4RWwNyzkfq7x37')} 
                        <div className="hidden md:flex font-semibold rounded-md border-4 border-hbblue-3 text-white hover:bg-white bg-hbblue-3 hover:text-hbblue-3 w-fit  text-center py-2 text-base px-5"> <a href='?modal=true'> <span className="flex flex-row gap-2"> <p className="line-through">$30</p> <p>$15 Premium</p></span>  <p>Apply Now!</p> </a> </div>
                    </div>
                </div>
            </section>

            <section className="md:hidden p-5">
            <hr className=" w-full h-5" />
            <div className="text-lg">
                    <p className="font-light text-center text-pretty py-5">Laser-focused, Practical and Intensive 8-week program designed to take you from student to expert</p>
                    <div className="grid grid-cols-1 px-5 gap-5">
                        <div className="flex flex-col gap-5 ">
                        <p className="font-medium ">You <Link href={"#"} className="font-semibold underline text-hbgreen-1">SHOULD</Link> apply if...</p>
                            <div className="font-normal text-sm max-w-xs mr-auto pl-5">
                                <ol className="list-disc flex flex-col gap-2">
                                    <li> <p>You are an <Link href={"#"} className="font-semibold underline text-hbblue-3">Undergraduate</Link>  looking to gain hands-on bioinformatics experience </p> </li>
                                    <li>You are a <Link href={"#"} className="font-semibold underline text-hbblue-3">Graduate</Link>  student looking to build portfolio that will help you land graduate school scholarships and research grants.</li>
                                    <li>You are ready to hit the ground running and put in <Link href={""} className="font-semibold underline text-hbblue-3">8hours of work</Link>  per week to excel in this program</li>
                                    <li>You are looking for expert <Link href={"#"} className="font-semibold underline text-hbblue-3">guidiance and mentorship</Link>  while learning</li>
                                    <li>You want to complete an actual <Link href={"#"} className="font-semibold underline text-hbblue-3">bioinformatics project</Link>  with real life impact</li>
                                    <li>You are motivated to help solve <Link href={"#"} className="font-semibold underline text-hbblue-3">cancer</Link>  using modern tech skills</li>
                                    <li>You are ready to push the project into a <Link href={"#"} className="font-semibold underline text-hbblue-3">Journal publication</Link> </li>
                                </ol>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 ">
                            <p className="font-medium ">You should <Link href={"#"} className="font-semibold underline text-red-500">NOT</Link> apply if...</p>
                            <div className="font-normal text-sm max-w-xs pl-5">
                                <ul className="list-disc flex flex-col gap-2">
                                    <li>You are not a team player and do not like working with others.</li>
                                    <li>You are a graduate student who is just coasting and have no desire to land graduate school scholarships.</li>
                                    <li>You are too lazy and want to be spoon-fed</li>
                                    <li>You do not like peer review and afraid of constructive criticism of your work</li>
                                    <li>You are not ready to be an expert and master the usage of over 100 bioinformatics tools</li>
                                    <li>You have tried coding and given up/decided its not for you </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center flex-col gap-10 justify-center py-10"> 
                        <div className=" md:hidden font-semibold rounded-md border-4 border-hbblue-3 text-white hover:bg-white bg-hbblue-3 hover:text-hbblue-3 w-fit  text-center text-sm py-2 px-5"> <a href='?modal=true'> <span className="flex flex-row gap-2"> <p className="line-through">$30</p> <p>$15 Premium</p></span>  <p>Apply Now!</p> </a> </div>
                        {Whitebutton('Free (Opens in August)','#')} 
                    </div>
                </div>
            </section>
        </main>
    )
}