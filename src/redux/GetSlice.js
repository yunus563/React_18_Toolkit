import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',

  async (_, { rejectWithValue }) => {
    try {
      const res = await axios('https://jsonplaceholder.typicode.com/todos?_limit=30');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)


const setError = (state, action) => {
  state.status = 'failed';
  state.error = action.error.message;
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState:{
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    // addTodo: (state, action) => {
    //   state.todos = action.payload;
    // },
    // createTodo: (state, action) => {
    //   state.todos.push(action.payload);
    // },
    // removeTodo: (state, action) => {
    //   state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    // },

    // toggleComplete: (state, action) => {
    //   const todo = state.todos.find(todo => todo.id === action.payload.id);
    //   todo.completed = !todo.completed;
    // }
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: setError,
  }
})

// export const { } = todoSlice.actions


export default todoSlice.reducer