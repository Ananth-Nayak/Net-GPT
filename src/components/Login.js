import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidateData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG, USER_ICON } from "../utils/constants";

const Login = () => {

  const [isSignIn,setIsSignIn]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const dispatch=useDispatch();

  const name=useRef(null);
  const email=useRef(null);  
  const password=useRef(null)

  const handleButtonClick=()=>{
    //validate the form data
    const message=checkValidateData(email.current.value,password.current.value)

    setErrorMessage(message);

    if(message) return; //this indicates to stop our program if any error message comes from validation(i.e not null)

    //Sign In/up logic

    if(!isSignIn){
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
        )
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateProfile(user,{
              displayName:name.current.value,
              userIcon: USER_ICON,
            })
            .then(()=>{
              const {uid,email,displayName,userIcon} = auth.currentUser;             //if user sign in/up this part will be executed
                  dispatch(
                    addUser({
                    uid: uid, 
                    email:email, 
                    displayName: displayName,
                    userIcon: userIcon
                  }));
            })
            .catch((error)=>{
              setErrorMessage(error.message);
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " - " + errorMessage)
          });

    }

    else {
      //sign in logic
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential)=>{
        const user=userCredential.user;
      })
      .catch((error) =>{
        const errorCode=error.message;
        const errorMessage=error.message;
        setErrorMessage(errorCode + " - " + errorMessage)
      });
    }

          };

  const toggleSignInForm=()=>{
setIsSignIn(!isSignIn); 
  }


  return (
    <div>
        <Header/>
        <div className="absolute">
        <img 
        src={BG_IMG}
        alt="bg-img" 
        />
    </div>

    <form 
    onSubmit={(e)=>e.preventDefault()}   //we used it tio prevent submit whenever we clicked any button inside form
    className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-md bg-opacity-80">

        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up "}
          </h1>


        { !isSignIn && (
        <input 
        ref={name}
        type="text" 
        placeholder="Full Name" 
        className="p-4 my-4 w-full rounded-md bg-neutral-700 "
        />
        ) }


        <input 
        ref={email}
        type="text" 
        placeholder="Email Address" 
        className="p-4 my-4 w-full rounded-md bg-neutral-700 "
        /> 


        <input 
        ref={password}
        type="password" 
        placeholder="Password" 
        className="p-4 my-4 w-full rounded-md bg-neutral-700" 
        />  


        <p 
        className="text-red-600 text-lg font-bold py-2">
            {errorMessage}
        </p>


        <button 
        className="p-4 my-6 bg-red-600 rounded-md w-full" onClick={handleButtonClick}>
          {isSignIn ? "Sign In" : "Sign Up"}
          </button>


          <p 
          className="py-4 cursor-pointer hover:underline" 
          onClick={toggleSignInForm}>
          {isSignIn ? "New to Netflix? Sign up Now" : "Already an user? Sign In"}
          </p>

    </form>
    </div>
  )
}

export default Login