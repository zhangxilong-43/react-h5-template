import React from 'react';
import { Skeleton } from 'antd-mobile';
import './index.less';
import DetailHeader from '../../components/DetailHeader';

export default () => {
    return (
        <>
            <DetailHeader />
            <section>
                <Skeleton.Title animated />
                <Skeleton.Paragraph lineCount={20} animated />
            </section>
        </>
    );
};
