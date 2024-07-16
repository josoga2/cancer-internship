function Footer(){
    return(
        <section className="bg-hbblue-1 mt-10">
            {/**desktop */}
            <main className="hidden md:flex md:max-w-screen-lg md:m-auto md:items-center md:justify-between text-center py-5 ">
                <p className="w-full text-sm font-semibold text-black"> Made with HackBio + 💚</p>
            </main>
            {/**mobile */}
            <main className="md:hidden flex flex-col  w-full gap-10 bg-hbblue-1">
                <p className="w-full text-xs font-medium text-black  text-center py-5 px-10 leading-5"> Made with HackBio + 💚</p>
            </main>
        </section>
    )
}

export default Footer;