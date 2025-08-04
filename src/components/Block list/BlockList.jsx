import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import block1 from "../../assets/block1.jpg"
import block2 from "../../assets/block2.jpg"
import block3 from "../../assets/block3.jpg"
import block4 from "../../assets/block4.png"
import block5 from "../../assets/block5.png"
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { useSelector } from 'react-redux';

const BlockList = () => {
    const db = getDatabase();
    const [blocklist, setblockList] = useState([])
    const userdata = useSelector(state => state.userinfo.value)
    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
             
                
                if (userdata.user.uid == item.val().blockerId || userdata.user.uid == item.val().blockeredId) {
                    arr.push({...item.val(), id: item.key})
                    
                }

            })
            setblockList(arr)
        });
    }, [])
    const handleUnblock = (item)=>{
     remove(ref(db,'block/'+ item.id)) 

     
    }




    return (
        <div className='xl:w-[28%] w-full  h-[49%] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-secondary px-[28px] py-[20px] ' >
            <div className="flex justify-between">
                <h2 className='font-semibold font-secondary text-[20px]  text-black'>Block List</h2>
                <BsThreeDotsVertical className=' font-semibold text-[20px] text-black ' />

            </div>
            <div className="overflow-y-scroll h-[90%] ">

                {
                    blocklist.map((item) => (
                        <div className="flex items-center justify-between pt-[13px] border-b-2 border-gray-300 ">
                            <div className="flex gap-x-[10px]  justify-start items-center">
                                <div className="w-[70px] h-[70px] rounded-full bg-center bg-cover bg-no-repeat  " style={{ backgroundImage: `url(${item.img})` }}>  </div>
                                <div className="">
                                    <h2 className='font-semibold font-secondary text-[14px]  text-black ' >
                             {item.blockerId == userdata.user.uid?
                             item.blockeredName
                             :
                             item.blockerName
                             }
                                    </h2>
                                    <p className='font-medium  font-secondary text-[10px]  text-black/50 '>
                                        sdadfgsf
                                    </p>
                                </div>

                            </div>
                            {
                                item.blockerId == userdata.user.uid &&
   
                            <button onClick={() =>handleUnblock(item)} className='pr-[4px] pl-[9px] bg-black text-white mr-[37px]'>unblock</button>
                            }
                        </div>
                    ))
                }



            </div>

        </div>
    )
}

export default BlockList