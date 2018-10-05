import axios from 'axios';

export const FETCHING_PROJECTS = 'FETCHING_PROJECTS';
export const FETCHED_PROJECTS = 'FETCHED_PROJECTS';
export const ERROR = 'ERROR';
export const FETCHING_SINGLE_PROJECT = 'FETCHING_SINGLE_PROJECT';
export const FETCHED_SINGLE_PROJECT = 'FETCHED_SINGLE_PROJECT';

export const fetchProjects = () => {
    const fetchProjectsRequest = axios.get(`http://localhost:8000/api/projects`);

    return dispatch => {
        dispatch({type: FETCHING_PROJECTS})

        fetchProjectsRequest.then(res => {
            dispatch({type: FETCHED_PROJECTS, payload: res.data})
        })
        .catch(err => {
            console.log(err);
            dispatch({type: ERROR, payload: err})
        })
    }
}

export const fetchSingleProject = (id) => {
    const fetchSingleProjectRequest = axios.get(`http://localhost:8000/api/projects/${id}`);

    return dispatch => {
        dispatch({type: FETCHING_SINGLE_PROJECT})

    fetchSingleProjectRequest.then(res => {
        dispatch({type: FETCHED_SINGLE_PROJECT, payload: res.data})
    })
    .catch(err => {
        console.log(err);
        dispatch({type: ERROR, payload: err})
    })
    }
}