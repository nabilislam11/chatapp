import React, { children } from 'react'
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Userlist from './Userlist/Userlist';
const Searchinput = () => {
      const handleSearch =(e)=>{
        console.log(e.target.value.toLowerCase());
        Userlist.filter((item) => console.log(item));
    }
  return (
    <div className ={ ` w-full  mb-3 relative  ${children}`}>
        <input type="text" onChange={handleSearch} className='w-full rounded-[20px] pr-10 pl-[68px] py-[18px] outline-none shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-secondary placeholder:search  ' />
        <FiSearch className='absolute top-[20px] font-semibold text-[19px]   left-[19px] text-black  ' />
        <BsThreeDotsVertical className='absolute top-[20px] font-semibold text-[20px] right-[22px]  text-black ' />

    </div>
  )
}

export default Searchinput 