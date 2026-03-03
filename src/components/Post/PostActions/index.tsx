import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { LikeButton, StyledPostActions } from "./styles";
import { ChatCircleIcon, HeartIcon } from "@phosphor-icons/react";

interface PostActionsProps {
  isPostLiked: boolean
  onLikePost: () => void
  onOpenComments: () => void
}

export function PostActions({ isPostLiked, onLikePost, onOpenComments }: PostActionsProps) {
  return (
    <StyledPostActions>
      <LikeButton $isLiked={ isPostLiked } onClick={ onLikePost }>
        <HeartIcon weight={ isPostLiked ? "fill" : "regular" } />
        Like
      </LikeButton>
      
      <CollapsibleTrigger asChild>
        <button onClick={ onOpenComments }>
          <ChatCircleIcon />
          Comment
        </button>
      </CollapsibleTrigger>
    </StyledPostActions>
  )
}