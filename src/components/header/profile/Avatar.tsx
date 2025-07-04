import type React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { AvatarProps } from "@/types/profile"

export const Avatar: React.FC<AvatarProps> = ({ user }) => {
    return user?.photo_url ? (
        <img src={user.photo_url} className='w-8 h-8 rounded-full active:border border-solid drag-none' />
    ) : (
        <Skeleton className='w-8 h-8 rounded-full bg-blue-100' />
    )
}