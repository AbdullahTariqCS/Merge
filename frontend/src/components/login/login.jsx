import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../../assets/theme.css'
import './login.css'

function LoginSignUp({ background = true }) {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className='login'>
        {
          login ? <Login setLogin={setLogin} /> : <SignUp setLogin={setLogin} />
        }
      </div>
      {
        background && <div className='login-background'></div>
      }
    </>
  )
}

function Login({ setLogin }) {
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedin] = useState(false);


  const onLogin = () => {
    setLoggedin(true); 
  }

  if(loggedIn)
    return (<Navigate to='/home'/> )
  return (
    <>
      <p className='m-primary login-label d-flex align-items-center'>Login</p>
      <input className={`m-primary ${error && 'login-error'} login-input`} placeholder='Username'></input>
      {
        error && <div className='login-error-message'>username does not exists</div>
      }
      <input className='m-primary login-input mb-4' style={error ? { marginTop: '0.75rem' } : {}} placeholder='Password'></input>

      <div className='container-fluid row p-0 m-0' autoSelect='off'>
        <div className='col login-secondary-button ' onClick={() => setLogin(false)}>Sign   Up</div>
        <div className='col m-button login-primary-button' onClick={() => onLogin()}>Login</div>


      </div>

    </>
  )
}

function SignUp({ setLogin }) {
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  return (
    <>
      <p className='m-primary login-label d-flex align-items-center mb-4'>Sign Up</p>
      <input className={`m-primary ${userError && 'login-error'} login-input`} placeholder='Username'
        onBlur={(e) => setUserName(e.target.value.trim())}></input>
      {
        userError && <div className='login-error-message mt-1'>username already exists</div>
      }
      <input className={`m-primary login-input ${passwordError && 'login-error'}`} style={userError ? { marginTop: '0.75rem' } : {}}
        placeholder='Password' onChange={(e) => setPassword(e.target.value.trim())}></input>

      <input className={`m-primary login-input ${passwordError ? 'login-error' : 'mb-4'}`} 
        placeholder='Confirm Password'  onChange={(e) => setConfirmPassword(e.target.value.trim())}></input>
      {
        passwordError && <div className='login-error-message mt-1 mb-3'>password do not match</div>
      }

      <div className='container-fluid row p-0 m-0'>
        <div className='col login-secondary-button ' onClick={() => setLogin(true)}>Login</div>
        <div className='col m-button login-primary-button'>Sign Up</div>
      </div>

    </>
  )
}
export default LoginSignUp; 