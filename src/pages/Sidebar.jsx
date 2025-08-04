import React from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { FaCommentDots } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { getAuth, signOut } from "firebase/auth";
import { InfinitySpin } from 'react-loader-spinner';
import { NavLink, useNavigate } from 'react-router';

const Sidebar = () => {
    const navigate = useNavigate()
  const auth = getAuth();

      const handelExit = () => {
        setloading(true)
        signOut(auth).then(() => {
    
          navigate("/registration")
    
    
        }).catch((error) => {
          console.log(error);
          setloading(false)
    
        });
      }
  return (
    <div>           
       <div className="w-[10.96%] rounded-[20px]  ml-[35px] flex flex-col  justify-between  py-[38px]   mr-[22px] bg-black">

              <div className="flex flex-col gap-y-9 ">
                <div className=" flex flex-col  w-[100px] h-[100px] rounded-full mx-auto object-cover cursor-pointer bg-[url(assets/profile.jpg)] bg-center bg-no-repeat bg-cover"></div>
                <NavLink to="/" className="relative  after:content-[''] after:absolute after:top-0 after:left-[25px] after:rounded-l-[20px] py-5 after:bg-white  after:w-full after:h-full after:z-[-1] z-[1]  cursor-pointer before:content-[''] before:absolute before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-2xl before:shadow-2xl  before:bg-black before:z-[1] ">
                  <GrHomeRounded className='size-9  mx-auto '   />
                </NavLink>

                <NavLink to="/messege" className=" relative  after:content-[''] after:absolute after:top-0 after:left-[25px] after:rounded-l-[20px] py-5 after:bg-white  after:w-full after:h-full after:z-[-1] z-[1]  cursor-pointer before:content-[''] before:absolute before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-2xl before:shadow-2xl  before:bg-black before:z-[1]">
                  <FaCommentDots className='size-9  mx-auto ' />
                  
                
                </NavLink>
                <NavLink to="/settings" className=" relative  after:content-[''] after:absolute after:top-0 after:left-[25px] after:rounded-l-[20px] py-5 after:bg-white  after:w-full after:h-full after:z-[-1] z-[1]  cursor-pointer before:content-[''] before:absolute before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-2xl before:shadow-2xl  before:bg-black before:z-[1] ">
                  <AiTwotoneSetting className='size-9  mx-auto' />
                 
                </NavLink>
              </div>
              <div className="relative  after:content-[''] after:absolute after:top-0 after:left-[25px] after:rounded-l-[20px] py-5 after:bg-white  after:w-full after:h-full after:z-[-1] z-[1]  cursor-pointer before:content-[''] before:absolute before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-2xl before:shadow-2xl  before:bg-black before:z-[1]">
                <ImExit onClick={handelExit} className=' size-10  mx-auto' />
              </div>
            </div>
            </div>
  )
}

export default Sidebar