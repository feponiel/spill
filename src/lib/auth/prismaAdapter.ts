import { Adapter, AdapterUser, AdapterAccount } from 'next-auth/adapters'
import { prisma } from '../prisma'

function mapUser(user: any): AdapterUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.avatar_url,
    emailVerified: null,
  }
}

export function PrismaAdapter(): Adapter {
  return {
    async createUser(user: AdapterUser) {
      const createdUser = await prisma.user.create({
        data: {
          name: user.name ?? 'Unnamed User',
          email: user.email!,
          avatar_url: user.image,
        },
      })

      return mapUser(createdUser)
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: { id },
      })

      if (!user) return null
      return mapUser(user)
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) return null
      return mapUser(user)
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider_account_id: providerAccountId,
            provider,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) return null
      return mapUser(account.user)
    },

    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...(user.name !== undefined && {
            name: user.name ?? 'Unnamed User',
          }),
          ...(user.image !== undefined && {
            avatar_url: user.image,
          }),
          ...(user.email !== undefined && {
            email: user.email,
          }),
        },
      })

      return mapUser(updatedUser)
    },

    async linkAccount(account: AdapterAccount) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          session_token: sessionToken,
          user_id: userId,
          expires,
        },
      })

      return {
        sessionToken,
        userId,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!prismaSession) return null

      const { user, ...session } = prismaSession

      return {
        session: {
          sessionToken: session.session_token,
          userId: session.user_id,
          expires: session.expires,
        },
        user: mapUser(user),
      }
    },

    async updateSession({ sessionToken, expires, userId }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
        expires: prismaSession.expires,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
