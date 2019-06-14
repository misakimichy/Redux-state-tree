# Todo and Goal List

## Instructions
This is a Redux lesson of Udacity React Nanodegree. It's a personal note how index.js was built.
The basic flow is create the store, merge state with UI, convert it to Redux, add middleware, Redux with React then add API.

In this lesson, created custom Redux code first.


1. Made state management `createStore()` function.
    1) Create a function called `createStore()` inside index.js When this function is invoked, it'll have three methods  getState, subscribe and dispatch.

    2) `getState` returns the current state.

    3) `dispatch` takes action and returns state which is populated by reducer. It loops through the each listeners and returns listener.

    4) `subscribe` takes the listener and the state is updated.


2. Create Reducers.
    1) There are two reducers `todos` and `goals`, and one root reducer `app` to combine these two reducers. When `todos` and `goals` are invoked, the state creates an empty array (inside of the empty object which has created when `app` is invoked). Each reducer returns state depends on the `action.type`.

    2) Create `app` to combine two reducers. `createStore()` cannot take two or more arguments so you need to create a root reducer.


3. Create Action Creator.
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


8. Add feature to line-through todo item.
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


11. Create a function to avoid a specific word,
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


13. Add multiple middleware.
    1) Add second middleware named `logger`. This acts like a development middleware. This will console.log whenever an action is dispatched, you'll see what action is and what is the new state once the action was dispatched.

    2) It'll `console.group()` and the title of this group is `action.type`. `console.group()` is going to group everything between that first `console.group()` invocation and `console.groupEnd()` invocation. `console.log` the action.

    3) Invoke `next(action)` here as if we are dispatching the action here. That'll allow me to get new state in the next line. Then finally it returns the result we got by invoking next.

    4) Since I added one more middleware, add `logger` to `applyMiddleware`'s second argument.

    5) Now once `createStore` is called, before it hits reducers, it invokes `checker` and `logger` middleware.


14. Connect Redux with React.
    1) Add `<script>` tags after Redux script tag in `<head>` in index.html. To connect Redux with React, I used React, React-DOM, and babel to transpile or compile the JSX code into normal JavaScript that the browser can understand.

    2) Add `<div>` with `id=app` so that you can update the element via JavaScript code.

    3) Add babel codes after index.js line in index.html. Make three components names `App`, `Todos` and `Goals`.

    4) Create React ver of UI (The one you're seeing on the screen is written by vanilla JavaScript).

    5) Use uncontrolled component for the `Todo` component input field. For the onClick event of add buttons, create `addItem` function. What we wrote for adding item with JavaScript is dispatching the action.

    6) Pass `store` as `App`'s props.

    7) You can import `store.dispatch` from vanilla JavaScript. But since you've passed store as a App's props, swap it with `this.props.store.dispatch`.

    8) Use uncontrolled component to `class Goal` too.


15. Add componentDidMount
    1) Add `componentDidMount` to `App` component. Call `store.subscribe` inside of it and use `forceUpdate()` to re-render.

    2) To do that. need to grab `store` which is comes from `this.props`, and `todos` and `goals` which is from `store.getState()`.


16. Add List UI.
    1) Use map method and loop through items then show `item.name` inside of `List` component. To do that, It's needed to pass `this.props.todos` to `List` component both in `Todos` and `Goals` component.

    2) Add delete button for the list items. When the button is clicked, remove the item. To remove the item, add removeItem function in `Todos` and `Goals` component and pass the data to `List`.


17. Toggle item.
    1) Add `toggleItem` function in `Todo` component which takes `id`. And pass the function to List.

    2) Add `onClick` for the span in `List` component as you can cross out when you click the added list item.


18. Delete unnecessary lines.
    1) As you've added all React components and JSX, there are many lines of code that you can delete - html elements (not React JSX) and custom Redux codes.


19. Add API.
    1) Install API in index.html - This is a fake database provided by Udacity.

    2) Add behavior that when the app loads, `console.log` all of the todos and all of the goals that reside in the fake database. Since all API methods are promise-based, you can use `PromiseAll()` to wait until all Promises have resolved before displaying the content to the user.


20. Tell Redux store about data
    1) Tell Redux store about `todos` and `goals` data that you fetched (step 19). Create a new action creator names `receiveDataAction` and passes `todos` and `goals`.

    2) Add `case RECEIVE_DATA` for `todos` and `goals`, they returns `action.todos` and `action.goals`.

    3) In App component, instead of logging todos and goals, call `store.dispatch(receiveDataAction(todos, goals))`

    4) When you refresh the webpage and two seconds later, you'll get initial todo and goal list.