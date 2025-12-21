import { Power } from "lucide-react";

function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-700 text-sm flex flex-row items-center gap-2 hover:text-red-600 transition-colors"
    >
      <Power className="text-sm h-4 w-4" />
      Quit
    </button>
  );
}

export default Logout;