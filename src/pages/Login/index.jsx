import { Button, notification } from 'antd';
import LoginForm from '../../components/Form'
import style from './style'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { pageRoutes } from '../../network/pageRoutes'
import { userLogin } from '../../services/userService'


const Login = () => {

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



  const handleLogin = async () => {
    try {
      const response = await userLogin({
        "email": (userName).trim(),
        "password": password.trim()
      })
      if (response.token) {
        localStorage.setItem('authToken', JSON.stringify(response.token));
        notification['success']({
          message: 'User Logged in!',
        });
        history.push(pageRoutes.users)
      }
    }
    catch (error) {
      setErrorMssg(error.message)
      openNotificationWithIcon(error.message)
      notification['error']({
        message: 'User login failed !',
      });
    }

  }

  const goToUsersList = () => {
    history.push('/users')
    notification.destroy()
  }

  const openNotificationWithIcon = (error) => {
    notification['error']({
      message: 'Notification',
      description:
        error
    });
  };

  return (
    <div style={wrapper}>
      <h1 >
        Log In!
      </h1>
      <div style={card}>

        <LoginForm
          handleInput={handleUsername}
          handlePassword={handlePassword}
          buttonLabel='Submit'
          onSubmit={() => handleLogin()} />

      </div>

      {errorMssg &&
        <div style={{ marginTop: '2%' }}>
          <Button type="primary" onClick={goToUsersList}>Valid Users List</Button>
        </div>
      }

    </div>
  );
};

export default Login;