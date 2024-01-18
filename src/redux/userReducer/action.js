import axios from "axios";
import {
  USER_VERIFY_REQUEST,
  USER_VERIFY_FAILURE,
  USER_VERIFY_SUCCESS,
  REPORTEDBY_SUCCESS,
  USER_REJECT_SUCCESS,
  USER_APPROVAL_VERIFY_SUCCESS,
  REMOVE_REPORT_SUCCESS,
  DELETE_USER_SUCCESS,
  RESET_USERS,
  RESET_REPORTED_USERS
} from "./actionTypes";

// FOR  GETTING UnVerified USER DATA
export const getUser = (gender) => (dispatch) => {
  dispatch({ type: USER_VERIFY_REQUEST });
  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // Set up the Axios request headers with the token
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  axios
  .get(`http://localhost:8000/user/unverified-users?gender=${gender}`, { headers })
    .then((res) => {
      // console.log(res.data);
      if (Array.isArray(res.data.data)) {
      dispatch({ type: USER_VERIFY_SUCCESS, payload: res.data });
      }else {
        dispatch({ type: USER_VERIFY_FAILURE });
      }
    })
    .catch(() => {
      dispatch({ type: USER_VERIFY_FAILURE });
    });
};

// FOR  GETTING REPORTED USER DATA
export const reportedBy = () => (dispatch) => {
  dispatch({ type: USER_VERIFY_REQUEST })

  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // Set up the Axios request headers with the token
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  axios
  .get(`http://localhost:8000/user/reported-users`,{headers})
    // .get(`http://localhost:8000/user/reported-users`)
    .then((res) => {
      // console.log(res.data)
      dispatch({ type: REPORTEDBY_SUCCESS, payload: res.data })
    })
    .catch(() => {
      dispatch({ type: USER_VERIFY_FAILURE })
    })
}

// POST REQUEST FOR APPROVAL User
export const approval_for_verifying_User = (data) => (dispatch) => {
  
  dispatch({ type: USER_VERIFY_REQUEST })
  axios
    .post(` http://localhost:8000/user/approve-user`, data
      , {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    }
    )
    .then((res) => {
      // console.log("APPROVAL",res.data)
      dispatch({ type: USER_APPROVAL_VERIFY_SUCCESS, payload:res.data })
    })
    .catch((err) => {
      dispatch({ type: USER_VERIFY_FAILURE })
    })
}

// POST REQUEST FOR UnAPPROVE User
export const rejection_for_verifying_User = (data) => (dispatch) => {
  // const data = { userId }
  dispatch({ type: USER_VERIFY_REQUEST })
  return axios
    .post('http://localhost:8000/user/unapprove-user', data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
    .then((res) => {
      // console.log(res.data)
      dispatch({ type: USER_REJECT_SUCCESS })
    })
    .catch((err) => {
      dispatch({ type: USER_VERIFY_FAILURE })
    })
}

// POST REQUEST FOR REMOVE REPORT
export const remove_report = (data) => (dispatch) => {
  dispatch({ type: USER_VERIFY_REQUEST })
  axios
    .post(`http://localhost:8000/user/remove-report`,data,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then((res) => {
      // console.log(res.data)
      dispatch({ type: REMOVE_REPORT_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: USER_VERIFY_FAILURE })
    })
}

// POST REQUEST FOR DELETE USER
export const deleteUser = (data) => (dispatch) => {
  
  dispatch({ type: USER_VERIFY_REQUEST })
  axios
    .post(`http://localhost:8000/user/delete-user`, data,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then((res) => {
      // console.log("deleteUser",JSON.stringify(res.data))
      dispatch({ type: DELETE_USER_SUCCESS, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: USER_VERIFY_FAILURE })
    })
}









export const resetUsers = (userId) => ({
  type: RESET_USERS,
  payload: userId,
});

export const resetReportedUsers = (userId) => ({
  type: RESET_REPORTED_USERS,
  payload: userId,
});