import React from 'react';
import { MyLogo } from '../ui/icons';

const Footer = () => {
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
                <MyLogo
                    width="70px"
                    height="70px"
                    link={true}
                    linkTo="/"
                    isFooter={true}
                />
            </div>
            <div className="footer_discl">
                Atana 2018.All rights reserved.
            </div>
            
        </footer>
    );
};

export default Footer;