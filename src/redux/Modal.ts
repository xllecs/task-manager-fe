import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    value: false
  },
  reducers: {
    openModal: (state) => {
      state.value = true
    },
    closeModal: (state) => {
      state.value = false
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions

export const modalReducer = modalSlice.reducer
