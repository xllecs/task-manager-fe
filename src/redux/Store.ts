import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from './Task'
import { modalReducer } from './Modal'

export default configureStore({
  reducer: {
    task: taskReducer,
    modal: modalReducer,
  }
})
