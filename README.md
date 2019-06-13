# Todo and Goal List

## Instructions
This is a Redux lesson of Udacity React Nanodegree. It's a personal note how index.js was built. I also left all the comments and old codes in index.js.
The basic flow is create the store, merge state with UI, convert it to Redux then add middleware.

In this lesson, created custom Redux code first.


1. Made state management `createStore()` function.
    1) Create a function called `createStore()` inside index.js When this function is invoked, it'll have three methods  getState, subscribe and dispatch.

    2) `getState` returns the current state.

    3) `dispatch` takes action and returns state which is populated by reducer. It loops through the each listeners and returns listener.

    4) `subscribe` takes the listener and the state is updated.


2. Create Reducers.
    1) There are two reducers `todos` and `goals`, and one root reducer `app` to combine these two reducers. When `todos` and `goals` are invoked, the state creates an empty array (inside of the empty object which has created when `app` is invoked). Each reducer returns state depends on the `action.type`.

    2) Create `app` to combine two reducers. `createStore()` cannot take two or more arguments so you need to create a root reducer.


3. Create Action Creator
    1) Instead of keep adding items using `store.dispatch`, create Action Creators depends on the action type.

    2) To prevent typos, save each action type string in variables and pass those variables in each Action Creator.


4. Connect index.js with index.html
    1) Add elements for todo and goal list.
    
    2) Connect index.js in `index.html`.


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

    3) Inside of the `addTodoToDOM` and `addGoalToDOM` function, append the remove button.


10. Download real Redux library.
    1) Install Redux library in index.html

    2) Delete all of the library code in index.js. (I left old codes so that I can reflect everything later.)

    3) Swap `createStore(app)` call with `Redux.createStore(app)`.

    4) Delete `app` reducer function since a root reducer comes with the library.

    5) Pass `Redux.combineReducers({})` to the `Redux.createStore`. Inside of the object, add reducers that you wanna combine. This time, it's todos and goals.


11. Create a function to avoid a specific word
    1) Add a function named `checkAndDispatch`.

    2) This function should be hooked into the moment after an action is dispatched, but before it ever hits our reducer and modifies the state.

    3) This function check the name property on the action contains the word "ripple". If user types the word, this function will show alert and do nothing. If it doesn't contain the word, it calls `store.dispatch` as it normally would passing in the action.

    4) Swap `store.dispatch` inside of `addTodo`, `addGoal`, `addTodoToDOM` and `addGoalToDOM` call with `checkAndDispatch(state, )`. Since the `checkAndDispatch` function takes store and action, you need to pass store.


12. Use Redux middleware.
    1) Instead of using step 11, use Redux middleware. Create a function names `checker`. This takes store as a first argument. return function which is passed next. This going to be the next middleware if we have more than one middleware , or it's going to be dispatch. Then it return another function which is going to be passed the action. Copy and paste the action inside of `checkAndDispatch()` function. And delete `checkAndDispatch()` function.

    2) Instead of calling store.dispatch() inside of `function(action)`, call `next(action)`.

    3) Swap what we did at step 11 4). Use `store.dispatch` and delete `checkAndDispatch(state, )`.

    4) Add second argument to createStore. After the first argument, which is reducers, pass `Redux.applyMiddleware(checker)`.
    
    5) Rewrite the checker function using an arrow function to make code clean.


13. Add multiple middleware
    1) Add second middleware named `logger`. This acts like a development middleware. This will console.log whenever an action is dispatched, you'll see what action is and what is the new state once the action was dispatched.

    2) It'll `console.group()` and the title of this group is `action.type`. `console.group()` is going to group everything between that first `console.group()` invocation and `console.groupEnd()` invocation. `console.log` the action.

    3) Invoke `next(action)` here as if we are dispatching the action here. That'll allow me to get new state in the next line. Then finally it returns the result we got by invoking next.

    4) Since I added one more middleware, add `logger` to `applyMiddleware`'s second argument.

    5) Now once `createStore` is called, before it hits reducers, it invokes `checker` and `logger` middleware.