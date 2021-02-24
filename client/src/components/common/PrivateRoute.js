import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function PrivateRoute({component:Component,...rest}) {
    const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
    console.log(isAuthenticated);
    return (
       <Route  
       {...rest}
       render={props=> 
        isAuthenticated ? 
        <Component {...props}/> :
        <Redirect
        to={{
            pathname: "/login",
        }}
        />
       }
       />
    )
}