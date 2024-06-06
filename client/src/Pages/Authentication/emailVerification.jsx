import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from './firebaseconfig';
import './styles.scss'

const EmailVerification = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let data = window.localStorage.getItem('emailForSignIn');
            if(data)setEmail(data);
            if(email.length!==0){
              signin();
            }
        }
    },[])

    const signin = ()=>{
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
            setTimeout(() => {
              navigate('/SQUAD/');
            }, 2000);
          })
          .catch((error) => {
            console.log(error.message)
            alert("Please enter the email in which the verification link has been sent")
          });
    }

  return (
    <>
    <div className='verification'>
     { email.length!==0 && <>Your Email is Successfully Verified
      <input type="email" className='input' name="email" value={email} placeholder='Email' onChange={(e)=>{
        setEmail(e.target.value);
      }}/>
      <button onClick={signin} className="btn">Verify</button></>}
      { email.length===0 && <>Please Enter Your Email Address To Verify</>}
    </div>
    </>
  )
}

export default EmailVerification
