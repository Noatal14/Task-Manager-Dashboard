import tasks from '../assets/data/tasks.json'

class Tree {
    constructor(id, data, clickable) {
        this.id = id;
        this.data = data;
        this.children = [];
        this.length = 0;
        this.clickable = clickable;
        this.isOpened = false;
    }

    addNode(id, data) {
        return this.children[this.length++] = new Tree(id, data, isTaskHasSubTasks(id));
    }

    hasChildren() {
        return this.length > 0;
    }

    removeChildren() {
        this.children = [];
        this.length = 0;
    }
}

// The function gets task id and returns if the task has sub tasks
const isTaskHasSubTasks = (taskId) => {
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].pid === taskId) {
            return true;
        }
    }
    return false;
}

// The function returns array of tasks without parent
const initialTasks = () => {
    return (tasks.filter(task => task.pid === undefined)
                    .map(task => {return new Tree(task.id, task.data, isTaskHasSubTasks(task.id))}))
}

let rootTasks = initialTasks();

const findTasksByValue = (value, filterType) => {
    const newTasks = [];

    tasks.forEach((task) => {
        if(String(task.data[filterType]).includes(value)) {
            newTasks.push(new Tree(task.id, task.data, isTaskHasSubTasks(task.id)));
        }
    })

    return newTasks;
}

// The function gets array of assignees id, array of statuses and string search value.
// Returns array of tasks nodes that contain at least 1 value of every array and their title contains the search string
// Also updates the array of root tasks
const filter = (assigneeValues, statusValues, search) => {
    if(assigneeValues.length === 0 && statusValues.length === 0 && search.length === 0) {
        rootTasks = initialTasks();
    } else {
        let filterByAssignees = [];
        let filterByStatus = [];
        let filterBySearch = [];
    
        assigneeValues.forEach(assignee => {
            filterByAssignees = filterByAssignees.concat(findTasksByValue(assignee, 'assignees'));
        })
    
        statusValues.forEach(status => {
            filterByStatus = filterByStatus.concat(findTasksByValue(status, 'status'));
        })
        
        filterBySearch = filterBySearch.concat(findTasksByValue(search, 'title'));
    
        if(assigneeValues.length === 0 && statusValues.length === 0) {
            rootTasks = filterBySearch;
        } else {
            if(statusValues.length === 0 && search.length === 0) {
                rootTasks = filterByAssignees;
            } else {
                if(assigneeValues.length === 0 && search.length === 0) {
                    rootTasks = filterByStatus;
                } else {
                    if(assigneeValues.length === 0) {
                        rootTasks = commonValuesInArraysOfNodes(filterByStatus, filterBySearch);
                    } else {
                        if(search.length === 0) {
                            rootTasks = commonValuesInArraysOfNodes(filterByStatus, filterByAssignees);
                        } else {
                            if(statusValues.length === 0) {
                                rootTasks = commonValuesInArraysOfNodes(filterBySearch, filterByAssignees);
                            } else {
                                rootTasks = commonValuesInArraysOfNodes(commonValuesInArraysOfNodes(filterBySearch, filterByAssignees), filterByStatus)
                            }
                        }
                    }
                }
            }
        }
    }

    return avoidDuplicationInArray(rootTasks);
}

// Returns array with common values of 2 arrays of tasks nodes
const commonValuesInArraysOfNodes = (array1, array2) => {
    let commonValues = [];
    array1.forEach(value => {
        array2.forEach(value2 => {
            if(value.id === value2.id) {
                commonValues.push(value);
            }
        })
    })
    return commonValues;
}

// The function gets an array and returns new array without duplication
const avoidDuplicationInArray = (array) => {
    array.forEach((value, index1) => {
        array.forEach((value2, index2) => {
            if(value.id === value2.id && index1 !== index2) {
                array.splice(index2, 1);
            }
        })
    })

    return array;
}

// Changes the status of a task
const changeStatus = (status, taskNode) => {
    taskNode.data.status = status;
    return rootTasks;
}

// Adds sub tasks to the tree
const addChildren = (node) => {
    node.isOpened = true;
    tasks.forEach(task => {
        if(task.pid === node.id) {
            node.addNode(task.id, task.data);
        }
    })

    return rootTasks;
}

// Removes sub tasks from the tree
const removeChildren = (node) => {
    node.isOpened = false;
    node.removeChildren();

    return rootTasks;
}

export { filter, changeStatus, rootTasks, addChildren, removeChildren }
