import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Signup2.css";

export const Signup2 = () => {
    const [userInfo, setuserInfo] = useState({
        isAdmin: false,
        id: "",
        pw: ""
    });
    const {isAdmin, id, pw} = userInfo;
    const location = useLocation();
    const navigate = useNavigate();

    // 이전 페이지에서 받아온 admin 값을 userInfo에 설정
    useEffect(() => {
        if (location.state) {
            setuserInfo(prevState => ({ ...prevState, isAdmin: location.state.isAdmin }));
        }
    }, [location.state]);

    const submitAccount = () => {
        if(!(userInfo.id && userInfo.pw)) {
          alert('아이디와 비밀번호를 모두 입력해주세요.');
        }
      
        // 백엔드에 전송할 데이터
        const data = {
          isAdmin: userInfo.isAdmin,
          id: userInfo.id,
          pw: userInfo.pw
        };
      
        // 백엔드에 데이터 전송
        axios.post('http://15.164.130.210:8080/sign-up', data)
        .then(response => {
          if (response.status === 200) {
            alert('회원가입이 완료되었습니다.');
            navigate("/");
          } else if (response.status === 400) {
            alert('중복된 아이디로 인해 회원가입에 실패하였습니다.');
            navigate("/signup2");
          } else {
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            navigate("/signup1");
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      };

    const goToLogin = () => {
        navigate("/");
    }

    return (
        <div className="signup2">
        <div className="overlap-wrapper">
            <div className="overlap">
            <div className="signup-title-text">회원가입 (2/2)</div>
            <input className="id-input" id="id" value={id} type="text" onChange={e => setuserInfo({ ...userInfo, id: e.target.value })} placeholder="아이디를 입력하세요." />
            <input className="pw-input" id="pw" value={pw} type="password" onChange={e => setuserInfo({ ...userInfo, pw: e.target.value })} placeholder="비밀번호를 입력하세요." />
            <div className="signup-button">
                <button className="overlap-group" type="button" onClick={submitAccount}>
                <div className="signup-button-text">계정 만들기</div>
                </button>
            </div>
            <div className="login-button-text" onClick={goToLogin}>로그인</div>
            </div>
        </div>
        </div>
    );
};

export default Signup2;