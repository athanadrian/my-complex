import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseFees } from '../../../firebase';
import { firebaseLooper, reverseArray, calculateTotalFee } from '../../ui/misc';

export default class Fees extends Component {

    state = {
        isLoading: true,
        fees: []
    }

    componentDidMount(){
        firebaseFees.once('value').then((snapshot)=>{
            const fees = firebaseLooper(snapshot);

            this.setState({
                isLoading:false,
                fees:reverseArray(fees)
            })
        })
    }

    render() {
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ref</TableCell>
                                    <TableCell>Sewage</TableCell>
                                    <TableCell>Water</TableCell>
                                    <TableCell>Electric</TableCell>
                                    <TableCell>Pool</TableCell>
                                    <TableCell>Extra</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.fees ?
                                    this.state.fees.map((fee, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Link to={`/admin_fees/edit_fee/${fee.id}`} style={{color: '#98c5e9'}}>
                                                    <strong>{fee.month}, {fee.year}</strong>
                                                </Link>
                                            </TableCell>
                                            <TableCell>{fee.sewage}</TableCell>
                                            <TableCell>{fee.water}</TableCell>
                                            <TableCell>{fee.electric}</TableCell>
                                            <TableCell>{fee.pool}</TableCell>
                                            <TableCell>{fee.extra}</TableCell>
                                            <TableCell>{calculateTotalFee(fee)}</TableCell>
                                            <TableCell>{fee.processedDate}</TableCell>
                                        </TableRow>
                                    ))
                                    : null
                                }
                            </TableBody>
                        </Table>
                    </Paper>

                    <div className='admin_progress'>
                        {this.state.loading ?
                            <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
                            : ''
                        }
                    </div>
                </div>
            </AdminLayout>
        )
    }
}
