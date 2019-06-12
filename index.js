// generate random id
function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

// Think this function as a state management library
function createStore (reducer) {
    /*
    Store has to have four parts:
    1. The state
    2. Get the state
    3. Listen to changes on the state.
    4. Update the state
    */

    // 1. Create a state to hold state of entire app
    let state   // State is undefined and it'll be defined when the reducers are called.
    let listeners = [];

    // 2. Return state - get the current state
    const getState = () => state;

    // When the listener happens, part of the state will change.
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    // Receive the action and dispatch the specific event that occurred inside of the app
    const dispatch = (action) => {
        /*
            As you think this scope is a library code that you install through npm,
            Accessing to a specific code (including todos) is weird. 
        
        // state = todos(stat, action)
        */

        // Create a reducer function and pass the function to createStore
        
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    // 3. Whenever the createStore() is invoked, return object which gets the state.
    return {
        getState,
        subscribe,
        dispatch,
    }
}

// App Code
// Instead of using strings, use values.
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Action Creater
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

// Creat e a reducer function  = app codes
// Reducer should be a pure function
// When this reducer is called state creates an empty array inside of an empty object.
function todos (state = [], action) {
    switch(action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter(todo =>
                todo.id !== action.id)
        case TOGGLE_TODO:
        return state.map(todo =>
            todo.id !== action.id ? todo
            : Object.assign({}, todo, {complete: !todo.complete}))
        default :
            return state;
    }

    /*  The above statement is same as the following if statement.

        if(action.type === 'ADD_TODO') {
            // Update state through the action occurred
            return state.concat([action.todo]);

        } else if(action.type === 'REMOVE_TODO') {
            // Filter out todo which doesn't have action
            return state.filter(todo =>
                todo.id !== action.id)

        } else if(action.type === 'TOGGLE_TODO') {
            // Update the complete property from false to true
            return state.map(todo =>
                todo.id !== action.id ? todo
                // Create a new empty object and merge with todo
                // except for complete which is going to be the opposite of what complete currently is
                : Object.assign({}, todo, {complete: !todo.complete}))

        } else {
            return state;
        }
    */ 
}

// Second reducer function.
// When this reducer is called state creates an empty array inside of an empty object.
function goals (state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter(goal =>
            goal.id !== action.id)
        default :
            return state;
    }
}
/*
    Create a root reducer.
    Since createStore() cannot take two arguments, make another function to invoke todos and goals.
    When this reducer is called state creates an empty object {}.
*/
function app (state = {}, action) {
    return {
        // Invoke reducers here
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}

/*
    When you invoke createStore, we want the user to be able to pass in the specific reducer function
    that's going to decide how the state should change based on the specific action that occurred.
// const store = createStore(todos)
*/

/*
    Create createStore and pass a root reducer.
    Once you save it, store has three methods - getState, subscribe and dispatch
*/
const store = createStore(app);
// When subscribe happens (part of the state changes), get the current state.
store.subscribe (() => {
    const { goals, todos } = store.getState()

    // Reset goals and todos every time the state has changed. 
    document.getElementById('goals').innerHTML = '';
    document.getElementById('todos').innerHTML = '';

    goals.forEach(addGoalToDOM)
    todos.forEach(addTodoToDOM)
})

// store.dispatch(addTodoAction({
//     id: 0,
//     name: 'Learn Redux',
//     complete: false
// }))

// store.dispatch(addTodoAction({
//     id: 1,
//     name: 'Go to dentist',
//     complete: false
// }))

// store.dispatch(addTodoAction({
//     id: 2,
//     name: 'Call mom',
//     complete: false
// }))

// store.dispatch(removeTodoAction(1))

// store.dispatch(toggleTodoAction(0))

// store.dispatch(addGoalAction({
//     id: 0,
//     name: 'Finish React Nanodegree',
// }))

// store.dispatch(removeGoalAction(0))

/*
    When you execute the code above, what will happen is:
    - the todo of id: 0 will be added
    because we specified the action type 'ADD_TODO' in function todos.
*/ 

function addTodo() {
    const input = document.getElementById('todo');
    const name = input.value;
    input.value = ''

    store.dispatch(addTodoAction({
        name,
        complete: false,
        id: generateId()
    }))
}

function addGoal() {
    const input = document.getElementById('goal');
    const name = input.value;
    input.value = ''
    store.dispatch(addGaolAction({
        name,
        complete: false,
        id: generateId()
    }))
}

document.getElementById('todoButton')
    .addEventListener('click', addTodo)

document.getElementById('goalButton')
    .addEventListener('click', addTodo)
    