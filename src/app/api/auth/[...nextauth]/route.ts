import { PrismaAdapter } from '@/lib/auth/prismaAdapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),

  session: {
    strategy: 'jwt',
  },

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT CALLBACK', { token, user })
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      console.log('SESSION CALLBACK', { session, token })
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
