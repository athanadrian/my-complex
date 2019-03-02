import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route }  from 'react-router-dom';

import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';

import Home from './Components/home';
import SignIn from './Components/signIn';
import Dashboard from './Components/admin/Dashboard';
import Fees from './Components/admin/fees';
import AddEditFee from './Components/admin/fees/addEditFee';


const Routes = (props) => {
  console.log(props);
  return(
    <Layout>
      <Switch>
        <PrivateRoute {...props} exact path='/admin_fees/edit_fee/:id' component={AddEditFee}/>
        <PrivateRoute {...props} exact path='/admin_fees' component={Fees}/>
        <PrivateRoute {...props} exact path='/dashboard' component={Dashboard}/>
        <PublicRoute {...props} exact restricted={true} component={SignIn} path="/sign-in" />
        <PublicRoute {...props} exact restricted={false} component={Home} path="/" />
      </Switch>
    </Layout>
  )
}

export default Routes;
