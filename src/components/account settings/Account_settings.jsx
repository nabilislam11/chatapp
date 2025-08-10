import React from 'react'
import { FaKey, FaTrashAlt } from 'react-icons/fa'

const Account_settings = () => {
    return (
        <div className='w-[50%] h-full rounded-[20px]  shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
            <div className="p-[30px]">
                <p className='font-semibold font-secondary text-[20px] text-black pb-[36px] '>Profile Settings</p>
                <div className="flex flex-col gap-y-[37px] pl-[60px] ">
                    <div className="flex gap-x-9 items-center ">
                        <FaKey />
                        <p className=''>Change Password</p>
                    </div>
                    <div className="flex gap-x-9 items-center">
                        <FaTrashAlt />
                        <p className=''>Delete Account.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Account_settings