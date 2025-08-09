import React from 'react'
import profile from '../../assets/profile.jpg'
import { AiFillEdit } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { FaRegQuestionCircle } from 'react-icons/fa'

const Profile_setting = () => {
  return (
    <div className='w-[50%] h-full rounded-[20px]  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] '>

      <div className="p-[30px]">
        <p className='font-semibold font-secondary text-[20px] text-black pb-[49px] '>Profile Settings</p>
        <div className=" flex pb-[43px] border-b-2 border-gray-300  gap-x-9">
          <div className=" flex justify-center   items-center  ">
            <img className='w-[75px] h-[75px] rounded-full  ' src={profile} alt="" />
          </div>
          <div className="">
            <h1 className=' font-secondary font-semibold text-[25px] '>Shohel Rana Baig</h1>
            <p className='font-secondary font-normal  text-[20px] '>Stay home stay safe</p>
          </div>

        </div>
        <div className="flex flex-col gap-y-[37px] pt-[43px]  ">
          <div className="flex gap-x-9 ">
            <AiFillEdit />
            <p className=''>Edit Profile Name.</p>
          </div>
          <div className="flex gap-x-9 ">
            <BiCommentDetail />
            <p className=''>Edit Profile Status Info.</p>
          </div>
          <div className="flex gap-x-9 ">
           <MdOutlineAddPhotoAlternate />
            <p className=''>Edit Profile Photo.</p>
          </div>
          <div className="flex gap-x-9 ">
            <FaRegQuestionCircle />
            <p className=''>Help.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile_setting