import React from 'react';
import Featured from './featured';
import Fees from './fees';
import Promotion from './promotion';

const Home = () => {
    return (
        <div className="bck_blue">
            <Featured/>
            <Fees/>
            <Promotion/>
        </div>
    );
};

export default Home;