import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: localStorage.getItem("userLoginfo") ? JSON.parse(localStorage.getItem("userLoginfo")):null
  },
  reducers: {
    userLoginfo: (state,action) => {
        console.log(state);
        console.log(action);
        state.value=action.payload
        
 
    },
    DisplayNameUpdate :(state,action) =>{
      if (state.value && state.value.user) {
        state.value.user.displayName  = action.payload   
      }
    }
  }
})


export const { userLoginfo, DisplayNameUpdate } = userSlice.actions

export default userSlice.reducer