import {
    USER_VERIFY_REQUEST,
    USER_VERIFY_FAILURE,
    USER_VERIFY_SUCCESS,
    REPORTEDBY_SUCCESS,
    USER_APPROVAL_VERIFY_SUCCESS,
    USER_REJECT_SUCCESS,
    REMOVE_REPORT_SUCCESS,
    DELETE_USER_SUCCESS,
    RESET_USERS,
    RESET_REPORTED_USERS
} from "./actionTypes";

const initialState = {
    isLoading: false,
    isError: false,
    users: [],
    reportedUser: []
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_VERIFY_REQUEST:
            return { ...state, isLoading: true };
        case USER_VERIFY_SUCCESS:
            return { ...state, isLoading: false, users: payload };
        case REPORTEDBY_SUCCESS:
            return { ...state, isLoading: false, reportedUser: payload };
        case USER_APPROVAL_VERIFY_SUCCESS:
            return { ...state, isLoading: false };
        case USER_REJECT_SUCCESS:
            return { ...state, isLoading: false };
        case REMOVE_REPORT_SUCCESS:
            return { ...state, isLoading: false };
        case DELETE_USER_SUCCESS:
            return { ...state, isLoading: false };
        case USER_VERIFY_FAILURE:
            return { ...state, isLoading: false, isError: true };


            case RESET_USERS:
                const updatedUsersData = state.users.data.filter(user => user._id !== payload);
                return { ...state, users: { ...state.users, data: updatedUsersData } };


      case RESET_REPORTED_USERS:
      // Filter out the reported user with the specified _id
    //   console.log("Before-reporteduser",state)
      const updatedReportedUser = state.reportedUser.data.filter(user => user._id !== payload);
    //   console.log("After-reporteduser", { ...state, reportedUser: { ...state.reportedUser, data: updatedReportedUser }})
      return { ...state, reportedUser: { ...state.reportedUser, data: updatedReportedUser } };

        default:
            return state;
    }
}