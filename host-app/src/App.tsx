import { lazy, Suspense, useEffect, useState } from "react";
import Login, { User } from "./LoginPage";

import a from "musiclibrary";
// const Button = lazy(() => import("musiclibrary") as any);
console.log(a);
function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  });
  const LoginSucess = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <div className=" h-full bg-[#f5f8fb]">
      <div className="py-6 px-4 bg-gradient-to-r from-red-700 to-indigo-600 text-white text-4xl">
        <h1> Music Library</h1>
      </div>
      {!user ? (
        <Login onSuccess={LoginSucess} />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Button />
        </Suspense>
      )}
    </div>
  );
}

export default App;
