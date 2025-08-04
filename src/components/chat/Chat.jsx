import React, { useEffect, useState } from 'react'
import profile from '../../assets/profile.jpg'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaLocationArrow } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import time from './time/time';
const Chat = () => {

    const db = getDatabase();

    const activedata = useSelector(state => state.activedata.value)
    const [msg, setmsg] = useState("")
    const userdata = useSelector(state => state.userinfo.value)
    const [chatlist, setchatlist] = useState([])

    console.log(activedata, "acvtive");

    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        console.log(activedata, "activeda");

        onValue(friendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userdata.user.uid == item.val().receiverid ||
                    userdata.user.uid == item.val().senderid) {
                    arr.push({ ...item.val(), id: item.key });
                }

            }),
                setMessegeList(arr)
        });
    }, [db, activedata])
    const handlemsgSend = () => {
        set(push(ref(db, 'singlemsg/')), {
            whosenderid: userdata.user.uid,
            whosendername: userdata.user.displayName,
            whoreceiverid: activedata.id,
            whoreceivername: activedata.name,
            msg: msg,
            time: time()
        })
        setmsg("")

        
    }
     
    useEffect(() => {
        const singlemsgRef = ref(db, 'singlemsg/');
        onValue(singlemsgRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
              if ((userdata.user.uid == item.val().whosenderid && activedata.id==item.val().whoreceiverid) ||
             (userdata.user.uid == item.val().whoreceiverid && activedata.id==item.val().whosenderid)
            ) 
              {
                arr.push(item.val())
              }
            })
            setchatlist(arr)
        });
    }, [activedata.id])

    return (
        <div className='flex flex-col justify-between xl:w-[65%] w-full h-[100%] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-secondary px-[28px] py-[20px] '>
            {/* profile__part */}
            <div className="flex justify-between items-center  pb-[15px] border-gray-300  border-b-2 mb-[65px]  ">
                <div className=" flex justify-between items-center  gap-x-[33px] ">
                    <img className='w-[75px] h-[75px] rounded-full  ' src={profile} alt="" />
                    <div className="">
                        <p className='font-semibold font-secondary text-[24px]  text-black'>{activedata.name} </p>
                        <p className='font-normal  font-secondary text-[16px]  text-black' >Online</p>
                    </div>
                </div>
                <BsThreeDotsVertical className=' font-semibold text-[30px] text-black ' />
                {/* Chat__part */}
            </div>


            <div className="  flex-1 flex-col overflow-auto h-[80%]">
                {/* SENDER MSG  */}
                {
                    chatlist.map((item) => (
                        userdata.user.uid == item.whosenderid ?
                            <div className="flex flex-col items-end    ">

                                <h2 className=' inline-block font-normal font-secondary text-[16px]  bg-black rounded-[7px] text-white py-[12px] px-[42px] '>{item.msg}</h2>

                                <h2 className='font-medium  font-secondary text-[12px]  text-black pt-[7px]   '>{item.time} </h2>
                            </div>
                            :
                            <div className=" flex flex-col items-start ">
                                <h2 className=' inline-block font-normal font-secondary text-[16px]  bg-[#F1F1F1] rounded-[7px] text-black py-[12px] px-[42px] '>{item.msg} </h2>
                                <h2 className='font-medium  font-secondary text-[12px]  text-black pt-[7px]   '>{item.time} </h2>
                            </div>

                    ))
                }





            </div>


            <div className=" flex justify-between mt-2.5 ">

                <input onChange={(e) =>setmsg(e.target.value) } onKeyDown={(e)=>{
                    if (e.key=== "Enter"){
                         handlemsgSend()
                    }
                } } value={msg} type="text" className=' w-[750px] rounded-[20px] py-[15px] px-[15px] border-gray-300 border-1 bg-gray-300 text-black font-secondary' placeholder='Aa' />
                <button onClick={() => handlemsgSend()  } className='py-[15px] px-[20px]  bg-black text-white rounded-[7px]' ><FaLocationArrow /> </button>
            </div>


        </div>
    )
}

export default Chat