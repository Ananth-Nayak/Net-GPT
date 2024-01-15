import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"
import Header from "./Header"
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const Browse = () => {

  const dispatch=useDispatch();

  const getRecentMovies=async ()=>{
    const data=await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?page=1',
    API_OPTIONS
    );
    const json=await data.json();
    console.log(json);
    dispatch(addNowPlayingMovies(json.results));
  }

  useEffect(()=>{
    getRecentMovies();
  },[])


  return (
    <div>
      <Header/>
    </div>
  )
}

export default Browse