import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import MovieDetails from "./Components/MovieDetails";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/MovieDetails" element={<MovieDetails />}></Route>
    </Routes>
  );
}

export default App;