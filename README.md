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

    a. When `app` reducer is invoked, state creates an empty object and also invke two reducers.

    b. When `todos` and `goals` are invoked, the state creates an empty array inside of the empty object. Each reducer returns state depends on the `action.type`.

3. 