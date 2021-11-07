export const removeAssigneeFilter = (filter) => {
    return dispatch => {
        dispatch({
            type: 'REMOVE_ASSIGNEE_FILTER',
            payload: filter
        })
    }
}

export const addAssigneeFilter = (filter) => {
    return dispatch => {
        dispatch({
            type: 'ADD_ASSIGNEE_FILTER',
            payload: filter
        })
    }
}

export const removeStatusFilter = (filter) => {
    return dispatch => {
        dispatch({
            type: 'REMOVE_STATUS_FILTER',
            payload: filter
        })
    }
}

export const addStatusFilter = (filter) => {
    return dispatch => {
        dispatch({
            type: 'ADD_STATUS_FILTER',
            payload: filter
        })
    }
}

export const addSerachFilter = (input) => {
    return dispatch => {
        dispatch({
            type: 'ADD_SEARCH_FILTER',
            payload: input
        })
    }
}

export const changeStatus = (status, taskNode) => {
    return dispatch => {
        dispatch({
            type: 'CHANGE_STATUS',
            payload: {status: status, taskNode: taskNode}
        })
    }
}

export const addTask = (taskNode) => {
    return dispatch => {
        dispatch({
            type: 'ADD_TASK',
            payload: taskNode
        })
    }
}

export const removeTask = (taskNode) => {
    return dispatch => {
        dispatch({
            type: 'REMOVE_TASK',
            payload: taskNode
        })
    }
}