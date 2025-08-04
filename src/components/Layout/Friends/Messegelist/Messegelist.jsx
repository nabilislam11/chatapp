import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import messege1 from "../../../../assets/messege1.png"
import messege2 from "../../../../assets/messege2.png"
import messege3 from "../../../../assets/messege3.png"
import messege4 from "../../../../assets/messege4.png"
import Searchinput from '../../Searchinput';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { activemsginfo } from '../../../../slice/activemsgSlice';
const Messegelist = () => {
    const db = getDatabase();
     const userdata = useSelector(state => state.userinfo.value)
    const dispatch = useDispatch()
    const [messegeList, setMessegeList] = useState([])
   useEffect(() => {
          const friendRef = ref(db, 'friend/');
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
      }, [])    
        console.log(messegeList, "messegelist");

        const handleMsg = (item) => {
            // console.log(item);
            // console.log(activemsginfo,"dispatch");
            //  dispatch(activemsginfo(item))
            if (userdata.user.uid == item.senderid) {
                dispatch(activemsginfo({
                    id:item.receiverid,
                    name:item.receivername
                }))
                
            }else{
                dispatch(activemsginfo({
                    id:item.senderid,
                    name:item.sendername
                }))
            }

        }


        return (
            <div className='xl:w-[30%] w-full h-[56%] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-secondary px-[28px] py-[20px] ' >
                <Searchinput />
                <div className="flex justify-between">
                    <h2 className='font-semibold font-secondary text-[20px]  text-black'>Friends</h2>


                </div>
                <div className=" overflow-auto h-[80%] ">
                    {
                        messegeList.map((item) => (
                            <div className="flex items-center justify-between pt-[18px] pb-[13px] border-b-2 border-gray-300 ">
                                <div className="flex gap-x-[10px]  justify-start items-center">
                                    {/* <div className="w-[70px] h-[70px] rounded-full bg-center bg-cover bg-no-repeat  " style={{ backgroundImage: `url(${img})` }}>  </div> */}
                                    <div className="">
                                        <h2 className='font-semibold font-secondary text-[14px]  text-black ' >
                                        {
                                            userdata.user.uid == item.senderid ? item.receivername : item.sendername
                                        }
                                        </h2>
                                    </div>

                                </div>
                                        <button onClick={() => handleMsg(item)} className='font-semibold font-secondary text-[14px] rounded-[7px] text-white bg-black py-[13px] px-[17px] '> msg</button>

                            </div>
                        ))
                    }
                </div>

            </div>
        )
    }

export default Messegelist