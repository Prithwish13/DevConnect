//IMPORTING
import axios from 'axios';
import api from '../../api/backend';
import history from '../../history';
import { ERRORS, SET_USER } from './authActions';

//declaring the types
export const SET_CURRENT_USER ='SET_CURRENT_USER';
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';
export const GET_PROFILES = 'GET_PROFILES';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';


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

//add experience
export const addExperience = (formData) => async dispatch => {
    try {
       await api.post('/profile/experience',formData,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
       history.push('/dashboard')
    } catch (error) {
        dispatch({
            type:ERRORS,
            payload:error.response.data
        })
    }
}

//add education
export const addEducation = (formData) => async dispatch => {
    try {
       await api.post('/profile/education',formData,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
       history.push('/dashboard'); 
    } catch (error) {   
        dispatch({
            type:ERRORS,
            payload:error.response.data
        })
    }
};

//remove experience
export const removeExperience = (id) => async dispatch => {
    try {
       const {data} = await api.delete('/profile/experience/'+id,{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}});
       
        dispatch({
            type:GET_PROFILE,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ERRORS,
            payload:error.response.data
        })
    }
}

//Delete account & profile
export const deleteAccount = () => async dispatch =>{
    if(window.confirm('Are you sure want delete Account?')){
       api.delete('/profile',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
            .then(res=>{
                dispatch({
                    type:SET_USER,
                    payload:{}
                })
                localStorage.removeItem('token');
            }) 
            .catch(error=>{
                dispatch({
                    type:ERRORS,
                    payload:error.response.data
                })
            })
    }
};

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