//we need movie id..with that we can fetch trailer
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";


const VideoBackground = ({movieId}) => {
  const dispatch=useDispatch();
  const trailerVideo=useSelector(store => store.movies?.trailerVideo);

const getMovieClips = async () =>{
  
  const data= await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos`,
    API_OPTIONS
    );
    
    const json= await data.json();

    const filterData=json.results.filter((video)=> video.type==="Trailer"); //since a movie can have many clips we are finding for trailer
    
    const trailer=filterData.length ? filterData[1] : json.results[0] ;  //if movie does not have a trailer playing any of the clip of movie from json.results

    dispatch(addTrailerVideo(trailer));
};

useEffect(()=>{
  getMovieClips();
},[]);

//we added trailervideo to the store so that we can get trailer id from the store to load video dynamically as id changes
//we first dispatch the trailer and then we get the data using useSelector
//we can also do it by useState...its better to upload it in store and get the data from our store

  return (
    <div>
      <iframe 
    width="560" 
    height="315" 
    src={"https://www.youtube.com/embed/" + trailerVideo?.key}
    title="YouTube video player" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
    </div>
  )
}

export default VideoBackground