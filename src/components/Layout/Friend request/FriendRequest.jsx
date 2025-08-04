import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import request from "../../../assets/request.jpg"
import request1 from "../../../assets/request1.jpg"
import request2 from "../../../assets/request2.jpg"
import request3 from "../../../assets/request3.jpg"
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';


const FriendRequest = () => {
  const db = getDatabase();
  const userdata = useSelector(state => state.userinfo.value)
  const [friendrequestlist, setFriendrequestlist] = useState([])
  useEffect(() => {
    const friendrequestRef = ref(db, 'friendrequest/');
    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {

        if (userdata.user.uid == item.val().receiverid) {
          arr.push({...item.val(),id : item.key});
        }
      })
      setFriendrequestlist(arr)
    });
  }, [])
  
  console.log(friendrequestlist);
  const handleAccepet = (item) => {
    set(push(ref(db, 'friend/' )), {
      ...item

    }).then(() => {
      remove(ref(db, 'friendrequest/'+ item.id))
    
    })


  }
  
  return (
    <div className='w-[38%] h-[49%] rounded-[20px]  pt-[10px] pb-[20px] px-[20px] font-secondary '>
      <div className=" flex justify-between ">
        <h3 className='font-semibold font-secondary text-[20px] text-black ' >Friend  Request</h3>
        <BsThreeDotsVertical className='font-semibold text-[20px] text-black ' />
      </div>
      <div className=" overflow-y-scroll h-[89%] ">
        {
          friendrequestlist.map((item) => (
            <div className="flex justify-between items-center py-[13px] border-b-2 border-gray-300 ">
              <div className="flex justify-start items-center gap-x-[14px]">
                <div className="w-[70px] h-[70px] rounded-full bg-cover bg-center bg-no-repeat " style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="">
                  <h3 className='font-semibold font-secondary text-[18px]  text-black '>
                    {item.sendername}
                  </h3>
                  <p className='font-semibold font-secondary text-[14px]  text-black '  >{item.msg}</p>
                </div>
              </div>
              <button className='font-semibold font-secondary text-[20px] px-[7px] mr-[62px] bg-black text-white ' onClick={() => handleAccepet(item)} >Accept</button>
            </div>
          ))
        }
      </div>


    </div>
  )
}

export default FriendRequest