// generate random id
function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

// App Code
// Instead of using strings, use values.
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
const RECEIVE_DATA = 'RECEIVE_DATA';

// Action Creator
function addTodoAction (todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction (id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction (id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

function addGoalAction (goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction (id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

// Create a new action creator
function receiveDataAction (todos, goals) {
    return {
        type: RECEIVE_DATA,
        todos,
        goals
    }
}

function handleDeleteTodo (todo) {
    return dispatch => {
        dispatch(removeTodoAction(todo.id))

        return API.deleteTodo(todo.id)
            .catch(() => {
                dispatch(addTodoAction(todo))
                alert("An error occurred. Try again.")
            })
    }
}

function handleAddGoal (name, cb) {
    return dispatch => {
        return API.saveGoal(name)
        .then(goal => {
            dispatch(addGoalAction(goal))
            cb();
        }).catch(() => {
            alert("An error occurred. Try again.")
        })
    }
}

function handleDeleteGoal (goal) {
    return dispatch => {
        dispatch(removeGoalAction(goal.id))

        return API.deleteGoal(goal.id)
            .catch(() => {
                dispatch(addGoalAction(goal))
                alert("An error occurred. Try again.")
            })
    }
}

function handleAddTodo (name, cb) {
    return dispatch => {
        return API.saveTodo(name)
        .then(todo => {
            dispatch(addTodoAction(todo))
            cb()
        }).catch(() => {
            alert("An error occurred. Try again.")
        })
    }
}

function handleToggleTodo (id) {
    return dispatch => {
        dispatch(toggleTodoAction(id))
            return  API.saveTodoToggle(id)
                .catch(() => {
                        dispatch(toggleTodoAction(id))
                        alert("An error occurred. Try again.")
                    })
    }
}

function handleInitialData () {
    return dispatch => {
        return Promise.all([
            API.fetchTodos(),
            API.fetchGoals()
        ]).then(([todos, goals]) => {
            dispatch(receiveDataAction(todos, goals))
        })
    }
}

// Creat e a reducer function  = app codes
// When this reducer is called state creates an empty array inside of an empty object.
function todos (state = [], action) {
    switch(action.type) {
        case ADD_TODO :
            return state.concat([action.todo])
        case REMOVE_TODO :
            return state.filter(todo =>
                todo.id !== action.id)
        case TOGGLE_TODO :
        return state.map(todo =>
            todo.id !== action.id ? todo
            : Object.assign({}, todo, {complete: !todo.complete}))
        case RECEIVE_DATA :
            return action.todos
        default :
            return state;
    }
}

// Second reducer function.
// When this reducer is called state creates an empty array inside of an empty object.
function goals (state = [], action) {
    switch(action.type) {
        case ADD_GOAL :
            return state.concat([action.goal])
        case REMOVE_GOAL :
            return state.filter(goal =>
            goal.id !== action.id)
        case RECEIVE_DATA :
            return action.goals
        default :
            return state;
    }
}

function loading (state = true, action) {
    switch(action.type) {
        case RECEIVE_DATA :
            return false
        default :
            return state
    }
}

/*
    Add a middleware
    Check the specific word and if user typed in the word, show alert.
    In this lesson, use 'ripple' as an example.
*/
const checker = store => next => action => {
    if(action.type === ADD_TODO && action.todo.name.toLowerCase().includes('ripple')) {
        return alert("Nope, that's not a good idea.")
    }
    if(action.type === ADD_GOAL && action.goal.name.toLowerCase().includes('ripple')) {
        return alert("Nope, that's not a good idea.")
    }
    return next(action);
}

/*
    On console of devtool, whenever an action is dispatched, you'll see what that action is and
    what is the new state once the action was dispatched.
    Add second middleware
*/
const logger = store => next => action => {
    console.group(action.type)
        console.log('The action: ', action)
        const result = next(action)
        console.log('The new state: ', store.getState())
    console.groupEnd()
    return result
}

/*
    Create createStore and pass a root reducer.
    Once you save it, store has three methods - getState, subscribe and dispatch
*/
const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals,
    loading,
}), Redux.applyMiddleware(ReduxThunk.default, checker, logger));
