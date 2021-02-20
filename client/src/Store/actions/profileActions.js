//IMPORTING
import api from '../../api/backend';
import history from '../../history';
import { ERRORS } from './authActions';

//declaring the types
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';
export const GET_PROFILES = 'GET_PROFILES';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CREATE_PROFILE = 'CREATE_PROFILE';


//Get current Profile
export const getCurrentProfile = () => async dispatch => {
   dispatch(setProfileLoading());
   try {
       const {data} = await api.get('/profile',{headers:{
           'Authorization':'Bearer '+localStorage.getItem('token')
       }});
       dispatch({
           type:GET_PROFILE,
           payload:data
       })
   } catch (error) {
       dispatch({
           type:GET_PROFILE,
           payload:{}
       })
   } 
};

//Create Profile
export const createProfile = (profileData) => async dispatch =>{
    try {
        const {data} = await api.post('/profile/create',profileData,{headers:{
           'Authorization':'Bearer '+localStorage.getItem('token')
       }})
       dispatch({
           type:CREATE_PROFILE,
           payload:data
       })
       history.push('/dashboard')
    } catch (error) {
        dispatch({
            type:ERRORS,
            payload:error.response.data
        })
    }
}

//Prodile Loading
export const setProfileLoading = () =>{
    return {
        type:PROFILE_LOADING
    }
}

//Clear profile
export const clearCurrentProfile = () =>  {
    return {
        type:CLEAR_CURRENT_PROFILE
    }
} 