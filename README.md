# Todo and Goal List

## Instructions
This is a Redux lesson of Udacity React Nanodegree.

1. Made state management `createStore()` function.
- When this function is invoked, it'll have three methods  getState, subscribe and dispatch.

    a. `getState` returns the current state.

    b. `dispatch` takes action and returns state which is populated by reducer. It loops through the each listeners and returns litener.

    c. `subscribe` takes the listener and the state is updated. 


2. Create Reducers.
- There are two reducers `todos` and `goals`, and one root reducer `app` to combine these two reducers.

    a. When `todos` and `goals` are invoked, the state creates an empty array (inside of the empty object which has created when `app` is invoked). Each reducer returns state depends on the `action.type`.

    b. Create `app` to combine two reducers. `createStore()` cannot take two or more arguments so you need to create a root reducer.


3. Create Action Creater
- Instead of keep adding items using `store.dipatch`, create Action Creaters depends on the action type.

- To prevent typos, save each action type string in variables and pass those variables in each Action Creater.


4. 