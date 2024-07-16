import Link from "next/link";

function Scholarship(){
    return(
        <section className="bg-hbblue-1">
            {/**desktop */}
            <main className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between text-center py-5 ">
                <Link href={'?modal=true'}> <p className=" w-full text-sm font-semibold text-black"> Register with the early bird ticket to enjoy 50% discount! 🚀</p> </Link>
            </main>
            {/**mobile */}
            <main className="md:hidden flex flex-col  w-full gap-10 bg-hbblue-1">
                <Link href={'?modal=true'}> <p className="w-full text-sm font-semibold text-black text-center "> Register with the early bird ticket to enjoy 50% discount! 🚀</p> </Link>
            </main>
        </section>
    )
}

export default Scholarship;