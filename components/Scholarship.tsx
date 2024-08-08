import Link from "next/link";

function Scholarship(){
    return(
        <section className="bg-hbblue-1">
            {/**desktop */}
            <main className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between text-center py-5 ">
                <Link href='https://www.linkedin.com/posts/bioinformher_bioinformatics-womeninstem-github-activity-7219016150943166465-7OPv?utm_source=share&utm_medium=member_android' className=" w-full text-sm font-semibold text-black"> <p> Apply for BioinformHer x HackBio Scholarship 🚀</p> </Link>
            </main>
            {/**mobile */}
            <main className="md:hidden flex flex-col  w-full gap-10 bg-hbblue-1">
                <Link href='https://www.linkedin.com/posts/bioinformher_bioinformatics-womeninstem-github-activity-7219016150943166465-7OPv?utm_source=share&utm_medium=member_android'> <p className="w-full text-sm font-semibold text-black text-center p-3"> Apply for BioinformHer x HackBio Scholarship 🚀</p> </Link>
            </main>
        </section>
    )
}

export default Scholarship;