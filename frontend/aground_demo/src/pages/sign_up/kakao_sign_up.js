import React from 'react';
import './kakao_sign_up.scss';
import Checkbox from '../../components/checkbox/checkbox';
import SignUpInput from '../../components/textintput/sign_up_input';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../clients';
import classNames from 'classnames';
import GeneralBtn from '../../components/button/generalBtn';
import Female from '../../assets/female.png'
import male from '../../assets/male.png'
const KakaoSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [birth,setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [marketingAgree, setMarketingAgree] = useState('');
    const [termsAgree,setTermsAgree] = useState('');
    const [privacyAgree,setPrivacyAgree] = useState('');
    const [allAgree,setAllAgree] = useState('');
    const [isNickname,setIsNickname] = useState('');
    const [isName,setIsName] = useState('');
    const [isBirth,setIsBirth] = useState('');
    const [selectedGender, setSelectedGender] = useState(null);

    const navigate = useNavigate;
    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        setGender(gender);
    };
    
    let isAgree = privacyAgree && termsAgree;
    let isAllValid =  isNickname && isAgree;

    useEffect(() => {
        setAllAgree(privacyAgree && termsAgree && marketingAgree)
    },[privacyAgree ,termsAgree, marketingAgree])
    
    const saveNickname = event => {
        setNickname(event.target.value);
        const IsValidNickname = /^[a-zA-Z가-힣0-9!@#$%^&*()-_=+{};:,<.>]{3,10}$/.test(event.target.value)
        setIsNickname(IsValidNickname)
    }
    
    
    const onSubmitHandler = async event => {
        event.preventDefault();

        let SignUpData = {
            'user_id' : email,
            'password' : password,
            'user_birth' : birth,
            'user_name' : name,
            'user_gender' : gender,
            'user_nickname' : nickname,
            'marketing_agree' : marketingAgree
        }
        console.log(SignUpData);

        client.post('/api/V2login/kakao/signup/',SignUpData)
        .then(function(response){
            console.log(response)
            navigate("/") //mainpage로
        })
        .catch(function(error){ 
            console.log(error);
        })
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <div className='kakaosignupbackground'>
                <div className='kakaosignuptitle'>추가정보</div>
                <SignUpInput title='닉네임' type='text' onChange={saveNickname}/>
                <div className='kakaosignupinput'>
                    <div className='kakaogender_title'>성별</div>
                    <div className='kakaogender-largebox'>
                        <div className='kakaogender-mediumbox'>
                            <div className={classNames('kakaogender-logobox', {'black': selectedGender === 'female'})} onClick={() => handleGenderSelect('female')}><img className='kakaogender-logo' src={Female}/></div>
                            <div className='kakaogender-description'>여성</div>
                        </div>
                    </div>
                    <div className='kakaogender-largebox'>
                        <div className='kakaogender-mediumbox'>
                            <div className={classNames('kakaogender-logobox', {'black': selectedGender === 'male'})} onClick={() => handleGenderSelect('male')}><img className='kakaogender-logo' src={male}/></div>
                            <div className='kakaogender-description'>남성</div>
                        </div>
                    </div>
                </div>
                
                <Checkbox setTermsAgree={setTermsAgree}privacyAgree={privacyAgree}termsAgree={termsAgree}marketingAgree={marketingAgree}allAgree={allAgree}setAllAgree={setAllAgree}setMarketingAgree={setMarketingAgree}setPrivacyAgree={setPrivacyAgree} />
                <div style={{marginTop: '13vh'}}></div>
                {isAllValid ? <GeneralBtn color='black' onClick={onSubmitHandler}>가입하기</GeneralBtn> : <GeneralBtn type='button'color='white'>가입하기</GeneralBtn>}
                
            </div>
        </form>
    );
};

export default KakaoSignUp;