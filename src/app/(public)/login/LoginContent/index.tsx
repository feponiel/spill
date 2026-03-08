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
import { useState } from 'react'
import { LoadingWheel } from '@/components/LoadingWheel'

export function LoginContent() {
  const [isLoading, setLoading] = useState(false)

  async function handleSignIn(provider: string) {
    setLoading(true)

    await signIn(provider, {
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
        {isLoading ? (
          <>
            <LoadingWheel size="sm" color="white" />
            Logging in...
          </>
        ) : (
          <>
            <GithubLogoIcon size={24} weight="duotone" />
            <span>Continue with GitHub</span>
          </>
        )}
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
