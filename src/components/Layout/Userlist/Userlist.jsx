import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsFillPlusSquareFill } from "react-icons/bs";
import user1 from "../../../assets/user1.jpg"
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { FaMinusCircle } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import Searchinput from '../Searchinput';

import { FiSearch } from 'react-icons/fi';
import { ImBlocked } from 'react-icons/im';
const Userlist = () => {
    const db = getDatabase();
    const userdata = useSelector(state => state.userinfo.value)
    const [userlist, setUserlist] = useState([])
    const [friendlist, setfriendList] = useState([])
    const [searchuser, setSearchuser] = useState([])
    const [blocklist, setblockList] = useState([])

    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {

                if (userdata.user.uid !== item.key) {

                    arr.push({ ...item.val(), userid: item.key });

                }

            })
            setUserlist(arr)
        });
    }, [])
    const [friendrequestlist, setFriendrequestlist] = useState([])
    useEffect(() => {
        const friendrequestRef = ref(db, 'friendrequest/');
        onValue(friendrequestRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {

                arr.push(item.val().receiverid + item.val().senderid);

            })
            setFriendrequestlist(arr)


        });
    }, [])

    const handleRequest = (item) => {
        set(push(ref(db, 'friendrequest/')), {
            senderid: userdata.user.uid,
            sendername: userdata.user.displayName,
            receiverid: item.userid,
            receivername: item.username,
        });
    }
    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        onValue(friendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                {
                    arr.push(item.val().receiverid + item.val().senderid);
                }
            }),
                setfriendList(arr)
        });
    }, [])
    const handleSearch = (e) => {
        console.log(e.target.value.toLowerCase());
        let arr = []
        userlist.filter((item) => {

            if (item.username.toLowerCase().includes(e.target.value.toLowerCase())) {
                arr.push(item);
            }
            setSearchuser(arr)
        });

    }
    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                const block = item.val();
                arr.push(block.blockerId
                    + block.blockeredId
                );

            })
            setblockList(arr)
        });
    }, [])
    console.log(blocklist);



    return (
        <div className='flex flex-col xl:w-[28%] w-full   h-[50%] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-secondary  px-[28px] py-[20px]'>
            <div className="">
                <div className={` w-full  mb-3 relative  `}>
                    <input type="text" onChange={handleSearch} className='w-full rounded-[20px] pr-10 pl-[68px] py-[18px] outline-none shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-secondary placeholder:search  ' />
                    <FiSearch className='absolute top-[20px] font-semibold text-[19px]   left-[19px] text-black  ' />
                    <BsThreeDotsVertical className='absolute top-[20px] font-semibold text-[20px] right-[22px]  text-black ' />

                </div>
            </div>
            <div className=' ' >
                <div className="flex justify-between">
                    <h2 className='font-semibold font-secondary text-[20px]  text-black'>User List</h2>
                    <BsThreeDotsVertical className=' font-semibold text-[20px] text-black ' />

                </div>
                <div className="overflow-y-scroll h-[80%] ">
                    {
                        searchuser.length > 0 ?
                            searchuser.map((item) => (
                                <div className="flex items-center justify-between pt-[13px] border-b-2 border-gray-300 ">
                                    <div className="flex gap-x-[10px]  justify-start items-center">
                                        <div className="w-[70px] h-[70px] rounded-full bg-center bg-cover bg-no-repeat  " style={{ backgroundImage: `url(${item.img})` }}>  </div>

                                        <div className="">
                                            <h2 className='font-semibold font-secondary text-[14px]  text-black ' >
                                                {item.username}
                                            </h2>
                                            <p className='font-medium  font-secondary text-[10px]  text-black/50 '>
                                                {item.email}
                                            </p>
                                        </div>
                                    </div>
                                    {

                                        friendlist.includes(userdata.user.uid + item.userid) ||
                                            friendlist.includes(item.userid + userdata.user.uid) ? (

                                            <button className='pr-[20px] '> <IoPeopleSharp size={25} /></button>
                                        )
                                            :
                                            friendrequestlist.includes(userdata.user.uid + item.userid) ||

                                                friendrequestlist.includes(item.userid + userdata.user.uid) ? (
                                                <button className='pr-[20px] cursor-pointer '> <FaMinusCircle size={25} /></button>
                                            )
                                                : (

                                                    <button onClick={() => handleRequest(item)} className='pr-[20px] cursor-pointer '> <BsFillPlusSquareFill size={25} /></button>
                                                )
                                    }
                                </div>
                            ))
                            :
                            userlist.map((item) => (
                                <div className="flex items-center justify-between pt-[13px] border-b-2 border-gray-300 ">
                                    <div className="flex gap-x-[10px]  justify-start items-center">
                                        <div className="w-[70px] h-[70px] rounded-full bg-center bg-cover bg-no-repeat  " style={{ backgroundImage: `url(${item.img})` }}>  </div>

                                        <div className="">
                                            <h2 className='font-semibold font-secondary text-[14px]  text-black ' >
                                                {item.username}
                                            </h2>
                                            <p className='font-medium  font-secondary text-[10px]  text-black/50 '>
                                                {item.email}
                                            </p>
                                        </div>
                                    </div>
                                    {
                                        blocklist.includes(userdata.user.uid + item.userid) ||
                                            blocklist.includes(item.userid + userdata.user.uid) ? (
                                            <button className='pr-[20px] '> <ImBlocked size={25} /></button>
                                        )
                                            :
                                            friendlist.includes(userdata.user.uid + item.userid) ||
                                                friendlist.includes(item.userid + userdata.user.uid) ? (

                                                <button className='pr-[20px] '> <IoPeopleSharp size={25} /></button>
                                            )
                                                :
                                                friendrequestlist.includes(userdata.user.uid + item.userid) ||

                                                    friendrequestlist.includes(item.userid + userdata.user.uid) ? (
                                                    <button className='pr-[20px] cursor-pointer '> <FaMinusCircle size={25} /></button>
                                                )
                                                    :
                                                    (

                                                        <button onClick={() => handleRequest(item)} className='pr-[20px] cursor-pointer '> <BsFillPlusSquareFill size={25} /></button>
                                                    )
                                    }
                                </div>
                            ))
                    }
                </div>

            </div>

        </div>

    )
}

export default Userlist