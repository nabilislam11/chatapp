import React, { useState } from 'react'
import profile from '../../assets/profile.jpg'
import { AiFillEdit } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, updateProfile } from 'firebase/auth'
import { getDatabase, ref, set, update } from 'firebase/database'

const Profile_setting = () => {
  const auth = getAuth();
  const dispatch =useDispatch()
  const db = getDatabase();
  const [showName, setShowname] = useState("")
  const userdata = useSelector(state => state.userinfo.value.user)

  const [newName, setNewname] = useState(userdata?.displayName || "")
  const handleSubmit = () => {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: newName

      })
      update(ref(db, 'users/' + userdata.uid), {

        username: newName,
      })
      .then(() => {
        dispatch(DisplayNameUpdate(newName))
        setNewname("")
      }).catch((error) => {
        // An error occurred
        // ...
      });
      
    } console.log(newName);
    
    
  }


return (

  <div className='w-[50%] h-full rounded-[20px]  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] '>

    <div className="p-[30px]">
      <p className='font-semibold font-secondary text-[20px] text-black pb-[49px] '>Profile Settings</p>
      <div className=" flex pb-[43px] border-b-2 border-gray-300  gap-x-9">
        <div className=" flex justify-center   items-center  ">
          <img className='w-[75px] h-[75px] rounded-full  ' src={profile} alt="" />
        </div>
        <div className="">
          <h1 className=' font-secondary font-semibold text-[25px] '>{userdata?.displayName} </h1>
          <p className='font-secondary font-normal  text-[20px] '>Stay home stay safe</p>
        </div>

      </div>
      <div className="flex flex-col gap-y-[37px] pt-[43px] ">
        <div className="flex gap-x-9  items-center  ">
          <AiFillEdit />
          <p onClick={(e) => setShowname(!showName)} className='font-secondary font-normal  text-[20px]'>Edit Profile Name.

          </p>
        </div>
        {showName && (
          <div className="flex flex-col">

            <input
              onChange={(e) => setNewname(e.target.value)  }

              value={newName}

              className=' py-[12px] px-[14px] border-b-2 border-gray-300  outline-0' type="text" placeholder='Enter New name' />
            <button onClick={handleSubmit} className=' py-[12px] px-[15px] bg-[#0D6EFF] rounded text-white '>Submit</button>
          </div>

        )
        }

        <div className="flex gap-x-9  items-center  ">
          <BiCommentDetail />
          <p className='font-secondary font-normal  text-[20px]'>Edit Profile Status Info.</p>
        </div>
        <div className="flex gap-x-9 items-center   ">
          <MdOutlineAddPhotoAlternate />
          <p className='font-secondary font-normal  text-[20px]'>Edit Profile Photo.</p>
        </div>
        <div className="flex gap-x-9  items-center  ">
          <FaRegQuestionCircle />
          <p className='font-secondary font-normal  text-[20px]'>Help.</p>
        </div>
      </div>
    </div>
  </div>
)
}

export default Profile_setting