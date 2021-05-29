import React, { useState } from 'react';
import './styles.css';    
import { signInWithGoogle, auth } from './../../firebase/utils';


const SignIn = (props) => {

    const resetForm = () => {
        setEmail('');
        setPassword('');
      };

    const handleSubmit = async e => {
        e.preventDefault();
    
        try {
          await auth.signInWithEmailAndPassword(email, password);
          resetForm();
          props.history.push('/');
    
        } catch (err) {
          // console.log(err);
        }
      }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showInput, setShowInput] = useState(false)
    // const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  //hide & show toggle for email input 
  const toggleEmailInput = () => setShowInput(prevCheck => !prevCheck)


  const EmailSignInInput = () => (
    <div className = "email" >
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

      <button onClick={() => handleSubmit()}>Sign In</button>
    </div>
  )


  return (
    <div className="App">
      <button className="sign-in-with-Google" onClick={signInWithGoogle}>Sign in with Google</button>

      <button onClick={() => toggleEmailInput()}>Sign in With Email</button>  

        { showInput ? <EmailSignInInput /> : null }

    </div>
  );
};

export default SignIn