import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "./firebaseconfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {FcGoogle} from 'react-icons/fc'

import "./styles.scss"


const SignIn = ({setValue}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singInWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      // console.log("Successfully Sign In:", data);
    })
      .catch((err) => {
        console.log(err.message);
      })

  }

  const signin = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if(user.emailVerified===false){
          console.log("Please Verify Your Email ID");
          auth.signOut();
        }
        else console.log("Successfull Signin", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("User Not Fount Please Sign Up First");
        setValue("Sign Up")
      });
  };

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "password") setPassword(event.target.value);
  }

  return (
    <div className="wrapper">
        <form onSubmit={signin}  className="form">
          <input className="input" type="Email" placeholder="Email" value={email} name="email" onChange={handleChange}/>
          <input className="input" type="Password" placeholder="Password" value={password} name="password" onChange={handleChange}/>
          <button className="btn" type="submit">Sign In</button>
        </form>
        <hr className="line" />
        <span className="google" onClick={singInWithGoogle}><FcGoogle size={25} className="icon" />Sign In With Google</span>
        <span className="sign">Don't have an account? <span className="setValue" onClick={()=>{
          setValue('Sign Up')
        }}>Sign Up</span> </span>
    </div>
  );
};

export default SignIn;
