import React from 'react';

import {auth } from "../../firebase/utils"

import { useAuthState } from 'react-firebase-hooks/auth';
import Messenger from './Messenger';
import SignIn from './../SignIn'
import SignUp from './../SignUp'



//this will be anchor point for everything related to chat application
const ChatApp = () => {
    const [user] = useAuthState(auth);//react/firebase libary

    return (  
      <div className="ChatApp">

  
        <section>
            {user ? <Messenger /> : <SignIn/>} 
            {user ? null : <SignUp/>} 
            <span onClick={() => auth.signOut()}>
                  LogOut
            </span>
            {/* {{user ? <UploadScreen/> : null}  */}
        </section>
  
      </div>
    );
  }

export default ChatApp
