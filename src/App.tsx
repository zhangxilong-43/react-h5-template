import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SafeArea } from 'antd-mobile';

import '@styles/App.css';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';

function App() {
    return (
        <>
            <div style={{ background: '#ace0ff' }}>
                <SafeArea position="top" />
            </div>
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Detail" element={<Detail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </main>
            <div style={{ background: '#ffcfac' }}>
                <SafeArea position="bottom" />
            </div>
        </>
    );
}

export default App;
