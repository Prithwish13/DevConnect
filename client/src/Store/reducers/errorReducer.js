
import { ERRORS } from "../actions/authActions";

const initialState = {}

export default (state=initialState,action) =>{
    switch (action.type) {
        case ERRORS:
            return{
             error:action.payload
            }
        default:
            return initialState
    }
}