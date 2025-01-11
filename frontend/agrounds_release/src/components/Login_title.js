import React from 'react';
import styled from 'styled-components';

const Login_title = ({ title, explain }) => {
  return (
    <LoginTitleStyle >
      <p className='login_title'>{title}</p>
      <p className='login_explain'>{explain}</p>
    </LoginTitleStyle>
  );
};

export default Login_title;


const LoginTitleStyle = styled.div`

.titlebox{
  width: 90%;
  display: flex;
  flex-direction: column;
  .login_title{
    margin: 0 0 1vh 0;
    font-size: 24px;
    font-weight: 500;
    color: #262626;

  }
  .login_explain{
    margin: 0 0 4vh 0;
    font-size: 15px;
    font-weight: 500;
    color: #6F6F6F;
    font-family: 'Pretendard-Regular';
  }
}

`