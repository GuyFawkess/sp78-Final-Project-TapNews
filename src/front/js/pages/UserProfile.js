import React from "react";
import { Context } from "../store/appContext";
import { ProfileCard } from "../component/ProfileCard";
import { SavedNewsGrid } from "../component/SavedNewsGrid";

export const UserProfile = () => {
    return(<>
    <ProfileCard></ProfileCard>
    <SavedNewsGrid></SavedNewsGrid>
    </>
)
}
