import React from 'react';
import "./App.css";
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Landing from './components/layouts/Landing';
import Register from "./components/auth/Register";
import {BrowserRouter as Router,Route } from 'react-router-dom';
import Login from './components/auth/Login';
const App = () =>{
    return (
       <Router>
        <div  >
         <Header/>
          <Route path='/' exact component={Landing} />
         <div className="container">
            <Route path='/register' exact component={Register}  />
            <Route path='/login' exact component={Login}  />
         </div>
         <Footer/>
       </div>
       </Router> 
    )
}
    
export default App;