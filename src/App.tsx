import React from 'react';
import { SafeArea } from 'antd-mobile';
import logo from '@static/logo.svg';
import '@styles/App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header"></header>
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position="top" />
            </div>
            <main className="App-content">
                <img src={logo} className="App-logo" alt="logo" />
                <p>基于 React 和 Antd-mobile 搭建的 H5 模版项目</p>
            </main>
            <div style={{ background: '#ffcfac' }}>
                <SafeArea position="bottom" />
            </div>
        </div>
    );
}

export default App;
