import React from 'react';
import Nav from '../../components/display/Nav';
import F1 from '../../assets/display/firstPage/F1.png';
import styled from 'styled-components';
import RightBtn from '../../components/display/RightBtn';
import F2 from '../../assets/display/firstPage/F2.png';
import F3 from '../../assets/display/firstPage/F3.png';
import F4 from '../../assets/display/firstPage/F4.png';
import { useNavigate, useLocation } from 'react-router-dom';


const MainPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('user_id') || 'u_001';
  const matchCode = searchParams.get('match_code') || 'm_001';

  sessionStorage.setItem('user_id', userId);
  sessionStorage.setItem('match_code', matchCode);


  return (
    <MainpageStyle>
      <Nav />
      <div className='f1back'>
        <img src={F1} className='f1'/>
        <div className='btnC'>
          <RightBtn children='제품소개' onClick={() => navigate('/display/product')}/>
        </div>
      </div>
      <div className='f2back'>
        <img src={F2} className='f2' />
        <div className='f2Btn'>
          <RightBtn children='확인하기' bgColor="#333333" onClick={() => navigate('/demo/main')}/>
        </div>
      </div>
      <div className='F3Div'>
        <img src={F3} className='f3' />
        <div className='f3Btn'>
          <RightBtn children='회사소개' bgColor="#055540" onClick={() => navigate('/display/aboutus')}/>
        </div>
      </div>
      <div className='F4Div'>
        <img src={F4} className='f4' />
        <div className='f4Btn'>
          <RightBtn children='팀원소개' bgColor="#A97F7F" onClick={() => navigate('/display/team')}/>
        </div>
      </div>
    </MainpageStyle>
  );
};

export default MainPage;

const MainpageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media screen and (max-width: 768px) {
    .f1back{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      .f1{
        margin-top: 5vh;
        width: 100%;
      }
      .btnC{
        display: flex;
        justify-content: center;
        align-items:center;
        height: 10vh;
      }
    }
    .f2back{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .f2{
        width: 100%;
      }
      .f2Btn{
      display: flex;
      justify-content: center;
      align-items:center;
      position: relative;
      bottom: 5vh;
    }
    }
    .F3Div{
      height: 10vh;
      padding: 3vh 3vh;
      display: flex;
      justify-content: center;
      align-items: end;
      border-bottom: .15vh solid #055540;
      margin: 0;
      .f3{
        height: 9vh;
      }
    }
    .F4Div{
      height: 10vh;
      padding: 3vh 3vh;
      display: flex;
      justify-content: center;
      align-items: end;
      border-bottom: .15vh solid #A97F7F;
      margin: 0;
      .f4{
        height: 9vh;
      }
    }
  }
  @media screen and (min-width: 769px){
    .f1back{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .f1{
        margin-top: 5vh;
        width: 60%;
      }
      .btnC{
        display: flex;
        justify-content: center;
        align-items:center;
        height: 20vh;
      }
    }
    .f2back{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .f2{
        width: 100%;
      }
      .f2Btn{
      display: flex;
      justify-content: center;
      align-items:center;
      position: relative;
      bottom: 10vh;
    }
    }
    .F3Div{
      height: 22vh;
      padding: 5vw 10vw;
      display: flex;
      justify-content: center;
      align-items: end;
      border-bottom: .15vh solid #055540;
      margin: 0;
      .f3{
        height: 20vh;
        padding: 0 20vw 0 0;
      }
    }
    .F4Div{
      height: 22vh;
      padding: 5vw 10vw;
      display: flex;
      justify-content: center;
      align-items: end;
      border-bottom: .15vh solid #055540;
      margin: 0;
      .f4{
        height: 20vh;
        padding: 0 20vw 0 0;
      }
    }
  }
`