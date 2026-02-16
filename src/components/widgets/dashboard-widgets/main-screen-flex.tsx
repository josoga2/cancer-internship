import Logout from "@/components/logout";



export default function MainScreenFlex({ username, mini_desc }: { username: string, mini_desc: string }) {
    return (
        <main className="w-full">
            <div className="hidden w-full md:flex flex-col gap-5 items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="w-full bg-green-50 flex flex-col gap-10 overflow-y-auto ">
                    <div className="flex flex-row gap-10 pl-10 pt-7 bg-white w-full pb-5 border-b text-base text-gray-600 items-center justify-between pr-10">
                        <div className="flex flex-row items-center gap-10">
                            <a href="/internship" className="hover:underline font-bold">Upcoming Internships</a>
                        </div>
                        <Logout />
                    </div>
                    <div className="px-10 ">
                        <p className="font-bold text-2xl"> 👋 Welcome back,  {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()} </p>
                        <p className="py-5 text-xs text-gray-500">-- {mini_desc} (scroll down for your courses) </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 rounded-xl bg-hb-lightgreen">
                <div className="flex flex-col items-start gap-8 ">
                    <p className="font-bold text-lg">
                        
                    </p>
                </div>
            </div>
        </main>
    )
}
