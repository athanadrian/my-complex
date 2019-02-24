import React from 'react'
import { calculateTotalFee } from './misc';

const FeesBlock = ({fee}) => {

    console.log(fee);
  return (
    <div className='fee_block'>
      <div className='fee_date'>
        {fee.processedDate}
      </div>
      <div className='fee_wrapper'>
        <div className='fee_top'>
            <div className='left'>
                <div className='fee_month_year'>
                    {fee.month}, {fee.year}
                </div>
            </div>
            <div className='right'>
                {calculateTotalFee(fee)}
            </div>
        </div>
      </div>
    </div>
  )
}

export default FeesBlock