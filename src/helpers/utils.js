import states from './../assets/data/states.json'
import assignees from './../assets/data/assignees.json'

// Gets id and returns object with status id and status value
const findStateById = (id) => {
    return states.filter(state => state.id === id)[0];
}

// Returns array of assignees full names
const assigneesNamesArray = () => {
    let assigneesArray = [];
    assignees.forEach(assignee => {
        let name = "";
        Object.entries(assignee).forEach(([key, value]) => {
            if(key !== 'id') {
                name += ` ${value}`;
            }
        })
        assigneesArray.push(name);
    });
    return assigneesArray;
}

// Gets array of ids and returns array of full names
const findAssigneesNamesByIds = (ids) => {
    let sreachedNames = [];
    ids.forEach(id => {
        assignees.forEach(assignee => assignee.id === id && sreachedNames.push(assignee.firstName + " " + assignee.lastName))
    });
    return sreachedNames;
}

// Gets array of ids and returns *string* with the names
const stringNameById = (ids) => {
    const names = findAssigneesNamesByIds(ids);
    let namesString = "";
    names.forEach(name => namesString += name + ', ');
    return namesString.slice(0, -2);
}

// Gets messy date and returns organized string of the date
const organizeDate = (oldDate) => {
    let newDate = new Date(oldDate).toDateString().slice(4);
    return newDate.slice(0, 6) + ',' + newDate.slice(6);
}

export { organizeDate, stringNameById, findAssigneesNamesByIds, assigneesNamesArray, findStateById }