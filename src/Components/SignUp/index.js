
// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import React, { useState } from 'react';
import './styles.css';

import { auth, handleUserProfile } from './../../firebase/utils';
import FormInput from './../form/FormInput'

// import AuthWrapper from './../AuthWrapper';

const Signup = props => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [showInput, setShowInput] = useState(false)


  //hide & show toggle for email input 
  const toggleEmailInput = () => setShowInput(prevCheck => !prevCheck)


  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      const err = ['Oi! password dun match'];
      setErrors(err);
      return;
    }

    try {

      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await handleUserProfile(user, { displayName });
      reset();
      props.history.push('/');

    } catch (err) {
      // console.log(err);
    }

  }



  const FormDisplay = () => {
    return (
      <div className="formWrap">

        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return (
                <li key={index}>
                  {err}
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleFormSubmit}>

          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            handleChange={e => setDisplayName(e.target.value)}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={e => setPassword(e.target.value)}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <button type="submit">
            Register
          </button>
        </form>
      </div>
    )
  }

//   const configAuthWrapper = {
//     headline: 'Registration'
//   };

  return (
    // <AuthWrapper {...configAuthWrapper}>
    <div className = "wrap">
      <button onClick={() => toggleEmailInput()}>
            Register with Email
      </button>

      { showInput ? <FormDisplay /> : null }   

    </div>
  );

}

export default Signup;