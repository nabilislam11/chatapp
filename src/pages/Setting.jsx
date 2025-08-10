import React from 'react'
import Searchinput from '../components/Layout/Searchinput'
import Profile_setting from '../components/profile settings/Profile_setting'
import Account_settings from '../components/account settings/Account_settings'

const Setting = () => {
  return (
    <>
      <div className="w-[100%] h-[95vh] flex flex-col justify-start gap-x-10 gap-y-9 ">   
        <Searchinput></Searchinput>
        <div className="flex flex-row justify-between gap-x-9 w-[100%] h-[95vh]">
          <Profile_setting/>
          <Account_settings/>
        </div>
            </div>
    </>
  )
}

export default Setting