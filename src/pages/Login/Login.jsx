import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/demo_logo.png'; // <-- Replace with a neutral logo
import { login, signup } from '../../firebase';
import spinner from '../../assets/spinner.gif'; // <-- Replace with a generic loading spinner

const Login = () => {
  const [signstate, setSignState] = useState("Demo Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signstate === "Demo Login") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading ? (
      <div className="loading-spinner">
        <img src={spinner} alt="Loading..." />
      </div>
    ) : (
      <div className='demo-login'>
        <img src={logo} alt="Demo Logo" className='demo-login-logo' />
        <div className="demo-login-form">
          <h1>{signstate}</h1>
          <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
            🚨 This is a demo project. Do not enter real credentials. No real authentication occurs.
          </p>
          <form>
            {signstate === "Demo Register" ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder='Your name'
              />
            ) : null}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder='Email'
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder='Password'
            />
            <button onClick={user_auth} type='submit'>{signstate}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>This is just a demo.</p>
            </div>
          </form>
          <div className="form-switch">
            {signstate === "Demo Login" ? (
              <p>New user? <span onClick={() => setSignState("Demo Register")}>Register Now</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setSignState("Demo Login")}>Login Now</span></p>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Login;
