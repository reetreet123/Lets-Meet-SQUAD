import React, { useEffect, useState } from 'react'
import './styles.scss'
import { auth } from '../../Pages/Authenctication/firebaseconfig'
import { onAuthStateChanged } from 'firebase/auth'
import logo from './logo.png'
import userPhoto_placeholder from '../../assets/userPhoto.png'

const Header = () => {

    const [user,setUser] = useState(null);

    onAuthStateChanged(auth , (userCredential)=>{
      if(userCredential){
        setUser({photoURL:userCredential.photoURL,userName:userCredential.displayName});
      }
      else setUser(null);
    })

    useEffect(()=>{
        // console.log(auth.name)
    },[])

  return (
    <div className='header'>
      <div className='logo'><img src={logo} width={100} height={40} /></div>
      {user && <div className='user'> <img src={user ? user.photoURL : userPhoto_placeholder } className='profilePicture' alt="" /> {user ?user.userName : "User Name"}</div>}
    </div>
  )
}

export default Header
