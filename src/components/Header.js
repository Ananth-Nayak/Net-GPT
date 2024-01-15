import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {addUser,removeUser} from "../utils/userSlice"
import { useEffect } from "react";
import { LOGO } from "../utils/constants";



const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user)

  const handleSignOut= ()=>{
    signOut(auth)
    .then(()=>{})
    .catch((error)=>{

      navigate("/error")
      
    })
  };


  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,userIcon} = user;
        dispatch(addUser({
          uid: uid, 
          email:email, 
          displayName: displayName,
          userIcon:userIcon,
        }));

        navigate("/browse");        
      } 
      else 
      {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //this will be called when the component unmounts
    return () => unsubscribe();
  }, [])


  return (
    <div className="absolute px-8 py-2 w-screen bg-gradient-to-b from-black z-10 flex justify-between">
      
        <img 
        className="w-48"
        src={LOGO}
        alt="logo"
        />

      { user &&
        (
        <div className="flex p-2">

          <img 
          className="w-12 h-12"
          alt="user-icon"
          src={user?.userIcon}
          />

          <button  
          className="font-bold text-white"
          onClick={handleSignOut}> 
          Sign Out
          </button>

        </div>
        )}    
        </div>
  )
}

export default Header