import React, { useRef, useState } from "react";
import { provider, auth } from "./firebaseconfig";
import {
  sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import "./styles.scss";

import { FcGoogle } from "react-icons/fc";

const actionCodeSettings = {
  url: "https://kota-gang.github.io/SQUAD/squadaccountemailverification",
  handleCodeInApp: true
};

const SignUp = ({ setValue }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const googleref = useRef(null);

  const singInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
      })
      .catch((err) => {
        // 
        alert("Something Went Wrong",err.message)
    
      });
  };

  const signup = (e) => {
    e.preventDefault();

    alert("This Function Is Currently Under Development Due To Some Bugs    "+"    Please Use Sign In With Google Feature")

    return;
    if (userName.length == 0 || password.length < 6 || email.length == 0) {
      if (password.length < 6) {
        alert("Password Cannot Be Less Than 6 Digits");
      } else alert("Please Provdie Necessary Details");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sendSignInLinkToEmail(auth, email,actionCodeSettings)
            .then((result) => {
              window.localStorage.setItem("emailForSignIn", email);
              alert(
                "Email verification link has been sent to your email address"
              );
            })
            .catch((error) => {
              // console.log(error.message);
              alert("Something Went Wrong Try After Some Time")
            });
          auth.signOut();
        })
        .catch((error) => {
          alert(error.message)
        });
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "password") setPassword(event.target.value);
    else setUserName(event.target.value);
  };

  return (
    <div className="wrapper">
      <form onSubmit={signup} className="form">
        <input
          className="input"
          type="text"
          placeholder="Username"
          name="userName"
          value={userName}
          onChange={handleChange}
        />
        <input
          className="input"
          type="Email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className="input"
          type="Password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={handleChange}
        />
        <button onClick={signup} className="btn" type="submit">
          Sign Up
        </button>
      </form>
      <hr className="line" />
      <span className="google" onClick={singInWithGoogle} ref={googleref}>
        <FcGoogle size={25} className="icon" />
        Sign In With Google
      </span>
      <span className="sign">
        Already have an account?{" "}
        <span
          className="setValue"
          onClick={() => {
            setValue("Sign In");
          }}
        >
          Sign In
        </span>{" "}
      </span>
    </div>
  );
};

export default SignUp;
