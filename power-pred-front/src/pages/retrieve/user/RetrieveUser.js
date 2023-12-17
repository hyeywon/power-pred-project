import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Chart, CategoryScale, LineController, LineElement, PointElement, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import "./RetrieveUser.css";

import ButtonArrow from '../../../img/button-arrow.js';
import TopmenuLine from '../../../img/topmenu-line.js';
import SidemenuLine from '../../../img/sidemenu-line.js';
import UserImg from "../../../img/user-img.js";

export const RetrieveUser = () => {
    Chart.register(LineController, CategoryScale, LineElement, PointElement, LinearScale);
    const option = {
        maintainAspectRatio: false, // 부모 크기에 맞춰 resize
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function(tooltipItem, data) {
                    const label = data.labels[tooltipItem.index];
                    const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return `${label}: ${value}`;
                }
            }
        }, 
        scales: {
            x: {
                ticks: {
                    //minRotation: 90, // 레이블을 90도 회전
                    autoSkip: true,
                    maxTicksLimit: 20 // 차트에 표시될 x축 레이블의 최대 개수를 제한
                }
            }
        }
    }

    const [id, setId] = useState("");
    const [isAdmin, setIsAdmin] = useState("");
    const [selectBname, setSelectBname] = useState("");

    const [chartData, setChartData] = useState(null);
    const [buildingInfo, setBuildingInfo] = useState([{
        name : "",
        powerData : [{
            datetime : null,
            amount : 0
        }],
        elecBill : 0
    }]);
    const [selectedBuilding, setSelectedBuilding] = useState({
        name : "",
        powerData : [{
            datetime : null,
            amount : 0
        }],
        elecBill : 0
    });

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
        console.log(id);
        console.log(location.state.id);
        axios.post('http://15.164.130.210:8080/view/user', {
            id : location.state.id,
        }, {
            withCredentials: true  // 쿠키 포함
        })
        .then(response => {
          if (response.status === 200) {
            const data = response.data;
            setBuildingInfo(response.data);
            setSelectBname(response.data[0].name);
          } else {
            throw new Error('Failed to load data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('데이터를 불러오는데 실패했습니다.');
        });
    }, []);

    useEffect(() => {
        console.log(selectedBuilding);

        const dataByDate = selectedBuilding.powerData?.reduce((acc, item) => {
            const date = new Date(item.dateTime).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = item.amount;
            } else {
                acc[date] += item.amount;
            }
            return acc;
        }, {});
    
        const dateTimeArray = Object.keys(dataByDate);
        const amountArray = Object.values(dataByDate);

        console.log(dateTimeArray);
        console.log(amountArray);

        setChartData({
          labels: dateTimeArray,
          datasets: [
            {
              data: amountArray,
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
    }, [selectedBuilding, selectBname]);  

    useEffect(() => {
        setSelectedBuilding(buildingInfo.find(info => info.name === selectBname) || {});
    }, [selectBname, buildingInfo]);

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
        axios.post('http://15.164.130.210:8080/sign-out',{
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

    const handleSelect = (value) => {
        setSelectBname(value);
    };

    console.log(buildingInfo);
    console.log(selectedBuilding);

    return (
        <div className="retrieve-user">
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
            <select className="pred-graph-bname-box" onChange={e => handleSelect(e.target.value)}>
                {buildingInfo.map((info, index) => (
                    <option key={index} value={info.name}>{info.name}</option>
                ))}
            </select>
            <div className="pred-graph">
                <div className="pred-graph-text-wrapper">
                    <div className="pred-graph-text">전력 수요 그래프</div>
                </div>
                <div className="pred-graph-box">
                    {chartData && <Line data={chartData} options={option} className="line-graph"/>}
                </div>
            </div>
            <p className="expect-fee-text">
                이번 달 예상 전기세는 {selectedBuilding.elecBill}원 입니다.
            </p>
            </div>
        </div>
        </div>
    );
};

export default RetrieveUser;