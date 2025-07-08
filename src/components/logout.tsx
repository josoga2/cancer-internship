function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-300 text-white text-base px-4 py-2 rounded hover:bg-red-600"
    >
      ⏻ Logout
    </button>
  );
}

export default Logout;