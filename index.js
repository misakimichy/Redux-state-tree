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
    let state 
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
        listeners.forEach((listener) => listener() )
    }
    // 3. Whenever the createStore() is invoked, return object which gets the state.
    return {
        getState,
        subscribe,
        dispatch,
    }
}

// Create a reducer function  = app codes
function todos (state = [], action) {
    if(action.type === 'ADD_TODO') {
        // Update state through the action occurred
        return state.concat([action.todo]);
    }
    return state;
}

/*
    When you invoke createStore, we want the user to be able to pass in the specific reducer function
    that's going to decide how the state should change based on the specific action that occurred.

// const store = createStore(todos)

*/

/*
    Create createStore, you have to pass the reducer function - todos and save it.
    Once you save it, store has three methods in it.
    getState, subscribe and dispatch
    */
const store = createStore(todos);
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
