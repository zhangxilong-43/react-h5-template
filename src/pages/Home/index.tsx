import React from 'react';
import logo from '@static/logo.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd-mobile';
import './index.less';

function Home() {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate('/Detail');
    };

    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <p>基于 React 和 Antd-mobile 搭建的 H5 模版项目</p>
            <Button size="mini" onClick={goDetail}>
                详情页
            </Button>
        </div>
    );
}

export default Home;
