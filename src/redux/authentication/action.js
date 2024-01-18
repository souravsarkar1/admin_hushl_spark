import { loginApi } from "../../data/apis";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./actionTypes"
import axios from "axios";
export const adminLogin = (data, toast) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return axios.post(loginApi, data).then((result) => {
        // console.log(result.data.accessToken);
        dispatch({ type: LOGIN_SUCCESS, payload: result.data});
        toast({
            title: 'Login Sucessfully',
            description: "You have successfully Login",
            status: 'success',
            duration: 2000,
            isClosable: true,
            position : 'top'
        })
    }).catch((err) => {
        dispatch({ type: LOGIN_FAIL });
        // console.log(err);
        toast({
            title: "something went wrong",
          description: err.message || "Bad request",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position : 'top'
        })
    });
}

export const defaultLogin = () => (dispatch) => {
    dispatch({ type: LOGIN_SUCCESS });
}

export const admingLogout = ()=>(dispatch)=>{
 dispatch({type : LOGOUT_REQUEST});
 setTimeout(() => {
  dispatch({type : LOGOUT_SUCCESS, payload : ""} )  
 }, 2000);
}