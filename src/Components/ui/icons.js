import React from 'react';

import { Link } from 'react-router-dom';
import myDevLogo_header from '../../Resources/images/logos/dev-logo-header.png';
import myDevLogo_footer from '../../Resources/images/logos/dev-logo-footer.png';

export const MyLogo = (props) => {

    const template_header = <div
        className='img_cover'
        style={{
            width: props.width,
            height: props.height,
            background: `url(${myDevLogo_header}) no-repeat`
        }}
    ></div>

    const template_footer = <div
        className='img_cover'
        style={{
            width: props.width,
            height: props.height,
            background: `url(${myDevLogo_footer}) no-repeat`
        }}
    ></div>

    if (props.link) {
        return (
            <Link to={props.linkTo} className='link_logo'>
                {props.isFooter ? template_footer : template_header}
            </Link>
        )
    } else {
        return template_header;
    }

}