import { PostActions } from "../PostActions";
import { EngagementPanelDisplay, Separator, StyledEngagementPanel } from "./styles";

interface EngagementPanelProps {
  isPostLiked: boolean
  likesAmount: number
  commentsAmount: number
  onLikePost: () => void
  onOpenComments: () => void
}

export function EngagementPanel({ isPostLiked, likesAmount, commentsAmount, onLikePost, onOpenComments }: EngagementPanelProps) {
  return (
    <StyledEngagementPanel>
      <PostActions onLikePost={ onLikePost } onOpenComments={ onOpenComments } isPostLiked={ isPostLiked } />

      <EngagementPanelDisplay>
        <span>
          <strong>{ likesAmount }</strong>
          Like{ likesAmount !== 1 && "s" }
        </span>

        <Separator>•</Separator>

        <span>
          <strong>{ commentsAmount }</strong>
          Comment{ commentsAmount !== 1 && "s" }
        </span>
      </EngagementPanelDisplay>
    </StyledEngagementPanel>
  )
}