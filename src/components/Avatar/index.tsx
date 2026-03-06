import { forwardRef, ImgHTMLAttributes } from "react";
import { AvatarPicture } from "./styles";
import unknownUser from "@/../public/unknown-user.png"

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  username?: string
  url?: string
  hasBorder?: boolean
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ username = "Unknown user avatar picture", url = unknownUser.src, hasBorder = true, src, width, height, ...props }, ref) => {
    return (
      <AvatarPicture
        ref={ref}
        src={url}
        $hasBorder={hasBorder}
        alt={`${username}'s avatar picture`}
        width={200}
        height={200}
        {...props}
      />
    )
  }
)

Avatar.displayName = "Avatar"
