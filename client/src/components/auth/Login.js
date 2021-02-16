import React,{useState} from 'react';
import classname from 'classname'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Store/actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
//import history from '../../history';

export default function Login({history}) {
    const [email,setEmail] =useState('');
    const [password,setPassword] = useState('');
    const dispatch = useDispatch();

    const submitHandler = async (e) =>{
        e.preventDefault();
        dispatch(login({email,password}))
    }
    const errors = useSelector(state=>state.error.error);
    const {isAuthenticated} = useSelector(state=>state.auth);
    if(isAuthenticated){
      history.push('/dashboard');
    }
    
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form action="dashboard" onSubmit={submitHandler} >
                <TextFieldGroup
                  name='email'
                  type='email'
                  placeholder='Email Address'
                  value={email}
                  errors={errors}
                  setValue={setEmail}
                />
                
                <TextFieldGroup
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                errors={errors}
                setValue={setPassword}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
