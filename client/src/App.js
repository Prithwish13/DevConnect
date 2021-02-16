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
import { setUser } from './Store/actions/authActions';
import {useDispatch} from 'react-redux';

const App = () =>{
  const dispatch = useDispatch();
  if(localStorage.token){
    const decode = jwt_decode(localStorage.token);
    dispatch(setUser(decode))
  }

    return (
       <Router history={history} >
        <div  >
            <Header/>
            <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/register' exact component={Register}  />
            <Route path='/login' exact component={Login}  />
            </Switch>
            <Footer/>
       </div>
       </Router> 
    )
}
    
export default App;