import Logout from "@/components/logout";
import StreakBar from "@/components/widgets/dashboard-widgets/streak-bar";

export default function MainScreenFlex({
    username,
    mini_desc,
    loginDates,
    contentClassName,
}: {
    username: string,
    mini_desc: string,
    loginDates: string[],
    contentClassName?: string,
}) {
    const desktopContentClass = contentClassName?.trim() ? contentClassName : "max-w-6xl w-full px-6 lg:px-8";

    return (
        <main className="w-full">
            <div className="hidden w-full md:flex flex-col gap-5 items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen">
                <div className="w-full bg-green-50 flex flex-col gap-10 overflow-y-auto ">
                    <div className="w-full border-b bg-white">
                        <div className={`mx-auto flex h-[50px] flex-row items-center justify-between gap-10 text-base text-gray-600 ${desktopContentClass}`}>
                            <div className="flex flex-row items-center gap-10">
                                <a href="/internship" className="hover:underline font-bold">Upcoming Internships</a>
                            </div>
                            <Logout />
                        </div>
                    </div>
                    <div className={`mx-auto w-full ${desktopContentClass}`}>
                        <p className="font-bold text-2xl"> 👋 Welcome back,  {username.charAt(0).toUpperCase() + username.slice(1).toLocaleLowerCase()} </p>
                        <StreakBar loginDates={loginDates} mode="desktop" className="mt-3" />
                        <p className="py-5 text-xs text-gray-500">-- {mini_desc} (scroll down for your courses) </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 rounded-xl bg-hb-lightgreen px-4 py-3 mb-4">
                <div className="flex flex-col items-start gap-6">
                    <p className="font-bold text-lg">
                        
                    </p>
                    <StreakBar loginDates={loginDates} mode="mobile" className="px-3 py-1" />
                </div>
            </div>
        </main>
    )
}
