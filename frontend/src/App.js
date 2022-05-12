import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import MovieDetails from "./Components/MovieDetails";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/movie/:movieid" element={<MovieDetails />}></Route>
    </Routes>
  );
}

export default App;