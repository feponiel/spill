'use client'

import { Logo } from '@/components/Logo'
import {
  GithubAuthButton,
  ImportantLink,
  ImportantLinksWrapper,
  StyledLoginContent,
} from './styles'
import { GithubLogoIcon } from '@phosphor-icons/react'
import { signIn } from 'next-auth/react'

export function LoginContent() {
  function handleSignIn(provider: string) {
    signIn(provider, {
      callbackUrl: '/',
    })
  }

  return (
    <StyledLoginContent>
      <Logo size="lg" />
      <p>
        Share what you are building anew
        <br />
        with people.
      </p>

      <GithubAuthButton onClick={() => handleSignIn('github')}>
        <GithubLogoIcon size={24} weight="duotone" />
        Continue with GitHub
      </GithubAuthButton>

      <ImportantLinksWrapper>
        <ImportantLink
          href="https://github.com/feponiel/spill-feed"
          target="_blank"
        >
          Source Code
        </ImportantLink>
        <ImportantLink
          href="https://www.linkedin.com/in/feponiel"
          target="_blank"
        >
          Dev's LinkedIn Profile
        </ImportantLink>
      </ImportantLinksWrapper>
    </StyledLoginContent>
  )
}
