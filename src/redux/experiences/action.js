import axios from "axios";
import { ADD_NEW_REVIWES_ERROR, ADD_NEW_REVIWES_REQUEST, ADD_NEW_REVIWES_SUCCESSFUL, ARCHIVE_EXPERIENCE_FAIL, ARCHIVE_EXPERIENCE_REQUEST, ARCHIVE_EXPERIENCE_SUCCESS, DELETE_EXPERIENCE_FAIL, DELETE_EXPERIENCE_REQUEST, DELETE_EXPERIENCE_SUCESSFUL, GET_EXPERIENCE_FAIL, GET_EXPERIENCE_REQUEST, GET_EXPERIENCE_SUCESSFUL, GET_SINGLE_EXPERIENCE_FAIL, GET_SINGLE_EXPERIENCE_REQUEST, GET_SINGLE_EXPERIENCE_SUCESSFUL, POST_EXPERIENCE_FAIL, POST_EXPERIENCE_REQUEST, POST_EXPERIENCE_SUCESSFUL, UNARCHIVE_EXPERIENCE_REQUEST, UPDATE_EXPERIENCE_FAIL, UPDATE_EXPERIENCE_REQUEST, UPDATE_EXPERIENCE_SUCESSFUL, UPLOAD_MEDIA_SCHEDULED_FAIL, UPLOAD_MEDIA_SCHEDULED_REQUEST, UPLOAD_MEDIA_SCHEDULED_SUCESS } from "./actionTypes"
import {  localHostApi } from "../../data/apis";
// import { deployedApi } from "../../data/apis";
const api = localHostApi; 
export const getAllExperienceData = (token) => (dispatch) => {
    dispatch({ type: GET_EXPERIENCE_REQUEST });
   
    axios.get(`${api}`, {
        "headers": {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }).then((res) => {
        // console.log(res.data);
        dispatch({ type: GET_EXPERIENCE_SUCESSFUL, payload: res.data });
    }).catch((err) => {
        dispatch({ type: GET_EXPERIENCE_FAIL });
    })
}
// add new experience
export const postExperience = (token, data, toast, setShowHideSecondStep) => (dispatch) => {
    dispatch({ type: POST_EXPERIENCE_REQUEST });

    axios.post(`${api}/`, data, {
        "headers": {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }).then((res) => {
        dispatch({ type: POST_EXPERIENCE_SUCESSFUL, payload: res.data.experience });
        setShowHideSecondStep(true);
        toast({
            title: 'Experience is Creted.',
            description: `${res.data.message} now upload the media and schedule`,
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
        // console.log(res.data);
    }).catch((err) => {
        dispatch({ type: POST_EXPERIENCE_FAIL });
        // console.log(err.message);
        toast({
            title: err.message,
            description: "something went to wrong",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
    })
}

// updload image video and schedule
export const updateExperienceDataSecondStep = (id, data, toast,token) => (dispatch) => {
    dispatch({ type: UPLOAD_MEDIA_SCHEDULED_REQUEST });

    axios.put(`${api}/${id}`, data,{
        headers : {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json",
        }
    }).then((res) => {
        dispatch({ type: UPLOAD_MEDIA_SCHEDULED_SUCESS });
        // console.log(res.data);
        toast({
            title: 'Account Experience is Creted.',
            description: "We've created your new Experiece for you.",
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
        // console.log(res.data);
    }).catch((err) => {
        dispatch({ type: UPLOAD_MEDIA_SCHEDULED_FAIL });
        // console.log(err.message);
        toast({
            title: err.message,
            description: "something went to wrong",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
    })
}

// delete experice
export const deleteExperience = (id, toast,token) => (dispatch) => {
    dispatch({ type: DELETE_EXPERIENCE_REQUEST });
    return axios.delete(`${api}/${id}`,{
        headers : {
            Authorization : 'Bearer ' + token
        }
    }).then((res) => {
        dispatch({ type: DELETE_EXPERIENCE_SUCESSFUL });
        // console.log(res.data);
        toast({
            title: 'Deleted Successfully',
            description: res.data.message,
            status: 'info',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
    }).catch((err) => {
        dispatch({ type: DELETE_EXPERIENCE_FAIL });
        // console.log(err.message);
        toast({
            title: err.message,
            description: "something went to wrong",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
    })
}
// single experience
export const singleExperience = (id,token) => (dispatch) => {
    dispatch({ type: GET_SINGLE_EXPERIENCE_REQUEST });
    axios
        .get(`${api}/${id}`,{
            headers : {
                Authorization : 'Bearer ' + token
            }
        })
        .then((res) => {
            // console.log(res.data.experience);
            dispatch({ type: GET_SINGLE_EXPERIENCE_SUCESSFUL, payload: res.data });
        })
        .catch((err) => {
            dispatch({ type: GET_SINGLE_EXPERIENCE_FAIL });
        });
};

// update experience
export const updateExperienceData = (id, data, toast, token) => (dispatch) => {
    dispatch({ type: UPDATE_EXPERIENCE_REQUEST });
    axios.put(`${api}/edit/${id}`, data, {
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-Type" : "application/json"
        }
    }).then((res) => {
        dispatch({ type: UPDATE_EXPERIENCE_SUCESSFUL });
        // console.log(toast);
        toast({
            title: res.data.message,
            description: "Update successfull",
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
        // console.log(res.data);
    }).catch((err) => {
        dispatch({ type: UPDATE_EXPERIENCE_FAIL });
        toast({
            title: err.message,
            description: "something went to wrong",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
    })
}

// make archive experience
export const archiveExperience = (id, toast) => (dispatch) => {
    dispatch({ type: ARCHIVE_EXPERIENCE_REQUEST });

    axios
        .post(`http://localhost:8000/experience/archive/create/${id}`)
        .then((res) => {
            dispatch({ type: ARCHIVE_EXPERIENCE_SUCCESS, payload: res.data });
            // console.log(res.data);
            toast({
                title: 'Experience successfully archived',
                description: res.data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
        })
        .catch((err) => {
            dispatch({ type: ARCHIVE_EXPERIENCE_FAIL });
            // console.log(err);
            toast({
                title: 'Something went wrong',
                description: err.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top"
            })
        });
};

// make unarchive experience

export const unarchiveExperience = (id, toast) => (dispatch) => {
    dispatch({ type: UNARCHIVE_EXPERIENCE_REQUEST });
    axios.patch(`${localHostApi}/unarchive/create/${id}`).then((res) => {
        // console.log(res.data);
        toast({
            title: 'Experience successfully unarchived',
            description: res.data.message,
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
    }).catch((err) => {
        toast({
            title: 'Something went wrong',
            description: err.message,
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: "top"
        })
    })
}

// add experience review

export const addExperienceReview = (token, id, data) => (dispatch) => {
    dispatch({ type: ADD_NEW_REVIWES_REQUEST });
    axios.post(`${api}/reviews/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }).then((res) => {
        // console.log(res.data);
        dispatch({ type: ADD_NEW_REVIWES_SUCCESSFUL });
    }).catch((err) => {
        // console.log(err);
        dispatch({ type: ADD_NEW_REVIWES_ERROR });
    })
}