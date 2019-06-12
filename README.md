# Todo and Goal List

## Instructions
This is a Redux lesson of Udacity React Nanodegree. It's a personal note how index.js was built. I also left all the comments and old codes in index.js.
The basic flow is create the store, merge state with UI and convert it to Redux.

In this lesson, created custom Redux code first.


1. Made state management `createStore()` function.
When this function is invoked, it'll have three methods  getState, subscribe and dispatch.

    1) `getState` returns the current state.

    2) `dispatch` takes action and returns state which is populated by reducer. It loops through the each listeners and returns listener.

    3) `subscribe` takes the listener and the state is updated. 


2. Create Reducers.
There are two reducers `todos` and `goals`, and one root reducer `app` to combine these two reducers.

    1) When `todos` and `goals` are invoked, the state creates an empty array (inside of the empty object which has created when `app` is invoked). Each reducer returns state depends on the `action.type`.

    2) Create `app` to combine two reducers. `createStore()` cannot take two or more arguments so you need to create a root reducer.


3. Create Action Creator
    1) Instead of keep adding items using `store.dispatch`, create Action Creators depends on the action type.

    2) To prevent typos, save each action type string in variables and pass those variables in each Action Creator.


4. Connect index.js with index.html
Insert script tag in `index.html` and add basic UI for todo and goal list.


5. Add add.eventListener to the add button.
    1) When the add button is clicked, item should be added. Don't forget to comment out `state.dispatch(...Action())`. You can see if the items are added or not on console of dev tool, since `store.subscribe` method calls console.log.


6. Make add buttons work.
    1) When the the add button is clicked, either function, `addTodo` or `addGoal`, is invoked (depends on the button clicked). This function will add a new item to the state.

    2) This method will extract the info from the input field, and then dispatch an `addTodoAction` or `addGoalAction` Action Creator with the text that user typed into the input field.

7. Show added items on UI.
    1) Instead of using console.log inside of `store.subscribe()`, we need to update the store. To update store, create two functions called `addTodoToDOM` and `addGoalToDOM`.

    2) `addTodoToDOM` and `addGoalToDOM` create list element and text node, and append these.


8. Add feature to line-through todo item
    1) If the complete status of todo list is true, line-through the item. If not, return the current status.
    
    2) And also when you click the item, line-through the item.


9. Add feature to remove item.
    1) Add `createRemoveButton` function. This will create a remove button when it's called.

    2) Inside of `addTodoToDOM` and `addGoalToDOM` function, call the `createRemoveButton` function which function will dispatch `removeTodoAction` and `removeGoalAction`.

    3) Inside of the `addTodoToDOM` and `addGoalToDOM` function, append the 