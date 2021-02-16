import isEmpty from "../../valiodation/is-empty";
import { LOGIN,REGISTER,ERRORS, SET_USER } from "../actions/authActions";
const initialState = {
    isAuthenticated : false,
    user:{}
}

export default (state = initialState ,action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                user:action.payload,
                isAuthenticated:false
            }
    
        case SET_USER :
                return {
                    ...state,
                    isAuthenticated : !isEmpty(action.payload),
                    user:action.payload
                }
        default :
            return state
    }
}