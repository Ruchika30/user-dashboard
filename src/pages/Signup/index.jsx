import { Button, notification } from 'antd';
import SignupForm from '../../components/Form'
import style from './style'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { pageRoutes } from '../../network/pageRoutes'
import { userSignup } from '../../services/userService'


const Signup = () => {

  const { wrapper, card } = style
  const history = useHistory()

  const [userName, setuserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMssg, setErrorMssg] = useState('')



  const handleUsername = (input) => {
    setuserName(input.target.value)
  }

  const handlePassword = (pasword) => {
    setPassword(pasword.target.value)
  }



  const handleFormSubmit = async () => {
    try {
      const response = await userSignup({
        // "email": "eve.holt@reqres.in",
        // "password": "pistol"
        "email": userName,
        "password": password
      })
      if (response) {
        localStorage.setItem('authToken', JSON.stringify(response.token));
        notification['success']({
          message: 'User Registered !',
        });
        history.push(pageRoutes.users)
      }
    }
    catch (error) {
      setErrorMssg(error.message)
      notification['error']({
        message: 'User Registeration failed !',
      });
    }

  }

  const goToUsersList = () => {
    history.push(pageRoutes.users)
  }

  return (
    <div style={wrapper}>
      <h1 >
        Sign Up!
      </h1>
      <div style={card}>

        <SignupForm
          handleInput={handleUsername}
          handlePassword={handlePassword}
          buttonLabel='Register'
          onSubmit={() => handleFormSubmit()} />


      </div>
      <div>
        {errorMssg}
      </div>
      <div style={{ marginTop: '2%' }}>
        <Button type="primary" onClick={goToUsersList}> Users List</Button>
      </div>
    </div>
  );
};

export default Signup;