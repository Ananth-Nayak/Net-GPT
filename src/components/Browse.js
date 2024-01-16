import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayMovies";
import MainSection from "./MainSection";
import SecondarySection from "./SecondarySection";

const Browse = () => {

useNowPlayingMovies();

  return (
    <div>
      <Header/>
      <MainSection />
      <SecondarySection/>
    </div>
  )
}

export default Browse