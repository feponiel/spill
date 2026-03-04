import { ImgHTMLAttributes } from "react";
import { AvatarPicture } from "./styles";
import unknownUser from "@/../public/unknown-user.png"

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  username: string
  url?: string
  hasBorder?: boolean
}

export function Avatar({ username, url = unknownUser.src, hasBorder = true }: AvatarProps) {
  return (
    <AvatarPicture src={url} $hasBorder={hasBorder} alt={ `${username}'s avatar picture` } width={200} height={200}></AvatarPicture>
  )
}
