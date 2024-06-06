import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false
}

export const roomSlice = createSlice({
  name: 'roomComponent',
  initialState,
  reducers: {
    hideHeaderAndFooter : (state)=>{
        state.value = true;
    },
    showHeaderAndFooter : (state)=>{
        state.value = false;
    }
  },
})


export const { hideHeaderAndFooter,showHeaderAndFooter } = roomSlice.actions

export default roomSlice.reducer
