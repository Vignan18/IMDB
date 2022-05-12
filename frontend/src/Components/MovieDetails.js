import React,{useState,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import Movie  from './Movie/Movie';


const MovieDetails = () => {
    const location = useLocation();
    const movieid = location.state.links.id;  
    const [Loading,setLoading] = useState(false);
    const [movieDetails,setmovieDetails] = useState();


  if(!Loading && movieDetails){
      setLoading(true);
  }

    useEffect(()=>{
        fetch(`/api/movies/${movieid}`)
        .then(res=>res.json())
        .then(res=> {
           
            setmovieDetails(res);
        });
    },[])
    
    return (
        <>
            <div>
           
               {Loading && <Movie movie={movieDetails}/> }
            </div>
        </>
    )
}

export default MovieDetails;
