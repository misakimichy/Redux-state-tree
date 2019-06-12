# Todo and Goal List

## Instructions
This is a Redux lesson of Udacity React Nanodegree.

1. Made state management `createStore()` function.
When this function is invoked, it'll have three methods  getState, subscribe and dispatch.

    1) `getState` returns the current state.

    2) `dispatch` takes action and returns state which is populated by reducer. It loops through the each listeners and returns litener.

    3) `subscribe` takes the listener and the state is updated. 


2. Create Reducers.
There are two reducers `todos` and `goals`, and one root reducer `app` to combine these two reducers.

    1) When `todos` and `goals` are invoked, the state creates an empty array (inside of the empty object which has created when `app` is invoked). Each reducer returns state depends on the `action.type`.

    2) Create `app` to combine two reducers. `createStore()` cannot take two or more arguments so you need to create a root reducer.


3. Create Action Creater
    1) Instead of keep adding items using `store.dipatch`, create Action Creaters depends on the action type.

    2) To prevent typos, save each action type string in variables and pass those variables in each Action Creater.


4. Connect js with HTML
Insert script tag in `index.html` and add basic UI for todo and goal list.


5. Add add.eventListener to the add button.
    1) When the add button is clicked, item should be added. Don't forget to comment out `state.dipatch(...Action())`. You can see if the items are added or not on console of dev tool, since `store.subscribe` method calls console.log.


6. Create `addTodo` and `addGoal` function.
    1) When the the add button is clicked, eaither function is invoked (depends on which button you've clicked). This function will add a new item to the state.
    This method will extract the info from the input field, and then dispatch an `addTodoAction` or `addGoalAction` Action Creator with the text that user typed into the input field.

    2) 


7. Update store
    1) Instead of console.log, we need to update the store. To update store, create two functions called `addTodoToDOM` and `addGoalToDOM`.

    2) `addTodoToDOM` and `addGoalToDOM` create list element and text node, and append these.