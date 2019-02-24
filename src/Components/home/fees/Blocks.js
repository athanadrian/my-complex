import React, { Component } from 'react'
import { firebaseResidences, firebaseFees } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';
import FeesBlock from '../../ui/fees_block';
import ResidencesBlock from '../../ui/residences_block';
import Slide from 'react-reveal';


export default class Blocks extends Component {
  
    state={
        fees:[],
        residences:[]
    }

    componentDidMount(){
        firebaseFees.limitToLast(6).once('value').then((snapshot)=>{
            const fees = firebaseLooper(snapshot);
            
            this.setState({
                fees:reverseArray(fees)
            })
        })
    }
  
    showFees = (fees) => (
        fees ?
            fees.map((fee) => (
                <Slide bottom key={fee.id}>
                    <div className='item'>
                        <div className='wrapper'>
                            <FeesBlock fee={fee} />
                        </div>
                    </div>
                </Slide>
            ))
            : null
    )

    showResidences = (residences) => (
        
        residences ? 
            residences.map((residence)=>(
                <div className='item'>
                    <div className='wrapper'>
                        <ResidencesBlock residence={residence}/>
                    </div>
                </div>
            ))
        : null
    )

    render() {
        console.log(this.state);
    return (
      <div className='home_fees'>
        {this.showFees(this.state.fees)}
      </div>
    )
  }
}
