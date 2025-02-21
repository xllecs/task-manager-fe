import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    value: {},
  },
  reducers: {
    setTask: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setTask } = taskSlice.actions

export const taskReducer = taskSlice.reducer
