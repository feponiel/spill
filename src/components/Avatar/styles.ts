'use client'

import Image from 'next/image'
import styled, { css } from 'styled-components'

interface AvatarPictureProps {
  $hasBorder?: boolean
}

export const AvatarPicture = styled(Image)<AvatarPictureProps>`
  ${({ theme, $hasBorder }) => css`
    width: calc(3rem + 12px);
    height: calc(3rem + 12px);
    border-radius: ${theme.radius.full};

    ${$hasBorder &&
    css`
      border: 4px solid ${theme.colors.shade800};
      outline: 2px solid ${theme.colors.accentColor};
    `}
  `}
`
