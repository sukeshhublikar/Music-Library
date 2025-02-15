import "./App.css";
import AppContainer from "./AppContainer";
import Filter from "./components/Filter";

function App() {
  return (
    <AppContainer>
      <div className="py-6 px-4 bg-gradient-to-r from-red-700 to-indigo-600 text-white text-4xl ">
        <h1> Music Library</h1>
      </div>
      <Filter />
    </AppContainer>
  );
}

export default App;
