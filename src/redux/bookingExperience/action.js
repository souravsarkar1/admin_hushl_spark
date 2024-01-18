import axios from "axios"
import { bookingApiLocalHosyt } from "../../data/apis"
import { EDIT_BOOKINGSTATUS_FAIL, EDIT_BOOKINGSTATUS_REQUEST, EDIT_BOOKINGSTATUS_SUCESS, GET_ALL_BOOKINGDATA_FAIL, GET_ALL_BOOKINGDATA_REQUEST, GET_ALL_BOOKINGDATA_SUCESS } from "./actionType";
const api = bookingApiLocalHosyt;

export const getAllBookedExperiences = (token, page, bookingStatus, paymentStatus, verificationStatus,bookedForSort,bookedOnSort) => (dispatch) => {
    dispatch({ type: GET_ALL_BOOKINGDATA_REQUEST });
    console.log(token);
    //?bookingStatus=${bookingStatus}&paymentStatus=${paymentStatus}&reviewed=${verificationStatus}&page=${page}&limit=5
    // http://localhost:8000/booking?bookingStatus=cancelled&paymentStatus=pending&adminReviewed=true&page=1&limit=5
    // http://localhost:8000/booking?bookingStatus=pending&paymentStatus=pending&adminReviewed=true&page=1&limit=5&bookedFor=asc&bookedOn=desc
    axios.get(`${api}?bookingStatus=${bookingStatus}&paymentStatus=${paymentStatus}&adminReviewed=${verificationStatus}&page=${page}&limit=5&bookedFor=${bookedForSort}&bookedOn=${bookedOnSort}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": `application/json`
        }
    }).then((res) => {
        dispatch({ type: GET_ALL_BOOKINGDATA_SUCESS, payload: res.data });
    }).catch((err) => {
        dispatch({ type: GET_ALL_BOOKINGDATA_FAIL })
    })
}

// edit booking opetion

export const eidtBookingStatus = (data, token, toast) => (dispatch) => {
    dispatch({ type: EDIT_BOOKINGSTATUS_REQUEST });
console.log(data);
    axios.post(`${api}/review`, data, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then((res) => {
        console.log(res.data);
        dispatch({ type: EDIT_BOOKINGSTATUS_SUCESS });
        toast({
            title: res.data.message,
            description: data.bookingStatus,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top"
        })
    }).catch((err) => {
        toast({
            title: err.message || err,
            description: data.bookingStatus,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: "top"
        })
        console.log(err);
        dispatch({ type: EDIT_BOOKINGSTATUS_FAIL })
    })
}