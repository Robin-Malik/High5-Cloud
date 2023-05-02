import React, { useState } from 'react';
import HomePage from './HomePage';
import axios from "axios";
import Cookies from 'js-cookie';

const Login = () => {

 const [loggedIn, setLoggedIn] = useState(false);

 const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        email,
        password
      });

      if (response.status === 200) {
        setLoggedIn(true);
        Cookies.set('token', response.data.token);
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loggedIn) {
    return <HomePage/>
  }


  return (

    <div class="login-page">
    <div class="form">
   
    <form class="login-form" onSubmit={(e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        handleLogin(email, password);
      }}>
      <input type="email" name='email' placeholder="Email Id"/>
      <input type="password" name='password' placeholder="Password"/>
      <p class="message"> <a href="#">forgot password</a></p>
      <button>login</button>
      
    </form>
  </div>
</div>  
  )
}

export default Login