import React from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { FaCommentDots } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import Searchinput from '../components/Layout/Searchinput';
import Friends from '../components/Layout/Friends/Friends';
import Messegelist from '../components/Layout/Friends/Messegelist/Messegelist';
import Chat from '../components/chat/Chat';
const Messege = () => {
  return (
                
            <div className="w-[100%] h-[95vh] flex flex-wrap justify-start gap-x-10 gap-y-9 ">   
              <Messegelist></Messegelist>
              <Chat></Chat>
            </div>

  )
}

export default Messege