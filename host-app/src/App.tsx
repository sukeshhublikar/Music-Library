import { lazy, Suspense, useEffect, useState } from "react";
import Login, { User } from "./LoginPage";

const MusicApp = lazy(() => import("musiclibrary/MusicApp") as any);

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    localStorage.setItem("user", ""); // Remove user from localStorage
    window.location.reload(); // Refresh page or navigate to login
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const LoginSuccess = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <div className=" h-full bg-[#f5f8fb]">
      <div className="flex py-6 px-4 bg-gradient-to-r from-red-700 to-indigo-600 text-white ">
        <h1 className="text-4xl"> Music Library</h1>
        {user ? (
          <button
            className="ml-auto bg-white  text-red-500 font-semibold h-[32px] px-3 text-sm rounded shadow-md transition duration-300 ease-in-out"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : null}
      </div>
      {!user ? (
        <Login onSuccess={LoginSuccess} />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <MusicApp />
        </Suspense>
      )}
    </div>
  );
}

export default App;
