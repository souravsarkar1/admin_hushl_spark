import {
    ADD_NEW_REVIWES_ERROR,
    ADD_NEW_REVIWES_REQUEST,
    ADD_NEW_REVIWES_SUCCESSFUL,
    ARCHIVE_EXPERIENCE_FAIL,
    ARCHIVE_EXPERIENCE_REQUEST,
    ARCHIVE_EXPERIENCE_SUCCESS,
    DELETE_EXPERIENCE_FAIL,
    DELETE_EXPERIENCE_REQUEST,
    DELETE_EXPERIENCE_SUCESSFUL,
    GET_EXPERIENCE_FAIL,
    GET_EXPERIENCE_REQUEST,
    GET_EXPERIENCE_SUCESSFUL,
    GET_SINGLE_EXPERIENCE_FAIL,
    GET_SINGLE_EXPERIENCE_REQUEST,
    GET_SINGLE_EXPERIENCE_SUCESSFUL,
    POST_EXPERIENCE_FAIL,
    POST_EXPERIENCE_REQUEST,
    POST_EXPERIENCE_SUCESSFUL,
    UNARCHIVE_EXPERIENCE_FAIL,
    UNARCHIVE_EXPERIENCE_REQUEST,
    UNARCHIVE_EXPERIENCE_SUCCESS,
    UPDATE_EXPERIENCE_FAIL,
    UPDATE_EXPERIENCE_REQUEST,
    UPDATE_EXPERIENCE_SUCESSFUL,
    UPLOAD_MEDIA_SCHEDULED_FAIL,
    UPLOAD_MEDIA_SCHEDULED_REQUEST,
    UPLOAD_MEDIA_SCHEDULED_SUCESS,
} from "./actionTypes";

const initialState = {
    allExperienceData: [],
    singleExperienceData: "",
    getAllExperienceDataIsLoading: false,
    getSingleExperienceDataIsLoading: false,
    postExperienceDataIsLoading: false,
    updateExperienceDataIsLoading: false,
    deleteExperienceDataIsLoading: false,
    getAllExperienceDataIsError: false,
    postExperienceDataIsError: false,
    updateExperienceDataIsError: false,
    deleteExperienceDataIsError: false,
    getSingleExperienceDataIsError: false,
    archiveExperienceDataIsError: false,
    archiveExperienceDataIsLoading: false,
    preGeneratedExpericeData: {},
    uploadedMediaScheduleIsLoading: false,
    uploadedMediaScheduleIsError: false,
    unarchiveExpericeDataIsLoading: false,
    unarchiveExpericeDataIsError: false,
    addnewReviwesIsLoading: false,
    addnewReviwesIsError: false
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // GET
        case GET_EXPERIENCE_REQUEST:
            return { ...state, getAllExperienceDataIsLoading: true };
        case GET_EXPERIENCE_SUCESSFUL:
            return { ...state, getAllExperienceDataIsLoading: false, allExperienceData: payload };
        case GET_EXPERIENCE_FAIL:
            return { ...state, getAllExperienceDataIsLoading: false, getAllExperienceDataIsError: true };
        // POST
        case POST_EXPERIENCE_REQUEST:
            return { ...state, postExperienceDataIsLoading: true };
        case POST_EXPERIENCE_SUCESSFUL:
            return { ...state, postExperienceDataIsLoading: false, preGeneratedExpericeData: payload };
        case POST_EXPERIENCE_FAIL:
            return { ...state, postExperienceDataIsLoading: false, postExperienceDataIsError: true };

        // UPLOAD MEDIA SCHEDULED DATA
        case UPLOAD_MEDIA_SCHEDULED_REQUEST:
            return { ...state, uploadedMediaScheduleIsLoading: true };
        case UPLOAD_MEDIA_SCHEDULED_SUCESS:
            return { ...state, uploadedMediaScheduleIsLoading: false };
        case UPLOAD_MEDIA_SCHEDULED_FAIL:
            return { ...state, uploadedMediaScheduleIsLoading: false, uploadedMediaScheduleIsError: true };

        // UPDATE
        case UPDATE_EXPERIENCE_REQUEST:
            return { ...state, updateExperienceDataIsLoading: true };
        case UPDATE_EXPERIENCE_SUCESSFUL:
            return { ...state, updateExperienceDataIsLoading: false };
        case UPDATE_EXPERIENCE_FAIL:
            return { ...state, updateExperienceDataIsLoading: false, updateExperienceDataIsError: true };
        // DELETE
        case DELETE_EXPERIENCE_REQUEST:
            return { ...state, deleteExperienceDataIsLoading: true };
        case DELETE_EXPERIENCE_SUCESSFUL:
            return { ...state, deleteExperienceDataIsLoading: false };
        case DELETE_EXPERIENCE_FAIL:
            return { ...state, deleteExperienceDataIsLoading: false, deleteExperienceDataIsError: true };
        // SINGLE
        case GET_SINGLE_EXPERIENCE_REQUEST:
            return { ...state, getSingleExperienceDataIsLoading: true };
        case GET_SINGLE_EXPERIENCE_SUCESSFUL:
            return { ...state, getSingleExperienceDataIsLoading: false, singleExperienceData: payload.experience };
        case GET_SINGLE_EXPERIENCE_FAIL:
            return { ...state, getSingleExperienceDataIsLoading: false, getSingleExperienceDataIsError: true };
        // ARCHIVE 
        case ARCHIVE_EXPERIENCE_REQUEST:
            return { ...state, archiveExperienceDataIsLoading: true };
        case ARCHIVE_EXPERIENCE_SUCCESS:
            return { ...state, archiveExperienceDataIsLoading: false };
        case ARCHIVE_EXPERIENCE_FAIL:
            return { ...state, archiveExperienceDataIsLoading: false, archiveExperienceDataIsError: true };
        // UN-ARCHIVE
        case UNARCHIVE_EXPERIENCE_REQUEST:
            return { ...state, unarchiveExpericeDataIsLoading: true }
        case UNARCHIVE_EXPERIENCE_SUCCESS:
            return { ...state, unarchiveExpericeDataIsLoading: false }
        case UNARCHIVE_EXPERIENCE_FAIL:
            return { ...state, unarchiveExpericeDataIsLoading: false, unarchiveExpericeDataIsError: true }
        // add new comment

        case ADD_NEW_REVIWES_REQUEST:
            return { ...state, addnewReviwesIsLoading: true };
        case ADD_NEW_REVIWES_SUCCESSFUL:
            return { ...state, addnewReviwesIsLoading: false }
        case ADD_NEW_REVIWES_ERROR:
            return { ...state, addnewReviwesIsLoading: false, addnewReviwesIsError: true }
        default:
            return { ...state };
    }
};
