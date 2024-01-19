import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useTrailerVideo = (movieId) =>{
    const dispatch=useDispatch();

    
const getMovieClips = async () =>{
  
    const data= await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
      );
      
      const json= await data.json();
  
      const filterData=json.results.filter((video)=> video.type==="Trailer"); //since a movie can have many clips we are finding for trailer
      
      const trailer=filterData.length ? filterData[0] : json.results[0] ;  //if movie does not have a trailer playing any of the clip of movie from json.results
  
      dispatch(addTrailerVideo(trailer));
  };
  
  useEffect(()=>{
    getMovieClips();
  },[]);

} 

export default useTrailerVideo;