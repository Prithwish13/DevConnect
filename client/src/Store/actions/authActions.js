import api from '../../api/backend';
import history from '../../history';
import jwt_decode from 'jwt-decode';
 export const REGISTER = 'REGISTER';
 export const ERRORS = 'ERRORS';
 export const SET_USER = 'SET_USER';
 export const LOGOUT = 'LOGOUT';
 
 export const register = formValue => async (dispatch,getState) => {

    try {
       const {data} = await api.post('/user/register',formValue);

       dispatch({
          type:REGISTER,
          payload:data
       })
       history.push('/login') 
    } catch (error) {
        dispatch({
           type:ERRORS,
           payload:error.response.data
        })
       
    }
   
 }

 export const login = formValue => async (dispatch,getState) => {
      try {
         const {data} = await api.post('/user/login',formValue)
         const {token} = data;
         //set the token in the local storage
         localStorage.setItem('token',token.replace('Bearer',''));
         //decode token to get user data
         const decode = jwt_decode(token.replace('Bearer',''))
         dispatch(setUser(decode))
      } catch (error) {
         dispatch({
            type:ERRORS,
            payload:error.response.data
         })
      }
 }

 export const setUser = (decode) => {
   return {
      type:SET_USER,
      payload:decode
   }
 }
 

 export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch(setUser({}));
 }