import { createSlice } from '@reduxjs/toolkit'

export const activemsgSlice = createSlice({
  name: 'activedata',
  initialState: {
    value:localStorage.getItem("activemsginfo") ?
    JSON.parse(localStorage.getItem("activemsginfo"))
    :
    null
  },
  reducers: {
   activemsginfo: (state,action) => {
        console.log(state,"dsaff");
        console.log(action);
        state.value =action.payload
        localStorage.setItem("activemsginfo",JSON.stringify(action.payload))
    }
  }
})


export const { activemsginfo } = activemsgSlice.actions

export default activemsgSlice.reducer