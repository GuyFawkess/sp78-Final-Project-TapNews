import React from "react";
import { ProfileCard } from "../component/ProfileCard";
import { SavedNewsGrid } from "../component/SavedNewsGrid";

export const UserProfile = () => {
    const userId = localStorage.getItem("user_id");

    return(<>
    <ProfileCard></ProfileCard>
    <SavedNewsGrid usergrid={userId} />
    </>
)
}
