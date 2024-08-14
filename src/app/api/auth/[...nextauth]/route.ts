// imports
import NextAuth from "next-auth";
// importing providers
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    // GithubProvider({
    //   clientId: process.env.Git_clientId as string,
    //   clientSecret: process.env.Git_clientSecret as string,
    // }),
    // GoogleProvider({
    //   clientId: process.env.Google_clientId as string,
    //   clientSecret: process.env.Google_clientSecret as string,
    // }),
  ],
});

export { handler as GET, handler as POST };
