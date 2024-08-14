// imports
import NextAuth from "next-auth";
// importing providers
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: "Ov23liFXF3H3vKwIM6Zy" as string,
      clientSecret: "af9aa44266b5eb847e025747c94b81d751b4d8fd" as string,
    }),
    GoogleProvider({
      clientId:
        "164263697979-ghf3fhbgr8k59f9k0ipii1u142n5u9in.apps.googleusercontent.com" as string,
      clientSecret: "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" as string,
    }),
  ],
});
//redirect google login url http://localhost:3000/api/auth/callback/google
export { handler as GET, handler as POST };
