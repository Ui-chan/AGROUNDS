import React, { useState } from 'react';
import SignUpInput from '../../components/textintput/sign_up_input';
import './add_match.scss';
import GeneralBtn from '../../components/button/generalBtn';
import client from '../../clients';
import { useNavigate } from 'react-router-dom';
const AddMatch = () => {
    const [teamName, setTeamName] = useState('')
    const [time, setTime]= useState(null);
    const [date, setDate] = useState(null);
    const [place, setPlace] = useState('');
    const [myTeam, setMyTeam] = useState('')
    const isValid = teamName && time && date && place;
    const navigate = useNavigate();
    const onSubmitHandler = async event => {
        event.preventDefault();
        
        let AddMatchData = {
            'v2_match_location': place,
            'v2_match_host' : sessionStorage.getItem('nickname'),
            "v2_match_home": myTeam ,//수정 필요
            "v2_match_away" : teamName,
            "v2_match_schedule" : `${date}${time}`
        }
        client.post('/api/V2match/beforematch/', AddMatchData)
        .then(function(response){
            alert('일정이 추가되었습니다.');
            navigate('/FirstSignup');
        })
        .catch(function(error){
            alert(error.response.error);
            console.log(error)
        })
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <div className='add_match_background'>
                <div className='add_match_logo'>AGROUNDS</div>
                <div className='add_match_matchplan'>
                    <div className='add_match_matchplan_title'>MATCH</div>
                    <div className='add_match_matchplan_teambox'><div className='add_match_matchplan_teamname1'>{myTeam}</div><div className='add_match_matchplan_vs'>VS</div><div className='add_match_matchplan_teamname2'>{teamName}</div></div>
                    <div className='add_match_matchplan_place'>{place}</div>
                    <div className='add_match_matchplan_date'>{date}<div className='add_match_matchplan_datespace'></div>{time}</div>
                </div>
                <div className='add_match_title'>경기일정 추가</div>
                <SignUpInput title='상대팀 명' type='text' onChange={(e) => setTeamName(e.target.value)}/>
                <SignUpInput title= "경기 장소"type="text" onChange={(e) => setPlace(e.target.value)} />
                <SignUpInput title= "경기 일자" type='date' onChange={(e) => setDate(e.target.value)} />
                <SignUpInput title= "경기 시간"type="time" onChange={(e) => setTime(e.target.value)} />
                <div className='add_match_button'>{isValid ? <GeneralBtn color='black' children='추가하기' onClick={onSubmitHandler}/> : <GeneralBtn color='white' children='추가하기'/>}</div>
            </div>
        </form>
    );
};

export default AddMatch;