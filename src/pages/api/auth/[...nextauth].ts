import NextAuth, {
  type Profile,
  type User,
  type Account,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

const updateRefreshToken = async ({
  user,
  account,
  profile,
  isNewUser,
}: {
  user: User;
  account: Account | null;
  profile?: Profile | undefined;
  isNewUser?: boolean;
}) => {
  try {
    if (!isNewUser && account) {
      const updatedAccount = await prisma.account.updateMany({
        where: { userId: user.id, provider: "discord" },
        data: {
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          scope: account.scope,
          expires_at: account.expires_at,
          id_token: account.id_token,
        },
      });
      console.log("updatedAccount: ", updatedAccount);
    }
  } catch (error) {
    console.log("errror updating account on signIn");
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  events: { signIn: updateRefreshToken },
};

export default NextAuth(authOptions);
