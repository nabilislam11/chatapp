import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import  activemsgReducer  from './slice/activemsgSlice'


export default configureStore({
  reducer: {
    userinfo:userReducer,
    activedata :activemsgReducer
  }
})  