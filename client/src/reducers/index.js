import {FETCHING_PROJECTS, FETCHED_PROJECTS, FETCHING_SINGLE_PROJECT, FETCHED_SINGLE_PROJECT, ERROR} from '../actions/index.js';

const initialState = {
    fetching_projects: false,
    fetched_projects: false,
    projects: [],
    error: false,
    errorMessage: {},
    currentProject: {}
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCHING_PROJECTS:
            return Object.assign({}, state, {
                fetching_projects: true
            })

        case FETCHED_PROJECTS:
            return Object.assign({}, state, {
                fetching_projects: false,
                fetched_projects: true,
                projects: action.payload,
                currentProject: {}
            })

        case ERROR:
            return Object.assign({}, state, {
                error: true,
                errorMessage: action.payload
            })

        case FETCHING_SINGLE_PROJECT:
            return Object.assign({}, state, {
                fetching_single_project: true
            })

        case FETCHED_SINGLE_PROJECT:
            return Object.assign({}, state, {
                fetching_single_project: false,
                fetched_single_project: true,
                currentProject: action.payload
            })

        default:
            return state;
    }
}