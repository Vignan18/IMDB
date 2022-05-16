import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import MovieDetails from "./Components/MovieDetails";
import Layout from "./Components/Layout/Layout";
import Footer from "./Components/Footer/Footer";


function App() {
  return (
   <>
   <Layout /><Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/movie/:movieid" element={<MovieDetails />}></Route>
    </Routes>
    <Footer/>
    </>
    
    
  );
}

export default App;