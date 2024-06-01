import React from 'react';
import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

import './index.less';

export default () => {
    const navigate = useNavigate();
    const back = () => navigate(-1);

    return (
        <div className="detail-header">
            <NavBar onBack={back}>
                <div>这里是内容页标题</div>
            </NavBar>
        </div>
    );
};
