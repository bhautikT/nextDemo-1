// imports
import NextAuth from "next-auth";
// importing providers
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.Git_clientId as string,
      clientSecret: process.env.Git_clientSecret as string,
    }),
    GoogleProvider({
      clientId: process.env.Google_clientId as string,
      clientSecret: process.env.Google_clientSecret as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_clientId as string,
      clientSecret: process.env.TWITTER_clientSecret as string,
    }),
  ],
});

export { handler as GET, handler as POST };
