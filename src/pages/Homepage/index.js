import React from 'react'
// import FileUploader from '../../Components/ChatApp/FileUploader';
import ChatApp from '../../Components/ChatApp';

// import SignIn from '../../Components/SignIn';
// import Signup from '../../Components/SignUp';
import './styles.css';

// import { useAuthState } from 'react-firebase-hooks/auth';

// import {auth} from "../../firebase/utils"

const Homepage = props => {
    // const [user] = useAuthState(auth)
    // console.log(user)
    return (
        <section className = "homepage">
            <ChatApp/>
        </section>
    )
}

export default Homepage
