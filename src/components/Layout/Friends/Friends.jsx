import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import friends1 from "../../../assets/friends1.jpg"
import friends2 from "../../../assets/friends2.png"
import friends3 from "../../../assets/friends3.png"
import friends4 from "../../../assets/friends4.png"
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';


const Friends = () => {
    const db = getDatabase();
    const [friendlist, setfriendList] = useState([])
    const userdata = useSelector(state => state.userinfo.value)

    // useEffect(() => {
    //   if (!userdata?.uid) return;

    //   const friendRef = ref(db, 'friend/');
    //   onValue(friendRef, (snapshot) => {
    //     let arr = [];
    //     snapshot.forEach((item) => {
    //         const data =item.val()
    //         console.log(data,"itemfriend");

    //       if (
    //         userdata.uid === item.val().receiverid ||
    //         userdata.uid === item.val().senderid
    //       ) {
    //         arr.push(data);
    //       }
    //     });
    //     console.log(arr,"rayhan bhai");

    //     setfriendList(arr);
    //   });
    // }, [userdata?.uid]);
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
                setfriendList(arr)
        });
    }, [])    
    const handleblock = (item) => {
        console.log(item,"item log");
        let blockerId = "";
        let blockerName = "";
        let blockeredId = "";
        let blockeredName = "";
        if (item.senderid === userdata.user.id) {
            blockerId= item.senderid;
            blockerName= item.sendername;
           blockeredId= item.receiverid
            blockeredName= item.receiverName;
        } else {
            blockerId= item.receiverid;
            blockerName= item.receivername;
           blockeredId= item.senderid;
           blockeredName= item.sendername;
        }

        set(push(ref(db, 'block/')), {
            blockerId: blockerId,
            blockerName: blockerName,
            blockeredId:  blockeredId,
           blockeredName: blockeredName,
        }).then(() => {
              remove(ref(db, 'friend/'+ item.id))
            
            })
    }
    const handleUnfriend =(item)=>{
            remove(ref(db, 'friend/'+ item.id))
            
    }

    return (

        <div className='xl:w-[28%] w-full h-[50%] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-secondary px-[28px] py-[20px] ' >
            <div className="flex justify-between">
                <h2 className='font-semibold font-secondary text-[20px]  text-black'>Friends</h2>
                <BsThreeDotsVertical className=' font-semibold text-[20px] text-black ' />

            </div>
            <div className="overflow-y-scroll h-[80%] ">

                {
                    friendlist.map((item) => (
                        <div className="flex items-center justify-between pt-[10px] border-b-2 border-gray-300 ">
                            <div className="flex gap-x-[10px]  justify-start items-center">
                                <div className="w-[70px] h-[70px] rounded-full bg-center bg-cover bg-no-repeat  " style={{ backgroundImage: `url(${item.img})` }}>  </div>
                                <div className="">
                                    <h2 className='font-semibold font-secondary text-[14px]  text-black ' >
                                        {
                                            userdata.user.uid == item.senderid ? item.receivername : item.sendername
                                        }
                                    </h2>
                                    <p className='font-medium  font-secondary text-[12px]  text-black/75'>
                                        hey..
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2.5"> <button onClick={ () => handleUnfriend(item)} className='font-medium  font-secondary text-[17px] px-[7px] mr-[5px] bg-black text-white rounded-[7px] '>Unfriend</button>
                                <button onClick={()=> handleblock(item)} className='font-medium   font-secondary text-[17px] px-[7px] mr-[5px] text-red-500  rounded-[7px]'>Block</button></div>
                        </div>

                    ))
                }

            </div>

        </div>
    )
}

export default Friends