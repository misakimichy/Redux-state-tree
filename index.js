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

// Create a reducer function  = app codes
// Reducer should be a pure function
// When this reducer is called state creates an empty array inside of an empty object.
function todos (state = [], action) {
    switch(action.type) {
        case 'ADD_TODO':
            return state.concat([action.todo])
        case 'REMOVE_TODO':
            return state.filter(todo =>
                todo.id !== action.id)
        case 'TOGGLE_TODO':
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
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL':
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
        console.log('The new state is: ', store.getState());
})

store.dispatch({
    type: 'ADD_TODO',
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
})

/*
    When you execute the code above, what will happen is:
    - the todo of id: 0 will be added
    because we specified the action type 'ADD_TODO' in function todos.
*/ 
