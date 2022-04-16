import './App.css';
import React, { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchTodos}from './redux/GetSlice'

function App() {
  const {status,error,todos} = useSelector((state) => state.toolkit) 
  const dispatch = useDispatch()

  console.log("status",status, "error",error, "todos",todos)

  useEffect(() => {
      dispatch(fetchTodos())
  }, [dispatch]);

  return (
    <div className="App">
      <h1>FetchTodos</h1>
      {status === 'loading' && <h2>Loading...</h2>}
			{error && <h2>Something went wrong:{error}</h2>}
			{todos.map((todo) => (
				<div key={todo.id}>{todo.title}</div>
			))}
    </div>
  );
}

export default App;
