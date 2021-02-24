import React from 'react';
import "./App.css";
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Landing from './components/layouts/Landing';
import Register from "./components/auth/Register";
import {Router,Route,Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import history from './history';
import setAuthToken from './util/setAuthToken';
import jwt_decode from 'jwt-decode';
import { logout, setUser } from './Store/actions/authActions';
import {useDispatch} from 'react-redux';
import Dashboard from './components/dashboard/Dashboard';
import { decode } from 'jsonwebtoken';
import { clearCurrentProfile } from './Store/actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credencials/AddExperience';
import AddEducation from './components/add-credencials/AddEducation';

const App = () =>{
  const dispatch = useDispatch();
  if(localStorage.token){

    //decode token and get user info
    const decode = jwt_decode(localStorage.token);

    //  setUser and isAuthenticated
    dispatch(setUser(decode));
  }
  const currentTime = Date.now()/1000;
  if(decode.exp < currentTime){
    //LogOut the user
    dispatch(logout());

    //clear current profile
    dispatch(clearCurrentProfile());

    //redirect to login
    window.location.href='/login';
  }

    return (
       <Router history={history} >
        <div  >
            <Header/>
            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/register' exact component={Register}  />
              <Route path='/login' exact component={Login}  />
              <PrivateRoute component={Dashboard} path='/dashboard' exact/>
              <PrivateRoute path='/create-profile' exact component={CreateProfile} />
              <PrivateRoute path='/edit-profile' exact component={EditProfile} />
              <PrivateRoute path='/add-experience' exact component={AddExperience} />
              <PrivateRoute path='/add-education' exact component={AddEducation} />
            </Switch>
            <Footer/>
       </div>
       </Router> 
    )
}
    
export default App;