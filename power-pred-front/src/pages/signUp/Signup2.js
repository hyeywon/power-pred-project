import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Signup2.css";

export const Signup2 = () => {
    const [userInfo, setuserInfo] = useState({
        admin: 0,
        id: "",
        pw: ""
    });
    const {admin, id, pw} = userInfo;
    const location = useLocation();
    const navigate = useNavigate();

    // 이전 페이지에서 받아온 admin 값을 userInfo에 설정
    useEffect(() => {
        if (location.state && location.state.adminValue) {
            setuserInfo(prevState => ({ ...prevState, admin: location.state.adminValue }));
        }
    }, [location.state]);

    const submitAccount = () => {
        // 백엔드에 전송할 데이터
        const data = {
            admin: userInfo.admin,
            id: userInfo.id,
            pw: userInfo.pw
        };

        // 백엔드에 데이터 전송
        fetch('http://backend-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) { // 백엔드에서 success 필드를 전달
                alert('회원가입이 완료되었습니다.');
                navigate("/login");
            } else {
                alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        navigate("/login");
    }

    const goToLogin = () => {
        navigate("/login");
    }

    return (
        <div className="signup2">
        <div className="overlap-wrapper">
            <div className="overlap">
            <div className="signup-title-text">회원가입 (2/2)</div>
            <input className="id-input" id="id" value={id} type="text" onChange={e => setuserInfo({ ...userInfo, id: e.target.value })} />
            <input className="pw-input" id="pw" value={pw} type="password" onChange={e => setuserInfo({ ...userInfo, pw: e.target.value })} />
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