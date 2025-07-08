
export default function Main() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto">
                {/* Desktop Section: visible on medium screens and up */}
                <div className="hidden md:block">
                    <div className="bg-green-200 p-6 rounded-2xl shadow-lg">
                        <p className="text-base text-gray-800">This section appears only on medium and larger screens.</p>
                    </div>
                </div>

                {/* Mobile Section: visible on small screens only */}
                <div className="block md:hidden">
                    <div className="bg-blue-200 p-4 rounded-xl shadow-md">
                        <p className="text-sm text-gray-700">This section is visible only on small screens.</p>
                    </div>
                </div>
            </div>
        </div>

    )
}