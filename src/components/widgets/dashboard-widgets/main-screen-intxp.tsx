import Logout from "@/components/logout";



export default function MainScreenFlexIntXP({ username, mini_desc, userXP, title }: { username: string, mini_desc: string, userXP: string, title: string }) {
    return (
        <main className="w-full">
            <div className="hidden w-full md:flex flex-col gap-5 items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen top-0 ">
                <div className="w-full bg-green-50 flex flex-col gap-10 overflow-y-auto ">
                    <div className="flex  flex-row gap-10 pl-10 pt-7 bg-white  pb-5 border-b text-base text-gray-600 items-center justify-between pr-10">
                        <div className="flex flex-row items-center gap-10">
                            <a href="/internship" className="hover:underline font-bold">Upcoming Internships</a>
                            <a href="/learning" className="hover:underline font-bold">Explore Career Paths</a>
                        </div>
                        <div className="flex flex-row gap-10 items-center text-gray-600 text-base">
                            <p className="font-bold"> 🎖️ {Math.ceil(Number(userXP))} XP</p>
                            <p className="font-bold"> {title}</p>
                            <Logout />
                        </div>
                    </div>
                    {/* <div className="px-10 ">
                        <p className="font-bold text-2xl"> 👋 Welcome back,  {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()} </p>
                        <p className="py-5 text-xs text-gray-500">-- {mini_desc} </p>
                    </div> */}
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 rounded-xl bg-hb-lightgreen">
                <div className="flex items-center text-center justify-center gap-5 w-full  text-sm text-green-900 pt-2">
                    <p className="font-bold">🎖️ {Math.ceil(Number(userXP))} XP</p>
                    <p className="font-bold">{title}</p>
                </div>
            </div>
        </main>
    )
}