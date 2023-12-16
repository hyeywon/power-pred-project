import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

export const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const login = () => {
    const data = {
      id: id,
      pw: pw
    };
  
    axios.post('15.164.130.210/sign-in', data)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Fail to login');
      }
    })
    .then(data => {
      if (data.success) {
        navigate("/home", { state: { id: data.id, isAdmin: data.isAdmin }});
      } else {
        throw new Error('Fail to login');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    });
  };

  return (
    <div className="login">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="login-title-text">⚡️전력 예측 시스템⚡️</div>
          <input className="id-input" type="text" value={id} onChange={e => setId(e.target.value)} placeholder="아이디를 입력하세요." />
          <input className="pw-input" type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호를 입력하세요." />
          <div className="login-button">
            <div className="overlap-group" onClick={login}>
              <div className="login-button-text">로그인</div>
            </div>
          </div>
          <div className="signup-button-text" onClick={() => navigate("/signup1")}>회원가입</div>
        </div>
      </div>
    </div>
  );
};

export default Login;