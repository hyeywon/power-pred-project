import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Home.css";

import ButtonArrow from '../../img/button-arrow.js';
import ResourceLine from '../../img/data-resource-line.js';
import TopmenuLine from '../../img/topmenu-line.js';
import SidemenuLine from '../../img/sidemenu-line.js';
import UserImg from "../../img/user-img.js";
import BigButtonArrow  from "../../img/big-button-arrow";

export const Home = () => {

    const [id, setId] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setId(location.state.id);
            setIsAdmin(location.state.isAdmin);
            console.log(id);
            console.log(isAdmin);
        }
    }, [location.state]);

    const gotoRegister = () => {
        navigate("/register", { state: { id : id }});
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
        navigate("/home", { state: { id : id }});
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
    

    return (
        <div className="home">
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
            <p className="home-title">건물 데이터로 내 건물의 전기 사용량과 전기세를 예측해 보세요.</p>
            <div className="overlap-3">
                <div className="data-resource">
                <div className="data-resource-title">필요한 건물 데이터</div>
                <div className="overlap-4">
                    <div className="data-resource-back" />
                    <p className="data-resource-text">
                    <span className="span">
                        날짜 및 시간
                        <br />
                        <br />
                    </span>
                    <span className="text-wrapper-3">
                        전력 사용량
                        <br />
                    </span>
                    <span className="span">
                        <br />
                        기온
                        <br />
                        <br />
                        풍속
                        <br />
                        <br />
                        습도
                        <br />
                        <br />
                        강수량
                        <br />
                        <br />
                        일조
                    </span>
                    </p>
                    <ResourceLine className="data-resource-line" />
                </div>
                <div className="pred-data-text-wrapper">
                    <div className="pred-data-text">예측 데이터</div>
                </div>
                </div>
                <div className="reg-big-button" onClick={gotoRegister}>
                <div className="reg-big-button-texts">
                    <div className="reg-big-button-text">입력하기</div>
                    <BigButtonArrow className="reg-big-button-arrow"/>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Home;