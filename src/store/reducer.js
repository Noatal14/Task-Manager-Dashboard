import { filter, changeStatus, rootTasks, addChildren, removeChildren } from './../helpers/treeActions'

const defaultState = {
    displayedTasks: rootTasks,
    assigneeFilter: [],
    statusFilter: []
};

const reducer = (state = defaultState, action) => {
    let filteredTasks;
    let newAssigneeFilter;
    let newStatusFilter;
    
    switch(action.type) {
        case('ADD_ASSIGNEE_FILTER'):
            newAssigneeFilter = [...state.assigneeFilter, action.payload]
            filteredTasks = filter(newAssigneeFilter, state.statusFilter, '')

            return {
                ...state,
                assigneeFilter: newAssigneeFilter,
                displayedTasks: filteredTasks
            };

        case('ADD_STATUS_FILTER'):  
            newStatusFilter = [...state.statusFilter, action.payload];
            filteredTasks = filter(state.assigneeFilter, newStatusFilter, '');

            return {
                ...state,
                statusFilter: newStatusFilter,
                displayedTasks: filteredTasks
            };

        case('REMOVE_ASSIGNEE_FILTER'):
            newAssigneeFilter = state.assigneeFilter.filter(id => id !== action.payload);
            filteredTasks = filter(newAssigneeFilter, state.statusFilter, '');

            return {
                ...state,
                assigneeFilter: newAssigneeFilter,
                displayedTasks: filteredTasks
            }
        
        case('REMOVE_STATUS_FILTER'):
            newStatusFilter = state.statusFilter.filter(id => id !== action.payload);
            filteredTasks = filter(state.assigneeFilter, newStatusFilter, '');

            return {
                ...state,
                statusFilter: newStatusFilter,
                displayedTasks: filteredTasks
            }

        case('ADD_SEARCH_FILTER'):
            filteredTasks = filter(state.assigneeFilter, state.statusFilter, action.payload);

            return {
                ...state,
                displayedTasks: filteredTasks
            };
        
        case('CHANGE_STATUS'):
            return {
                ...state,
                displayedTasks: [...changeStatus(action.payload.status, action.payload.taskNode)]
            };

        case('ADD_TASK'):
            return {
                ...state,
                displayedTasks: [...addChildren(action.payload)]
            }

        case('REMOVE_TASK'):
            return {
                ...state,
                displayedTasks: [...removeChildren(action.payload)]
            }
            
        default:
            return state;
    }
}

export default reducer;