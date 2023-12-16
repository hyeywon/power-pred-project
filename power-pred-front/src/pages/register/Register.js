import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Register.css";

import ButtonArrow from '../../img/button-arrow.js';
import TopmenuLine from '../../img/topmenu-line.js';
import SidemenuLine from '../../img/sidemenu-line.js';
import UserImg from "../../img/user-img.js";

export const Register = () => {

    const [id, setId] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    
    const [bname, setBname] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const fileInput = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.id && location.state.isAdmin) {
            setId(location.state.id);
            setIsAdmin(location.state.isAdmin);
        }
    }, [location.state]);


    const gotoRegister = () => {
        navigate("/register", { state: { id : id, isAdmin : isAdmin }});
    }

    const gotoRetrieve = () => {
        if(isAdmin === true) {
            navigate("/retrieve/admin", { state: { id : id, isAdmin : isAdmin }});
        }
        else {
            navigate("/retrieve/user", { state: { id : id, isAdmin : isAdmin }});
        }
    }

    const gotoHome = () => {
        navigate("/home", { state: { id : id, isAdmin : isAdmin }});
    }

    const handleLogout = () => {

        axios.post('http://15.164.130.210:8080/sign-out')
        .then(response => {
            if (response.status === 200) {
                navigate("/");
            } else {
                throw new Error('Fail to logout');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('오류가 발생했습니다. 다시 시도해주세요.');
        });
        
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };


    const handleFileDelete = () => {
        setFile(null);
        setFileName("");
        fileInput.current.value = "";
    };

    const handleFileButtonClick = () => {
        fileInput.current.click();
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('buildingName', bname);
        formData.append('csv', file);
      
        axios.post('http://15.164.130.210:8080/upload', formData)
        .then(response => {
          if (response.data.success) {
            alert('데이터가 성공적으로 업로드되었습니다.');
            navigate("/register")
          } else {
            alert('데이터 업로드에 실패했습니다. 다시 시도해주세요.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        });
    };

    return (
        <div className="register">
        <div className="overlap-wrapper">
            <div className="overlap">
            <div className="overlap-group">
                <div className="topmenu">
                <div className="div">
                    <div className="text-wrapper">{id}님</div>
                    <div className="logout-button" onClick={handleLogout}>로그아웃</div>
                    <TopmenuLine className="topmenu-line" />
                    <UserImg className="user-img" />
                </div>
                </div>
                <div className="sidemenu">
                <div className="overlap-2">
                <div className="home-button" onClick={gotoHome}>⚡️전력 예측 시스템⚡️</div>
                    <SidemenuLine className="sidemenu-line" />
                    <div className="reg-button" onClick={gotoRegister}>
                    <div className="text-wrapper-2">데이터 등록하기</div>
                    <ButtonArrow className="img" />
                    </div>
                    <div className="ret-button" onClick={gotoRetrieve}>
                    <div className="text-wrapper-2">데이터 조회하기</div>
                    <ButtonArrow className="img" />
                    </div>
                </div>
                </div>
            </div>
            <div className="title">데이터 등록</div>
            <div className="building-input-form">
                <input className="building-input" type="text" value={bname} onChange={e => setBname(e.target.value)} placeholder="건물명을 입력하세요." />
                <div className="text-wrapper-3">건물명</div>
            </div>
            <div className="file-input-form">
                <input ref={fileInput} type="file" className="file-input" onChange={handleFileChange} style={{display: 'none'}} />
                <div className="file-input">{fileName}</div>
                <div className="text-wrapper-3">파일 첨부</div>
            </div>
            <div className="file-button" onClick={handleFileButtonClick}>
                <div className="file-button-text-wrapper">
                <div className="file-button-text">파일 선택</div>
                </div>
            </div>
            <div className="file-delete-button" onClick={handleFileDelete}>
                <div className="file-button-text-wrapper">
                <div className="file-button-text">파일 삭제</div>
                </div>
            </div>
            <div className="submit-button" onClick={handleUpload}>
                <div className="submit-button-text-wrapper">
                <div className="submit-button-text">데이터 업로드</div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Register;