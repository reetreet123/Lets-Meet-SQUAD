import React, { useState } from "react";
import "./styles.scss";
import SignIn from "../Authenctication/SignIn";
import SignUp from "../Authenctication/SignUp";
import StartConferencing from "./StartConferencing/startConferencing";
import {auth} from '../Authenctication/firebaseconfig'
import { onAuthStateChanged } from "firebase/auth";


const Home = () => {

  const [value,setValue] = useState('Sign In');
  const [verified,setVerified] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setValue('Start Video Conference')
      if(user.emailVerified){
        setVerified(true);
      }
    } 
    else{
      if(value==='Start Video Conference')setValue('Sign In')
    }
  });

  const signout = ()=>{
    setValue('Sign In')
    auth.signOut();
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="heading">{value}</h1>
        {value==='Sign In' && <SignIn setValue={setValue}/>}
        {value==='Sign Up' && <SignUp setValue={setValue}/>}
        {value==='Start Video Conference' && <StartConferencing signout={signout} verified={verified} setValue={setValue}/> }
      </div>
      <div className="info">
        
      </div>
    </div>
  );
};

export default Home;
