import React, { useEffect } from 'react'
import Grouplist from '../components/Layout/Grouplist/Grouplist';
import Friends from '../components/Layout/Friends/Friends';
import Userlist from '../components/Layout/Userlist/Userlist';
import FriendRequest from '../components/Layout/Friend request/FriendRequest';
import BlockList from '../components/Block list/BlockList';
import MyGroups from '../components/Layout/My Groups/MyGroups';
function Home() {

  return (
    <>
              <Grouplist></Grouplist>
              <Friends></Friends>
              <Userlist ></Userlist>
              <FriendRequest></FriendRequest>
              <MyGroups></MyGroups>
              <BlockList></BlockList>
    </>
  )
}

export default Home