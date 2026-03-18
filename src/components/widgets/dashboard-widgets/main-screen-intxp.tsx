import Logout from "@/components/logout";
import StreakBar from "@/components/widgets/dashboard-widgets/streak-bar";

export default function MainScreenFlexIntXP({
    username,
    mini_desc,
    userXP,
    title,
    loginDates,
    contentClassName,
}: {
    username: string,
    mini_desc: string,
    userXP: string,
    title: string,
    loginDates: string[],
    contentClassName?: string,
}) {
    const desktopContentClass = contentClassName?.trim() ? contentClassName : "max-w-6xl w-full px-6 lg:px-8";

    return (
        <main className="w-full">
            <div className="hidden w-full md:flex flex-col gap-5 items-center justify-center border-r-hb-lightgreen border-r border-l border-l-hb-lightgreen top-0 ">
                <div className="w-full bg-hb-lightgreen flex flex-col gap-4 overflow-y-auto ">
                    <div className="w-full border-b bg-white">
                      <div className={`mx-auto flex h-[50px] flex-row items-center justify-between gap-10 text-base text-gray-600 ${desktopContentClass}`}>
                        <div className="flex flex-row items-center gap-10">
                            <a href="/internship" className="hover:underline font-bold">Upcoming Internships</a>
                        </div>
                        <div className="flex flex-row gap-10 items-center text-gray-600 text-base">
                            <p className="font-bold"> 🎖️ {Math.ceil(Number(userXP))} XP</p>
                            <p className="font-bold"> {title}</p>
                            <Logout />
                        </div>
                      </div>
                    </div>
                    <div className={`mx-auto pb-4 ${desktopContentClass}`}>
                        <StreakBar loginDates={loginDates} mode="desktop" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 rounded-xl bg-hb-lightgreen py-2 ">
                <div className="flex items-center text-center justify-center gap-5 w-full text-sm text-green-900 pt-2">
                    <p className="font-bold">🎖️ {Math.ceil(Number(userXP))} XP</p>
                    <p className="font-bold">{title}</p>
                </div>
                <div className="w-full flex justify-center">
                    <StreakBar loginDates={loginDates} mode="mobile" className="p-1" />
                </div>
            </div>
        </main>
    )
}
