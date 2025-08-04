import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPlusCircle } from "react-icons/fi";
import group1 from "../../../assets/group1.png";
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';

const MyGroups = () => {
    const db = getDatabase();
    const [joinlist, setJoinlist] = useState([]);
    const [memberlist, setMemberlist] = useState([]);
    const [show, setShow] = useState(false);
    const userdata = useSelector(state => state.userinfo.value);
    const [mygroup, setMygroup] = useState([]);

    useEffect(() => {
        const groupRef = ref(db, 'group/');
        onValue(groupRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().tagadmin === userdata.user.uid) {
                    arr.push(item.val());
                }
            });
            setMygroup(arr);
        });
    }, []);

    const jointRequestHandle = () => {
        setShow(!show);
    };

    useEffect(() => {
        const groupRef = ref(db, 'joint/');
        onValue(groupRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().groupadminInfo === userdata.user.uid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setJoinlist(arr);
        });
    }, []);

    const acceptJoinHandle = (item) => {
        set(push(ref(db, 'member/')), {
            groupName: item.groupName,
            memberName: item.requestName,
            memberId: item.requestId,
            groupInfo: item.groupInfo,
        }).then(() => {
            remove(ref(db, 'joint/' + item.id));
        });
    };
    const cancelHandle =(item) =>{
         remove(ref(db, 'joint/' +item.id), {
        });
    }

    useEffect(() => {
        const memberRef = ref(db, 'member/');
        onValue(memberRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.val().memberId === userdata.user.uid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setMemberlist(arr);
        });
    }, []);

    return (
        <div className='xl:w-[28%] w-full h-[49%] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-secondary px-[28px] py-[20px]'>
            <div className="flex justify-between items-center ">
                <h2 className='font-semibold font-secondary text-[20px] text-black'>My Groups</h2>
                {
                    show ? (
                        <button
                      >
                        <BsThreeDotsVertical onClick={jointRequestHandle} className='font-semibold text-[20px] text-red-500 mr-2.5 mt-[5px] ' />
                        </button>
                    ) : (
                        <button
                            onClick={jointRequestHandle}
                            className='flex justify-between items-center font-semibold gap-x-1 py-[8px] px-[8px] rounded font-secondary text-[20px] text-green-600   mr-2.5'>
                            <FiPlusCircle size={30} /> Join Request
                        </button>
                    )
                }
               
            </div>

            <div className="overflow-y-scroll h-[80%]">
                {
                    show ?
                        joinlist.map((item) => (
                            <div key={item.id} className="flex items-center justify-between pt-[13px] border-b-2 border-gray-300">
                                <div className="flex gap-x-[10px] justify-start items-center">
                                    <div>
                                        <h2 className='font-semibold font-secondary text-[14px] text-black'>
                                            {item.requestName}
                                        </h2>
                                        <p className='font-medium font-secondary text-[12px] text-black/75'>
                                            {item.groupName}
                                        </p>
                                        <p className='font-medium font-secondary text-[12px] text-black/75'>
                                            {item.requestId}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => acceptJoinHandle(item)}
                                    className='font-medium font-secondary text-[10px] text-black/50 pr-[10px]'>
                                    Accept
                                </button>
                                <button onClick={ ()=> cancelHandle(item)} className='font-medium font-secondary text-[10px] text-red-500 pr-[10px]'>
                                    Cancel
                                </button>
                            </div>
                        ))
                        :
                        <>
                            {
                                mygroup.map((group, index) => (
                                    <div key={index} className="flex items-center justify-between pt-[13px] border-b-2 border-gray-300">
                                        <div className="flex gap-x-[10px] justify-start items-center">
                                            <div>
                                                <h2 className='font-semibold font-secondary text-[14px] text-black'>
                                                    {group.tagname}
                                                </h2>
                                                <p className='font-medium font-secondary text-[12px] text-black/75'>
                                                    {group.taglist}
                                                </p>
                                            </div>
                                        </div>
                                        <p className='font-medium font-secondary text-[10px] text-black/50 pr-[10px]'></p>
                                    </div>
                                ))
                            }
                            {
                                memberlist.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between pt-[13px] border-b-2 border-gray-300">
                                        <div className="flex gap-x-[10px] justify-start items-center">
                                            <div>
                                                <h2 className='font-semibold font-secondary text-[14px] text-black'>
                                                    {item.groupName}
                                                </h2>
                                                <p className='font-medium font-secondary text-[12px] text-black/75'>
                                                    {item.memberName}
                                                </p>
                                            </div>
                                        </div>
                                        <p className='font-medium font-secondary text-[10px] text-black/50 pr-[10px]'></p>
                                    </div>
                                ))
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default MyGroups;
