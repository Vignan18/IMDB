import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import FetchMovieDetails from "./Components/FetchMovieDetails";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/FetchMovieDetails" element={<FetchMovieDetails />}></Route>
    </Routes>
  );
}

export default App;