import React from 'react';
import LogoBellNav from '../../../components/Logo_bell_Nav';
import MainSummary from '../../../components/Main_Summary';
import '../css/Main.scss';
import Footer from '../../../components/Footer';
import Main_Subject from '../../../components/Main_Subject';
import { Device, MatchPlan, MyOvr, MyTeam } from '../../../function/SubjectContents';
import RecentMatch from '../../../components/RecentMatch';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className='main'>
      <LogoBellNav logo={true}/>
      <MainSummary/>
      <div className='subjectbox'>
        <Main_Subject title='나의 팀' BG='#FFFFFF' color='#262626' arrowC='black' arrow={true} children={MyTeam()} onClick={() => navigate('/myteam')}/>
        <Main_Subject title='나의 OVR' BG='#10CC7E' color='#262626' arrowC='black' arrow={true}children={MyOvr()} onClick={() => navigate('/myovr')}/>
        <Main_Subject title='경기 일정' BG='#1C3E71' color='#FFFFFF' arrowC='white' arrow={true}children={MatchPlan()}/>
        <Main_Subject BG='#262626' arrow={false} children={Device()}/>
      </div>
      <div className='recentmatchbox'>
        <RecentMatch />
      </div>
      <Footer />
    </div>
  );
};

export default Main;