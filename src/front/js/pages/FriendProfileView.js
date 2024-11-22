import React from "react";
import { FriendProfile } from "../component/FriendProfile";
import { SavedNewsGrid } from "../component/SavedNewsGrid";
import { useParams } from "react-router-dom";

export const FriendProfileView = () => {
    const { friend_id } = useParams();  // Obtener el friend_id desde la URL
    return(<>
        <FriendProfile></FriendProfile>
        <SavedNewsGrid usergrid={friend_id} />
    </>
)
}
