import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./actionTypes";

const initialState = {
    isAuth: true,
    loginIsLoading: false,
    loginIsError: false,
    accessToken: "",
    logoutIsLoading: false,
    logoutIsError: false,
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, loginIsLoading: true };
        case LOGIN_SUCCESS:
            return { ...state, loginIsLoading: false, isAuth: true, accessToken: payload };
        case LOGIN_FAIL:
            return { ...state, loginIsLoading: false, loginIsError: true };

        case LOGOUT_REQUEST:
            return { ...state, logoutIsLoading: true };
        case LOGOUT_SUCCESS:
            return { ...state, logoutIsLoading: false, accessToken : "", isAuth : false };
        case LOGOUT_FAIL:
            return { ...state, logoutIsLoading: false, logoutIsError: true }
        default:
            return state;
    }
}