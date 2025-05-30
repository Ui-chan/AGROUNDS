import React from 'react';
import './TotalAnal.scss';
import Image_Comp from './Image_Comp';
import logo1 from '../assets/default-team-logo.png';
import { useNavigate } from 'react-router-dom';

const TotalAnal = ({ data, type }) => {
  const navigate = useNavigate();
  const matchCode = data.match_code;

  return (
    <div className='totalanal'>
      <p className='analdate'>{data.match_schedule}</p>
      <div className='analbox'>
        <div className='titlebox'>
          <div className='imgbox'>
            <Image_Comp width="8.5vh" img={data.home_team_logo || logo1} />
            <div className='img2'>
              <Image_Comp width="8.5vh" img={data.away_team_logo || logo1} />
            </div>
          </div>
          <p className='place'>{data.match_location}</p>
          <p className='fc'>{data.match_title}</p>
        </div>
        <div className='analdata'>
          {type === "personal" ? (
            <>
              <div className='detaildatarow'>
                <p className='title'>경기시간</p>
                <p className='data'>{data.match_time}분</p>
              </div>
              <div className='detaildatarow'>
                <p className='title'>이동거리</p>
                <p className='data'>{data.distance}km</p>
              </div>
              <div className='detaildatarow'>
                <p className='title'>최고속도</p>
                <p className='data'>{data.top_speed}km/m</p>
              </div>
              <div className='detaildatarow'>
                <p className='title'>스프린트</p>
                <p className='data'>{data.sprint}회</p>
              </div>
              <button
                className='button'
                onClick={() => navigate('/app/personalanalysis', { state: { matchCode } })}
              >
                경기 상세 분석
              </button>
            </>
          ) : (
            <>
              <div className='detaildatarow'>
                <p className='title'>경기시간</p>
                <p className='data'>{data.match_time}분</p>
              </div>
              <div className='detaildatarow'>
                <p className='title'>참여인원</p>
                <p className='data'>{data.participation}명</p>
              </div>
              <div className='detaildatarow'>
                <p className='title'>MOM</p>
                <p className='data'>{data.match_mom }</p>
              </div>
              <div className='detaildatarow'>
                <p className='title'>경기 결과</p>
                <p className='data'>{data.match_result}</p>
              </div>
              <button
                className='button'
                onClick={() => navigate('/app/teamanalysis', { state: { matchCode } })}
              >
                경기 상세 분석
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalAnal;
