import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '@material-ui/core';
import { firebase } from '../../../firebase';

const AdminNav = () => {

    const links = [
        {
            title: 'Fees',
            linkto: 'admin_fees'
        },
        {
            title: 'Add fee',
            linkto: 'admin_fees/edit_fee'
        },
        {
            title: 'Residences',
            linkto: 'admin_residences'
        },
        {
            title: 'Add residence',
            linkto: 'admin_residences/edit_residence'
        },
    ]

   const renderItems = () => (
        links.map((link)=>(
            <Link to={link.linkto} key={link.title}>
                <ListItem className='admin_left_nav_item'>
                    {link.title}
                </ListItem>
            </Link>
        ))
   )

   const logoutHandler = () => {
        firebase.auth()
        .signOut()
        .then(()=>{
            console.log('sign out successfully')
        },error=>{
            console.log('error signing out')
        })
   }

    return (
        <div>
            {renderItems()}
            <ListItem className='admin_left_nav_item' onClick={()=>logoutHandler()}>
                Log out
            </ListItem>
        </div>
    )
}
export default AdminNav