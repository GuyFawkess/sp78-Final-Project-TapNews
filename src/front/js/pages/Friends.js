import React from "react";
import { Context } from "../store/appContext";
import { FriendCard } from "../component/cardFriend";

export const FriendsView = () => {
    return(
        <div style={{marginBlockEnd: '62px'}}>
            <FriendCard></FriendCard>
        </div>
    )
}