import Login from "./LoginPage";
// import a from "musiclibrary";

function App() {
  return (
    <div className=" h-full bg-[#f5f8fb]">
      <div className="py-6 px-4 bg-gradient-to-r from-red-700 to-indigo-600 text-white text-4xl ">
        <h1> Music Library</h1>
      </div>
      <Login />
    </div>
  );
}

export default App;
