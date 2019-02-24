import React from 'react'
import { Tag } from '../../ui/misc';
import Blocks from './Blocks';

const FeesHome = () => {
    return (
        <div className='home_fees_wrapper'>
            <div className='container'>
                <Tag
                    bck='#0e1731'
                    size='50px'
                    color='#ffffff'
                >
                    Fees
                </Tag>

                <Blocks/>

                <Tag
                    bck='#ffffff'
                    size='22px'
                    color='#0e1731'
                    link={true}
                    linkto='/the_residence'
                >
                    See more fees...
                </Tag>
            </div>
        </div>
    )
}

export default FeesHome