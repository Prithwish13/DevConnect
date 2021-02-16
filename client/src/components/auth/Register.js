import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {register} from '../../Store/actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

export default function Register(posps) {
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confPass,setConPass] = useState('');
     

    const errors = useSelector(state=>state.error.error);
   
   const handleSubmit =  (e) =>{
       e.preventDefault();
       const newUser = {
           name:name,
           email:email,
           password:password,
           confirmpassword:confPass
       }       
       dispatch(register(newUser));      
    }

    return (
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your DevConnector account</p>
                <form action="create-profile.html" onSubmit={handleSubmit}>
                    <TextFieldGroup
                      type='text'
                      placeholder='Name'
                      value={name}
                      name={name}
                      setValue={setName}
                      errors={errors}
                    />
                      <TextFieldGroup
                      type='email'
                      placeholder='Email Address'
                      value={email}
                      name='email'
                      setValue={setEmail}
                      errors={errors}
                      info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
                    />
                    <TextFieldGroup
                      type='password'
                      placeholder='Password'
                      value={password}
                      name='password'
                      setValue={setPassword}
                      errors={errors}
                    />
                    <TextFieldGroup
                      type='password'
                      placeholder='Confirm Password'
                      value={confPass}
                      name='"confirm-password"'
                      setValue={setConPass}
                      errors={errors}
                    /> 
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
  </div>
    )
}
