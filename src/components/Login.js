import { useState } from "react"
import Header from "./Header"

const Login = () => {

  const [isSignIn,setIsSignIn]=useState(true);

  const toggleSignInForm=()=>{
setIsSignIn(!isSignIn); 
  }
  return (
    <div>
        <Header/>
        <div className="absolute">
        <img 
        src="https://assets.nflxext.com/ffe/siteui/vlv3/ca6a7616-0acb-4bc5-be25-c4deef0419a7/c5af601a-6657-4531-8f82-22e629a3795e/IN-en-20231211-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="bg-img" 
        />
    </div>

    <form 
    className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-md bg-opacity-80">

        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up "}
          </h1>


          {!isSignIn && (<input 
        type="text" 
        placeholder="Full Name" 
        className="p-4 my-4 w-full rounded-md bg-neutral-700 "
        />)}


        <input 
        type="text" 
        placeholder="Email Address" 
        className="p-4 my-4 w-full rounded-md bg-neutral-700 "
        /> 


        <input 
        type="password " 
        placeholder="Password" 
        className="p-4 my-4 w-full rounded-md bg-neutral-700" 
        />  


        <button 
        className="p-4 my-6 bg-red-600 rounded-md w-full">
          {isSignIn ? "Sign In" : "Sign Up"}
          </button>


          <p className="py-4 cursor-pointer" 
          onClick={toggleSignInForm}>
          {isSignIn ? "New to Netflix? Sign up Now" : "Already an user? Sign In"}
          </p>

    </form>
    </div>
  )
}

export default Login