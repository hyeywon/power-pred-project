import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./RetrieveAdmin.css";

import ButtonArrow from '../../../img/button-arrow.js';
import TopmenuLine from '../../../img/topmenu-line.js';
import SidemenuLine from '../../../img/sidemenu-line.js';
import UserImg from "../../../img/user-img.js";

export const RetrieveAdmin = () => {
    const [id, setId] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [trainData, setTrainData] = useState([]);
    const [predictions, setPredictions] = useState([]);

    const fileInput = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setId(location.state.id);
            setIsAdmin(location.state.isAdmin);
        }
    }, [location.state]);

    useEffect(() => {
        axios.post('http://15.164.130.210:8080/view/admin', {
            id : location.state.id,
        }, {
            withCredentials: true  // 쿠키 포함
        })
        .then(response => {
          if (response.status === 200) {
            setTrainData(response.data.trainData);
            setPredictions(response.data.predictions);
          } else {
            throw new Error('Failed to load data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('데이터를 불러오는데 실패했습니다.');
        });
      }, []);

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

        axios.post('http://15.164.130.210:8080/sign-out', {
            withCredentials: true  // 쿠키 포함
        })
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

    const downloadData = () => {
        trainData.forEach(file => {
            // 다운로드 링크 생성
            const link = document.createElement('a');
            link.href = file.url;
            link.download = file.name;
            link.click();
          });
    }

    return (
        <div className="retrieve-admin">
        <div className="overlap-wrapper">
            <div className="overlap">
            <div className="overlap-group">
                <div className="topmenu">
                <div className="div">
                    <div className="text-wrapper">{id + " "}님</div>
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
            <div className="upload-title">내가 업로드한 데이터 조회</div>
            <div className="download-title">예측이 필요한 데이터 조회</div>
            <div className="upload-file-table">
                {predictions.map((prediction, index) => (
                    <p key={index}>{prediction}</p>
                ))}
            </div>
            <div className="download-file-table">
            {trainData.map(file => (
                <p key={file.id}>{file.name}</p>
            ))}
            </div>
            <div className="download-button" onClick={downloadData}>
                <div className="div-wrapper">
                <div className="text-wrapper-3">데이터 다운로드</div>
                </div>
            </div>
            <div className="upload-button" onClick={gotoRegister}>
                <div className="div-wrapper">
                <div className="text-wrapper-3">데이터 업로드</div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default RetrieveAdmin;