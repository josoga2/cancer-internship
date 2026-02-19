import Logout from "@/components/logout";

const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const buildLast7Days = (loginDates: string[]) => {
    const dateSet = new Set(loginDates);
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
        const offset = 6 - index;
        const day = new Date(today);
        day.setDate(today.getDate() - offset);
        const key = formatLocalDate(day);
        return dateSet.has(key);
    });
};

export default function MainScreenFlex({ username, mini_desc, loginDates }: { username: string, mini_desc: string, loginDates: string[] }) {
    const streakDays = buildLast7Days(loginDates || []);

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
                        <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/70 p-2">
                            <span className="text-sm font-semibold text-gray-600">🔥 Last 7 days</span>
                            <div className="flex items-center gap-2">
                                {streakDays.map((isActive, index) => (
                                    <span
                                        key={`streak-${index}`}
                                        className={`h-4 w-4 rounded-full ${isActive ? "bg-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.2)]" : "bg-gray-200"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="py-5 text-xs text-gray-500">-- {mini_desc} (scroll down for your courses) </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full md:hidden gap-5 rounded-xl bg-hb-lightgreen px-4 py-3 mb-4">
                <div className="flex flex-col items-start gap-6">
                    <p className="font-bold text-lg">
                        
                    </p>
                    <div className="inline-flex items-center gap-3 rounded-full border border-green-200 bg-white/60 px-3 py-1">
                        <span className="text-sm font-semibold text-green-900">🔥 streak</span>
                        <div className="flex items-center gap-2">
                            {streakDays.map((isActive, index) => (
                                <span
                                    key={`streak-mobile-${index}`}
                                    className={`h-4 w-4 rounded-full ${isActive ? "bg-green-600 shadow-[0_0_0_2px_rgba(22,163,74,0.25)]" : "bg-green-100"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
