import { EDIT_BOOKINGSTATUS_FAIL, EDIT_BOOKINGSTATUS_REQUEST, EDIT_BOOKINGSTATUS_SUCESS, GET_ALL_BOOKINGDATA_FAIL, GET_ALL_BOOKINGDATA_REQUEST, GET_ALL_BOOKINGDATA_SUCESS } from "./actionType"

const initialState = {
    bookingData: [],
    getBookingDataIsLoading: false,
    getBookingDataIsLoadingError: false,
    editBookingstatusIsLoading: false,
    editBookingstatusIsError: false,

}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_BOOKINGDATA_REQUEST:
            return { ...state, getBookingDataIsLoading: true };
        case GET_ALL_BOOKINGDATA_SUCESS:
            return { ...state, getBookingDataIsLoading: false, bookingData: payload };
        case GET_ALL_BOOKINGDATA_FAIL:
            return { ...state, getBookingDataIsLoading: false, getBookingDataIsLoadingError: true };
        case EDIT_BOOKINGSTATUS_REQUEST:
            return { ...state, editBookingstatusIsLoading: true };
        case EDIT_BOOKINGSTATUS_SUCESS:
            return { ...state, editBookingstatusIsLoading: false };
        case EDIT_BOOKINGSTATUS_FAIL:
            return { ...state, editBookingstatusIsLoading: false, editBookingstatusIsError: true }
        default:
            return { ...state }
    }
}