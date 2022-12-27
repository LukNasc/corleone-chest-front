import { Skeleton } from "@mui/material";
import React from "react";

function NotificationCardSkeleton({ length = 5 }) {
    return Array.from({ length }).map(() => (
        <Skeleton variant="rectangular" width="100%" height="100px"/>
    ))
}

export default NotificationCardSkeleton